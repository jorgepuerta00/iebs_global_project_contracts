// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./../avatarMarket/AvatarNFT.sol";

contract AvatarRaceEvent is Ownable, Pausable {
  AvatarNFT public nftToken;

  using Counters for Counters.Counter;
  Counters.Counter private _nextMatchId;

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
    uint256[] winningRacerIds;
    uint256[] participants;
  }

  mapping(uint256 => Race) public races;

  event RaceCreated(
    uint256 raceId,
    uint256 entryFee,
    uint256 numWinners,
    uint256[] prizeDistribution
  );
  event RacerEnteredMatch(uint256 raceId, address avatarOwner, uint256 nftId);
  event MatchStarted(uint256 raceId);
  event MatchEnded(uint256 raceId, uint256[] winningIds);

  constructor(address _nftContractAddress) {
    nftToken = AvatarNFT(_nftContractAddress);
  }

  // function to create a race
  function createRace(
    uint256 _entryFee,
    uint256[] memory _prizeDistribution
  ) public onlyOwner whenNotPaused {
    uint256 totalPercentage;
    uint numWinners = _prizeDistribution.length;
    for (uint256 i = 0; i < _prizeDistribution.length; i++) {
      totalPercentage += _prizeDistribution[i];
    }
    require(totalPercentage <= 100, "Total distribution exceeds 100%");
    require(totalPercentage >= 100, "Total distribution less than 100%");
    require(numWinners <= 5, "Max 5 winners allowed");

    uint256 raceId = _nextMatchId.current();

    races[raceId] = Race({
      raceId: raceId,
      entryFee: _entryFee,
      totalPrizePool: 0,
      numWinners: numWinners,
      prizeDistribution: _prizeDistribution,
      minParticipants: numWinners * 3,
      active: true,
      started: false,
      ended: false,
      winningRacerIds: new uint256[](0),
      participants: new uint256[](0)
    });

    emit RaceCreated(raceId, _entryFee, numWinners, _prizeDistribution);

    _nextMatchId.increment();
  }

  // function to register a nft in a race
  function enterRacerInRace(
    uint256 _raceId,
    uint256 _nftId
  ) public payable whenNotPaused {
    Race storage race = races[_raceId];
    require(getMatchStatus(_raceId), "Race not active or already started");
    require(getOwnerOfAvatar(_nftId) == msg.sender, "Not owner");
    require(msg.value == race.entryFee, "Incorrect entry fee");
    require(race.participants.length < 20, "Max participants exceeded");

    race.totalPrizePool += msg.value;

    race.participants.push(_nftId);

    emit RacerEnteredMatch(_raceId, msg.sender, _nftId);
  }

  // function to start a race
  function startMatch(uint256 _raceId) public onlyOwner whenNotPaused {
    Race storage race = races[_raceId];
    require(getMatchStatus(_raceId), "Race not active or already started");
    require(
      race.participants.length >= race.minParticipants,
      "Not enough participants"
    );

    race.started = true;
    emit MatchStarted(_raceId);
  }

  // function to finish a race
  function endMatch(
    uint256 _raceId,
    uint256[] memory _winningIds
  ) public onlyOwner whenNotPaused {
    Race storage race = races[_raceId];
    require(race.started, "Race not started");
    require(
      _winningIds.length == race.numWinners,
      "Incorrect number of winners"
    );

    race.active = false;
    race.started = false;
    race.ended = true;
    race.winningRacerIds = _winningIds;

    // pizePool = 80% of total prize pool
    uint256 prizePool = (race.totalPrizePool * 80) / 100;

    for (uint256 i = 0; i < race.numWinners; i++) {
      // calculate winner prize
      uint256 winnerPrize = (prizePool * race.prizeDistribution[i]) / 100;
      address winnerOwner = getOwnerOfAvatar(_winningIds[i]);
      require(winnerOwner != address(0), "Winner not found in race");

      // transfer winner prize
      payable(winnerOwner).transfer(winnerPrize);
    }

    emit MatchEnded(_raceId, _winningIds);
  }

  // function to get nft token owner
  function getOwnerOfAvatar(
    uint256 _nftId
  ) private view whenNotPaused returns (address) {
    return nftToken.ownerOf(_nftId);
  }

  // function to get winning
  function getRaceResults(
    uint256 _raceId
  ) public view whenNotPaused returns (uint256[] memory) {
    require(races[_raceId].ended, "Race has not ended yet");

    return races[_raceId].winningRacerIds;
  }

  // function to get if the
  function getMatchStatus(
    uint256 _raceId
  ) public view whenNotPaused returns (bool active) {
    require(_raceId < _nextMatchId.current(), "Race does not exist");

    Race storage race = races[_raceId];
    return race.active && !race.started;
  }

  // function to get if the race was ended
  function isEndedMatch(
    uint256 _raceId
  ) public view whenNotPaused returns (bool active) {
    require(_raceId < _nextMatchId.current(), "Race does not exist");

    Race storage race = races[_raceId];
    return race.ended;
  }

  // function to get the totalPrizePool from a race
  function getTotalPrizePoolRace(
    uint256 _raceId
  ) private view whenNotPaused returns (uint256 totalPrizePool) {
    require(_raceId < _nextMatchId.current(), "Race does not exist");

    Race storage race = races[_raceId];
    return race.totalPrizePool;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
