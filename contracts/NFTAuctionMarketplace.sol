// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GoTLandsNFT.sol";

contract NFTAuctionMarketplace is Ownable {
  GoTLandsNFT public nftToken;
  IERC20 public siliquaCoin;
  uint256 public commissionPercentage;
  uint256 public totalCommissionEarned;

  struct Auction {
    address seller;
    uint256 tokenId;
    uint256 startingPrice;
    uint256 highestBid;
    address highestBidder;
    uint256 auctionEndTime;
    bool ended;
  }

  mapping(uint256 => Auction) public auctions;

  event AuctionCreated(
    uint256 indexed tokenId,
    uint256 startingPrice,
    uint256 auctionEndTime
  );

  event BidPlaced(
    uint256 indexed tokenId,
    address indexed bidder,
    uint256 bidAmount
  );
  event AuctionEnded(
    uint256 indexed tokenId,
    address indexed winner,
    uint256 winningBid
  );

  constructor(
    address _nftContractAddress,
    address _siliquaCoinContractAddress,
    uint256 _commissionPercentage
  ) {
    nftToken = GoTLandsNFT(_nftContractAddress);
    siliquaCoin = IERC20(_siliquaCoinContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function createAuction(
    uint256 tokenId,
    uint256 startingPrice,
    uint256 duration
  ) external {
    require(
      nftToken.ownerOf(tokenId) == msg.sender,
      "You don't own this token"
    );
    require(!auctions[tokenId].ended, "Auction for this token already exists");

    auctions[tokenId] = Auction({
      seller: msg.sender,
      tokenId: tokenId,
      startingPrice: startingPrice,
      highestBid: startingPrice,
      highestBidder: address(0),
      auctionEndTime: block.timestamp + duration,
      ended: false
    });

    nftToken.safeTransfer(msg.sender, address(this), tokenId, 1);

    emit AuctionCreated(
      tokenId,
      startingPrice,
      auctions[tokenId].auctionEndTime
    );
  }

  function placeBid(uint256 tokenId, uint256 bidAmount) external {
    Auction storage auction = auctions[tokenId];
    require(!auction.ended, "Auction already ended");
    require(block.timestamp < auction.auctionEndTime, "Auction has ended");
    require(
      bidAmount > auction.highestBid,
      "Bid amount must be higher than the current highest bid"
    );

    // Refund the previous highest bidder
    if (auction.highestBidder != address(0)) {
      siliquaCoin.transfer(auction.highestBidder, auction.highestBid);
    }

    // Place the new bid
    siliquaCoin.transferFrom(msg.sender, address(this), bidAmount);
    auction.highestBid = bidAmount;
    auction.highestBidder = msg.sender;

    emit BidPlaced(tokenId, msg.sender, bidAmount);
  }

  function endAuction(uint256 tokenId) external onlyOwner {
    Auction storage auction = auctions[tokenId];
    require(!auction.ended, "Auction already ended");
    require(
      block.timestamp >= auction.auctionEndTime,
      "Auction has not yet ended"
    );

    auction.ended = true;

    if (auction.highestBidder != address(0)) {
      // Calculate commission amount
      uint256 feeAmount = (auction.highestBid * commissionPercentage) / 100;
      uint256 total = auction.highestBid - feeAmount;

      // Transfer commission to the contract owner
      siliquaCoin.transferFrom(auction.highestBidder, owner(), feeAmount);

      // Transfer the remaining amount to the seller
      siliquaCoin.transfer(auction.seller, total);

      // Transfer NFT to the highest bidder
      nftToken.safeTransfer(address(this), auction.highestBidder, tokenId, 1);
      emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid);
    } else {
      // If no bids were placed, transfer the NFT back to the seller
      nftToken.safeTransfer(address(this), auction.seller, tokenId, 1);
      emit AuctionEnded(tokenId, address(0), 0);
    }
  }

  function setNFTContract(address _nftContractAddress) external onlyOwner {
    nftToken = GoTLandsNFT(_nftContractAddress);
  }

  function setSiliquaCoin(address _siliquaCoinAddress) external onlyOwner {
    siliquaCoin = IERC20(_siliquaCoinAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
  }
}
