import { expect } from 'chai';
import { BigNumber, ContractFactory, Signer } from 'ethers';
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
      expect(await gotLandsNFT.uri(0)).to.equal('ipfs://QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');
      expect(await gotLandsNFT.uri(1)).to.equal('ipfs://QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/1.json');
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
      await gotLandsNFT.connect(owner).setURI('ipfs://QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/{id}.json');
      expect(await gotLandsNFT.uri(0)).to.equal('ipfs://QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');
    });

    it('Should revert if non-owner tries to update URI', async () => {
      await expect(gotLandsNFT.connect(addr1).setURI('ipfs://QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/{id}.json')).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Token Transfers', () => {
    it('Should allow token transfers between accounts', async () => {
      await gotLandsNFT.connect(owner).transferFrom(await owner.getAddress(), await addr1.getAddress(), 1, 100);
      expect(await gotLandsNFT.balanceOf(await addr1.getAddress(), 1)).to.equal(100);
    });

    it('Should revert if sender doesn’t have enough tokens', async () => {
      await expect(
        gotLandsNFT.connect(addr1).transferFrom(await addr1.getAddress(), await addr2.getAddress(), 1, 500)
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('Mint Batch', () => {
    it('Should allow owner to mint batch of tokens', async () => {
      await gotLandsNFT.connect(owner).mintBatch(await addr1.getAddress(), [1, 2, 3], [100, 200, 300]);
      const balances = await gotLandsNFT.balanceOfBatch([
        await addr1.getAddress(),
        await addr1.getAddress(),
        await addr1.getAddress()
      ], [1, 2, 3]);
      // Convert BigNumber instances to regular numbers for comparison
      const balancesAsNumbers = balances.map((balance: BigNumber) => balance.toNumber());
      expect(balancesAsNumbers).to.deep.equal([100, 200, 300]);
    });


    it('Should revert if non-owner tries to mint batch', async () => {
      await expect(gotLandsNFT.connect(addr1).mintBatch(await addr2.getAddress(), [1, 2], [50, 50])).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Safe Batch Token Transfers', () => {
    it('Should allow safe batch token transfers between accounts', async () => {
      await gotLandsNFT.connect(owner).batchTransferFrom(
        await owner.getAddress(),
        await addr1.getAddress(),
        [1, 2, 3],
        [100, 200, 300]
      );
      const balances = await gotLandsNFT.balanceOfBatch([
        await addr1.getAddress(),
        await addr1.getAddress(),
        await addr1.getAddress()
      ], [1, 2, 3]);
      // Convert BigNumber instances to regular numbers for comparison
      const balancesAsNumbers = balances.map((balance: BigNumber) => balance.toNumber());
      expect(balancesAsNumbers).to.deep.equal([100, 200, 300]);
    });

    it('Should revert if sender doesn’t have enough tokens for batch transfer', async () => {
      await expect(
        gotLandsNFT.connect(addr1).batchTransferFrom(
          await addr1.getAddress(),
          await addr2.getAddress(),
          [1, 2],
          [500, 500]
        )
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('OwnerOf', () => {
    it('Should return correct owner of a token', async () => {
      const tokenId = 1;
      await gotLandsNFT.connect(owner).mint(await addr1.getAddress(), tokenId, 1000);
      const tokenOwner = await gotLandsNFT.ownerOf(tokenId);
      expect(tokenOwner).to.equal(await addr1.getAddress());
    });
  });

  describe('Safe Transfer', () => {
    it('Should allow safe transfer of a token', async () => {
      const tokenId = 1;
      await gotLandsNFT.connect(owner).transferFrom(await owner.getAddress(), await addr1.getAddress(), tokenId, 1);
      const balance = await gotLandsNFT.balanceOf(await addr1.getAddress(), tokenId);
      expect(balance).to.equal(1);
    });

    it('Should revert if sender is not the owner or approved', async () => {
      const tokenId = 1;

      // Mint tokens to addr1 so that it has a sufficient balance
      await gotLandsNFT.connect(owner).mint(await addr1.getAddress(), tokenId, 1);

      // Attempt to transfer the token from addr1 to addr2
      await expect(
        gotLandsNFT.connect(owner).transferFrom(await addr1.getAddress(), await addr2.getAddress(), tokenId, 1)
      ).to.be.revertedWith('ERC1155: caller is not token owner or approved');
    });
  });
});
