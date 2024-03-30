// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AvatarNFT.sol";
import "./../SiliquaCoin.sol";
import "hardhat/console.sol";

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
    uint256 listingId;
    address seller;
    uint256 tokenId;
    uint256 price;
    bool isActive;
  }

  mapping(uint256 => Listing) public listings;
  uint256 public listingId = 0;

  event NFTListed(
    uint256 indexed listingId,
    address indexed seller,
    uint256 indexed tokenId,
    uint256 price,
    string status
  );

  event NFTPurchased(
    uint256 indexed listingId,
    address indexed buyer,
    address indexed seller,
    uint256 tokenId,
    uint256 price,
    string status
  );

  event NFTsPurchasedPackage(
    address indexed buyer,
    uint256 numberOfNFTs,
    uint256 totalAmount
  );

  event PurchasedExistingNFT(
    address indexed buyer,
    string tokenId,
    uint256 totalAmount
  );

  event NFTListingCancelled(
    uint256 indexed listingId,
    address indexed seller,
    uint256 indexed tokenId,
    uint256 price,
    string status
  );

  event NFTContractUpdated(address indexed newNFTContractAddress);
  event SiliquaCoinUpdated(address indexed newSiliquaCoinAddress);
  event CommissionPercentageUpdated(uint256 newCommissionPercentage);

  uint256 public mintPrice = 0.1 ether;
  mapping(string => uint256) public mintCounts;

  constructor(address _nftContractAddress, uint256 _commissionPercentage) {
    nftToken = AvatarNFT(_nftContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function listNFT(uint256 _tokenId, uint256 _price) external whenNotPaused {
    require(nftToken.ownerOf(_tokenId) == msg.sender, "Only owner can sell");

    // Transfer the NFT tokens to the contract
    nftToken.transferFrom(msg.sender, address(this), _tokenId);

    // Create a new listing
    listings[listingId] = Listing(
      listingId,
      msg.sender,
      _tokenId,
      _price,
      true
    );

    emit NFTListed(listingId, msg.sender, _tokenId, _price, "listed");
    listingId++;
  }

  function cancelListing(uint256 _listingId) external whenNotPaused {
    require(_listingId < listingId, "Invalid listing ID");
    Listing storage listing = listings[_listingId];
    require(
      msg.sender == listing.seller,
      "Only the seller can cancel the listing"
    );
    require(listing.isActive, "Listing is not active");

    // Transfer the NFT tokens back to the seller
    nftToken.transferFrom(address(this), msg.sender, listing.tokenId);

    // Deactivate the listing
    listing.isActive = false;

    // Emit an event indicating the cancellation of the listing
    emit NFTListingCancelled(
      _listingId,
      msg.sender,
      listing.tokenId,
      listing.price,
      "cancelled"
    );
  }

  function purchaseNFT(
    uint256 _listingId
  ) external payable nonReentrant whenNotPaused {
    require(_listingId < listingId, "ID doesn't exist");
    Listing storage listing = listings[_listingId];
    require(listing.isActive, "Listing is not active");
    require(msg.value == listing.price, "Incorrect price");

    // Calculate commission amount
    uint256 feeAmount = (listing.price * commissionPercentage) / 100;
    totalCommissionEarned += feeAmount;

    // Transfer commission from the sale price
    payable(owner()).transfer(feeAmount);

    // Transfer the remaining amount to the seller
    uint256 sellerAmount = listing.price - feeAmount;
    payable(listing.seller).transfer(sellerAmount);

    // Transfer the NFT to the buyer
    nftToken.safeTransferFrom(address(this), msg.sender, listing.tokenId);

    // Update the listing as inactive
    listing.isActive = false;
    emit NFTPurchased(
      _listingId,
      msg.sender,
      listing.seller,
      listing.tokenId,
      msg.value,
      "purchased"
    );
  }

  function purchaseExistingNFT(
    string memory copyTokenUrl
  ) external payable nonReentrant whenNotPaused {
    uint256 currentMintCount = mintCounts[copyTokenUrl] + 1;

    // Calculate the percentage increase based on the currentMintCount
    // Each mint increases the price by an additional 10% of the base mintPrice.
    uint256 percentageIncrease = currentMintCount * 10;

    // Calculate the total cost with the percentage increase
    uint256 totalCost = (mintPrice * (100 + percentageIncrease)) / 100;

    require(msg.value == totalCost, "Must send the exact price for the NFT");

    nftToken.safeMintExistingNFT(msg.sender, copyTokenUrl);

    mintCounts[copyTokenUrl] = currentMintCount;

    emit PurchasedExistingNFT(msg.sender, copyTokenUrl, totalCost);
  }

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

    emit NFTsPurchasedPackage(msg.sender, _numberOfNFTs, totalCost);
  }

  function getActiveListings()
    external
    view
    whenNotPaused
    returns (Listing[] memory activeListings)
  {
    uint256 activeListingCount = 0;
    for (uint256 i = 0; i < listingId; i++) {
      if (listings[i].isActive) {
        activeListingCount++;
      }
    }

    activeListings = new Listing[](activeListingCount);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < listingId; i++) {
      if (listings[i].isActive) {
        activeListings[currentIndex] = listings[i];
        currentIndex++;
      }
    }

    return activeListings;
  }

  function setNFTContract(
    address _nftContractAddress
  ) external onlyOwner whenNotPaused {
    nftToken = AvatarNFT(_nftContractAddress);
    emit NFTContractUpdated(_nftContractAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner whenNotPaused {
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
    emit CommissionPercentageUpdated(_newCommissionPercentage);
  }

  function setMintPrice(uint256 _newMintPrice) external onlyOwner {
    mintPrice = _newMintPrice;
  }

  function withdraw(uint amount) external onlyOwner {
    payable(msg.sender).transfer(amount);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
