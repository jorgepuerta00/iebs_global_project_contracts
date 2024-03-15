// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AvatarNFT is ERC721, ERC721URIStorage, AccessControl, Pausable {
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  Counters.Counter private _tokenIdCounter;
  string private baseURI;

  constructor(string memory _initialBaseURI) ERC721("AvatarNFT", "AVA") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    setBaseURI(_initialBaseURI);
  }

  function setBaseURI(
    string memory _newBaseURI
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    baseURI = _newBaseURI;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function burn(uint256 _tokenId) public onlyRole(MINTER_ROLE) whenNotPaused {
    _burn(_tokenId);
  }

  function _burn(
    uint256 _tokenId
  )
    internal
    override(ERC721, ERC721URIStorage)
    onlyRole(MINTER_ROLE)
    whenNotPaused
  {
    super._burn(_tokenId);
  }

  function safeMint(address _to) public onlyRole(MINTER_ROLE) whenNotPaused {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    string memory newTokenURI = string(
      abi.encodePacked("/", uint2str(tokenId))
    );

    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, newTokenURI);
  }

  function tokenURI(
    uint256 _tokenId
  )
    public
    view
    override(ERC721, ERC721URIStorage)
    whenNotPaused
    returns (string memory)
  {
    return super.tokenURI(_tokenId);
  }

  function supportsInterface(
    bytes4 _interfaceId
  )
    public
    view
    override(ERC721, ERC721URIStorage, AccessControl)
    whenNotPaused
    returns (bool)
  {
    return super.supportsInterface(_interfaceId);
  }

  function setTokenURI(
    uint256 _tokenId,
    string memory _uri
  ) public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
    require(
      _exists(_tokenId),
      "ERC721URIStorage: URI set of nonexistent token"
    );
    _setTokenURI(_tokenId, _uri);
  }

  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  function uint2str(uint256 _i) internal pure returns (string memory) {
    if (_i == 0) {
      return "0";
    }
    uint256 j = _i;
    uint256 length;
    while (j != 0) {
      length++;
      j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint256 k = length;
    while (_i != 0) {
      bstr[--k] = bytes1(uint8(48 + (_i % 10)));
      _i /= 10;
    }
    return string(bstr);
  }
}
