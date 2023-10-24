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
    siliquaCoin = await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', 18, ethers.utils.parseEther('1000000'));
    await siliquaCoin.deployed();

    // Deploy the ArtNFT token
    const ArtNFT = await ethers.getContractFactory('ArtNFT');
    artNFT = await ArtNFT.deploy();
    await artNFT.deployed();

    // Deploy the GoTLandsNFT token
    const GoTLandsNFT = await ethers.getContractFactory('GoTLandsNFT');
    gotLandsNFT = await GoTLandsNFT.deploy();
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

  it('should allow selling Art NFT', async () => {
    const tokenId = 1;
    const price = 100;

    // Approve the contract to spend the seller's NFT
    await marketplace.connect(owner).approveArtNFT(tokenId);

    // Sell the Art NFT
    await marketplace.connect(owner).sellArtNFT(tokenId, price);

    // Check if the NFT is listed for sale
    const listedPrice = await marketplace.artNFTPrice(tokenId);
    expect(listedPrice).to.equal(price);
  });

  it('should allow buying Art NFT', async () => {
    const tokenId = 1;
    const price = 100;

    // Approve the contract to spend the buyer's tokens
    await marketplace.connect(addr1).approveArtNFT(tokenId);

    // Check initial balances
    const buyerBalanceBefore = await siliquaCoin.balanceOf(await addr1.getAddress());
    const sellerBalanceBefore = await siliquaCoin.balanceOf(await owner.getAddress());

    // Buy the Art NFT
    await marketplace.connect(addr1).buyArtNFT(tokenId);

    // Check updated balances after the transaction
    const buyerBalanceAfter = await siliquaCoin.balanceOf(await addr1.getAddress());
    const sellerBalanceAfter = await siliquaCoin.balanceOf(await owner.getAddress());

    // Perform assertions
    expect(buyerBalanceAfter).to.equal(buyerBalanceBefore.sub(price));
    expect(sellerBalanceAfter).to.equal(sellerBalanceBefore.add(price));
  });

  it('should allow selling GoTLands NFT', async () => {
    const tokenId = 1;
    const amount = 50;

    // Approve the contract to spend the seller's NFT
    await marketplace.connect(owner).approveGoTLandsNFT(tokenId);

    // Sell the GoTLands NFT
    await marketplace.connect(owner).sellGoTLandsNFT(tokenId, amount);

    // Check if the NFT is listed for sale
    const sellerBalance = await gotLandsNFT.balanceOf(await owner.getAddress(), tokenId);
    expect(sellerBalance).to.equal(amount);
  });

  it('should allow buying GoTLands NFT', async () => {
    const tokenId = 1;
    const amount = 50;

    // Approve the contract to spend the buyer's tokens
    await marketplace.connect(addr1).approveGoTLandsNFT(tokenId);

    // Check initial balances
    const buyerBalanceBefore = await siliquaCoin.balanceOf(await addr1.getAddress());
    const sellerBalanceBefore = await siliquaCoin.balanceOf(await owner.getAddress());

    // Buy the GoTLands NFT
    await marketplace.connect(addr1).buyGoTLandsNFT(tokenId, amount);

    // Check updated balances after the transaction
    const buyerBalanceAfter = await siliquaCoin.balanceOf(await addr1.getAddress());
    const sellerBalanceAfter = await siliquaCoin.balanceOf(await owner.getAddress());

    // Perform assertions
    expect(buyerBalanceAfter).to.equal(buyerBalanceBefore.sub(amount));
    expect(sellerBalanceAfter).to.equal(sellerBalanceBefore.add(amount));
  });

  it('should handle payment and withdraw funds', async () => {
    const initialContractBalance = await siliquaCoin.balanceOf(marketplace.address);
    const withdrawalAmount = 100;

    // Handle payment to the contract
    await marketplace.handlePayment(withdrawalAmount);

    // Check updated contract balance
    const contractBalanceAfterPayment = await siliquaCoin.balanceOf(marketplace.address);
    expect(contractBalanceAfterPayment).to.equal(initialContractBalance.add(withdrawalAmount));

    // Withdraw funds from the contract
    await marketplace.withdrawFunds();

    // Check contract balance after withdrawal
    const contractBalanceAfterWithdrawal = await siliquaCoin.balanceOf(marketplace.address);
    expect(contractBalanceAfterWithdrawal).to.equal(0);
  });
});
