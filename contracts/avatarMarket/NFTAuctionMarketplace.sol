// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AvatarNFT.sol";

contract AvatarAuctionMarketplace is
  Ownable,
  ReentrancyGuard,
  ERC1155Holder,
  Pausable
{
  AvatarNFT public nftToken;
  uint256 public commissionPercentage;
  uint256 public totalCommissionEarned;

  struct Auction {
    uint256 auctionId;
    address seller;
    uint256 tokenId;
    uint256 startingPrice;
    uint256 highestBid;
    address highestBidder;
    uint256 auctionEndTime;
    bool ended;
  }

  mapping(uint256 => Auction) public auctions;
  uint256 public auctionId = 0;

  event AuctionCreated(
    uint256 indexed auctionId,
    address seller,
    uint256 tokenId,
    uint256 startingPrice,
    uint256 duration
  );

  event BidPlaced(
    uint256 indexed auctionId,
    address indexed bidder,
    uint256 bidAmount
  );

  event AuctionEnded(
    uint256 indexed auctionId,
    address indexed winner,
    uint256 winningBid
  );

  constructor(address _nftContractAddress, uint256 _commissionPercentage) {
    nftToken = AvatarNFT(_nftContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function createAuction(
    uint256 _tokenId,
    uint256 _startingPrice,
    uint256 _duration
  ) external whenNotPaused {
    require(nftToken.ownerOf(_tokenId) == msg.sender, "Only owner can sell");
    require(_duration > 0, "Duration must be greater than 0");

    auctions[auctionId] = Auction({
      auctionId: auctionId,
      seller: msg.sender,
      tokenId: _tokenId,
      startingPrice: _startingPrice,
      highestBid: _startingPrice,
      highestBidder: address(0),
      auctionEndTime: block.timestamp + _duration,
      ended: false
    });

    nftToken.transferFrom(msg.sender, address(this), _tokenId);

    emit AuctionCreated(
      auctionId,
      msg.sender,
      _tokenId,
      _startingPrice,
      _duration
    );
  }

  function placeBid(
    uint256 _auctionId
  ) external payable nonReentrant whenNotPaused {
    Auction storage auction = auctions[_auctionId];
    require(!auction.ended, "Auction already ended");
    require(block.timestamp < auction.auctionEndTime, "Auction has ended");
    require(
      msg.value > auction.highestBid,
      "Bid amount must be higher than the current highest bid"
    );

    // Refund the previous highest bidder
    if (auction.highestBidder != address(0)) {
      payable(auction.highestBidder).transfer(auction.highestBid);
    }

    // Set the new highest bid
    auction.highestBid = msg.value;
    auction.highestBidder = msg.sender;

    emit BidPlaced(auction.auctionId, msg.sender, msg.value);
  }

  function endAuction(
    uint256 _auctionId
  ) external onlyOwner nonReentrant whenNotPaused {
    Auction storage auction = auctions[_auctionId];
    require(!auction.ended, "Auction already ended");
    require(
      block.timestamp >= auction.auctionEndTime,
      "Auction has not yet ended"
    );

    auction.ended = true;

    if (auction.highestBidder != address(0)) {
      // Calculate commission amount
      uint256 feeAmount = (auction.highestBid * commissionPercentage) / 100;
      totalCommissionEarned += feeAmount;

      // Transfer the remaining Ether amount to the seller
      uint256 sellerAmount = auction.highestBid - feeAmount;
      payable(auction.seller).transfer(sellerAmount);

      // Transfer NFT to the highest bidder
      nftToken.safeTransferFrom(
        address(this),
        auction.highestBidder,
        auction.tokenId
      );

      emit AuctionEnded(
        auction.auctionId,
        auction.highestBidder,
        auction.highestBid
      );
    } else {
      // If no bids were placed, transfer the NFT back to the seller
      nftToken.safeTransferFrom(address(this), auction.seller, auction.tokenId);
      emit AuctionEnded(auction.auctionId, address(0), 0);
    }
  }

  function setNFTContract(
    address _nftContractAddress
  ) external onlyOwner whenNotPaused {
    nftToken = AvatarNFT(_nftContractAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner whenNotPaused {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
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
