// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AvatarNFT is ERC721, ERC721URIStorage, AccessControl, Pausable {
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  Counters.Counter private _tokenIdCounter;
  string private baseURI;

  mapping(address => uint256[]) private _ownedTokens;

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

    address owner = ownerOf(_tokenId);
    uint256[] storage tokens = _ownedTokens[owner];
    for (uint256 i = 0; i < tokens.length; i++) {
      if (tokens[i] == _tokenId) {
        tokens[i] = tokens[tokens.length - 1];
        tokens.pop();
        break;
      }
    }
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
    string memory strTokenId = Strings.toString(tokenId);
    _tokenIdCounter.increment();

    string memory newTokenURI = string(
      abi.encodePacked("/", strTokenId, ".json")
    );

    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, newTokenURI);

    _ownedTokens[_to].push(tokenId);
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

  function getOwnedTokens(
    address owner
  ) public view returns (uint256[] memory) {
    return _ownedTokens[owner];
  }

  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }
}
