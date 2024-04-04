// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract AvatarNFT is ERC721Enumerable, AccessControl, Pausable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  string private baseURI;

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

  mapping(uint256 => uint256) private _originalTokenId;
  mapping(uint256 => bool) private _hasOriginalToken;

  constructor(string memory initialBaseURI) ERC721("AvatarNFT", "AVA") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    baseURI = initialBaseURI;
  }

  // Function to burn a token
  function burn(uint256 tokenId) public whenNotPaused {
    require(
      _isApprovedOrOwner(_msgSender(), tokenId),
      "Caller is not owner nor approved"
    );
    _burn(tokenId);
  }

  // Mint a new NFT
  function safeMint(address to) public onlyRole(MINTER_ROLE) whenNotPaused {
    uint256 tokenId = totalSupply();
    _safeMint(to, tokenId);
    emit TokenMinted(to, tokenId, tokenURI(tokenId));
  }

  // Mint a new NFT with an existing token ID
  function safeMintExistingNFT(
    address to,
    uint256 existingTokenId
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
    require(
      _exists(existingTokenId),
      "AvatarNFT: existing token ID does not exist"
    );
    uint256 newTokenId = totalSupply();
    _safeMint(to, newTokenId);

    // Map the new token to the original token's URI
    _originalTokenId[newTokenId] = existingTokenId;
    _hasOriginalToken[newTokenId] = true;

    emit ExistingTokenMinted(to, newTokenId, tokenURI(existingTokenId));
  }

  // set the base URI for the token
  function setBaseURI(
    string calldata newBaseURI
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    baseURI = newBaseURI;
  }

  // get the base URI for the token
  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "ERC721Metadata: URI query for nonexistent token");

    // Determine the correct ID to use for URI construction
    uint256 tokenId = id;
    if (_hasOriginalToken[id]) {
      tokenId = _originalTokenId[id];
    }

    // Construct and return the URI
    return
      string(
        abi.encodePacked(baseURI, "/", Strings.toString(tokenId), ".json")
      );
  }

  // Function to get the list of all token IDs owned by an address
  function getOwnedTokens(
    address owner
  ) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(owner);
    uint256[] memory tokensId = new uint256[](tokenCount);
    for (uint256 i = 0; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(owner, i);
    }
    return tokensId;
  }

  // Function to get the list of all token metadata URLs owned by an address
  function getTokenURLsByOwner(
    address owner
  ) public view returns (string[] memory) {
    uint256 tokenCount = balanceOf(owner);
    string[] memory tokenURIs = new string[](tokenCount);

    for (uint256 i = 0; i < tokenCount; i++) {
      uint256 tokenId = tokenOfOwnerByIndex(owner, i);
      tokenURIs[i] = tokenURI(tokenId);
    }

    return tokenURIs;
  }

  // pause the contract
  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _pause();
  }

  // unpause the contract
  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  // Function to withdraw funds from the contract
  function withdraw(uint amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
    payable(msg.sender).transfer(amount);
  }

  // check if the contract is paused
  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721Enumerable, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
