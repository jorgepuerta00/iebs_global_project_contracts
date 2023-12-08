import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { BettingHub, AvatarSmashEvent, AvatarNFT } from '../typechain';

describe('BettingHub', () => {
  let nftToken: AvatarNFT;
  let bettingHubContract: BettingHub;
  let avatarSmashContract: AvatarSmashEvent;
  let owner: Signer;
  let player1: Signer;
  let bettot1: Signer;
  let bettot2: Signer;
  let bettot3: Signer;

  beforeEach(async () => {
    [owner, player1, bettot1, bettot2, bettot3] = await ethers.getSigners();

    // Deploy the AvatarNFT contract
    const AvatarNFT = await ethers.getContractFactory('AvatarNFT');
    nftToken = await AvatarNFT.deploy();
    await nftToken.deployed();

    // Mint 5 tokens to players
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/0');
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/1');
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/2');
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/3');
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/4');
    await nftToken.connect(owner).safeMint(await player1.getAddress(), 'https://example.com/horse/5');

    // deploy the AvatarSmashEvent contract
    const AvatarSmashEvent = await ethers.getContractFactory('AvatarSmashEvent');
    avatarSmashContract = await AvatarSmashEvent.deploy(nftToken.address);
    await avatarSmashContract.deployed();

    // create race
    const entryFee = ethers.utils.parseEther("0.1");
    const prizeDistribution = [70, 30];
    await avatarSmashContract.createFight(entryFee, prizeDistribution);

    // register horses
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 0, { value: entryFee });
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 1, { value: entryFee });
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 2, { value: entryFee });
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 3, { value: entryFee });
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 4, { value: entryFee });
    await avatarSmashContract.connect(player1).enterFighterInFight(0, 5, { value: entryFee });

    // Deploy the AvatarNFT contract
    const BettingHub = await ethers.getContractFactory('BettingHub');
    bettingHubContract = await BettingHub.deploy(avatarSmashContract.address);
    await bettingHubContract.deployed();
  });

  describe('placeBet', () => {
    it("should revert if race is not active or already started", async function () {
      // start the race
      await avatarSmashContract.startMatch(0);

      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.be.revertedWith("Race not active or already started");
    });

    it("should successfully place a bet", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);
    });
  });

  describe('claimWinnings', () => {
    it("should revert if bet does not exist", async function () {
      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Bet does not exist");
    });

    it("should revert if not the bettor", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      await expect(bettingHubContract.connect(bettot2).claimWinnings(0, 0))
        .to.be.revertedWith("Not the bettor");
    });

    it("should revert if the race is not ended", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);

      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Race is not ended");
    });

    it("should revert if the bettor didn't win", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Bet did not win");
    });

    it("should revert if winnings already claimed", async function () {
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      betAmount = ethers.utils.parseEther("0.05");

      await expect(bettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      await bettingHubContract.connect(bettot1).claimWinnings(0, 0);

      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Winnings already claimed");
    });

    it("should revert if contract does not have enough funds", async function () {
      const betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.be.revertedWith("Contract does not have enough funds");
    });

    it("given the bettor bet for a non popular selection then amount won must be 1.5x", async function () {
      // first bettor
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      // second bettor
      betAmount = ethers.utils.parseEther("0.05");

      await expect(bettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      // third bettor
      betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot3).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 2, await bettot3.getAddress(), betAmount);

      // start and end race
      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      // assert
      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.emit(bettingHubContract, "BetClaimed")
        .withArgs(0, 0, await bettot1.getAddress(), ethers.utils.parseEther("0.015"));
    });

    it("given the bettor bet for a popular selection then amount won must be 2.0x", async function () {
      let betAmount = ethers.utils.parseEther("0.01");

      await expect(bettingHubContract.connect(bettot1).placeBet(0, [5, 3], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 0, await bettot1.getAddress(), betAmount);

      betAmount = ethers.utils.parseEther("0.05");

      await expect(bettingHubContract.connect(bettot2).placeBet(0, [1], { value: betAmount }))
        .to.emit(bettingHubContract, "BetPlaced")
        .withArgs(0, 1, await bettot2.getAddress(), betAmount);

      await avatarSmashContract.startMatch(0);
      await avatarSmashContract.endMatch(0, [5, 3]);

      await expect(bettingHubContract.connect(bettot1).claimWinnings(0, 0))
        .to.emit(bettingHubContract, "BetClaimed")
        .withArgs(0, 0, await bettot1.getAddress(), ethers.utils.parseEther("0.02"));
    });
  });
});
