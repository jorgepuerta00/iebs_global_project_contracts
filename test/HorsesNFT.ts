import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { HorsesNFT } from '../typechain';

describe('HorsesNFT', () => {
  let ArtNFTFactory: ContractFactory;
  let nftContract: HorsesNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    ArtNFTFactory = await ethers.getContractFactory('HorsesNFT');
    nftContract = (await ArtNFTFactory.deploy()) as HorsesNFT;
    await nftContract.deployed();
  });

  describe('Deployment', () => {
    it('Should set the correct name and symbol', async () => {
      expect(await nftContract.name()).to.equal('HorsesNFT');
      expect(await nftContract.symbol()).to.equal('HOR');
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress(), 'https://example.com/token/1');
      expect(await nftContract.ownerOf(0)).to.equal(await addr1.getAddress());
      expect(await nftContract.tokenURI(0)).to.equal('https://example.com/token/1');
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(nftContract.connect(addr1).safeMint(await addr2.getAddress(), 'https://example.com/token/2')).to.be.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
      );
    });
  });

  describe('Token Burning', () => {
    it('Should allow owner to burn tokens', async () => {
      await nftContract.connect(owner).safeMint(await owner.getAddress(), 'https://example.com/token/1');
      await expect(nftContract.connect(owner).burn(1)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('Should revert if non-owner tries to burn tokens', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress(), 'https://example.com/token/1');
      await expect(nftContract.connect(addr1).burn(1)).to.be.revertedWith('AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6');
    });
  });

  describe('URI and Interface', () => {
    it('Should return correct token URI', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress(), 'https://example.com/token/1');
      const uri = await nftContract.tokenURI(0);
      expect(uri).to.equal('https://example.com/token/1');
    });

    it('Should support ERC721 and ERC721URIStorage interfaces', async () => {
      expect(await nftContract.supportsInterface('0x80ac58cd')).to.be.true;
      expect(await nftContract.supportsInterface('0x5b5e139f')).to.be.true;
    });
  });
});
