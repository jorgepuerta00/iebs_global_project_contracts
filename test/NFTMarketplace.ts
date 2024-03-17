import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AvatarMarketplace, AvatarNFT } from '../typechain';

describe('AvatarMarketplace', () => {
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;
  let nftContract: AvatarNFT;
  let marketplace: AvatarMarketplace;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy the AvatarNFT token
    const AvatarNFT = await ethers.getContractFactory('AvatarNFT');
    nftContract = await AvatarNFT.deploy('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6');
    await nftContract.deployed();

    // Deploy the AvatarMarketplace contract
    marketplace = await ethers.getContractFactory('AvatarMarketplace', owner)
      .then(factory => factory.deploy(nftContract.address, 10)) // 10% commission
      .then(contract => contract.deployed());

    // Mint NFTs and transfer ownership to owner contract
    for (let i = 0; i < 5; i++) {
      await nftContract.connect(owner).safeMint(await owner.getAddress());
    }

    // Approve the marketplace contract to spend the owner's NFTs
    const MINTER_ROLE = await nftContract.MINTER_ROLE();
    await nftContract.grantRole(MINTER_ROLE, marketplace.address);
  });

  describe('listNFT', () => {
    it('should allow listing NFTs', async () => {
      const tokenId = 5;
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();

      // Mint NFTs and transfer ownership to the contract or other accounts
      await nftContract.connect(owner).safeMint(await addr1.getAddress());

      // Approve the contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);

      // active listings initially should be 0
      const initialListings = await marketplace.getActiveListings();
      expect(initialListings.length).to.equal(0);

      // List the NFT
      await expect(marketplace.connect(addr1).listNFT(tokenId, 100))
        .to.emit(marketplace, 'NFTListed')
        .withArgs(0, sellerAddress, tokenId, 100, 'listed');

      // Verify the listing details
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(1);
      expect(activeListings[0].seller).to.equal(sellerAddress);
      expect(activeListings[0].tokenId).to.equal(tokenId);
      expect(activeListings[0].price).to.equal(100);
      expect(activeListings[0].isActive).to.be.true;
    });

    it('should not allow listing NFTs if the caller does not own the token', async () => {
      const tokenId = 5;
      // Mint a new NFT for a different address
      await nftContract.connect(owner).safeMint(await addr2.getAddress());

      // Approve the marketplace contract to spend the NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);

      // Try to list the NFT from a different address
      await expect(marketplace.connect(addr1).listNFT(tokenId, 1)).to.be.revertedWith("Only owner can sell");

      // Ensure there are no active listings
      const activeListings = await marketplace.getActiveListings();
      expect(activeListings.length).to.equal(0);
    });
  });

  describe('cancelListing', () => {
    it('should allow canceling listings by the seller', async () => {
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();
      const tokenId = 5;

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, 400);

      // Get the listing ID
      const listingId = 0;

      // Ensure the listing is active before canceling
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Cancel the listing
      await expect(marketplace.connect(addr1).cancelListing(listingId))
        .to.emit(marketplace, 'NFTListingCancelled')
        .withArgs(listingId, sellerAddress, tokenId, 400, 'cancelled');

      // Ensure the listing is no longer active after canceling
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);
    });

    it('should not allow canceling listings by non-sellers', async () => {
      // Get the seller's address
      const sellerAddress = await addr1.getAddress();
      const tokenId = 5;

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(sellerAddress);

      // List the NFT
      await marketplace.connect(addr1).listNFT(tokenId, 400);

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
      const tokenId = 5;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, tokenPriceInWei);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(0, { value: tokenPriceInWei }))
        .to.emit(marketplace, 'NFTPurchased')
        .withArgs(0, buyerAddress, sellerAddress, tokenId, tokenPriceInWei, "purchased");

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftContract.balanceOf(buyerAddress);
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
      const tokenId = 5;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(addr1).setApprovalForAll(marketplace.address, true);
      //await marketplace.connect(owner).approveSeller(buyerAddress);

      // List the NFT for sale
      await marketplace.connect(addr1).listNFT(tokenId, tokenPriceInWei);

      // Ensure the listing is active before purchasing
      const initialActiveListings = await marketplace.getActiveListings();
      expect(initialActiveListings.length).to.equal(1);

      // Purchase the NFT
      await expect(marketplace.connect(addr2).purchaseNFT(0, { value: tokenPriceInWei }))
        .to.emit(marketplace, 'NFTPurchased')
        .withArgs(0, buyerAddress, sellerAddress, tokenId, tokenPriceInWei, "purchased");

      // Ensure the listing is no longer active after the purchase
      const finalActiveListings = await marketplace.getActiveListings();
      expect(finalActiveListings.length).to.equal(0);

      // Verify the buyer received the NFT
      const buyerBalance = await nftContract.balanceOf(buyerAddress);
      expect(buyerBalance).to.equal(1);
    });

    it('should not allow purchasing inactive listings', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 5;
      const tokenPrice = 90;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, tokenPriceInWei);

      // Purchase the listed NFT
      await marketplace.connect(addr1).purchaseNFT(0, { value: tokenPriceInWei });

      // Ensure the listing is inactive after the purchase
      const inactiveListings = await marketplace.getActiveListings();
      expect(inactiveListings.length).to.equal(0);

      // Try to purchase the inactive listing
      await expect(marketplace.connect(addr2).purchaseNFT(0)).to.be.revertedWith("Listing is not active");
    });

    it('should not allow purchasing if the buyer has insufficient funds', async () => {
      // Get the seller's address
      const sellerAddress = await owner.getAddress();
      const tokenId = 0;
      const tokenPrice = 100000;
      const tokenPriceInWei = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');

      // Mint a new NFT for the seller
      await nftContract.connect(owner).safeMint(sellerAddress);

      // Approve the marketplace contract to spend the seller's NFTs
      await nftContract.connect(owner).setApprovalForAll(marketplace.address, true);

      // List the NFT for sale
      await marketplace.connect(owner).listNFT(tokenId, tokenPriceInWei);

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

  describe('Given a package purchasing', () => {
    it('When the exact amount is sent Then should allow purchasing NFT packages ', async () => {
      const buyer = addr2;
      const initialBuyerBalance = await nftContract.balanceOf(await buyer.getAddress());
      const initialContractBalance = await ethers.provider.getBalance(marketplace.address);

      // Set the correct mint price per NFT in wei
      const mintPricePerNFT = ethers.utils.parseUnits('2', 'ether'); // 2 MATIC in wei
      const numberOfNFTs = 5;
      const totalMintPrice = mintPricePerNFT.mul(numberOfNFTs); // Total price for 5 NFTs in wei

      // Purchase the NFT package
      await expect(marketplace.connect(buyer).purchaseNFTsPackage(numberOfNFTs, { value: totalMintPrice }))
        .to.emit(marketplace, 'NFTsPurchasedPackage')
        .withArgs(await buyer.getAddress(), numberOfNFTs, totalMintPrice);

      // Verify buyer's NFT balance has increased by 5
      const finalBuyerBalance = await nftContract.balanceOf(await buyer.getAddress());
      expect(finalBuyerBalance.sub(initialBuyerBalance)).to.equal(5);

      // Verify contract's ether balance has increased by the mint price
      const finalContractBalance = await ethers.provider.getBalance(marketplace.address);
      expect(finalContractBalance.sub(initialContractBalance)).to.equal(totalMintPrice);
    });

    it('When insufficient funds are sent Then should reject purchasing NFT packages', async () => {
      const buyer = addr3;
      const mintPrice = await marketplace.mintPrice();
      const insufficientAmount = mintPrice.sub(ethers.utils.parseEther("1")); // 1 ether less than the mint price

      // Attempt to purchase the NFT package with insufficient funds
      await expect(marketplace.connect(buyer).purchaseNFTsPackage(5, { value: insufficientAmount }))
        .to.be.revertedWith("Must send the exact mint price");

      // Verify that no NFTs were minted to the buyer as a result of the failed transaction
      const buyerBalance = await nftContract.balanceOf(await buyer.getAddress());
      expect(buyerBalance).to.equal(0);
    });
  });

  describe('withdraw', function () {
    it('should allow the owner to withdraw funds', async function () {
      const initialOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
      const contractBalance = await ethers.provider.getBalance(marketplace.address);
      const withdrawAmount = contractBalance.div(2);

      // Withdraw funds
      const tx = await marketplace.connect(owner).withdraw(withdrawAmount);
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      const finalOwnerBalance = await ethers.provider.getBalance(await owner.getAddress());
      const finalContractBalance = await ethers.provider.getBalance(marketplace.address);

      // Validate the owner received the funds minus gas costs
      expect(finalOwnerBalance.add(gasUsed), 'Owner did not receive the funds correctly').to.equal(initialOwnerBalance.add(withdrawAmount));
      // Validate the contract's balance is reduced correctly
      expect(finalContractBalance, 'Contract balance not reduced correctly').to.equal(contractBalance.sub(withdrawAmount));
    });

    it('should not allow non-owner to withdraw funds', async function () {
      const contractBalance = await ethers.provider.getBalance(marketplace.address);
      const withdrawAmount = ethers.utils.parseEther("1");

      // Ensure withdrawal attempt by non-owner fails
      await expect(marketplace.connect(addr1).withdraw(withdrawAmount)).to.be.revertedWith("Ownable: caller is not the owner");

      // Validate the contract's balance remains unchanged
      const finalContractBalance = await ethers.provider.getBalance(marketplace.address);
      expect(finalContractBalance, 'Contract balance should not change').to.equal(contractBalance);
    });
  });

  describe('getContractBalance', function () {
    it('should allow the owner to view the contract\'s Ether balance', async function () {
      const buyer = addr2;

      // Set the correct mint price per NFT in wei
      const mintPricePerNFT = ethers.utils.parseUnits('2', 'ether'); // 2 MATIC in wei
      console.log("mintPricePerNFT: ", mintPricePerNFT.toString());
      const numberOfNFTs = 5;
      const totalMintPrice = mintPricePerNFT.mul(numberOfNFTs); // Total price for 5 NFTs in wei

      // Purchase the NFT package
      await expect(marketplace.connect(buyer).purchaseNFTsPackage(numberOfNFTs, { value: totalMintPrice }))
        .to.emit(marketplace, 'NFTsPurchasedPackage')
        .withArgs(await buyer.getAddress(), numberOfNFTs, totalMintPrice);

      // Now, the owner tries to get the contract balance
      const contractBalance = await marketplace.connect(owner).getContractBalance();

      // Check if the returned balance matches the sent value
      expect(contractBalance).to.equal('10000000000000000000');
    });

    it('should not allow non-owners to view the contract\'s Ether balance', async function () {
      // Attempt to call getContractBalance with a non-owner account
      await expect(marketplace.connect(addr1).getContractBalance())
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

});
