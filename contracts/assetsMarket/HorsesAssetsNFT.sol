// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HorsesAssetsNFT is ERC1155, Ownable {
  using Strings for uint256;

  // Mapping from token ID to token URI
  mapping(uint256 => string) private _tokenURIs;

  constructor() ERC1155("") {}

  // Function to mint new tokens
  function mint(
    address account,
    uint256 tokenId,
    uint256 amount,
    string memory newURI
  ) public onlyOwner {
    require(
      bytes(_tokenURIs[tokenId]).length == 0,
      "Asset already minted with this id"
    );
    _mint(account, tokenId, amount, "");
    setTokenURI(tokenId, newURI);
  }

  // Function to mint batch tokens
  function mintBatch(
    address to,
    uint256[] memory tokenIds,
    uint256[] memory amounts,
    string[] memory uris
  ) public onlyOwner {
    require(tokenIds.length == uris.length, "IDs and URIs length mismatch");
    _mintBatch(to, tokenIds, amounts, "");

    for (uint256 i = 0; i < tokenIds.length; i++) {
      setTokenURI(tokenIds[i], uris[i]);
    }
  }

  // Function to set the URI of a token type
  function setTokenURI(uint256 tokenId, string memory newURI) public onlyOwner {
    _tokenURIs[tokenId] = newURI;
  }

  // Override for the URI function to return the token URI for each token type
  function uri(uint256 tokenId) public view override returns (string memory) {
    require(
      bytes(_tokenURIs[tokenId]).length != 0,
      "Asset not minted or URI not set"
    );
    return _tokenURIs[tokenId];
  }

  // safe transfer tokens
  function transferFrom(
    address from,
    address to,
    uint256 tokenId,
    uint256 amount
  ) public virtual {
    safeTransferFrom(from, to, tokenId, amount, "");
  }

  // safe batch transfer tokens
  function batchTransferFrom(
    address from,
    address to,
    uint256[] memory tokenIds,
    uint256[] memory amount
  ) public virtual {
    safeBatchTransferFrom(from, to, tokenIds, amount, "");
  }
}
