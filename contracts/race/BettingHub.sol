// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./AvatarRaceEvent.sol";

contract BettingHub is Ownable, Pausable {
  AvatarRaceEvent public smashEvent;

  using Counters for Counters.Counter;
  Counters.Counter private _nextBetId;

  struct Bet {
    uint256 betId;
    uint256 matchId;
    uint256[] racerIds;
    uint256 betAmount;
    address bettor;
    bool isClaimed;
  }

  mapping(uint256 => mapping(uint256 => Bet)) public betsByRace;

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
    smashEvent = AvatarRaceEvent(_nftContractAddress);
  }

  // function to place a bet
  function placeBet(
    uint256 _raceId,
    uint256[] memory _nftIds
  ) public payable whenNotPaused {
    require(
      smashEvent.getMatchStatus(_raceId),
      "Race not active or already started"
    );

    uint256 betId = _nextBetId.current();

    // store bet
    betsByRace[_raceId][betId] = Bet({
      betId: betId,
      matchId: _raceId,
      racerIds: _nftIds,
      betAmount: msg.value,
      bettor: msg.sender,
      isClaimed: false
    });

    _nextBetId.increment();

    emit BetPlaced(_raceId, betId, msg.sender, msg.value);
  }

  // function to claim winnings
  function claimWinnings(uint256 _raceId, uint256 _betId) public whenNotPaused {
    Bet storage bet = betsByRace[_raceId][_betId];

    require(bet.bettor != address(0), "Bet does not exist");
    require(smashEvent.isEndedMatch(_raceId), "Race is not ended");
    require(bet.bettor == msg.sender, "Not the bettor");
    require(!bet.isClaimed, "Winnings already claimed");

    // get race results
    uint256[] memory raceResults = smashEvent.getRaceResults(_raceId);

    // Check if the bet is a winning bet
    require(isWinningBet(bet, raceResults), "Bet did not win");

    // calculate winnings
    uint256 winnings = calculateWinnings(bet, _raceId);

    uint256 contractBalance = address(this).balance;
    require(winnings <= contractBalance, "Contract does not have enough funds");

    // set bet as claimed
    bet.isClaimed = true;

    // transfer winnings
    payable(msg.sender).transfer(winnings);

    emit BetClaimed(_raceId, _betId, msg.sender, winnings);
  }

  // check if bet is a winning bet in the correct order
  function isWinningBet(
    Bet memory _bet,
    uint256[] memory _raceResults
  ) private pure returns (bool) {
    if (_bet.racerIds.length != _raceResults.length) {
      return false;
    }
    for (uint256 i = 0; i < _bet.racerIds.length; i++) {
      if (_bet.racerIds[i] != _raceResults[i]) {
        return false;
      }
    }
    return true;
  }

  // function to calculate winnings
  function calculateWinnings(
    Bet memory _bet,
    uint256 _raceId
  ) private view returns (uint256) {
    uint256 winnings = 0;
    // calculate total bet on same selection
    uint256 totalBetOnSameSelection = calculateTotalBetOnSelection(
      _bet.racerIds,
      _raceId
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
    uint256 _raceId
  ) private view returns (uint256) {
    uint256 total = 0;
    uint256 betCount = _nextBetId.current();

    for (uint256 i = 0; i < betCount; i++) {
      Bet memory bet = betsByRace[_raceId][i];
      if (areSelectionsEqual(_selection, bet.racerIds)) {
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
