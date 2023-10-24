import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { GoTLandsNFT } from '../typechain';

describe('GoTLandsNFT', () => {
  let GoTLandsNFT: ContractFactory;
  let gotLandsNFT: GoTLandsNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    GoTLandsNFT = await ethers.getContractFactory('GoTLandsNFT');
    gotLandsNFT = (await GoTLandsNFT.deploy()) as GoTLandsNFT;
    await gotLandsNFT.deployed();
  });

  describe('Deployment', () => {
    it('Should set the correct URI for token metadata', async () => {
      expect(await gotLandsNFT.uri(0)).to.equal('https://westeros.example/api/land/{id}.json');
    });

    it('Should mint initial supply of tokens', async () => {
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 0)).to.equal(1);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 1)).to.equal(5000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 2)).to.equal(20000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 3)).to.equal(50000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 4)).to.equal(80000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 5)).to.equal(2000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 6)).to.equal(30000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 7)).to.equal(3000);
      expect(await gotLandsNFT.balanceOf(await owner.getAddress(), 8)).to.equal(10);
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await gotLandsNFT.connect(owner).mint(await addr1.getAddress(), 1, 1000);
      expect(await gotLandsNFT.balanceOf(await addr1.getAddress(), 1)).to.equal(1000);
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(gotLandsNFT.connect(addr1).mint(await addr2.getAddress(), 1, 500)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('URI Update', () => {
    it('Should allow owner to update token URI', async () => {
      await gotLandsNFT.connect(owner).setURI('https://new.example.com/api/land/{id}.json');
      expect(await gotLandsNFT.uri(0)).to.equal('https://new.example.com/api/land/{id}.json');
    });

    it('Should revert if non-owner tries to update URI', async () => {
      await expect(gotLandsNFT.connect(addr1).setURI('https://new.example.com/api/land/{id}.json')).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Token Transfers', () => {
    it('Should allow token transfers between accounts', async () => {
      await gotLandsNFT.connect(owner).safeTransferFrom(await owner.getAddress(), await addr1.getAddress(), 1, 100, "0x00");
      expect(await gotLandsNFT.balanceOf(await addr1.getAddress(), 1)).to.equal(100);
    });

    it('Should revert if sender doesn’t have enough tokens', async () => {
      await expect(
        gotLandsNFT.connect(addr1).safeTransferFrom(await addr1.getAddress(), await addr2.getAddress(), 1, 500, "0x00")
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });
});
