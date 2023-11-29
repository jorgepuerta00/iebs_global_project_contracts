import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { HorseRacingEvent, HorsesNFT } from '../typechain';

describe('HorseRacingEvent', () => {
  let horsesNFT: HorsesNFT;
  let horseRacingEventContract: HorseRacingEvent;
  let owner: Signer;
  let player1: Signer;
  let player2: Signer;
  let player3: Signer;
  let player4: Signer;
  let player5: Signer;

  beforeEach(async () => {
    [owner, player1, player2, player3, player4, player5] = await ethers.getSigners();

    // Deploy the HorsesNFT contract
    const HorsesNFT = await ethers.getContractFactory('HorsesNFT');
    horsesNFT = await HorsesNFT.deploy();
    await horsesNFT.deployed();

    // Mint 5 tokens to players
    await horsesNFT.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/0');
    await horsesNFT.connect(owner).safeMint(await player2.getAddress(), 'https://example.com/horse/1');
    await horsesNFT.connect(owner).safeMint(await player3.getAddress(), 'https://example.com/horse/2');
    await horsesNFT.connect(owner).safeMint(await player4.getAddress(), 'https://example.com/horse/3');
    await horsesNFT.connect(owner).safeMint(await player5.getAddress(), 'https://example.com/horse/4');

    // deploy the HorseRacingEvent contract
    const HorseRacingEventContract = await ethers.getContractFactory('HorseRacingEvent');
    horseRacingEventContract = await HorseRacingEventContract.deploy(horsesNFT.address);
    await horseRacingEventContract.deployed();
  });

  describe('createRace', () => {
    it("should revert if total prize distribution exceeds 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [60, 50]; // Total 110%, which is more than 100%

      await expect(
        horseRacingEventContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution exceeds 100%");
    });

    it("should revert if total prize distribution less than 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 10]; // Total 90%, 3 winners, which is less than 100%

      await expect(
        horseRacingEventContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution less than 100%");
    });

    it("should revert if winners exceed more than 5 allowed", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [20, 20, 20, 20, 10, 10]; // total 100%, 6 winners

      await expect(
        horseRacingEventContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Max 5 winners allowed");
    });

    it("should successfully create a race and emit RaceCreated event", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 20]; // Total 100%, 3 winners

      await expect(horseRacingEventContract.createRace(entryFee, prizeDistribution))
        .to.emit(horseRacingEventContract, "RaceCreated")
        .withArgs(0, entryFee, 3, prizeDistribution);
    });
  });

  describe('enterHorseInRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await horseRacingEventContract.createRace(entryFee, prizeDistribution);

      await horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee });
      await horseRacingEventContract.connect(player2).enterHorseInRace(0, 1, { value: entryFee });
      await horseRacingEventContract.connect(player3).enterHorseInRace(0, 2, { value: entryFee });
      await horseRacingEventContract.connect(player4).enterHorseInRace(0, 3, { value: entryFee });
      await horseRacingEventContract.connect(player5).enterHorseInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race not active or already started", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      // start the race
      await horseRacingEventContract.startRace(0);

      await expect(
        horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee })
      ).to.emit(horseRacingEventContract, "HorseEnteredRace")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if horse owner is not the player", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await horsesNFT.connect(owner).safeMint(await player6.getAddress(), 'https://example.com/horse/6');

      await expect(
        horseRacingEventContract.connect(player6).enterHorseInRace(0, 0, { value: entryFee })
      ).to.emit(horseRacingEventContract, "HorseEnteredRace")
        .to.be.revertedWith("Not the horse owner");
    });

    it("should revert if entry fee is not correct", async function () {
      const entryFee = ethers.utils.parseEther("0.2");

      await expect(
        horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee })
      ).to.emit(horseRacingEventContract, "HorseEnteredRace")
        .to.be.revertedWith("Incorrect entry fee");
    });

    it("should revert if max participants exceeded", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      // create 20 players dinamically using for loop
      for (let i = 5; i < 20; i++) {
        let player: Signer;
        [player] = await ethers.getSigners();

        await horsesNFT.connect(owner).safeMint(await player.getAddress(), `https://example.com/horse/${i}`);
        await horseRacingEventContract.connect(player).enterHorseInRace(0, i, { value: entryFee });
      }

      let player20: Signer;
      [player20] = await ethers.getSigners();

      await horsesNFT.connect(owner).safeMint(await player20.getAddress(), 'https://example.com/horse/20');

      await expect(
        horseRacingEventContract.connect(player20).enterHorseInRace(0, 20, { value: entryFee })
      ).to.emit(horseRacingEventContract, "HorseEnteredRace")
        .to.be.revertedWith("Max participants exceeded");
    });

    it("should allow a horse to enter an active race with correct conditions", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await horsesNFT.connect(owner).safeMint(await player6.getAddress(), 'https://example.com/horse/5');

      await expect(
        horseRacingEventContract.connect(player6).enterHorseInRace(0, 5, { value: entryFee })
      ).to.emit(horseRacingEventContract, "HorseEnteredRace")
        .withArgs(0, await player6.getAddress(), 5);
    });
  });

  describe('startRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await horseRacingEventContract.createRace(entryFee, prizeDistribution);

      await horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee });
      await horseRacingEventContract.connect(player2).enterHorseInRace(0, 1, { value: entryFee });
      await horseRacingEventContract.connect(player3).enterHorseInRace(0, 2, { value: entryFee });
      await horseRacingEventContract.connect(player4).enterHorseInRace(0, 3, { value: entryFee });
      await horseRacingEventContract.connect(player5).enterHorseInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race already started", async function () {
      await horseRacingEventContract.startRace(0);

      await expect(
        horseRacingEventContract.startRace(0)
      ).to.emit(horseRacingEventContract, "RaceStarted")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if Race not active", async function () {
      await horseRacingEventContract.startRace(0);
      await horseRacingEventContract.endRace(0, [0]);

      await expect(
        horseRacingEventContract.startRace(0)
      ).to.emit(horseRacingEventContract, "RaceStarted")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if Race already started", async function () {
      await expect(
        horseRacingEventContract.startRace(0)
      ).to.emit(horseRacingEventContract, "RaceStarted")
        .withArgs(0);
    });
  });

  describe('endRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await horseRacingEventContract.createRace(entryFee, prizeDistribution);

      await horseRacingEventContract.connect(player1).enterHorseInRace(0, 0, { value: entryFee });
      await horseRacingEventContract.connect(player2).enterHorseInRace(0, 1, { value: entryFee });
      await horseRacingEventContract.connect(player3).enterHorseInRace(0, 2, { value: entryFee });
      await horseRacingEventContract.connect(player4).enterHorseInRace(0, 3, { value: entryFee });
      await horseRacingEventContract.connect(player5).enterHorseInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race not started", async function () {
      await expect(
        horseRacingEventContract.endRace(0, [0])
      ).to.emit(horseRacingEventContract, "RaceEnded")
        .to.be.revertedWith("Race not started");
    });

    it("should revert if Race not started", async function () {
      await horseRacingEventContract.startRace(0);

      await expect(
        horseRacingEventContract.endRace(0, [0, 1, 2, 3, 4])
      ).to.emit(horseRacingEventContract, "RaceEnded")
        .to.be.revertedWith("Incorrect number of winners");
    });

    it("should successfully finish a race", async function () {
      await horseRacingEventContract.startRace(0);

      await expect(
        horseRacingEventContract.endRace(0, [0])
      ).to.emit(horseRacingEventContract, "RaceEnded")
        .withArgs(0, [0]);
    });
  });
});
