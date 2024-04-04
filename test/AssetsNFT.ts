import { expect } from 'chai';
import { BigNumber, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AssetsNFT } from '../typechain';

describe('AssetsNFT', () => {
  let AssetsNFT: ContractFactory;
  let nftContract: AssetsNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let assets: any[] = [];

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    AssetsNFT = await ethers.getContractFactory('AssetsNFT');
    nftContract = (await AssetsNFT.deploy('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53')) as AssetsNFT;
    await nftContract.deployed();

    assets = [
      { id: 0, amount: 1 },    // SADDLE_GOLD
      { id: 1, amount: 10 },   // SADDLE_SILVER
      { id: 2, amount: 100 },  // SADDLE_BRONZE
      { id: 3, amount: 1 },    // HORSESHOE_GOLD
      { id: 4, amount: 10 },   // HORSESHOE_SILVER
      { id: 5, amount: 100 },  // HORSESHOE_BRONZE
      { id: 6, amount: 1 },    // BIT_GOLD
      { id: 7, amount: 10 },   // BIT_SILVER
      { id: 8, amount: 100 },  // BIT_BRONZE
      { id: 9, amount: 1 },    // REINS_GOLD
      { id: 10, amount: 10 },  // REINS_SILVER
      { id: 11, amount: 100 }, // REINS_BRONZE
      { id: 12, amount: 1 },   // STIRRUPS_GOLD
      { id: 13, amount: 10 },  // STIRRUPS_SILVER
      { id: 14, amount: 100 }, // STIRRUPS_BRONZE
      { id: 15, amount: 1 },   // GIRTH_GOLD
      { id: 16, amount: 10 },  // GIRTH_SILVER
      { id: 17, amount: 100 }, // GIRTH_BRONZE
      { id: 18, amount: 1 },   // BREASTPLATE_GOLD
      { id: 19, amount: 10 },  // BREASTPLATE_SILVER
      { id: 20, amount: 100 }, // BREASTPLATE_BRONZE
      { id: 21, amount: 1 },   // LEGWRAPS_GOLD
      { id: 22, amount: 10 },  // LEGWRAPS_SILVER
      { id: 23, amount: 100 }, // LEGWRAPS_BRONZE
      { id: 24, amount: 1 },   // NOSEBAND_GOLD
      { id: 25, amount: 10 },  // NOSEBAND_SILVER
      { id: 26, amount: 100 }, // NOSEBAND_BRONZE
      { id: 27, amount: 1 },   // BLANKET_GOLD
      { id: 28, amount: 10 },  // BLANKET_SILVER
      { id: 29, amount: 100 }, // BLANKET_BRONZE
      { id: 30, amount: 1 },   // SKIN_GOLD
      { id: 31, amount: 10 },  // SKIN_SILVER
      { id: 32, amount: 100 }  // SKIN_BRONZE
    ];

    for (const asset of assets) {
      await nftContract.connect(owner).mint(
        await owner.getAddress(),
        asset.id,
        asset.amount
      );
    }
  });

  describe('Deployment', () => {
    it('Should mint initial supply of tokens', async () => {
      for (const asset of assets) {
        const balance = await nftContract.balanceOf(await owner.getAddress(), asset.id);
        expect(balance).to.equal(asset.amount);
      }
    });

    it('Should set the correct URI for token metadata', async () => {
      expect(await nftContract.uri(0)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');
      expect(await nftContract.uri(29)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/29.json');
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await nftContract.connect(owner).mint(await addr1.getAddress(), 33, 1000);
      expect(await nftContract.balanceOf(await addr1.getAddress(), 33)).to.equal(1000);
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(nftContract.connect(addr1).mint(await addr2.getAddress(), 34, 500)).to.be.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
      );
    });
  });

  describe('URI Update', () => {
    it('Should allow owner to update token URI', async () => {
      await nftContract.connect(owner).setBaseURI('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW52');
      expect(await nftContract.uri(0)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW52/0.json');
    });

    it('Should revert if non-owner tries to update URI', async () => {
      await expect(nftContract.connect(addr1).setBaseURI('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW52')).to.be.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000'
      );
    });
  });

  describe('Token Transfers', () => {
    it('Should allow token transfers between accounts', async () => {
      await nftContract.connect(owner).safeTransferFrom(await owner.getAddress(), await addr1.getAddress(), 2, 100, "0x");
      expect(await nftContract.balanceOf(await addr1.getAddress(), 2)).to.equal(100);
    });

    it('Should revert if sender doesn’t have enough tokens', async () => {
      await expect(
        nftContract.connect(addr1).safeTransferFrom(await addr1.getAddress(), await addr2.getAddress(), 1, 500, "0x")
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('Mint Batch', () => {
    it('Should allow owner to mint batch of tokens', async () => {
      await nftContract.connect(owner).mintBatch(await addr1.getAddress(), [35, 36, 37], [100, 100, 100]);
      const balances = await nftContract.balanceOfBatch([
        await addr1.getAddress(),
        await addr1.getAddress(),
        await addr1.getAddress()
      ], [35, 36, 37]);
      // Convert BigNumber instances to regular numbers for comparison
      const balancesAsNumbers = balances.map((balance: BigNumber) => balance.toNumber());
      expect(balancesAsNumbers).to.deep.equal([100, 100, 100]);
    });


    it('Should revert if non-owner tries to mint batch', async () => {
      await expect(nftContract.connect(addr1).mintBatch(await addr2.getAddress(), [1, 2], [50, 50])).to.be.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
      );
    });
  });

  describe('Safe Batch Token Transfers', () => {
    it('Should allow safe batch token transfers between accounts', async () => {
      var ownerAddress = await owner.getAddress();
      var addr1Address = await addr1.getAddress();

      await nftContract.connect(owner).safeBatchTransferFrom(
        ownerAddress,
        addr1Address,
        [0, 1, 2],
        [1, 1, 1],
        "0x"
      );
      const balances = await nftContract.balanceOfBatch([
        addr1Address,
        addr1Address,
        addr1Address
      ], [1, 1, 1]);
      // Convert BigNumber instances to regular numbers for comparison
      const balancesAsNumbers = balances.map((balance: BigNumber) => balance.toNumber());
      expect(balancesAsNumbers).to.deep.equal([1, 1, 1]);
    });

    it('Should revert if sender doesn’t have enough tokens for batch transfer', async () => {
      await expect(
        nftContract.connect(addr1).safeBatchTransferFrom(
          await addr1.getAddress(),
          await addr2.getAddress(),
          [1, 2],
          [500, 500],
          "0x"
        )
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('Safe Transfer', () => {
    it('Should allow safe transfer of a token', async () => {
      const tokenId = 1;
      await nftContract.connect(owner).safeTransferFrom(await owner.getAddress(), await addr1.getAddress(), tokenId, 1, "0x");
      const balance = await nftContract.balanceOf(await addr1.getAddress(), tokenId);
      expect(balance).to.equal(1);
    });

    it('Should revert if sender is not the owner or approved', async () => {
      // Mint tokens to addr1 so that it has a sufficient balance
      await nftContract.connect(owner).mint(await addr1.getAddress(), 38, 1);

      // Attempt to transfer the token from addr1 to addr2
      await expect(
        nftContract.connect(owner).safeTransferFrom(await addr1.getAddress(), await addr2.getAddress(), 38, 1, "0x")
      ).to.be.revertedWith('ERC1155: caller is not token owner or approved');
    });
  });
});
