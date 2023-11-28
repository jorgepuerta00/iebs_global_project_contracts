import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { DerbyBettingHub, HorseRacingEvent, HorsesNFT } from '../typechain';

describe('DerbyBettingHub', () => {
  let horsesNFT: HorsesNFT;
  let derbyBettingHubContract: DerbyBettingHub;
  let horseRacingEventContract: HorseRacingEvent;
  let owner: Signer;
  let player1: Signer;
  let bettot1: Signer;
  let bettot2: Signer;
  let bettot3: Signer;

  beforeEach(async () => {
    [owner, player1, bettot1, bettot2, bettot3] = await ethers.getSigners();

    // Deploy the HorsesNFT contract
    const HorsesNFT = await ethers.getContractFactory('HorsesNFT');
    horsesNFT = await HorsesNFT.deploy();
    await horsesNFT.deployed();

    // Mint 5 tokens to players
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/0');
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/1');
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/2');
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/3');
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/4');
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/5');

    // deploy the HorseRacingEvent contract
    const HorseRacingEventContract = await ethers.getContractFactory('HorseRacingEvent');
    horseRacingEventContract = await HorseRacingEventContract.deploy(horsesNFT.address);
    await horseRacingEventContract.deployed();

    // create race
    const entryFee = ethers.utils.parseEther("0.1");
    const prizeDistribution = [70, 30];
    await horseRacingEventContract.createRace(entryFee, prizeDistribution);

    // register horses
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee });
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 1, { value: entryFee });
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 2, { value: entryFee });
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 3, { value: entryFee });
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 4, { value: entryFee });
    await horseRacingEventContract.connect(player1).enterHorseInRace(0, 5, { value: entryFee });

    // Deploy the HorsesNFT contract
    const DerbyBettingHubContract = await ethers.getContractFactory('DerbyBettingHub');
    derbyBettingHubContract = await DerbyBettingHubContract.deploy(horseRacingEventContract.address);
    await derbyBettingHubContract.deployed();
  });

  describe('placeBet', () => {
    it("should revert if race is not active or already started", async function () {
      // start the race
      await horseRacingEventContract.startRace(0);

      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.be.revertedWith("Race not active or already started");
    });

    it("should successfully place a bet", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);
    });
  });

  describe('claimWinnings', () => {
    it("should revert if bet does not exist", async function () {
      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Bet does not exist");
    });

    it("should revert if not the bettor", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      await expect(derbyBettingHubContract.connect(bettot2).claimWinnings(0, 0))
        .to.be.revertedWith("Not the bettor");
    });

    it("should revert if the race is not ended", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);

      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Race is not ended");
    });

    it("should revert if the bettor didn't win", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Bet did not win");
    });

    it("should revert if winnings already claimed", async function () {
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      betAmount = ethers.utils.parseEther("0.05");

      await expect(derbyBettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      await derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0);

      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Winnings already claimed");
    });

    it("should revert if contract does not have enough funds", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Contract does not have enough funds");
    });

    it("given the bettor bet for a non popular selection then amount won must be 1.5x", async function () {
      // first bettor
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      // second bettor
      betAmount = ethers.utils.parseEther("0.05");

      await expect(derbyBettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      // third bettor
      betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot3).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 2, await bettot3.getAddress(), betAmount);

      // start and end race
      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      // assert
      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.emit(derbyBettingHubContract, "BetClaimed")
        .withArgs(0, 0, await bettot1.getAddress(), ethers.utils.parseEther("0.015"));
    });

    it("given the bettor bet for a popular selection then amount won must be 2.0x", async function () {
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(derbyBettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      betAmount = ethers.utils.parseEther("0.05");

      await expect(derbyBettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(derbyBettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [5, 3]);

      await expect(derbyBettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.emit(derbyBettingHubContract, "BetClaimed")
        .withArgs(0, 0, await bettot1.getAddress(), ethers.utils.parseEther("0.02"));
    });
  });
});
