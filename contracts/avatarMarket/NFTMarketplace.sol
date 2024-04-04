// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AvatarNFT.sol";

contract AvatarMarketplace is
  Ownable,
  ReentrancyGuard,
  ERC1155Holder,
  Pausable
{
  AvatarNFT public nftToken;
  uint256 public commissionPercentage;
  uint256 public totalCommissionEarned;

  struct Listing {
    uint256 tokenId;
    address seller;
    uint256 price;
    bool isActive;
  }

  Listing[] public listings;

  event NFTListed(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 price
  );
  event NFTPurchased(
    uint256 indexed tokenId,
    address indexed buyer,
    address indexed seller,
    uint256 price
  );
  event NFTListingCancelled(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 price
  );
  event NFTContractUpdated(address newNFTContractAddress);
  event CommissionPercentageUpdated(uint256 newCommissionPercentage);

  uint256 public mintPrice = 0.1 ether;
  mapping(uint256 => uint256) public mintCounts;

  constructor(address _nftContractAddress, uint256 _commissionPercentage) {
    nftToken = AvatarNFT(_nftContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  // Function to list an NFT
  function listNFT(uint256 _tokenId, uint256 _price) external whenNotPaused {
    require(nftToken.ownerOf(_tokenId) == msg.sender, "Only owner can list");
    nftToken.transferFrom(msg.sender, address(this), _tokenId);

    listings.push(
      Listing({
        tokenId: _tokenId,
        seller: msg.sender,
        price: _price,
        isActive: true
      })
    );

    emit NFTListed(_tokenId, msg.sender, _price);
  }

  // Function to cancel a listing
  function cancelListing(uint256 _listingIndex) external whenNotPaused {
    require(_listingIndex < listings.length, "Invalid listing ID");
    Listing storage listing = listings[_listingIndex];
    require(listing.seller == msg.sender, "Not the seller");
    require(listing.isActive, "Inactive listing");

    listing.isActive = false;
    nftToken.transferFrom(address(this), msg.sender, listing.tokenId);

    emit NFTListingCancelled(listing.tokenId, msg.sender, listing.price);
  }

  // Function to purchase an NFT
  function purchaseNFT(
    uint256 _listingIndex
  ) external payable nonReentrant whenNotPaused {
    require(_listingIndex < listings.length, "Invalid listing ID");
    Listing storage listing = listings[_listingIndex];
    require(listing.isActive, "Inactive listing");
    require(msg.value == listing.price, "Incorrect value");

    uint256 feeAmount = (msg.value * commissionPercentage) / 100;
    totalCommissionEarned += feeAmount;

    payable(listing.seller).transfer(msg.value - feeAmount);
    nftToken.safeTransferFrom(address(this), msg.sender, listing.tokenId);

    listing.isActive = false;
    emit NFTPurchased(listing.tokenId, msg.sender, listing.seller, msg.value);
  }

  // Function to get all active listings
  function getActiveListings() external view returns (Listing[] memory) {
    uint256 activeCount;
    for (uint256 i = 0; i < listings.length; ++i) {
      if (listings[i].isActive) activeCount++;
    }

    Listing[] memory activeListings = new Listing[](activeCount);
    uint256 j;
    for (uint256 i = 0; i < listings.length; ++i) {
      if (listings[i].isActive) {
        activeListings[j++] = listings[i];
      }
    }

    return activeListings;
  }

  // Function to purchase an existing NFT
  function purchaseExistingNFT(
    uint256 existingTokenId
  ) external payable nonReentrant whenNotPaused {
    uint256 currentMintCount = mintCounts[existingTokenId] + 1;

    // Calculate the percentage increase based on the currentMintCount
    // Each mint increases the price by an additional 10% of the base mintPrice.
    uint256 percentageIncrease = currentMintCount * 10;

    // Calculate the total cost with the percentage increase
    uint256 totalCost = (mintPrice * (100 + percentageIncrease)) / 100;

    require(msg.value == totalCost, "Must send the exact price for the NFT");

    nftToken.safeMintExistingNFT(msg.sender, existingTokenId);

    mintCounts[existingTokenId] = currentMintCount;
  }

  // Function to purchase a package of NFTs
  function purchaseNFTsPackage(
    uint256 _numberOfNFTs
  ) external payable nonReentrant whenNotPaused {
    uint256 totalCost = mintPrice * _numberOfNFTs;
    require(
      msg.value == totalCost,
      "Must send the exact mint price for all NFTs"
    );

    for (uint256 i = 0; i < _numberOfNFTs; i++) {
      nftToken.safeMint(msg.sender);
    }
  }

  // Function to update the NFT contract address
  function setNFTContract(
    address _nftContractAddress
  ) external onlyOwner whenNotPaused {
    nftToken = AvatarNFT(_nftContractAddress);
    emit NFTContractUpdated(_nftContractAddress);
  }

  // Function to update the commission percentage
  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner whenNotPaused {
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
    emit CommissionPercentageUpdated(_newCommissionPercentage);
  }

  // Function to set the mint price
  function setMintPrice(uint256 _newMintPrice) external onlyOwner {
    mintPrice = _newMintPrice;
  }

  // Function to withdraw funds from the contract
  function withdraw(uint amount) external onlyOwner {
    payable(msg.sender).transfer(amount);
  }

  // pause the contract
  function pause() public onlyOwner {
    _pause();
  }

  // unpause the contract
  function unpause() public onlyOwner {
    _unpause();
  }
}
