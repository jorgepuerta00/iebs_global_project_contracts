import { expect } from 'chai';
import { BigNumber, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { HorsesAssetsNFT } from '../typechain';

xdescribe('HorsesAssetsNFT', () => {
  let HorsesAssetsNFT: ContractFactory;
  let nftContract: HorsesAssetsNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let assets: any[] = [];

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    HorsesAssetsNFT = await ethers.getContractFactory('HorsesAssetsNFT');
    nftContract = (await HorsesAssetsNFT.deploy()) as HorsesAssetsNFT;
    await nftContract.deployed();

    assets = [
      { id: 0, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json', amount: 1 },     // SADDLE_GOLD
      { id: 1, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/1.json', amount: 10 },    // SADDLE_SILVER
      { id: 2, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/2.json', amount: 100 },   // SADDLE_BRONZE
      { id: 3, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/3.json', amount: 1 },     // HORSESHOE_GOLD
      { id: 4, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/4.json', amount: 10 },    // HORSESHOE_SILVER
      { id: 5, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/5.json', amount: 100 },   // HORSESHOE_BRONZE
      { id: 6, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/6.json', amount: 1 },     // BIT_GOLD
      { id: 7, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/7.json', amount: 10 },    // BIT_SILVER
      { id: 8, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/8.json', amount: 100 },   // BIT_BRONZE
      { id: 9, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/9.json', amount: 1 },     // REINS_GOLD
      { id: 10, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/10.json', amount: 10 },  // REINS_SILVER
      { id: 11, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/11.json', amount: 100 }, // REINS_BRONZE
      { id: 12, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/12.json', amount: 1 },   // STIRRUPS_GOLD
      { id: 13, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/13.json', amount: 10 },  // STIRRUPS_SILVER
      { id: 14, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/14.json', amount: 100 }, // STIRRUPS_BRONZE
      { id: 15, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/15.json', amount: 1 },   // GIRTH_GOLD
      { id: 16, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/16.json', amount: 10 },  // GIRTH_SILVER
      { id: 17, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/17.json', amount: 100 }, // GIRTH_BRONZE
      { id: 18, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/18.json', amount: 1 },   // BREASTPLATE_GOLD
      { id: 19, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/19.json', amount: 10 },  // BREASTPLATE_SILVER
      { id: 20, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/20.json', amount: 100 }, // BREASTPLATE_BRONZE
      { id: 21, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/21.json', amount: 1 },   // LEGWRAPS_GOLD
      { id: 22, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/22.json', amount: 10 },  // LEGWRAPS_SILVER
      { id: 23, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/23.json', amount: 100 }, // LEGWRAPS_BRONZE
      { id: 24, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/24.json', amount: 1 },   // NOSEBAND_GOLD
      { id: 25, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/25.json', amount: 10 },  // NOSEBAND_SILVER
      { id: 26, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/26.json', amount: 100 }, // NOSEBAND_BRONZE
      { id: 27, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/27.json', amount: 1 },   // BLANKET_GOLD
      { id: 28, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/28.json', amount: 10 },  // BLANKET_SILVER
      { id: 29, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/29.json', amount: 100 }, // BLANKET_BRONZE
      { id: 30, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/30.json', amount: 1 },   // SKIN_GOLD
      { id: 31, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/31.json', amount: 10 },  // SKIN_SILVER
      { id: 32, uri: 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/32.json', amount: 100 }  // SKIN_BRONZE
    ];

    for (const asset of assets) {
      await nftContract.connect(owner).mint(
        await owner.getAddress(),
        asset.id,
        asset.amount,
        asset.uri
      );
    }
  });

  describe('Deployment', () => {
    it('Should mint initial supply of tokens', async () => {
      for (const asset of assets) {
        const balance = await nftContract.balanceOf(await owner.getAddress(), asset.id);
        expect(balance).to.equal(asset.amount);
        const tokenUri = await nftContract.uri(asset.id);
        expect(tokenUri).to.equal(asset.uri);
      }
    });

    it('Should set the correct URI for token metadata', async () => {
      expect(await nftContract.uri(0)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');
      expect(await nftContract.uri(29)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/29.json');
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await nftContract.connect(owner).mint(await addr1.getAddress(), 33, 1000, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');
      expect(await nftContract.balanceOf(await addr1.getAddress(), 33)).to.equal(1000);
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(nftContract.connect(addr1).mint(await addr2.getAddress(), 34, 500, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/34.json')).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('URI Update', () => {
    it('Should allow owner to update token URI', async () => {
      await nftContract.connect(owner).setTokenURI(0, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/0.json');
      expect(await nftContract.uri(0)).to.equal('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/0.json');
    });

    it('Should revert if non-owner tries to update URI', async () => {
      await expect(nftContract.connect(addr1).setTokenURI(0, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/0.json')).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Token Transfers', () => {
    it('Should allow token transfers between accounts', async () => {
      await nftContract.connect(owner).transferFrom(await owner.getAddress(), await addr1.getAddress(), 2, 100);
      expect(await nftContract.balanceOf(await addr1.getAddress(), 2)).to.equal(100);
    });

    it('Should revert if sender doesn’t have enough tokens', async () => {
      await expect(
        nftContract.connect(addr1).transferFrom(await addr1.getAddress(), await addr2.getAddress(), 1, 500)
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('Mint Batch', () => {
    it('Should allow owner to mint batch of tokens', async () => {
      await nftContract.connect(owner).mintBatch(await addr1.getAddress(), [35, 36, 37], [100, 100, 100], ['https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/35.json', 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/36.json', 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/37.json']);
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
      await expect(nftContract.connect(addr1).mintBatch(await addr2.getAddress(), [1, 2], [50, 50], ['https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/35.json', 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/36.json'])).to.be.revertedWith(
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Safe Batch Token Transfers', () => {
    it('Should allow safe batch token transfers between accounts', async () => {
      var ownerAddress = await owner.getAddress();
      var addr1Address = await addr1.getAddress();

      await nftContract.connect(owner).batchTransferFrom(
        ownerAddress,
        addr1Address,
        [0, 1, 2],
        [1, 1, 1]
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
        nftContract.connect(addr1).batchTransferFrom(
          await addr1.getAddress(),
          await addr2.getAddress(),
          [1, 2],
          [500, 500]
        )
      ).to.be.revertedWith('ERC1155: insufficient balance for transfer');
    });
  });

  describe('Safe Transfer', () => {
    it('Should allow safe transfer of a token', async () => {
      const tokenId = 1;
      await nftContract.connect(owner).transferFrom(await owner.getAddress(), await addr1.getAddress(), tokenId, 1);
      const balance = await nftContract.balanceOf(await addr1.getAddress(), tokenId);
      expect(balance).to.equal(1);
    });

    it('Should revert if sender is not the owner or approved', async () => {
      // Mint tokens to addr1 so that it has a sufficient balance
      await nftContract.connect(owner).mint(await addr1.getAddress(), 38, 1, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW51/38.json');

      // Attempt to transfer the token from addr1 to addr2
      await expect(
        nftContract.connect(owner).transferFrom(await addr1.getAddress(), await addr2.getAddress(), 38, 1)
      ).to.be.revertedWith('ERC1155: caller is not token owner or approved');
    });
  });
});
