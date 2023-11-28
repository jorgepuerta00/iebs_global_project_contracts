// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./../HorsesNFT.sol";

contract HorseRacingEvent is Ownable {
  HorsesNFT public horsesNFTContract;

  using Counters for Counters.Counter;
  Counters.Counter private _nextRaceId;

  struct Race {
    uint256 raceId;
    uint256 entryFee;
    uint256 totalPrizePool;
    uint256 numWinners;
    uint256[] prizeDistribution;
    uint256 minParticipants;
    bool active;
    bool started;
    bool ended;
    uint256[] winningHorseIds;
    uint256[] participants;
  }

  mapping(uint256 => Race) public races;

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
    uint256[] memory prizeDistribution
  ) public onlyOwner {
    uint256 totalPercentage;
    uint numWinners = prizeDistribution.length;
    for (uint256 i = 0; i < prizeDistribution.length; i++) {
      totalPercentage += prizeDistribution[i];
    }
    require(totalPercentage <= 100, "Total distribution exceeds 100%");
    require(totalPercentage >= 100, "Total distribution less than 100%");
    require(numWinners <= 5, "Max 5 winners allowed");

    uint256 raceId = _nextRaceId.current();

    races[raceId] = Race({
      raceId: raceId,
      entryFee: entryFee,
      totalPrizePool: 0,
      numWinners: numWinners,
      prizeDistribution: prizeDistribution,
      minParticipants: numWinners * 3,
      active: true,
      started: false,
      ended: false,
      winningHorseIds: new uint256[](0),
      participants: new uint256[](0)
    });

    emit RaceCreated(raceId, entryFee, numWinners, prizeDistribution);

    _nextRaceId.increment();
  }

  // function to register a horse in a race
  function enterHorseInRace(uint256 raceId, uint256 horseId) public payable {
    Race storage race = races[raceId];
    require(getRaceStatus(raceId), "Race not active or already started");
    require(getOwnerOfHorse(horseId) == msg.sender, "Not the horse owner");
    require(msg.value == race.entryFee, "Incorrect entry fee");
    require(race.participants.length < 20, "Max participants exceeded");

    race.totalPrizePool += msg.value;

    race.participants.push(horseId);

    emit HorseEnteredRace(raceId, msg.sender, horseId);
  }

  // function to start a race
  function startRace(uint256 raceId) public onlyOwner {
    Race storage race = races[raceId];
    require(getRaceStatus(raceId), "Race not active or already started");
    require(
      race.participants.length >= race.minParticipants,
      "Not enough participants"
    );

    race.started = true;
    emit RaceStarted(raceId);
  }

  // function to finish a race
  function endRace(
    uint256 raceId,
    uint256[] memory winningHorseIds
  ) public onlyOwner {
    Race storage race = races[raceId];
    require(race.started, "Race not started");
    require(
      winningHorseIds.length == race.numWinners,
      "Incorrect number of winners"
    );

    race.active = false;
    race.started = false;
    race.ended = true;
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
  function getOwnerOfHorse(uint256 horseId) private view returns (address) {
    return horsesNFTContract.ownerOf(horseId);
  }

  // function to get winning horses
  function getRaceResults(
    uint256 raceId
  ) public view returns (uint256[] memory) {
    require(races[raceId].ended, "Race has not ended yet");

    return races[raceId].winningHorseIds;
  }

  // function to get if the
  function getRaceStatus(uint256 raceId) public view returns (bool active) {
    require(raceId < _nextRaceId.current(), "Race does not exist");

    Race storage race = races[raceId];
    return race.active && !race.started;
  }

  // function to get if the race was ended
  function isEndedRace(uint256 raceId) public view returns (bool active) {
    require(raceId < _nextRaceId.current(), "Race does not exist");

    Race storage race = races[raceId];
    return race.ended;
  }

  // function to get the totalPrizePool from a race
  function getTotalPrizePoolRace(
    uint256 raceId
  ) private view returns (uint256 totalPrizePool) {
    require(raceId < _nextRaceId.current(), "Race does not exist");

    Race storage race = races[raceId];
    return race.totalPrizePool;
  }
}
