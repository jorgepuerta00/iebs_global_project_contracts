// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./../HorsesNFT.sol";

contract HorseRacingEvent is Ownable {
  HorsesNFT public horsesNFTContract;

  struct Race {
    uint256 raceId;
    uint256 entryFee;
    uint256 totalPrizePool;
    uint256 numWinners;
    uint256[] prizeDistribution;
    uint256 minParticipants;
    bool raceActive;
    bool raceStarted;
    uint256[] winningHorseIds;
    uint256[] participants;
  }

  mapping(uint256 => Race) public races;
  uint256 public nextRaceId = 1;

  event RaceCreated(
    uint256 raceId,
    uint256 entryFee,
    uint256 numWinners,
    uint256[] prizeDistribution
  );
  event HorseEnteredRace(uint256 raceId, address horseOwner, uint256 horseId);
  event RaceStarted(uint256 raceId);
  event RaceEnded(uint256 raceId, uint256[] winningHorseId);
  event HorseWithdrawn(uint256 raceId, address horseOwner, uint256 horseId);

  constructor(address _horsesNFTAddress) {
    horsesNFTContract = HorsesNFT(_horsesNFTAddress);
  }

  // function to create a race
  function createRace(
    uint256 entryFee,
    uint256 numWinners,
    uint256[] memory prizeDistribution
  ) public onlyOwner {
    uint256 totalPercentage;
    uint prizes = prizeDistribution.length;
    for (uint256 i = 0; i < prizes; i++) {
      totalPercentage += prizeDistribution[i];
    }
    require(totalPercentage <= 100, "Total distribution exceeds 100%");
    require(prizes == numWinners, "Distribution must match number of winners");
    require(numWinners * 2 <= 20, "Max participants exceeded");
    require(numWinners * 2 >= 5, "Min participants not met");

    races[nextRaceId] = Race({
      raceId: nextRaceId,
      entryFee: entryFee,
      totalPrizePool: 0,
      numWinners: numWinners,
      prizeDistribution: prizeDistribution,
      minParticipants: numWinners * 2,
      raceActive: true,
      raceStarted: false,
      winningHorseIds: new uint256[](0),
      participants: new uint256[](0)
    });

    emit RaceCreated(nextRaceId, entryFee, numWinners, prizeDistribution);
    nextRaceId++;
  }

  // function to register a horse in a race
  function enterHorseInRace(uint256 raceId, uint256 horseId) public payable {
    Race storage race = races[raceId];
    require(
      race.raceActive && !race.raceStarted,
      "Race not active or already started"
    );
    require(
      horsesNFTContract.ownerOf(horseId) == msg.sender,
      "Not the horse owner"
    );
    require(msg.value == race.entryFee, "Incorrect entry fee");

    race.totalPrizePool += msg.value;

    race.participants.push(horseId);

    emit HorseEnteredRace(raceId, msg.sender, horseId);
  }

  // function to start a race
  function startRace(uint256 raceId) public onlyOwner {
    Race storage race = races[raceId];
    require(
      race.raceActive && !race.raceStarted,
      "Race not active or already started"
    );
    require(
      race.participants.length >= race.minParticipants,
      "Not enough participants"
    );

    race.raceStarted = true;
    emit RaceStarted(raceId);
  }

  // function to finish a race
  function endRace(
    uint256 raceId,
    uint256[] memory winningHorseIds
  ) public onlyOwner {
    Race storage race = races[raceId];
    require(race.raceStarted, "Race not started");
    require(
      winningHorseIds.length == race.numWinners,
      "Incorrect number of winners"
    );
    require(
      race.participants.length >= race.minParticipants,
      "Not enough participants"
    );

    race.raceActive = false;
    race.raceStarted = false;
    race.winningHorseIds = winningHorseIds;

    // pizePool = 80% of total prize pool
    uint256 prizePool = (race.totalPrizePool * 80) / 100;

    for (uint256 i = 0; i < race.numWinners; i++) {
      // calculate winner prize
      uint256 winnerPrize = (prizePool * race.prizeDistribution[i]) / 100;
      address winnerOwner = getOwnerOfHorse(winningHorseIds[i]);
      require(winnerOwner != address(0), "Winner not found in race");

      // transfer winner prize
      payable(winnerOwner).transfer(winnerPrize);
    }

    emit RaceEnded(raceId, winningHorseIds);
  }

  // function to get horse's owner
  function getOwnerOfHorse(uint256 horseId) internal view returns (address) {
    return horsesNFTContract.ownerOf(horseId);
  }

  // function to get winning horses
  function getRaceResults(
    uint256 raceId
  ) public view returns (uint256[] memory) {
    require(races[raceId].raceActive, "Race has not ended yet");

    return races[raceId].winningHorseIds;
  }

  // function to get race status
  function getIsActiveRace(
    uint256 raceId
  ) public view returns (bool raceActive) {
    require(raceId < nextRaceId, "Race does not exist");

    Race storage race = races[raceId];
    return race.raceActive;
  }
}
