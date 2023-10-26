import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { ArtNFT, GoTLandsNFT, NFTMarketplace, SiliquaCoin } from '../typechain';

describe('NFTMarketplace', () => {
  let NFTMarketplaceFactory: ContractFactory;
  let marketplace: NFTMarketplace;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let siliquaCoin: SiliquaCoin;
  let gotLandsNFT: GoTLandsNFT;
  let artNFT: ArtNFT;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the test ERC-20 Token contract
    const SiliquaCoin = await ethers.getContractFactory('SiliquaCoin');
    siliquaCoin = await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', ethers.utils.parseEther('1000000'));
    await siliquaCoin.deployed();

    // Deploy the ArtNFT token
    const ArtNFT = await ethers.getContractFactory('ArtNFT');
    artNFT = await ArtNFT.deploy();
    await artNFT.deployed();

    // Deploy the GoTLandsNFT token
    const GoTLandsNFT = await ethers.getContractFactory('GoTLandsNFT');
    gotLandsNFT = await GoTLandsNFT.deploy('game of thrones');
    await gotLandsNFT.deployed();

    // Mint NFTs and transfer ownership to the contract or other accounts
    await artNFT.connect(owner).safeMint(await owner.getAddress(), 1, 'https://example.com/token/1');
    await gotLandsNFT.connect(owner).mint(await owner.getAddress(), 1, 1000);

    // Deploy the NFTMarketplace contract
    NFTMarketplaceFactory = await ethers.getContractFactory('NFTMarketplace', owner);
    marketplace = (await NFTMarketplaceFactory.deploy(siliquaCoin.address, artNFT.address, gotLandsNFT.address)) as NFTMarketplace;
    await marketplace.deployed();

    // Approve the contract to spend the seller's NFTs
    await artNFT.connect(owner).setApprovalForAll(marketplace.address, true);
    await gotLandsNFT.connect(owner).setApprovalForAll(marketplace.address, true);
  });

});
