// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AssetsNFT.sol";

contract AssetsMarketplace is
  Ownable,
  ReentrancyGuard,
  ERC1155Holder,
  Pausable
{
  AssetsNFT public nftToken;
  uint256 public commissionPercentage;
  uint256 public totalCommissionEarned;

  struct Listing {
    uint256 listingId;
    address seller;
    uint256 tokenId;
    uint256 amount;
    uint256 price;
    bool isActive;
  }

  mapping(uint256 => Listing) public listings;
  uint256 private nextListingId = 1;

  event ListingUpdated(uint256 indexed listingId, string status);

  constructor(address _nftContractAddress, uint256 _commissionPercentage) {
    nftToken = AssetsNFT(_nftContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function listNFT(
    uint256 tokenId,
    uint256 amount,
    uint256 price
  ) external whenNotPaused {
    require(
      nftToken.balanceOf(msg.sender, tokenId) >= amount,
      "Insufficient balance"
    );
    nftToken.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

    listings[nextListingId] = Listing(
      nextListingId,
      msg.sender,
      tokenId,
      amount,
      price,
      true
    );
    emit ListingUpdated(nextListingId, "listed");
    nextListingId++;
  }

  function cancelListing(uint256 listingId) external whenNotPaused {
    Listing storage listing = listings[listingId];
    require(listing.seller != address(0), "Listing does not exist");
    require(listing.seller == msg.sender, "Not seller");
    require(listing.isActive, "Already inactive");

    listing.isActive = false;
    emit ListingUpdated(listingId, "cancelled");
  }

  function purchaseNFT(
    uint256 listingId
  ) external payable nonReentrant whenNotPaused {
    Listing storage listing = listings[listingId];
    require(listing.seller != address(0), "Listing does not exist");
    require(listing.isActive, "Inactive listing");
    require(msg.value == listing.price, "Incorrect price");

    uint256 feeAmount = (msg.value * commissionPercentage) / 100;
    totalCommissionEarned += feeAmount;

    payable(owner()).transfer(feeAmount);
    payable(listing.seller).transfer(listing.price - feeAmount);
    nftToken.safeTransferFrom(
      address(this),
      msg.sender,
      listing.tokenId,
      listing.amount,
      ""
    );

    listing.isActive = false;
    emit ListingUpdated(listingId, "purchased");
  }

  function getActiveListings() external view returns (Listing[] memory) {
    uint256 count = _countActiveListings();
    Listing[] memory activeListings = new Listing[](count);
    uint256 currentIndex = 0;
    for (uint256 i = 1; i < nextListingId; i++) {
      if (listings[i].isActive) {
        activeListings[currentIndex] = listings[i];
        currentIndex++;
      }
    }
    return activeListings;
  }

  function getListingById(
    uint256 listingId
  ) external view returns (uint256, address, uint256, uint256, uint256, bool) {
    Listing memory listing = listings[listingId];
    return (
      listing.listingId,
      listing.seller,
      listing.tokenId,
      listing.amount,
      listing.price,
      listing.isActive
    );
  }

  function _countActiveListings() private view returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 1; i < nextListingId; i++) {
      if (listings[i].isActive) {
        count++;
      }
    }
    return count;
  }

  function updateNFTContract(address newContract) external onlyOwner {
    nftToken = AssetsNFT(newContract);
  }

  function updateCommissionPercentage(
    uint256 newPercentage
  ) external onlyOwner {
    require(newPercentage <= 100, "Percentage too high");
    commissionPercentage = newPercentage;
  }

  function withdrawFunds(uint256 amount) external onlyOwner {
    payable(msg.sender).transfer(amount);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
