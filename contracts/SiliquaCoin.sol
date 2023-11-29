// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISiliquaCoin {
  function safeTransfer(address to, uint256 value) external returns (bool);

  function safeTransferFrom(
    address from,
    address to,
    uint256 value
  ) external returns (bool);
}

contract SiliquaCoin is ERC20, ERC20Burnable, Ownable, Pausable {
  using SafeERC20 for IERC20;

  uint256 public constant TOKEN_TO_ETH_RATE = 1000; // 1 ETH = 1000 SiliquaCoin

  mapping(address => uint256) public lastClaimedTimestamp; // Timestamp of the last time the faucet was claimed by an address

  event TokensPurchased(
    address indexed buyer,
    uint256 ethAmount,
    uint256 tokenAmount
  ); // Event emitted when tokens are purchased from the faucet

  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  // exchange eth for tokens
  receive() external payable whenNotPaused {
    // Calculate the amount of tokens to mint based on the ETH sent
    uint256 ethAmount = msg.value;
    uint256 tokenAmount = ethAmount * TOKEN_TO_ETH_RATE;
    // Mint tokens and send them to the buyer
    _mint(msg.sender, tokenAmount);
    // Emit event
    emit TokensPurchased(msg.sender, ethAmount, tokenAmount);
  }

  // Mint tokens to an address (only callable by the owner)
  function mint(address to, uint256 amount) external onlyOwner whenNotPaused {
    _mint(to, amount);
  }

  // Claim 1 token from the faucet
  function claimTokens() external whenNotPaused {
    uint256 amount = 1 * (10 ** decimals()); // 1 token in native units
    uint256 oneDay = 1 days;

    require(
      lastClaimedTimestamp[msg.sender] + oneDay <= block.timestamp,
      "You can claim tokens once per day"
    );

    _mint(msg.sender, amount);

    lastClaimedTimestamp[msg.sender] = block.timestamp;
  }

  // safe transfer function to avoid ERC20 transfer errors
  function safeTransfer(
    address to,
    uint256 amount
  ) public whenNotPaused returns (bool) {
    transfer(to, amount);
    return true;
  }

  // safe transfer from function to avoid ERC20 transfer errors
  function safeTransferFrom(
    address from,
    address to,
    uint256 amount
  ) public whenNotPaused returns (bool) {
    transferFrom(from, to, amount);
    return true;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
