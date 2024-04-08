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

  uint256 public bundlePrice = 0.01 ether;

  event ListingUpdated(uint256 indexed listingId, string status);
  event BundleMinted(
    address indexed account,
    uint256[] tokenIds,
    uint256[] amounts,
    uint256 price
  );
  event SingleMinted(
    address indexed account,
    uint256 tokenId,
    uint256 amount,
    uint256 price
  );

  constructor(address _nftContractAddress, uint256 _commissionPercentage) {
    nftToken = AssetsNFT(_nftContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  // list
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

  // Function to cancel a listing
  function cancelListing(uint256 listingId) external whenNotPaused {
    Listing storage listing = listings[listingId];
    require(listing.seller != address(0), "Listing does not exist");
    require(listing.seller == msg.sender, "Not seller");
    require(listing.isActive, "Already inactive");

    listing.isActive = false;
    emit ListingUpdated(listingId, "cancelled");
  }

  // Function to purchase an NFT
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

  // Function to buy a package of 5 NFTs
  function purchaseBundleNFT() external payable whenNotPaused {
    require(msg.value == bundlePrice, "Incorrect value for bundle");

    uint256[] memory ids = new uint256[](5);
    uint256[] memory amounts = new uint256[](5);
    for (uint256 i = 0; i < 5; i++) {
      ids[i] =
        uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) %
        10000;
      amounts[i] = 1;
    }

    nftToken.mintBatch(msg.sender, ids, amounts);
    emit BundleMinted(msg.sender, ids, amounts, bundlePrice);
  }

  // Function to buy a single NFT at the bundle price
  function purchaseSingleNFT(uint256 tokenId) external payable whenNotPaused {
    require(msg.value == bundlePrice, "Incorrect value for single NFT");

    nftToken.mint(msg.sender, tokenId, 1);
    emit SingleMinted(msg.sender, tokenId, 1, bundlePrice);
  }

  // Function to get all active listings
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

  // Function to get a listing by ID
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

  // Function to get the total number of active listings
  function _countActiveListings() private view returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 1; i < nextListingId; i++) {
      if (listings[i].isActive) {
        count++;
      }
    }
    return count;
  }

  // Function to update the NFT contract address
  function updateNFTContract(address newContract) external onlyOwner {
    nftToken = AssetsNFT(newContract);
  }

  // Function to update the commission percentage
  function updateCommissionPercentage(
    uint256 newPercentage
  ) external onlyOwner {
    require(newPercentage <= 100, "Percentage too high");
    commissionPercentage = newPercentage;
  }

  // Function to update the bundle price
  function updateBundlePrice(uint256 newPrice) external onlyOwner {
    bundlePrice = newPrice;
  }

  // Function to withdraw funds
  function withdrawFunds(uint256 amount) external onlyOwner {
    payable(msg.sender).transfer(amount);
  }

  // Function to pause the contract
  function pause() public onlyOwner {
    _pause();
  }

  // Function to unpause the contract
  function unpause() public onlyOwner {
    _unpause();
  }
}
