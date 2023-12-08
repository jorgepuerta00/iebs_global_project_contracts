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
  uint256 public constant MIN_TOKENS_TO_PROPOSE = 100 * 1e18; // Minimum tokens required to create a proposal
  uint256 public constant VOTING_PERIOD = 7 days; // Voting period length

  mapping(address => uint256) public lastClaimedTimestamp;

  struct Proposal {
    string description;
    uint256 deadline;
    uint256 yesVotes;
    uint256 noVotes;
    mapping(address => bool) hasVoted;
    bool executed;
  }

  mapping(uint256 => Proposal) public proposals;
  uint256 public nextProposalId;

  event TokensPurchased(
    address indexed buyer,
    uint256 ethAmount,
    uint256 tokenAmount
  );
  event ProposalCreated(uint256 proposalId, string description);
  event Voted(address indexed voter, uint256 proposalId, bool vote);
  event ProposalExecuted(uint256 proposalId, bool result);

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

  // Create a proposal
  function createProposal(string memory _description) public {
    require(
      balanceOf(msg.sender) >= MIN_TOKENS_TO_PROPOSE,
      "Insufficient tokens"
    );
    Proposal storage proposal = proposals[nextProposalId];
    proposal.description = _description;
    proposal.deadline = block.timestamp + VOTING_PERIOD;
    emit ProposalCreated(nextProposalId, _description);
    nextProposalId++;
  }

  // Vote on a proposal
  function voteOnProposal(uint256 _proposalId, bool _vote) public {
    Proposal storage proposal = proposals[_proposalId];
    require(block.timestamp < proposal.deadline, "Voting period over");
    require(!proposal.hasVoted[msg.sender], "Already voted");
    proposal.hasVoted[msg.sender] = true;
    if (_vote) {
      proposal.yesVotes += balanceOf(msg.sender);
    } else {
      proposal.noVotes += balanceOf(msg.sender);
    }
    emit Voted(msg.sender, _proposalId, _vote);
  }

  // Execute a proposal if the voting period is over and it has enough votes
  function executeProposal(uint256 _proposalId) public {
    Proposal storage proposal = proposals[_proposalId];
    require(block.timestamp >= proposal.deadline, "Voting not over");
    require(!proposal.executed, "Already executed");
    proposal.executed = true;
    if (proposal.yesVotes > proposal.noVotes) {
      // Implement execution logic here (depends on proposal)
      emit ProposalExecuted(_proposalId, true);
    } else {
      emit ProposalExecuted(_proposalId, false);
    }
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
