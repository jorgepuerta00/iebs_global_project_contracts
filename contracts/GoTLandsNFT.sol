// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoTLandsNFT is ERC1155, Ownable {
  uint256 public constant WESTEROS = 0;
  uint256 public constant THE_NORTH = 1;
  uint256 public constant THE_VALE = 2;
  uint256 public constant THE_IRON_ISLANDS = 3;
  uint256 public constant THE_RIVERLANDS = 4;
  uint256 public constant THE_WESTERLANDS = 5;
  uint256 public constant THE_STORMLANDS = 6;
  uint256 public constant THE_REACH = 7;
  uint256 public constant KINGS_LANDING = 8;

  constructor() ERC1155("https://westeros.example/api/land/{id}.json") {
    _mint(msg.sender, WESTEROS, 1, "");
    _mint(msg.sender, THE_NORTH, 5000, "");
    _mint(msg.sender, THE_VALE, 20000, "");
    _mint(msg.sender, THE_IRON_ISLANDS, 50000, "");
    _mint(msg.sender, THE_RIVERLANDS, 80000, "");
    _mint(msg.sender, THE_WESTERLANDS, 2000, "");
    _mint(msg.sender, THE_STORMLANDS, 30000, "");
    _mint(msg.sender, THE_REACH, 3000, "");
    _mint(msg.sender, KINGS_LANDING, 10, "");
  }

  function mint(address account, uint256 id, uint256 amount) public onlyOwner {
    _mint(account, id, amount, "");
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, "");
  }

  function setURI(string memory newURI) external onlyOwner {
    _setURI(newURI);
  }
}
