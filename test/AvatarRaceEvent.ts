import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AvatarRaceEvent, AvatarNFT } from '../typechain';

describe('AvatarRaceEvent', () => {
  let nftToken: AvatarNFT;
  let avatarRaceContract: AvatarRaceEvent;
  let owner: Signer;
  let player1: Signer;
  let player2: Signer;
  let player3: Signer;
  let player4: Signer;
  let player5: Signer;

  beforeEach(async () => {
    [owner, player1, player2, player3, player4, player5] = await ethers.getSigners();

    // Deploy the AvatarNFT contract
    const AvatarNFT = await ethers.getContractFactory('AvatarNFT');
    nftToken = await AvatarNFT.deploy('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6');
    await nftToken.deployed();

    // Mint 5 tokens to players
    await nftToken.connect(owner).safeMint(await player1.getAddress(), true);
    await nftToken.connect(owner).safeMint(await player2.getAddress(), true);
    await nftToken.connect(owner).safeMint(await player3.getAddress(), true);
    await nftToken.connect(owner).safeMint(await player4.getAddress(), true);
    await nftToken.connect(owner).safeMint(await player5.getAddress(), true);

    // deploy the AvatarRaceEvent contract
    const AvatarRaceEvent = await ethers.getContractFactory('AvatarRaceEvent');
    avatarRaceContract = await AvatarRaceEvent.deploy(nftToken.address);
    await avatarRaceContract.deployed();
  });

  describe('createRace', () => {
    it("should revert if total prize distribution exceeds 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [60, 50]; // Total 110%, which is more than 100%

      await expect(
        avatarRaceContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution exceeds 100%");
    });

    it("should revert if total prize distribution less than 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 10]; // Total 90%, 3 winners, which is less than 100%

      await expect(
        avatarRaceContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution less than 100%");
    });

    it("should revert if winners exceed more than 5 allowed", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [20, 20, 20, 20, 10, 10]; // total 100%, 6 winners

      await expect(
        avatarRaceContract.createRace(entryFee, prizeDistribution)
      ).to.be.revertedWith("Max 5 winners allowed");
    });

    it("should successfully create a Race and emit RaceCreated event", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 20]; // Total 100%, 3 winners

      await expect(avatarRaceContract.createRace(entryFee, prizeDistribution))
        .to.emit(avatarRaceContract, "RaceCreated")
        .withArgs(0, entryFee, 3, prizeDistribution);
    });
  });

  describe('enterRacerInRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarRaceContract.createRace(entryFee, prizeDistribution);

      await avatarRaceContract.connect(player1).enterRacerInRace(0, 0, { value: entryFee });
      await avatarRaceContract.connect(player2).enterRacerInRace(0, 1, { value: entryFee });
      await avatarRaceContract.connect(player3).enterRacerInRace(0, 2, { value: entryFee });
      await avatarRaceContract.connect(player4).enterRacerInRace(0, 3, { value: entryFee });
      await avatarRaceContract.connect(player5).enterRacerInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race not active or already started", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      // start the Race
      await avatarRaceContract.startMatch(0);

      await expect(
        avatarRaceContract.connect(player1).enterRacerInRace(0, 0, { value: entryFee })
      ).to.emit(avatarRaceContract, "RacerEnteredMatch")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if Race owner is not the player", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player6.getAddress(), true);

      await expect(
        avatarRaceContract.connect(player6).enterRacerInRace(0, 0, { value: entryFee })
      ).to.emit(avatarRaceContract, "RacerEnteredMatch")
        .to.be.revertedWith("Not owner");
    });

    it("should revert if entry fee is not correct", async function () {
      const entryFee = ethers.utils.parseEther("0.2");

      await expect(
        avatarRaceContract.connect(player1).enterRacerInRace(0, 0, { value: entryFee })
      ).to.emit(avatarRaceContract, "RacerEnteredMatch")
        .to.be.revertedWith("Incorrect entry fee");
    });

    it("should revert if max participants exceeded", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      // create 20 players dinamically using for loop
      for (let i = 5; i < 20; i++) {
        let player: Signer;
        [player] = await ethers.getSigners();

        await nftToken.connect(owner).safeMint(await player.getAddress(), true);
        await avatarRaceContract.connect(player).enterRacerInRace(0, i, { value: entryFee });
      }

      let player20: Signer;
      [player20] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player20.getAddress(), true);

      await expect(
        avatarRaceContract.connect(player20).enterRacerInRace(0, 20, { value: entryFee })
      ).to.emit(avatarRaceContract, "RacerEnteredMatch")
        .to.be.revertedWith("Max participants exceeded");
    });

    it("should allow a Race to enter an active Race with correct conditions", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player6.getAddress(), true);

      await expect(
        avatarRaceContract.connect(player6).enterRacerInRace(0, 5, { value: entryFee })
      ).to.emit(avatarRaceContract, "RacerEnteredMatch")
        .withArgs(0, await player6.getAddress(), 5);
    });
  });

  describe('startMatch', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarRaceContract.createRace(entryFee, prizeDistribution);

      await avatarRaceContract.connect(player1).enterRacerInRace(0, 0, { value: entryFee });
      await avatarRaceContract.connect(player2).enterRacerInRace(0, 1, { value: entryFee });
      await avatarRaceContract.connect(player3).enterRacerInRace(0, 2, { value: entryFee });
      await avatarRaceContract.connect(player4).enterRacerInRace(0, 3, { value: entryFee });
      await avatarRaceContract.connect(player5).enterRacerInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race already started", async function () {
      await avatarRaceContract.startMatch(0);

      await expect(
        avatarRaceContract.startMatch(0)
      ).to.emit(avatarRaceContract, "MatchStarted")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if Race not active", async function () {
      await avatarRaceContract.startMatch(0);
      await avatarRaceContract.endMatch(0, [0]);

      await expect(
        avatarRaceContract.startMatch(0)
      ).to.emit(avatarRaceContract, "MatchStarted")
        .to.be.revertedWith("Race not active or already started");
    });

    it("should revert if Race already started", async function () {
      await expect(
        avatarRaceContract.startMatch(0)
      ).to.emit(avatarRaceContract, "MatchStarted")
        .withArgs(0);
    });
  });

  describe('endRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarRaceContract.createRace(entryFee, prizeDistribution);

      await avatarRaceContract.connect(player1).enterRacerInRace(0, 0, { value: entryFee });
      await avatarRaceContract.connect(player2).enterRacerInRace(0, 1, { value: entryFee });
      await avatarRaceContract.connect(player3).enterRacerInRace(0, 2, { value: entryFee });
      await avatarRaceContract.connect(player4).enterRacerInRace(0, 3, { value: entryFee });
      await avatarRaceContract.connect(player5).enterRacerInRace(0, 4, { value: entryFee });
    });

    it("should revert if Race not started", async function () {
      await expect(
        avatarRaceContract.endMatch(0, [0])
      ).to.emit(avatarRaceContract, "MatchEnded")
        .to.be.revertedWith("Race not started");
    });

    it("should revert if Race not started", async function () {
      await avatarRaceContract.startMatch(0);

      await expect(
        avatarRaceContract.endMatch(0, [0, 1, 2, 3, 4])
      ).to.emit(avatarRaceContract, "MatchEnded")
        .to.be.revertedWith("Incorrect number of winners");
    });

    it("should successfully finish a Race", async function () {
      await avatarRaceContract.startMatch(0);

      await expect(
        avatarRaceContract.endMatch(0, [0])
      ).to.emit(avatarRaceContract, "MatchEnded")
        .withArgs(0, [0]);
    });
  });
});
