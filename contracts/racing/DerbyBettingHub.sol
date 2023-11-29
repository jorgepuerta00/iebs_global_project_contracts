// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./HorseRacingEvent.sol";

contract DerbyBettingHub is Ownable, Pausable {
  HorseRacingEvent public racingEvent;

  using Counters for Counters.Counter;
  Counters.Counter private _nextBetId;

  struct Bet {
    uint256 betId;
    uint256 raceId;
    uint256[] horseIds;
    uint256 betAmount;
    address bettor;
    bool isClaimed;
  }

  mapping(uint256 => mapping(uint256 => Bet)) public betsByRace;

  event BetPlaced(
    uint256 indexed raceId,
    uint256 betId,
    address indexed bettor,
    uint256 betAmount
  );
  event BetClaimed(
    uint256 indexed raceId,
    uint256 betId,
    address indexed bettor,
    uint256 winnings
  );

  constructor(address _racingEventAddress) {
    racingEvent = HorseRacingEvent(_racingEventAddress);
  }

  // function to place a bet
  function placeBet(
    uint256 raceId,
    uint256[] memory horseIds
  ) public payable whenNotPaused {
    require(
      racingEvent.getRaceStatus(raceId),
      "Race not active or already started"
    );

    uint256 betId = _nextBetId.current();

    // store bet
    betsByRace[raceId][betId] = Bet({
      betId: betId,
      raceId: raceId,
      horseIds: horseIds,
      betAmount: msg.value,
      bettor: msg.sender,
      isClaimed: false
    });

    _nextBetId.increment();

    emit BetPlaced(raceId, betId, msg.sender, msg.value);
  }

  // function to claim winnings
  function claimWinnings(uint256 raceId, uint256 betId) public whenNotPaused {
    Bet storage bet = betsByRace[raceId][betId];

    require(bet.bettor != address(0), "Bet does not exist");
    require(racingEvent.isEndedRace(raceId), "Race is not ended");
    require(bet.bettor == msg.sender, "Not the bettor");
    require(!bet.isClaimed, "Winnings already claimed");

    // get race results
    uint256[] memory raceResults = racingEvent.getRaceResults(raceId);

    // Check if the bet is a winning bet
    require(isWinningBet(bet, raceResults), "Bet did not win");

    // calculate winnings
    uint256 winnings = calculateWinnings(bet, raceId);

    uint256 contractBalance = address(this).balance;
    require(winnings <= contractBalance, "Contract does not have enough funds");

    // set bet as claimed
    bet.isClaimed = true;

    // transfer winnings
    payable(msg.sender).transfer(winnings);

    emit BetClaimed(raceId, betId, msg.sender, winnings);
  }

  // check if bet is a winning bet in the correct order
  function isWinningBet(
    Bet memory bet,
    uint256[] memory raceResults
  ) private pure returns (bool) {
    if (bet.horseIds.length != raceResults.length) {
      return false;
    }
    for (uint256 i = 0; i < bet.horseIds.length; i++) {
      if (bet.horseIds[i] != raceResults[i]) {
        return false;
      }
    }
    return true;
  }

  // function to calculate winnings
  function calculateWinnings(
    Bet memory bet,
    uint256 raceId
  ) private view returns (uint256) {
    uint256 winnings = 0;
    // calculate total bet on same selection
    uint256 totalBetOnSameSelection = calculateTotalBetOnSelection(
      bet.horseIds,
      raceId
    );

    // calculate winnings based on popularity
    winnings = calculateWinningsBasedOnPopularity(
      bet.betAmount,
      totalBetOnSameSelection
    );

    return winnings;
  }

  // function to get total bets on a selection
  function calculateTotalBetOnSelection(
    uint256[] memory selection,
    uint256 raceId
  ) private view returns (uint256) {
    uint256 total = 0;
    uint256 betCount = _nextBetId.current();

    for (uint256 i = 0; i < betCount; i++) {
      Bet memory bet = betsByRace[raceId][i];
      if (areSelectionsEqual(selection, bet.horseIds)) {
        total += bet.betAmount;
      }
    }

    return total;
  }

  // function to check if two selections are equal
  function areSelectionsEqual(
    uint256[] memory a,
    uint256[] memory b
  ) private pure returns (bool) {
    if (a.length != b.length) {
      return false;
    }
    for (uint256 i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }

  // function to calculate winnings based on popularity
  function calculateWinningsBasedOnPopularity(
    uint256 betAmount,
    uint256 totalBetOnSameSelection
  ) private pure returns (uint256) {
    if (totalBetOnSameSelection > betAmount) {
      return betAmount + (betAmount / 2); // 1.5x original bet
    } else {
      return betAmount * 2; // duplicate original bet
    }
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
