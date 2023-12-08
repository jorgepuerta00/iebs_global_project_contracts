import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { AssetsNFT, AssetsMarketplace, SiliquaCoin } from '../typechain';
describe('AssetsMarketplace', () => {
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;
  let siliquaCoin: SiliquaCoin;
  let nftContract: AssetsNFT;
  let marketplace: AssetsMarketplace;
  let assets: any[] = [];

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy the test ERC-20 Token contract
    const SiliquaCoin = await ethers.getContractFactory('SiliquaCoin');
    siliquaCoin = await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', ethers.utils.parseEther('1000000'));
    await siliquaCoin.deployed();

    // Deploy the AssetsNFT token
    const AssetsNFT = await ethers.getContractFactory('AssetsNFT');
    nftContract = await AssetsNFT.deploy();
    await nftContract.deployed();

    // Deploy the AssetsMarketplace contract
    marketplace = await ethers.getContractFactory('AssetsMarketplace', owner)
      .then(factory => factory.deploy(siliquaCoin.address, nftContract.address, 10)) // 10% commission
      .then(contract => contract.deployed());

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

    // Mint NFTs and transfer ownership to owner contract
    for (const asset of assets) {
      await nftContract.connect(owner).mint(
        await owner.getAddress(),
        asset.id,
        asset.amount,
        asset.uri
      );
    }
  });

  describe('listNFT', () => {
    it('should allow listing NFTs', async () => {
      const tokenId = 33;
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint NFTs and transfer ownership to the contract or other accounts
      await nftContract.connect(owner).mint(await addr1.getAddress(), tokenId, 1000, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);

      // active listings initially should be 0
      const initialListings = await marketplace.getActiveListings();
      expect(initialListings.length).to.equal(0);

      // List the NFT
      await expect(marketplace.connect(addr1).listNFT(tokenId, 1, 100))
        .to.emit(marketplace, 'NFTListed')
        .withArgs(0, sellerAddress, tokenId, 1, 100, 'listed');

      // Verify the listing details
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(1);
      expect(activeListings[0].seller).to.equal(sellerAddress);
      expect(activeListings[0].tokenId).to.equal(tokenId);
      expect(activeListings[0].amount).to.equal(1);
      expect(activeListings[0].price).to.equal(100);
      expect(activeListings[0].isActive).to.be.true;
    });

    it('should not allow listing NFTs if the caller does not own the token', async () => {
      const tokenId = 33;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a new NFT for a different address
      await nftContract.connect(owner).mint(await addr1.getAddress(), tokenId, 200, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);

      // Try to list the NFT from a different address
      await expect(marketplace.connect(addr1).listNFT(32, 1, 150)).to.be.revertedWith("Insufficient balance");

      // Ensure there are no active listings
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });

    it('should not allow listing NFTs if the caller does not have sufficient balance', async () => {
      const tokenId = 33;

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(await addr1.getAddress(), tokenId, 200, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);

      // Try to list more NFTs than the seller owns
      await expect(marketplace.connect(addr1).listNFT(tokenId, 300, 2500)).to.be.revertedWith("Insufficient balance");

      // Ensure there are no active listings
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });
  });

  describe('cancelListing', () => {
    it('should allow canceling listings by the seller', async () => {
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();
      const tokenId = 33;
      const amount = 1;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(sellerAddress, 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 400, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, amount, 350);

      // Get the listing ID
      const listingId = 0;

      // Ensure the listing is active before canceling
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Cancel the listing
      await expect(marketplace.connect(addr1).cancelListing(listingId))
        .to.emit(marketplace, 'NFTListingCancelled')
        .withArgs(listingId, sellerAddress, tokenId, amount, 350, 'cancelled');

      // Ensure the listing is no longer active after canceling
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);
    });

    it('should not allow canceling listings by non-sellers', async () => {
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();
      const tokenId = 33;
      const amount = 1;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(sellerAddress, 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 400, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, amount, 350);

      // Ensure the listing is active before canceling
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Try to cancel the listing from a non-seller address
      await expect(marketplace.connect(addr3).cancelListing(0)).to.be.revertedWith("Only the seller can cancel the listing");

      // Ensure the listing is still active after the failed cancel attempt
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(1);
    });

    it('should not allow canceling inactive listings', async () => {
      // Get the seller's and buyer's addresses
      const sellerAddress = await addr1.getAddress();
      const buyerAddress = await addr2.getAddress();
      const tokenId = 33;
      const amount = 1;
      const price = 90;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a siliquaCoin for the buyer
      await siliquaCoin.connect(owner).mint(await addr2.getAddress(), 1000);
      await siliquaCoin.connect(addr2).approve(marketplace.address, 1000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 100, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, amount, price);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(0))
        .to.emit(marketplace, 'NFTPurchased')
        .withArgs(0, buyerAddress, sellerAddress, tokenId, amount, price, 'purchased');

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftContract.balanceOf(buyerAddress, tokenId);
      expect(buyerBalance).to.equal(1);

      // Try to cancel the inactive listing
      await expect(marketplace.connect(addr1).cancelListing(0)).to.be.revertedWith("Listing is not active");

      // Ensure there are no active listings after the failed cancel attempt
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });

    it('should not allow canceling listings that do not exist', async () => {
      // Try to cancel the listing
      await expect(marketplace.connect(addr1).cancelListing(0)).to.be.revertedWith("Invalid listing ID");
    });
  });

  describe('purchaseNFT', () => {
    it('should allow purchasing NFTs', async () => {
      // Get the seller's and buyer's addresses
      const sellerAddress = await addr1.getAddress();
      const buyerAddress = await addr2.getAddress();
      const tokenId = 33;
      const amount = 1;
      const price = 90;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a siliquaCoin for the buyer
      await siliquaCoin.connect(owner).mint(await addr2.getAddress(), 1000);
      await siliquaCoin.connect(addr2).approve(marketplace.address, 1000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 100, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, amount, price);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(0))
        .to.emit(marketplace, 'NFTPurchased')
        .withArgs(0, buyerAddress, sellerAddress, tokenId, amount, price, 'purchased');

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftContract.balanceOf(buyerAddress, tokenId);
      expect(buyerBalance).to.equal(1);
    });

    it('should not allow purchasing inactive listings', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 33;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await owner.getAddress(), 1000);
      await siliquaCoin.connect(owner).approve(marketplace.address, 1000);

      // Mint a siliquaCoin for the buyer
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 1000);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 1000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 80, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, 1, 70);

      // Purchase the listed NFT
      await marketplace.connect(addr1).purchaseNFT(0);

      // Ensure the listing is inactive after the purchase
      const inactiveListings = await marketplace.getActiveListings();
      expect(inactiveListings.length).to.equal(0);

      // Try to purchase the inactive listing
      await expect(marketplace.connect(addr2).purchaseNFT(0)).to.be.revertedWith("Listing is not active");
    });

    it('should not allow purchasing if the buyer has insufficient funds', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 33;

      // Mint a siliquaCoin for the seller
      await siliquaCoin.connect(owner).mint(await owner.getAddress(), 1000);
      await siliquaCoin.connect(owner).approve(marketplace.address, 1000);

      // Mint a siliquaCoin for the buyer with insufficient funds
      await siliquaCoin.connect(owner).mint(await addr1.getAddress(), 500);
      await siliquaCoin.connect(addr1).approve(marketplace.address, 5000);

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 100, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/33.json');

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, 1, 600);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Attempt to purchase the NFT with insufficient funds
      await expect(marketplace.connect(addr1).purchaseNFT(0)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Ensure the listing is still active after the failed purchase attempt
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(1);
    });
  });

  describe('setNFTContract', () => {
    it('should allow the owner to set the NFT contract address', async () => {
      // Get the new NFT contract address
      const newNFTContractAddress = await nftContract.connect(owner).address;

      // Call the setNFTContract function by the owner
      await expect(marketplace.connect(owner).setNFTContract(newNFTContractAddress))
        .to.emit(marketplace, 'NFTContractUpdated')
        .withArgs(newNFTContractAddress);

      // Verify that the NFT contract address has been updated
      const updatedNFTContractAddress = await marketplace.nftToken();
      expect(updatedNFTContractAddress).to.equal(newNFTContractAddress);
    });

    it('should not allow non-owner to set the NFT contract address', async () => {
      // Get the new NFT contract address
      const newNFTContractAddress = await nftContract.connect(addr2).address;

      // Call the setNFTContract function by a non-owner
      await expect(marketplace.connect(addr2).setNFTContract(newNFTContractAddress)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe('setSiliquaCoin', () => {
    it('should allow the owner to set the SiliquaCoin contract address', async () => {
      // Get the new SiliquaCoin contract address
      const newSiliquaCoinAddress = await siliquaCoin.connect(owner).address;

      // Call the setSiliquaCoin function by the owner
      await expect(marketplace.connect(owner).setSiliquaCoin(newSiliquaCoinAddress))
        .to.emit(marketplace, 'SiliquaCoinUpdated')
        .withArgs(newSiliquaCoinAddress);

      // Verify that the SiliquaCoin contract address has been updated
      const updatedSiliquaCoinAddress = await marketplace.token();
      expect(updatedSiliquaCoinAddress).to.equal(newSiliquaCoinAddress);
    });

    it('should not allow non-owner to set the SiliquaCoin contract address', async () => {
      // Get the new SiliquaCoin contract address
      const newSiliquaCoinAddress = await siliquaCoin.connect(owner).address;

      // Call the setSiliquaCoin function by a non-owner
      await expect(marketplace.connect(addr1).setSiliquaCoin(newSiliquaCoinAddress)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe('updateCommissionPercentage', () => {
    it('should allow the owner to update the commission percentage', async () => {
      // Set a new commission percentage
      const newCommissionPercentage = 15;

      // Call the updateCommissionPercentage function by the owner
      await expect(marketplace.connect(owner).updateCommissionPercentage(newCommissionPercentage))
        .to.emit(marketplace, 'CommissionPercentageUpdated')
        .withArgs(newCommissionPercentage);

      // Verify that the commission percentage has been updated
      const updatedCommissionPercentage = await marketplace.commissionPercentage();
      expect(updatedCommissionPercentage).to.equal(newCommissionPercentage);
    });

    it('should not allow non-owner to update the commission percentage', async () => {
      // Set a new commission percentage
      const newCommissionPercentage = 15;

      // Call the updateCommissionPercentage function by a non-owner
      await expect(marketplace.connect(addr1).updateCommissionPercentage(newCommissionPercentage)).to.be.revertedWith("Ownable: caller is not the owner");

      // Verify that the commission percentage has not been updated
      const currentCommissionPercentage = await marketplace.commissionPercentage();
      expect(currentCommissionPercentage).to.not.equal(newCommissionPercentage);
    });

    it('should not allow setting an invalid commission percentage', async () => {
      // Set an invalid commission percentage (greater than 100)
      const newCommissionPercentage = 110;

      // Call the updateCommissionPercentage function by the owner with an invalid percentage
      await expect(marketplace.connect(owner).updateCommissionPercentage(newCommissionPercentage)).to.be.revertedWith("Invalid commission percentage");

      // Verify that the commission percentage has not been updated
      const currentCommissionPercentage = await marketplace.commissionPercentage();
      expect(currentCommissionPercentage).to.not.equal(newCommissionPercentage);
    });
  });

});
