// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./../avatarMarket/AvatarNFT.sol";

contract AvatarSmashEvent is Ownable, Pausable {
  AvatarNFT public nftToken;

  using Counters for Counters.Counter;
  Counters.Counter private _nextMatchId;

  struct Fight {
    uint256 fightId;
    uint256 entryFee;
    uint256 totalPrizePool;
    uint256 numWinners;
    uint256[] prizeDistribution;
    uint256 minParticipants;
    bool active;
    bool started;
    bool ended;
    uint256[] winningFighterIds;
    uint256[] participants;
  }

  mapping(uint256 => Fight) public fights;

  event FightCreated(
    uint256 fightId,
    uint256 entryFee,
    uint256 numWinners,
    uint256[] prizeDistribution
  );
  event FighterEnteredMatch(
    uint256 fightId,
    address avatarOwner,
    uint256 nftId
  );
  event MatchStarted(uint256 fightId);
  event MatchEnded(uint256 fightId, uint256[] winningIds);

  constructor(address _nftContractAddress) {
    nftToken = AvatarNFT(_nftContractAddress);
  }

  // function to create a fight
  function createFight(
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

    uint256 fightId = _nextMatchId.current();

    fights[fightId] = Fight({
      fightId: fightId,
      entryFee: _entryFee,
      totalPrizePool: 0,
      numWinners: numWinners,
      prizeDistribution: _prizeDistribution,
      minParticipants: numWinners * 3,
      active: true,
      started: false,
      ended: false,
      winningFighterIds: new uint256[](0),
      participants: new uint256[](0)
    });

    emit FightCreated(fightId, _entryFee, numWinners, _prizeDistribution);

    _nextMatchId.increment();
  }

  // function to register a nft in a fight
  function enterFighterInFight(
    uint256 _fightId,
    uint256 _nftId
  ) public payable whenNotPaused {
    Fight storage fight = fights[_fightId];
    require(getMatchStatus(_fightId), "Fight not active or already started");
    require(getOwnerOfAvatar(_nftId) == msg.sender, "Not owner");
    require(msg.value == fight.entryFee, "Incorrect entry fee");
    require(fight.participants.length < 20, "Max participants exceeded");

    fight.totalPrizePool += msg.value;

    fight.participants.push(_nftId);

    emit FighterEnteredMatch(_fightId, msg.sender, _nftId);
  }

  // function to start a fight
  function startMatch(uint256 _fightId) public onlyOwner whenNotPaused {
    Fight storage fight = fights[_fightId];
    require(getMatchStatus(_fightId), "Fight not active or already started");
    require(
      fight.participants.length >= fight.minParticipants,
      "Not enough participants"
    );

    fight.started = true;
    emit MatchStarted(_fightId);
  }

  // function to finish a fight
  function endMatch(
    uint256 _fightId,
    uint256[] memory _winningIds
  ) public onlyOwner whenNotPaused {
    Fight storage fight = fights[_fightId];
    require(fight.started, "Fight not started");
    require(
      _winningIds.length == fight.numWinners,
      "Incorrect number of winners"
    );

    fight.active = false;
    fight.started = false;
    fight.ended = true;
    fight.winningFighterIds = _winningIds;

    // pizePool = 80% of total prize pool
    uint256 prizePool = (fight.totalPrizePool * 80) / 100;

    for (uint256 i = 0; i < fight.numWinners; i++) {
      // calculate winner prize
      uint256 winnerPrize = (prizePool * fight.prizeDistribution[i]) / 100;
      address winnerOwner = getOwnerOfAvatar(_winningIds[i]);
      require(winnerOwner != address(0), "Winner not found in fight");

      // transfer winner prize
      payable(winnerOwner).transfer(winnerPrize);
    }

    emit MatchEnded(_fightId, _winningIds);
  }

  // function to get nft token owner
  function getOwnerOfAvatar(
    uint256 _nftId
  ) private view whenNotPaused returns (address) {
    return nftToken.ownerOf(_nftId);
  }

  // function to get winning
  function getRaceResults(
    uint256 _fightId
  ) public view whenNotPaused returns (uint256[] memory) {
    require(fights[_fightId].ended, "Fight has not ended yet");

    return fights[_fightId].winningFighterIds;
  }

  // function to get if the
  function getMatchStatus(
    uint256 _fightId
  ) public view whenNotPaused returns (bool active) {
    require(_fightId < _nextMatchId.current(), "Fight does not exist");

    Fight storage fight = fights[_fightId];
    return fight.active && !fight.started;
  }

  // function to get if the fight was ended
  function isEndedMatch(
    uint256 _fightId
  ) public view whenNotPaused returns (bool active) {
    require(_fightId < _nextMatchId.current(), "Fight does not exist");

    Fight storage fight = fights[_fightId];
    return fight.ended;
  }

  // function to get the totalPrizePool from a fight
  function getTotalPrizePoolRace(
    uint256 _fightId
  ) private view whenNotPaused returns (uint256 totalPrizePool) {
    require(_fightId < _nextMatchId.current(), "Fight does not exist");

    Fight storage fight = fights[_fightId];
    return fight.totalPrizePool;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
