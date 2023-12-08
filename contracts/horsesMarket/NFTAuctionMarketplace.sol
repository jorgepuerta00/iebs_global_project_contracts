// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./../AvatarNFT.sol";
import "./../SiliquaCoin.sol";

contract AvatarAuctionMarketplace is Ownable, ERC1155Holder, Pausable {
  AvatarNFT public nftToken;
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
    nftToken = AvatarNFT(_nftContractAddress);
    token = ISiliquaCoin(_siliquaCoinContractAddress);
    commissionPercentage = _commissionPercentage;
  }

  function createAuction(
    uint256 _tokenId,
    uint256 _amount,
    uint256 _startingPrice,
    uint256 _duration
  ) external whenNotPaused {
    require(nftToken.balanceOf(msg.sender) >= _amount, "Insufficient balance");

    auctions[auctionId] = Auction({
      auctionId: auctionId,
      seller: msg.sender,
      tokenId: _tokenId,
      amount: _amount,
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
      _amount,
      _startingPrice,
      _duration
    );
  }

  function placeBid(
    uint256 _auctionId,
    uint256 _bidAmount
  ) external whenNotPaused {
    Auction storage auction = auctions[_auctionId];
    require(!auction.ended, "Auction already ended");
    require(block.timestamp < auction.auctionEndTime, "Auction has ended");
    require(
      _bidAmount > auction.highestBid,
      "Bid amount must be higher than the current highest bid"
    );

    // Refund the previous highest bidder
    if (auction.highestBidder != address(0)) {
      token.safeTransfer(auction.highestBidder, auction.highestBid);
    }

    // Place the new bid
    token.safeTransferFrom(msg.sender, address(this), _bidAmount);
    auction.highestBid = _bidAmount;
    auction.highestBidder = msg.sender;

    emit BidPlaced(auction.auctionId, msg.sender, _bidAmount);
  }

  function endAuction(uint256 _auctionId) external onlyOwner whenNotPaused {
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
        auction.tokenId
      );
      emit AuctionEnded(
        auction.auctionId,
        auction.highestBidder,
        auction.highestBid
      );
    } else {
      // If no bids were placed, transfer the NFT back to the seller
      nftToken.transferFrom(address(this), auction.seller, auction.tokenId);
      emit AuctionEnded(auction.auctionId, address(0), 0);
    }
  }

  function approveSeller(address _seller) external onlyOwner whenNotPaused {
    nftToken.setApprovalForAll(_seller, true);
  }

  function revokeSellerApproval(
    address _seller
  ) external onlyOwner whenNotPaused {
    nftToken.setApprovalForAll(_seller, false);
  }

  function setNFTContract(
    address _nftContractAddress
  ) external onlyOwner whenNotPaused {
    nftToken = AvatarNFT(_nftContractAddress);
  }

  function setSiliquaCoin(
    address _siliquaCoinAddress
  ) external onlyOwner whenNotPaused {
    token = ISiliquaCoin(_siliquaCoinAddress);
  }

  function updateCommissionPercentage(
    uint256 _newCommissionPercentage
  ) external onlyOwner whenNotPaused {
    // Ensure the commission percentage is within a valid range
    require(_newCommissionPercentage <= 100, "Invalid commission percentage");
    commissionPercentage = _newCommissionPercentage;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
