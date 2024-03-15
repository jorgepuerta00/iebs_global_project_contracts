import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AvatarSmashEvent, AvatarNFT } from '../typechain';

describe('AvatarSmashEvent', () => {
  let nftToken: AvatarNFT;
  let avatarSmashContract: AvatarSmashEvent;
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
    await nftToken.connect(owner).safeMint(await player1.getAddress());
    await nftToken.connect(owner).safeMint(await player2.getAddress());
    await nftToken.connect(owner).safeMint(await player3.getAddress());
    await nftToken.connect(owner).safeMint(await player4.getAddress());
    await nftToken.connect(owner).safeMint(await player5.getAddress());

    // deploy the AvatarSmashEvent contract
    const AvatarSmashEvent = await ethers.getContractFactory('AvatarSmashEvent');
    avatarSmashContract = await AvatarSmashEvent.deploy(nftToken.address);
    await avatarSmashContract.deployed();
  });

  describe('createFight', () => {
    it("should revert if total prize distribution exceeds 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [60, 50]; // Total 110%, which is more than 100%

      await expect(
        avatarSmashContract.createFight(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution exceeds 100%");
    });

    it("should revert if total prize distribution less than 100%", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 10]; // Total 90%, 3 winners, which is less than 100%

      await expect(
        avatarSmashContract.createFight(entryFee, prizeDistribution)
      ).to.be.revertedWith("Total distribution less than 100%");
    });

    it("should revert if winners exceed more than 5 allowed", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [20, 20, 20, 20, 10, 10]; // total 100%, 6 winners

      await expect(
        avatarSmashContract.createFight(entryFee, prizeDistribution)
      ).to.be.revertedWith("Max 5 winners allowed");
    });

    it("should successfully create a fight and emit FightCreated event", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [50, 30, 20]; // Total 100%, 3 winners

      await expect(avatarSmashContract.createFight(entryFee, prizeDistribution))
        .to.emit(avatarSmashContract, "FightCreated")
        .withArgs(0, entryFee, 3, prizeDistribution);
    });
  });

  describe('enterFighterInFight', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarSmashContract.createFight(entryFee, prizeDistribution);

      await avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee });
      await avatarSmashContract.connect(player2).enterFighterInFight(0, 1, { value: entryFee });
      await avatarSmashContract.connect(player3).enterFighterInFight(0, 2, { value: entryFee });
      await avatarSmashContract.connect(player4).enterFighterInFight(0, 3, { value: entryFee });
      await avatarSmashContract.connect(player5).enterFighterInFight(0, 4, { value: entryFee });
    });

    it("should revert if Fight not active or already started", async function () {
      const entryFee = ethers.utils.parseEther("0.1");
      // start the fight
      await avatarSmashContract.startMatch(0);

      await expect(
        avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee })
      ).to.emit(avatarSmashContract, "FighterEnteredMatch")
        .to.be.revertedWith("Fight not active or already started");
    });

    it("should revert if fight owner is not the player", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player6.getAddress());

      await expect(
        avatarSmashContract.connect(player6).enterFighterInFight(0, 0, { value: entryFee })
      ).to.emit(avatarSmashContract, "FighterEnteredMatch")
        .to.be.revertedWith("Not owner");
    });

    it("should revert if entry fee is not correct", async function () {
      const entryFee = ethers.utils.parseEther("0.2");

      await expect(
        avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee })
      ).to.emit(avatarSmashContract, "FighterEnteredMatch")
        .to.be.revertedWith("Incorrect entry fee");
    });

    it("should revert if max participants exceeded", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      // create 20 players dinamically using for loop
      for (let i = 5; i < 20; i++) {
        let player: Signer;
        [player] = await ethers.getSigners();

        await nftToken.connect(owner).safeMint(await player.getAddress());
        await avatarSmashContract.connect(player).enterFighterInFight(0, i, { value: entryFee });
      }

      let player20: Signer;
      [player20] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player20.getAddress());

      await expect(
        avatarSmashContract.connect(player20).enterFighterInFight(0, 20, { value: entryFee })
      ).to.emit(avatarSmashContract, "FighterEnteredMatch")
        .to.be.revertedWith("Max participants exceeded");
    });

    it("should allow a fight to enter an active fight with correct conditions", async function () {
      const entryFee = ethers.utils.parseEther("0.1");

      let player6: Signer;
      [player6] = await ethers.getSigners();

      await nftToken.connect(owner).safeMint(await player6.getAddress());

      await expect(
        avatarSmashContract.connect(player6).enterFighterInFight(0, 5, { value: entryFee })
      ).to.emit(avatarSmashContract, "FighterEnteredMatch")
        .withArgs(0, await player6.getAddress(), 5);
    });
  });

  describe('startMatch', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarSmashContract.createFight(entryFee, prizeDistribution);

      await avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee });
      await avatarSmashContract.connect(player2).enterFighterInFight(0, 1, { value: entryFee });
      await avatarSmashContract.connect(player3).enterFighterInFight(0, 2, { value: entryFee });
      await avatarSmashContract.connect(player4).enterFighterInFight(0, 3, { value: entryFee });
      await avatarSmashContract.connect(player5).enterFighterInFight(0, 4, { value: entryFee });
    });

    it("should revert if Fight already started", async function () {
      await avatarSmashContract.startMatch(0);

      await expect(
        avatarSmashContract.startMatch(0)
      ).to.emit(avatarSmashContract, "MatchStarted")
        .to.be.revertedWith("Fight not active or already started");
    });

    it("should revert if Fight not active", async function () {
      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [0]);

      await expect(
        avatarSmashContract.startMatch(0)
      ).to.emit(avatarSmashContract, "MatchStarted")
        .to.be.revertedWith("Fight not active or already started");
    });

    it("should revert if Fight already started", async function () {
      await expect(
        avatarSmashContract.startMatch(0)
      ).to.emit(avatarSmashContract, "MatchStarted")
        .withArgs(0);
    });
  });

  describe('endRace', () => {
    beforeEach(async () => {
      const entryFee = ethers.utils.parseEther("0.1");
      const prizeDistribution = [100];

      await avatarSmashContract.createFight(entryFee, prizeDistribution);

      await avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee });
      await avatarSmashContract.connect(player2).enterFighterInFight(0, 1, { value: entryFee });
      await avatarSmashContract.connect(player3).enterFighterInFight(0, 2, { value: entryFee });
      await avatarSmashContract.connect(player4).enterFighterInFight(0, 3, { value: entryFee });
      await avatarSmashContract.connect(player5).enterFighterInFight(0, 4, { value: entryFee });
    });

    it("should revert if Fight not started", async function () {
      await expect(
        avatarSmashContract.endMatch(0, [0])
      ).to.emit(avatarSmashContract, "MatchEnded")
        .to.be.revertedWith("Fight not started");
    });

    it("should revert if Fight not started", async function () {
      await avatarSmashContract.startMatch(0);

      await expect(
        avatarSmashContract.endMatch(0, [0, 1, 2, 3, 4])
      ).to.emit(avatarSmashContract, "MatchEnded")
        .to.be.revertedWith("Incorrect number of winners");
    });

    it("should successfully finish a fight", async function () {
      await avatarSmashContract.startMatch(0);

      await expect(
        avatarSmashContract.endMatch(0, [0])
      ).to.emit(avatarSmashContract, "MatchEnded")
        .withArgs(0, [0]);
    });
  });
});
