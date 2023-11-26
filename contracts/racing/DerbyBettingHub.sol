// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HorseRacingEvent.sol";

contract DerbyBettingHub is Ownable {
  HorseRacingEvent public racingEvent;

  struct Bet {
    uint256 raceId;
    uint256[] horseIds;
    uint256 betAmount;
    address bettor;
    bool isClaimed;
  }

  mapping(uint256 => Bet[]) public betsByRace;

  event BetPlaced(
    uint256 indexed raceId,
    address indexed bettor,
    uint256 betAmount
  );
  event BetClaimed(
    uint256 indexed raceId,
    address indexed bettor,
    uint256 winnings
  );

  constructor(address _racingEventAddress) {
    racingEvent = HorseRacingEvent(_racingEventAddress);
  }

  // function to place a bet
  function placeBet(uint256 raceId, uint256[] memory horseIds) public payable {
    require(racingEvent.getIsActiveRace(raceId), "Race is not active");

    // store bet
    betsByRace[raceId].push(
      Bet({
        raceId: raceId,
        horseIds: horseIds,
        betAmount: msg.value,
        bettor: msg.sender,
        isClaimed: false
      })
    );

    emit BetPlaced(raceId, msg.sender, msg.value);
  }

  // function to claim winnings
  function claimWinnings(uint256 raceId, uint256 betIndex) public {
    Bet storage bet = betsByRace[raceId][betIndex];

    require(bet.bettor == msg.sender, "Not the bettor");
    require(!bet.isClaimed, "Winnings already claimed");

    // get race results
    uint256[] memory raceResults = racingEvent.getRaceResults(raceId);

    // calculate winnings
    uint256 winnings = calculateWinnings(bet, raceResults, raceId);

    // set bet as claimed
    bet.isClaimed = true;

    // transfer winnings
    payable(msg.sender).transfer(winnings);

    emit BetClaimed(raceId, msg.sender, winnings);
  }

  // function to calculate winnings
  function calculateWinnings(
    Bet memory bet,
    uint256[] memory raceResults,
    uint256 raceId
  ) private view returns (uint256) {
    uint256 winnings = 0;

    // check if bettor has bet on all winning horses
    if (bet.horseIds.length == raceResults.length) {
      bool isCorrect = true;
      for (uint256 i = 0; i < bet.horseIds.length; i++) {
        if (bet.horseIds[i] != raceResults[i]) {
          isCorrect = false;
          break;
        }
      }

      // if bettor has bet on all winning horses, calculate winnings
      if (isCorrect) {
        // calculate total bet on the same selection
        uint256 totalBetOnSameSelection = calculateTotalBetOnSelection(
          bet.horseIds,
          raceId
        );

        // calculate winnings based on popularity
        winnings = calculateWinningsBasedOnPopularity(
          bet.betAmount,
          totalBetOnSameSelection
        );
      }
    }

    return winnings;
  }

  // function to get total bets on a selection
  function calculateTotalBetOnSelection(
    uint256[] memory selection,
    uint256 raceId
  ) private view returns (uint256) {
    uint256 total = 0;
    Bet[] memory bets = betsByRace[raceId];
    for (uint256 i = 0; i < bets.length; i++) {
      if (areSelectionsEqual(bets[i].horseIds, selection)) {
        total += bets[i].betAmount;
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
}
