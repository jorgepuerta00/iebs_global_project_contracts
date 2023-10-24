// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SiliquaCoin.sol";
import "./ArtNFT.sol";
import "./GoTLandsNFT.sol";

contract NFTMarketplace is Ownable {
  SiliquaCoin public siliquaCoin;
  ArtNFT public artNFT;
  GoTLandsNFT public gotLandsNFT;

  mapping(uint256 => uint256) public artNFTPrice;

  event NFTSold(
    address indexed buyer,
    address indexed seller,
    uint256 tokenId,
    uint256 price
  );

  constructor(address _siliquaCoin, address _artNFT, address _gotLandsNFT) {
    siliquaCoin = SiliquaCoin(_siliquaCoin);
    artNFT = ArtNFT(_artNFT);
    gotLandsNFT = GoTLandsNFT(_gotLandsNFT);
  }

  function buyArtNFT(uint256 tokenId) external {
    require(artNFT.ownerOf(tokenId) != address(0), "Invalid token");
    require(artNFTPrice[tokenId] > 0, "Token not for sale");
    require(
      siliquaCoin.balanceOf(msg.sender) >= artNFTPrice[tokenId],
      "Insufficient balance"
    );
    require(
      siliquaCoin.allowance(msg.sender, address(this)) >= artNFTPrice[tokenId],
      "Insufficient allowance"
    );

    address seller = artNFT.ownerOf(tokenId);
    siliquaCoin.transferFrom(msg.sender, seller, artNFTPrice[tokenId]);
    artNFT.safeTransferFrom(seller, msg.sender, tokenId);

    emit NFTSold(msg.sender, seller, tokenId, artNFTPrice[tokenId]);
  }

  function sellArtNFT(uint256 tokenId, uint256 price) external {
    require(artNFT.ownerOf(tokenId) == msg.sender, "You don't own this token");
    require(price > 0, "Invalid price");

    artNFTPrice[tokenId] = price;
    artNFT.approve(address(this), tokenId);
  }

  function buyGoTLandsNFT(uint256 tokenId, uint256 amount) external {
    require(
      gotLandsNFT.balanceOf(address(this), tokenId) >= amount,
      "Invalid token or amount"
    );
    require(
      siliquaCoin.balanceOf(msg.sender) >= amount,
      "Insufficient balance"
    );
    require(
      siliquaCoin.allowance(msg.sender, address(this)) >= amount,
      "Insufficient allowance"
    );

    address seller = address(this);
    siliquaCoin.transferFrom(msg.sender, seller, amount);
    gotLandsNFT.safeTransferFrom(seller, msg.sender, tokenId, amount, "");

    emit NFTSold(msg.sender, seller, tokenId, amount);
  }

  function sellGoTLandsNFT(uint256 tokenId, uint256 amount) external {
    require(
      gotLandsNFT.balanceOf(msg.sender, tokenId) >= amount,
      "Insufficient balance"
    );
    require(amount > 0, "Invalid amount");

    gotLandsNFT.safeTransferFrom(
      msg.sender,
      address(this),
      tokenId,
      amount,
      ""
    );
    siliquaCoin.approve(address(this), amount);

    emit NFTSold(address(this), msg.sender, tokenId, amount);
  }

  function approveArtNFT(uint256 tokenId) external onlyOwner {
    require(artNFT.ownerOf(tokenId) == address(this), "Invalid token");
    artNFT.approve(address(this), tokenId);
  }

  function approveGoTLandsNFT(uint256 tokenId) external onlyOwner {
    require(gotLandsNFT.balanceOf(address(this), tokenId) > 0, "Invalid token");
    gotLandsNFT.setApprovalForAll(msg.sender, true);
  }

  function handlePayment(uint256 amount) external onlyOwner {
    require(
      siliquaCoin.balanceOf(address(this)) >= amount,
      "Insufficient balance"
    );
    siliquaCoin.transfer(msg.sender, amount);
  }

  function withdrawFunds() external onlyOwner {
    uint256 balance = siliquaCoin.balanceOf(address(this));
    siliquaCoin.transfer(msg.sender, balance);
  }
}
