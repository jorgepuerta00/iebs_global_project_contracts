// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AssetsNFT is ERC1155, AccessControl, Pausable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  using Strings for uint256;

  // Mapping from token ID to token URI
  mapping(uint256 => string) private _tokenURIs;

  constructor() ERC1155("") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
  }

  // Function to mint new tokens
  function mint(
    address _account,
    uint256 _tokenId,
    uint256 _amount,
    string memory _uri
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
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
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
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
  ) public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
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

  function withdraw(uint amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
    payable(msg.sender).transfer(amount);
  }

  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  function supportsInterface(
    bytes4 _interfaceId
  ) public view override(ERC1155, AccessControl) whenNotPaused returns (bool) {
    return super.supportsInterface(_interfaceId);
  }
}
