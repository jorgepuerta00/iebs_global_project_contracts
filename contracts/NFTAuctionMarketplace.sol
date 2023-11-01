// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./GoTLandsNFT.sol";
import "./SiliquaCoin.sol";

contract NFTAuctionMarketplace is Ownable, ERC1155Holder {
  GoTLandsNFT public nftToken;
  ISiliquaCoin public token;
  uint256 public commissionPercentage;
  uint256 public totalCommissionEarned;

  struct Auction {
    uint256 auctionId;
    address seller;
    uint256 tokenId;
    uint256 amount;
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
    uint256 amount,
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

  constructor(
    address _nftContractAddress,
    address _siliquaCoinContractAddress,
    uint256 _commissionPercentage
  ) {
    nftToken = GoTLandsNFT(_nftContractAddress);
    token = ISiliquaCoin(_siliquaCoinContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function createAuction(
    uint256 tokenId,
    uint256 amount,
    uint256 startingPrice,
    uint256 duration
  ) external {
    require(
      nftToken.balanceOf(msg.sender, tokenId) >= amount,
      "Insufficient balance"
    );

    auctions[auctionId] = Auction({
      auctionId: auctionId,
      seller: msg.sender,
      tokenId: tokenId,
      amount: amount,
      startingPrice: startingPrice,
      highestBid: startingPrice,
      highestBidder: address(0),
      auctionEndTime: block.timestamp + duration,
      ended: false
    });

    nftToken.transferFrom(msg.sender, address(this), tokenId, amount);

    emit AuctionCreated(
      auctionId,
      msg.sender,
      tokenId,
      amount,
      startingPrice,
      duration
    );
  }

  function placeBid(uint256 _auctionId, uint256 bidAmount) external {
    Auction storage auction = auctions[_auctionId];
    require(!auction.ended, "Auction already ended");
    require(block.timestamp < auction.auctionEndTime, "Auction has ended");
    require(
      bidAmount > auction.highestBid,
      "Bid amount must be higher than the current highest bid"
    );

    // Refund the previous highest bidder
    if (auction.highestBidder != address(0)) {
      token.safeTransfer(auction.highestBidder, auction.highestBid);
    }

    // Place the new bid
    token.safeTransferFrom(msg.sender, address(this), bidAmount);
    auction.highestBid = bidAmount;
    auction.highestBidder = msg.sender;

    emit BidPlaced(auction.auctionId, msg.sender, bidAmount);
  }

  function endAuction(uint256 _auctionId) external onlyOwner {
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
      uint256 total = auction.highestBid - feeAmount;

      // Transfer the remaining amount to the seller
      token.safeTransfer(auction.seller, total);

      // Update total commission earned
      totalCommissionEarned += feeAmount;

      // Transfer NFT to the highest bidder
      nftToken.transferFrom(
        address(this),
        auction.highestBidder,
        auction.tokenId,
        auction.amount
      );
      emit AuctionEnded(
        auction.auctionId,
        auction.highestBidder,
        auction.highestBid
      );
    } else {
      // If no bids were placed, transfer the NFT back to the seller
      nftToken.transferFrom(
        address(this),
        auction.seller,
        auction.tokenId,
        auction.amount
      );
      emit AuctionEnded(auction.auctionId, address(0), 0);
    }
  }

  function approveSeller(address seller) external onlyOwner {
    nftToken.setApprovalForAll(seller, true);
  }

  function revokeSellerApproval(address seller) external onlyOwner {
    nftToken.setApprovalForAll(seller, false);
  }

  function setNFTContract(address _nftContractAddress) external onlyOwner {
    nftToken = GoTLandsNFT(_nftContractAddress);
  }

  function setSiliquaCoin(address _siliquaCoinAddress) external onlyOwner {
    token = ISiliquaCoin(_siliquaCoinAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
  }
}
