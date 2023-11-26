// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HorsesNFT is ERC721, ERC721URIStorage, AccessControl {
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("HorsesNFT", "HOR") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
  }

  function burn(uint256 tokenId) public onlyRole(MINTER_ROLE) {
    _burn(tokenId);
  }

  function _burn(
    uint256 tokenId
  ) internal override(ERC721, ERC721URIStorage) onlyRole(MINTER_ROLE) {
    super._burn(tokenId);
  }

  function safeMint(
    address to,
    string memory uri
  ) public onlyRole(MINTER_ROLE) {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  )
    public
    view
    override(ERC721, ERC721URIStorage, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
