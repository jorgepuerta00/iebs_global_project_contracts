// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SiliquaCoin is IERC20 {
  address public owner;
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public override totalSupply;

  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) private allowances;

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 initialSupply
  ) {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = initialSupply;
    balances[msg.sender] = initialSupply;
    owner = msg.sender;
    emit Transfer(address(0), msg.sender, initialSupply);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  function transfer(
    address to,
    uint256 amount
  ) external override returns (bool) {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external override returns (bool) {
    require(amount <= balances[from], "Insufficient balance");
    require(amount <= allowances[from][msg.sender], "Insufficient allowance");
    balances[from] -= amount;
    balances[to] += amount;
    allowances[from][msg.sender] -= amount;
    emit Transfer(from, to, amount);
    return true;
  }

  function approve(
    address spender,
    uint256 amount
  ) external override returns (bool) {
    allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }

  function allowance(
    address tokenOwner,
    address spender
  ) external view override returns (uint256) {
    return allowances[tokenOwner][spender];
  }

  function balanceOf(address account) external view override returns (uint256) {
    require(owner != address(0), "Invalid owner address");
    return balances[account];
  }

  function burn(uint256 amount) external onlyOwner returns (bool) {
    require(amount > 0, "Invalid amount");
    require(amount <= balances[msg.sender], "Insufficient balance");
    balances[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
    return true;
  }

  function mint(address to, uint256 amount) external onlyOwner returns (bool) {
    totalSupply += amount;
    balances[to] += amount;
    emit Transfer(address(0), to, amount);
    return true;
  }

  function transferOwnership(address newOwner) external onlyOwner {
    require(newOwner != address(0), "Invalid owner address");
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}
