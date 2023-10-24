import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { ArtNFT } from '../typechain';

describe('ArtNFT', () => {
  let ArtNFTFactory: ContractFactory;
  let artNFT: ArtNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    ArtNFTFactory = await ethers.getContractFactory('ArtNFT');
    artNFT = (await ArtNFTFactory.deploy()) as ArtNFT;
    await artNFT.deployed();
  });

  describe('Deployment', () => {
    it('Should set the correct name and symbol', async () => {
      expect(await artNFT.name()).to.equal('ArtNFT');
      expect(await artNFT.symbol()).to.equal('ART');
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await artNFT.connect(owner).safeMint(await addr1.getAddress(), 1, 'https://example.com/token/1');
      expect(await artNFT.ownerOf(1)).to.equal(await addr1.getAddress());
      expect(await artNFT.tokenURI(1)).to.equal('https://example.com/token/1');
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(artNFT.connect(addr1).safeMint(await addr2.getAddress(), 2, 'https://example.com/token/2')).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Token Burning', () => {
    it('Should allow owner to burn tokens', async () => {
      await artNFT.connect(owner).safeMint(await owner.getAddress(), 1, 'https://example.com/token/1');
      await artNFT.connect(owner).burn(1);
      await expect(artNFT.ownerOf(1)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('Should revert if non-owner tries to burn tokens', async () => {
      await artNFT.connect(owner).safeMint(await addr1.getAddress(), 1, 'https://example.com/token/1');
      await expect(artNFT.connect(addr1).burn(1)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('URI and Interface', () => {
    it('Should return correct token URI', async () => {
      await artNFT.connect(owner).safeMint(await addr1.getAddress(), 1, 'https://example.com/token/1');
      const uri = await artNFT.tokenURI(1);
      expect(uri).to.equal('https://example.com/token/1');
    });

    it('Should support ERC721 and ERC721URIStorage interfaces', async () => {
      expect(await artNFT.supportsInterface('0x80ac58cd')).to.be.true;
      expect(await artNFT.supportsInterface('0x5b5e139f')).to.be.true;
    });
  });
});
