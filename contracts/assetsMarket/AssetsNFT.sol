// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AssetsNFT is ERC1155, AccessControl, Pausable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  string private baseURI;

  event TokensMinted(
    address indexed account,
    uint256 indexed tokenId,
    uint256 amount
  );

  event TokensBatchMinted(
    address indexed to,
    uint256[] indexed ids,
    uint256[] amounts
  );

  constructor(string memory _initialBaseURI) ERC1155("") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    baseURI = _initialBaseURI;
  }

  // Function to mint new tokens
  function mint(
    address account,
    uint256 id,
    uint256 amount
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
    _mint(account, id, amount, bytes(""));

    emit TokensMinted(account, id, amount);
  }

  // Function to mint batch tokens
  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts
  ) public onlyRole(MINTER_ROLE) whenNotPaused {
    _mintBatch(to, ids, amounts, bytes(""));

    emit TokensBatchMinted(to, ids, amounts);
  }

  // Function to set uri for each token type
  function uri(uint256 tokenId) public view override returns (string memory) {
    return
      string(
        abi.encodePacked(baseURI, "/", Strings.toString(tokenId), ".json")
      );
  }

  function setBaseURI(
    string memory newBaseURI
  ) public onlyRole(DEFAULT_ADMIN_ROLE) {
    baseURI = newBaseURI;
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
  ) public view override(ERC1155, AccessControl) whenNotPaused returns (bool) {
    return super.supportsInterface(_interfaceId);
  }
}
