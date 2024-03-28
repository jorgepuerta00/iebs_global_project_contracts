// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AssetsNFT is ERC1155, Ownable, Pausable {
  using Strings for uint256;

  // Mapping from token ID to token URI
  mapping(uint256 => string) private _tokenURIs;

  constructor() ERC1155("") {}

  // Function to mint new tokens
  function mint(
    address _account,
    uint256 _tokenId,
    uint256 _amount,
    string memory _uri
  ) public onlyOwner whenNotPaused {
    require(
      bytes(_tokenURIs[_tokenId]).length == 0,
      "Asset already minted with this id"
    );
    _mint(_account, _tokenId, _amount, "");
    setTokenURI(_tokenId, _uri);
  }

  // Function to mint batch tokens
  function mintBatch(
    address _to,
    uint256[] memory _tokenIds,
    uint256[] memory _amounts,
    string[] memory _uris
  ) public onlyOwner whenNotPaused {
    require(_tokenIds.length == _uris.length, "IDs and URIs length mismatch");
    _mintBatch(_to, _tokenIds, _amounts, "");

    for (uint256 i = 0; i < _tokenIds.length; i++) {
      setTokenURI(_tokenIds[i], _uris[i]);
    }
  }

  // Function to set the URI of a token type
  function setTokenURI(
    uint256 _tokenId,
    string memory _uri
  ) public onlyOwner whenNotPaused {
    _tokenURIs[_tokenId] = _uri;
  }

  // Override for the URI function to return the token URI for each token type
  function uri(
    uint256 _tokenId
  ) public view override whenNotPaused returns (string memory) {
    require(
      bytes(_tokenURIs[_tokenId]).length != 0,
      "Asset not minted or URI not set"
    );
    return _tokenURIs[_tokenId];
  }

  // safe transfer tokens
  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    uint256 _amount
  ) public virtual whenNotPaused {
    safeTransferFrom(_from, _to, _tokenId, _amount, "");
  }

  // safe batch transfer tokens
  function batchTransferFrom(
    address _from,
    address _to,
    uint256[] memory _tokenIds,
    uint256[] memory _amount
  ) public virtual whenNotPaused {
    safeBatchTransferFrom(_from, _to, _tokenIds, _amount, "");
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
