// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GoTLandsNFT.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  GoTLandsNFT public nftContract;
  IERC20 public siliquaCoinContract;
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
  uint256 public nextListingId;

  event NFTListed(
    uint256 indexed listingId,
    address indexed seller,
    uint256 indexed tokenId,
    uint256 amount,
    uint256 price,
    string status
  );

  event NFTPurchased(
    uint256 indexed listingId,
    address indexed buyer,
    address indexed seller,
    uint256 tokenId,
    uint256 amount,
    uint256 price,
    string status
  );

  event NFTListingCancelled(
    uint256 indexed listingId,
    address indexed seller,
    uint256 indexed tokenId,
    uint256 amount,
    uint256 price,
    string status
  );

  constructor(
    address _nftContractAddress,
    address _siliquaCoinContractAddress,
    uint256 _commissionPercentage
  ) {
    nftContract = GoTLandsNFT(_nftContractAddress);
    siliquaCoinContract = IERC20(_siliquaCoinContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function listNFT(
    uint256 _tokenId,
    uint256 _amount,
    uint256 _price
  ) external nonReentrant {
    require(
      nftContract.ownerOf(_tokenId) == msg.sender,
      "You don't own this token"
    );
    require(
      nftContract.balanceOf(msg.sender, _tokenId) >= _amount,
      "Insufficient balance"
    );

    // Deduct commission from the listing price
    uint256 feeAmount = (_price * commissionPercentage) / 100;

    // Transfer commission to the contract owner
    siliquaCoinContract.safeTransferFrom(msg.sender, owner(), feeAmount);

    // Transfer the NFT tokens to the contract
    nftContract.safeTransfer(msg.sender, address(this), _tokenId, _amount);

    // Update total commission earned
    totalCommissionEarned += feeAmount;

    uint256 listingId = nextListingId;
    nextListingId++;

    listings[listingId] = Listing(
      listingId,
      msg.sender,
      _tokenId,
      _amount,
      _price,
      true
    );
    emit NFTListed(listingId, msg.sender, _tokenId, _amount, _price, "listed");
  }

  function cancelListing(uint256 _listingId) external nonReentrant {
    require(_listingId < nextListingId, "Invalid listing ID");
    Listing storage listing = listings[_listingId];
    require(
      msg.sender == listing.seller,
      "Only the seller can cancel the listing"
    );
    require(listing.isActive, "Listing is not active");

    // Transfer the NFT tokens back to the seller
    nftContract.safeTransfer(
      address(this),
      msg.sender,
      listing.tokenId,
      listing.amount
    );

    // Deactivate the listing
    listing.isActive = false;

    // Emit an event indicating the cancellation of the listing
    emit NFTListingCancelled(
      _listingId,
      msg.sender,
      listing.tokenId,
      listing.amount,
      listing.price,
      "cancelled"
    );
  }

  function purchaseNFT(uint256 _listingId) external nonReentrant {
    require(_listingId < nextListingId, "ID doesn't exist");
    Listing storage listing = listings[_listingId];
    require(listing.isActive, "Listing is not active");
    require(
      siliquaCoinContract.balanceOf(msg.sender) >= listing.price,
      "Insufficient funds"
    );

    // Calculate commission amount
    uint256 feeAmount = (listing.price * commissionPercentage) / 100;
    uint256 total = listing.price - feeAmount;

    // Transfer the remaining amount to the seller
    siliquaCoinContract.safeTransferFrom(msg.sender, listing.seller, total);

    // Update total commission earned
    totalCommissionEarned += feeAmount;

    nftContract.safeTransfer(
      address(this),
      msg.sender,
      listing.tokenId,
      listing.amount
    );

    listing.isActive = false;
    emit NFTPurchased(
      _listingId,
      msg.sender,
      listing.seller,
      listing.tokenId,
      listing.amount,
      listing.price,
      "purchased"
    );
  }

  function getActiveListings()
    external
    view
    returns (Listing[] memory activeListings)
  {
    uint256 activeListingCount = 0;
    for (uint256 i = 0; i < nextListingId; i++) {
      if (listings[i].isActive) {
        activeListingCount++;
      }
    }

    activeListings = new Listing[](activeListingCount);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < nextListingId; i++) {
      if (listings[i].isActive) {
        activeListings[currentIndex] = listings[i];
        currentIndex++;
      }
    }

    return activeListings;
  }

  function setNFTContract(address _nftContractAddress) external onlyOwner {
    nftContract = GoTLandsNFT(_nftContractAddress);
  }

  function setSiliquaCoin(address _siliquaCoinAddress) external onlyOwner {
    siliquaCoinContract = IERC20(_siliquaCoinAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
  }
}
