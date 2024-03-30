// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainCustomsManagerNFT is ReentrancyGuard, Ownable {
  event AssetAttached(
    uint256 indexed carTokenId,
    uint256 indexed assetTokenId,
    string category
  );
  event AssetDetached(
    uint256 indexed carTokenId,
    uint256 indexed assetTokenId,
    string category
  );

  // Mapping from CarNFT token ID to its attached AssetNFTs by category
  mapping(uint256 => mapping(string => uint256)) private carAssets;

  // Reference to the CarNFT contract
  ERC721 private carNftContract;

  // Reference to the AssetNFT contract
  ERC721 private assetNftContract;

  constructor(address _carNftAddress, address _assetNftAddress) {
    carNftContract = ERC721(_carNftAddress);
    assetNftContract = ERC721(_assetNftAddress);
  }

  // Function to attach an AssetNFT to a CarNFT
  function attachAsset(
    uint256 _carTokenId,
    uint256 _assetTokenId,
    string memory assetCategory
  ) external nonReentrant {
    require(carNftContract.ownerOf(_carTokenId) == msg.sender, "Not car owner");
    require(
      assetNftContract.ownerOf(_assetTokenId) == msg.sender,
      "Not asset owner"
    );
    require(
      carAssets[_carTokenId][assetCategory] == 0,
      "Category already occupied"
    );

    // Transfer AssetNFT to the contract (to lock it) or to a designated custodian
    assetNftContract.transferFrom(msg.sender, address(this), _assetTokenId);

    carAssets[_carTokenId][assetCategory] = _assetTokenId;

    // Emit an event for the attachment
    emit AssetAttached(_carTokenId, _assetTokenId, assetCategory);
  }

  // Function to detach an AssetNFT from a CarNFT
  function detachAsset(
    uint256 _carTokenId,
    string memory assetCategory
  ) external nonReentrant {
    uint256 assetTokenId = carAssets[_carTokenId][assetCategory];
    require(assetTokenId != 0, "No asset to detach");
    require(carNftContract.ownerOf(_carTokenId) == msg.sender, "Not car owner");

    // Update the mapping to remove the asset
    carAssets[_carTokenId][assetCategory] = 0;

    // Transfer the AssetNFT back to the owner
    assetNftContract.transferFrom(address(this), msg.sender, assetTokenId);

    // Emit an event for the detachment
    emit AssetDetached(_carTokenId, assetTokenId, assetCategory);
  }

  function getAttachedAsset(
    uint256 _carTokenId,
    string memory assetCategory
  ) public view returns (uint256) {
    return carAssets[_carTokenId][assetCategory];
  }
}
