// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AvatarSmashEvent.sol";

contract BettingHub is Ownable, Pausable {
  AvatarSmashEvent public smashEvent;

  using Counters for Counters.Counter;
  Counters.Counter private _nextBetId;

  struct Bet {
    uint256 betId;
    uint256 matchId;
    uint256[] fighterIds;
    uint256 betAmount;
    address bettor;
    bool isClaimed;
  }

  mapping(uint256 => mapping(uint256 => Bet)) public betsByFight;

  event BetPlaced(
    uint256 indexed matchId,
    uint256 betId,
    address indexed bettor,
    uint256 betAmount
  );
  event BetClaimed(
    uint256 indexed matchId,
    uint256 betId,
    address indexed bettor,
    uint256 winnings
  );

  constructor(address _nftContractAddress) {
    smashEvent = AvatarSmashEvent(_nftContractAddress);
  }

  // function to place a bet
  function placeBet(
    uint256 _fightId,
    uint256[] memory _nftIds
  ) public payable whenNotPaused {
    require(
      smashEvent.getMatchStatus(_fightId),
      "Race not active or already started"
    );

    uint256 betId = _nextBetId.current();

    // store bet
    betsByFight[_fightId][betId] = Bet({
      betId: betId,
      matchId: _fightId,
      fighterIds: _nftIds,
      betAmount: msg.value,
      bettor: msg.sender,
      isClaimed: false
    });

    _nextBetId.increment();

    emit BetPlaced(_fightId, betId, msg.sender, msg.value);
  }

  // function to claim winnings
  function claimWinnings(
    uint256 _fightId,
    uint256 _betId
  ) public whenNotPaused {
    Bet storage bet = betsByFight[_fightId][_betId];

    require(bet.bettor != address(0), "Bet does not exist");
    require(smashEvent.isEndedMatch(_fightId), "Race is not ended");
    require(bet.bettor == msg.sender, "Not the bettor");
    require(!bet.isClaimed, "Winnings already claimed");

    // get fight results
    uint256[] memory fightResults = smashEvent.getRaceResults(_fightId);

    // Check if the bet is a winning bet
    require(isWinningBet(bet, fightResults), "Bet did not win");

    // calculate winnings
    uint256 winnings = calculateWinnings(bet, _fightId);

    uint256 contractBalance = address(this).balance;
    require(winnings <= contractBalance, "Contract does not have enough funds");

    // set bet as claimed
    bet.isClaimed = true;

    // transfer winnings
    payable(msg.sender).transfer(winnings);

    emit BetClaimed(_fightId, _betId, msg.sender, winnings);
  }

  // check if bet is a winning bet in the correct order
  function isWinningBet(
    Bet memory _bet,
    uint256[] memory _fightResults
  ) private pure returns (bool) {
    if (_bet.fighterIds.length != _fightResults.length) {
      return false;
    }
    for (uint256 i = 0; i < _bet.fighterIds.length; i++) {
      if (_bet.fighterIds[i] != _fightResults[i]) {
        return false;
      }
    }
    return true;
  }

  // function to calculate winnings
  function calculateWinnings(
    Bet memory _bet,
    uint256 _fightId
  ) private view returns (uint256) {
    uint256 winnings = 0;
    // calculate total bet on same selection
    uint256 totalBetOnSameSelection = calculateTotalBetOnSelection(
      _bet.fighterIds,
      _fightId
    );

    // calculate winnings based on popularity
    winnings = calculateWinningsBasedOnPopularity(
      _bet.betAmount,
      totalBetOnSameSelection
    );

    return winnings;
  }

  // function to get total bets on a selection
  function calculateTotalBetOnSelection(
    uint256[] memory _selection,
    uint256 _fightId
  ) private view returns (uint256) {
    uint256 total = 0;
    uint256 betCount = _nextBetId.current();

    for (uint256 i = 0; i < betCount; i++) {
      Bet memory bet = betsByFight[_fightId][i];
      if (areSelectionsEqual(_selection, bet.fighterIds)) {
        total += bet.betAmount;
      }
    }

    return total;
  }

  // function to check if two selections are equal
  function areSelectionsEqual(
    uint256[] memory _selectionA,
    uint256[] memory _selectionB
  ) private pure returns (bool) {
    if (_selectionA.length != _selectionB.length) {
      return false;
    }
    for (uint256 i = 0; i < _selectionA.length; i++) {
      if (_selectionA[i] != _selectionB[i]) {
        return false;
      }
    }
    return true;
  }

  // function to calculate winnings based on popularity
  function calculateWinningsBasedOnPopularity(
    uint256 _betAmount,
    uint256 _totalBetOnSameSelection
  ) private pure returns (uint256) {
    if (_totalBetOnSameSelection > _betAmount) {
      return _betAmount + (_betAmount / 2); // 1.5x original bet
    } else {
      return _betAmount * 2; // duplicate original bet
    }
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
