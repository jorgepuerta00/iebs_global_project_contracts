// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AvatarNFT is ERC721, ERC721URIStorage, AccessControl, Pausable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  string public baseURI;

  mapping(string => address) private _urlToTokenId;
  mapping(address => uint256[]) private _ownedTokens;

  event TokenMinted(
    address indexed to,
    uint256 indexed tokenId,
    string tokenURI
  );
  event ExistingTokenMinted(
    address indexed to,
    uint256 indexed tokenId,
    string existingTokenURI
  );

  constructor(string memory _initialBaseURI) ERC721("AvatarNFT", "AVA") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    setBaseURI(_initialBaseURI);
  }

  // Function to mint new tokens from existing token metadata
  function safeMintExistingNFT(
    address _to,
    string memory copyTokenUrl
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
    require(
      urlExists(copyTokenUrl),
      "Token URL does not exist, cannot copy metadata"
    );

    uint256 tokenId = _tokenIdCounter.current();

    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, copyTokenUrl);

    _ownedTokens[_to].push(tokenId);
    _tokenIdCounter.increment();

    emit ExistingTokenMinted(_to, tokenId, copyTokenUrl);
  }

  // Function to check if a URL exists
  function urlExists(string memory url) public view returns (bool) {
    return _urlToTokenId[url] != address(0);
  }

  // Function to mint new tokens
  function safeMint(address _to) public onlyRole(MINTER_ROLE) whenNotPaused {
    uint256 tokenId = _tokenIdCounter.current();
    string memory strTokenId = Strings.toString(tokenId);
    string memory newTokenURI = string(
      abi.encodePacked("/", strTokenId, ".json")
    );
    string memory Url = string(
      abi.encodePacked(_baseURI(), "/", strTokenId, ".json")
    );

    _safeMint(_to, tokenId);
    _setTokenURI(tokenId, newTokenURI);

    _ownedTokens[_to].push(tokenId);
    _tokenIdCounter.increment();
    _urlToTokenId[Url] = _to;

    emit TokenMinted(_to, tokenId, newTokenURI);
  }

  // Function to burn tokens
  function burn(uint256 _tokenId) public onlyRole(MINTER_ROLE) whenNotPaused {
    _burn(_tokenId);

    string memory uri = tokenURI(_tokenId);
    delete _urlToTokenId[uri];

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

  // Function to burn tokens
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

  // Function to set the base URI
  function setBaseURI(
    string memory _newBaseURI
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    baseURI = _newBaseURI;
  }

  // Function to set the token URI
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

  // Function to get the token URI
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

  // Function to get the base URI
  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  // Function to get the owned tokens
  function getOwnedTokens(
    address owner
  ) public view returns (uint256[] memory) {
    return _ownedTokens[owner];
  }

  // Function to get the token URLs by owner
  function getTokenURLsByOwner(
    address owner
  ) public view returns (string[] memory) {
    uint256[] memory tokenIds = getOwnedTokens(owner);
    string[] memory tokenURIs = new string[](tokenIds.length);

    for (uint256 i = 0; i < tokenIds.length; i++) {
      tokenURIs[i] = tokenURI(tokenIds[i]);
    }

    return tokenURIs;
  }

  // Function to get the total token count
  function getTotalTokenCount() public view returns (uint256) {
    return _tokenIdCounter.current();
  }

  // Function to withdraw funds from the contract
  function withdraw(uint amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
    payable(msg.sender).transfer(amount);
  }

  // Function to pause the contract
  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  // Function to unpause the contract
  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  // Function to check if an address supports an interface
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
}
