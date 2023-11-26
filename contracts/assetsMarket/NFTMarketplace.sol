// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./HorsesAssetsNFT.sol";
import "./../SiliquaCoin.sol";

contract AssetsMarketplace is Ownable, ReentrancyGuard, ERC1155Holder {
  HorsesAssetsNFT public nftToken;
  ISiliquaCoin public token;
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
  uint256 public listingId = 0;

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

  event NFTContractUpdated(address indexed newNFTContractAddress);
  event SiliquaCoinUpdated(address indexed newSiliquaCoinAddress);
  event CommissionPercentageUpdated(uint256 newCommissionPercentage);

  constructor(
    address _siliquaCoinAddress,
    address _nftContractAddress,
    uint256 _commissionPercentage
  ) {
    nftToken = HorsesAssetsNFT(_nftContractAddress);
    token = ISiliquaCoin(_siliquaCoinAddress);
    commissionPercentage = _commissionPercentage;
  }

  function listNFT(
    uint256 _tokenId,
    uint256 _amount,
    uint256 _price
  ) external nonReentrant {
    require(
      nftToken.balanceOf(msg.sender, _tokenId) >= _amount,
      "Insufficient balance"
    );

    // Deduct commission from the listing price
    uint256 feeAmount = (_price * commissionPercentage) / 100;

    // Transfer commission to the contract address
    token.safeTransferFrom(msg.sender, address(this), feeAmount);

    // Transfer the NFT tokens to the contract
    nftToken.transferFrom(msg.sender, address(this), _tokenId, _amount);

    // Update total commission earned
    totalCommissionEarned += feeAmount;

    listings[listingId] = Listing(
      listingId,
      msg.sender,
      _tokenId,
      _amount,
      _price,
      true
    );
    emit NFTListed(listingId, msg.sender, _tokenId, _amount, _price, "listed");
    listingId++;
  }

  function cancelListing(uint256 _listingId) external nonReentrant {
    require(_listingId < listingId, "Invalid listing ID");
    Listing storage listing = listings[_listingId];
    require(
      msg.sender == listing.seller,
      "Only the seller can cancel the listing"
    );
    require(listing.isActive, "Listing is not active");

    // Transfer the NFT tokens back to the seller
    nftToken.transferFrom(
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
    require(_listingId < listingId, "ID doesn't exist");
    Listing storage listing = listings[_listingId];
    require(listing.isActive, "Listing is not active");

    // Calculate commission amount
    uint256 feeAmount = (listing.price * commissionPercentage) / 100;

    // Transfer the remaining amount to the seller
    token.safeTransferFrom(msg.sender, listing.seller, listing.price);
    token.safeTransfer(address(this), feeAmount);

    // Update total commission earned
    totalCommissionEarned += feeAmount;

    nftToken.transferFrom(
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

  function approveSeller(address seller) external onlyOwner {
    nftToken.setApprovalForAll(seller, true);
  }

  function revokeSellerApproval(address seller) external onlyOwner {
    nftToken.setApprovalForAll(seller, false);
  }

  function setNFTContract(address _nftContractAddress) external onlyOwner {
    nftToken = HorsesAssetsNFT(_nftContractAddress);
    emit NFTContractUpdated(_nftContractAddress);
  }

  function setSiliquaCoin(address _siliquaCoinAddress) external onlyOwner {
    token = ISiliquaCoin(_siliquaCoinAddress);
    emit SiliquaCoinUpdated(_siliquaCoinAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
    emit CommissionPercentageUpdated(_newCommissionPercentage);
  }
}
