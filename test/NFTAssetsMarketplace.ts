import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AssetsMarketplace, AssetsNFT } from '../typechain';

describe('AssetsMarketplace', () => {
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;
  let nftToken: AssetsNFT;
  let marketplace: AssetsMarketplace;
  let assets: any[] = [];
  let bundlePrice: BigNumber;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy the AssetsNFT token
    const AssetsNFT = await ethers.getContractFactory('AssetsNFT');
    nftToken = await AssetsNFT.deploy('https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53');
    await nftToken.deployed();

    // Deploy the AssetsMarketplace contract
    marketplace = await ethers.getContractFactory('AssetsMarketplace', owner)
      .then(factory => factory.deploy(nftToken.address, 10)) // 10% commission
      .then(contract => contract.deployed());

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

    // Mint NFTs and transfer ownership to owner contract
    for (const asset of assets) {
      await nftToken.connect(owner).mint(
        await owner.getAddress(),
        asset.id,
        asset.amount
      );
    }

    // Set the bundle price
    bundlePrice = await marketplace.bundlePrice();

    // Grant the marketplace contract the MINTER_ROLE
    const MINTER_ROLE = await nftToken.MINTER_ROLE();
    await nftToken.grantRole(MINTER_ROLE, marketplace.address);
  });

  describe('listNFT', () => {
    it('should allow listing NFTs', async () => {
      const tokenId = 33;
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();

      // Mint NFTs and transfer ownership to the contract or other accounts
      await nftToken.connect(owner).mint(await addr1.getAddress(), tokenId, 1000);

      // Approve the contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);

      // active listings initially should be 0
      const initialListings = await marketplace.getActiveListings();
      expect(initialListings.length).to.equal(0);

      // List the NFT
      await expect(marketplace.connect(addr1).listNFT(tokenId, 1, 100))
        .to.emit(marketplace, 'ListingUpdated')
        .withArgs(1, 'listed');

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

      // Mint a new NFT for a different address
      await nftToken.connect(owner).mint(await addr1.getAddress(), tokenId, 200);

      // Approve the marketplace contract to spend the NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);

      // Try to list the NFT from a different address
      await expect(marketplace.connect(addr1).listNFT(32, 1, 150)).to.be.revertedWith("Insufficient balance");

      // Ensure there are no active listings
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });

    it('should not allow listing NFTs if the caller does not have sufficient balance', async () => {
      const tokenId = 33;

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(await addr1.getAddress(), tokenId, 200);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);

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

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 400);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, amount, 350);

      // Get the listing ID
      const listingId = 1;

      // Ensure the listing is active before canceling
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Cancel the listing
      await expect(marketplace.connect(addr1).cancelListing(listingId))
        .to.emit(marketplace, 'ListingUpdated')
        .withArgs(listingId, 'cancelled');

      // Ensure the listing is no longer active after canceling
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);
    });

    it('should not allow canceling listings by non-sellers', async () => {
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();
      const tokenId = 33;
      const amount = 1;

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 400);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, amount, 350);

      // Ensure the listing is active before canceling
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Try to cancel the listing from a non-seller address
      await expect(marketplace.connect(addr3).cancelListing(0)).to.be.revertedWith("Listing does not exist");

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
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 100);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, amount, tokenPriceInWei);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(1, { value: tokenPriceInWei }))
        .to.emit(marketplace, 'ListingUpdated')
        .withArgs(1, 'purchased');

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftToken.balanceOf(buyerAddress, tokenId);
      expect(buyerBalance).to.equal(1);

      // Try to cancel the inactive listing
      await expect(marketplace.connect(addr1).cancelListing(1)).to.be.revertedWith("Already inactive");

      // Ensure there are no active listings after the failed cancel attempt
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });

    it('should not allow canceling listings that do not exist', async () => {
      // Try to cancel the listing
      await expect(marketplace.connect(addr1).cancelListing(1)).to.be.revertedWith("Listing does not exist");
    });
  });

  describe('purchaseNFT', () => {
    it('should allow purchasing NFTs', async () => {
      // Get the seller's and buyer's addresses
      const sellerAddress = await addr1.getAddress();
      const buyerAddress = await addr2.getAddress();
      const tokenId = 33;
      const amount = 1;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 100);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, amount, tokenPriceInWei);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(1, { value: tokenPriceInWei }))
        .to.emit(marketplace, 'ListingUpdated')
        .withArgs(1, 'purchased');

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftToken.balanceOf(buyerAddress, tokenId);
      expect(buyerBalance).to.equal(1);
    });

    it('should not allow purchasing inactive listings', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 33;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 80);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, 1, tokenPriceInWei);

      // Purchase the listed NFT
      await marketplace.connect(addr1).purchaseNFT(1, { value: tokenPriceInWei });

      // Ensure the listing is inactive after the purchase
      const inactiveListings = await marketplace.getActiveListings();
      expect(inactiveListings.length).to.equal(0);

      // Try to purchase the inactive listing
      await expect(marketplace.connect(addr2).purchaseNFT(1)).to.be.revertedWith("Inactive listing");
    });

    it('should not allow purchasing on non exists listings', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 33;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 80);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, 1, tokenPriceInWei);

      // Purchase the listed NFT
      await marketplace.connect(addr1).purchaseNFT(1, { value: tokenPriceInWei });

      // Ensure the listing is inactive after the purchase
      const inactiveListings = await marketplace.getActiveListings();
      expect(inactiveListings.length).to.equal(0);

      // Try to purchase the inactive listing
      await expect(marketplace.connect(addr2).purchaseNFT(2)).to.be.revertedWith("Listing does not exist");
    });

    it('should not allow purchasing if the buyer has insufficient funds', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 33;
      const tokenPrice = 100000;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftToken.connect(owner).mint(sellerAddress, tokenId, 100);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftToken.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, 1, tokenPriceInWei);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      try {
        await marketplace.connect(addr1).purchaseNFT(0, { value: tokenPriceInWei });
        expect.fail("La transacción no debería haberse completado");
      } catch (error: any) {
        // Ensure the error message is correct
        expect(error.message).to.include("sender doesn't have enough funds");
      }

      // Ensure the listing is still active after the failed purchase attempt
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(1);
    });
  });

  describe('setNFTContract', () => {
    it('should allow the owner to set the NFT contract address', async () => {
      // Get the new NFT contract address
      const newNFTContractAddress = nftToken.connect(owner).address;

      // Call the setNFTContract function by the owner
      marketplace.connect(owner).updateNFTContract(newNFTContractAddress);

      // Verify that the NFT contract address has been updated
      const updatedNFTContractAddress = await marketplace.nftToken();
      expect(updatedNFTContractAddress).to.equal(newNFTContractAddress);
    });

    it('should not allow non-owner to set the NFT contract address', async () => {
      // Get the new NFT contract address
      const newNFTContractAddress = await nftToken.connect(addr2).address;

      // Call the setNFTContract function by a non-owner
      await expect(marketplace.connect(addr2).updateNFTContract(newNFTContractAddress)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe('updateCommissionPercentage', () => {
    it('should allow the owner to update the commission percentage', async () => {
      // Set a new commission percentage
      const newCommissionPercentage = 15;

      // Call the updateCommissionPercentage function by the owner
      await marketplace.connect(owner).updateCommissionPercentage(newCommissionPercentage);

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
      await expect(marketplace.connect(owner).updateCommissionPercentage(newCommissionPercentage)).to.be.revertedWith("Percentage too high");

      // Verify that the commission percentage has not been updated
      const currentCommissionPercentage = await marketplace.commissionPercentage();
      expect(currentCommissionPercentage).to.not.equal(newCommissionPercentage);
    });
  });

  describe('purchaseSingleNFT', () => {
    it('should allow purchasing a single NFT at bundle price', async () => {
      const tokenId = 0; // valid tokenId that has been minted
      const buyer = addr2; // buyer address
      const bundlePriceInWei = await marketplace.bundlePrice();

      // Ensure buyer has enough Ether for the transaction
      const buyerBalanceBefore = await ethers.provider.getBalance(await buyer.getAddress());
      expect(buyerBalanceBefore).to.be.above(bundlePriceInWei);

      // Execute purchaseSingleNFT transaction
      await expect(marketplace.connect(buyer).purchaseSingleNFT(tokenId, { value: bundlePriceInWei }))
        .to.emit(marketplace, 'SingleMinted')
        .withArgs(await buyer.getAddress(), tokenId, 1, bundlePriceInWei);

      // Verify that the buyer now owns the NFT
      let ownerOfToken = await nftToken.balanceOf(await buyer.getAddress(), tokenId);
      expect(ownerOfToken).to.equal(1);

      // Execute again purchaseSingleNFT transaction
      await expect(marketplace.connect(buyer).purchaseSingleNFT(tokenId, { value: bundlePriceInWei }))
        .to.emit(marketplace, 'SingleMinted')
        .withArgs(await buyer.getAddress(), tokenId, 1, bundlePriceInWei);

      // Verify that the buyer now owns two NFT
      ownerOfToken = await nftToken.balanceOf(await buyer.getAddress(), tokenId);
      expect(ownerOfToken).to.equal(2);
    });

    it('should fail if incorrect value is sent', async () => {
      const tokenId = 0; // valid tokenId that has been minted
      const buyer = addr2; // buyer address
      const incorrectValue = ethers.utils.parseUnits('0.5', 'ether'); // Less than bundle price

      // Attempt to purchase with incorrect value
      await expect(marketplace.connect(buyer).purchaseSingleNFT(tokenId, { value: incorrectValue }))
        .to.be.revertedWith("Incorrect value for single NFT");
    });
  });

  describe('purchaseNFTBundle', () => {
    it('should allow purchasing a bundle of NFTs at the specified price', async () => {
      const buyer = addr2; // buyer address
      const bundlePriceInWei = await marketplace.bundlePrice();

      // Execute purchaseNFTBundle transaction
      await expect(marketplace.connect(buyer).purchaseBundleNFT({ value: bundlePriceInWei }))
        .to.emit(marketplace, 'BundleMinted');
    });

    it('should fail if incorrect value is sent for a bundle', async () => {
      const buyer = addr2; // buyer address
      const incorrectValue = ethers.utils.parseUnits('0.0001', 'ether'); // Less than bundle price

      // Attempt to purchase a bundle with incorrect value
      await expect(marketplace.connect(buyer).purchaseBundleNFT({ value: incorrectValue }))
        .to.be.revertedWith("Incorrect value for bundle");
    });
  });
});
