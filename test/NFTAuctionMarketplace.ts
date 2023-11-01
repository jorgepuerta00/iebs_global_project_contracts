import { expect } from 'chai';
import { BigNumberish, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { GoTLandsNFT, NFTAuctionMarketplace, SiliquaCoin } from '../typechain';

describe('NFTAuctionMarketplace', () => {
  let owner: Signer;
  let seller: Signer;
  let bidder1: Signer;
  let bidder2: Signer;
  let siliquaCoin: SiliquaCoin;
  let gotLandsNFT: GoTLandsNFT;
  let marketplace: NFTAuctionMarketplace;

  beforeEach(async () => {
    [owner, seller, bidder1, bidder2] = await ethers.getSigners();

    // Deploy the test ERC-20 Token contract
    const SiliquaCoin = await ethers.getContractFactory('SiliquaCoin');
    siliquaCoin = await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', ethers.utils.parseEther('1000000'));
    await siliquaCoin.deployed();

    // Deploy the GoTLandsNFT token
    const GoTLandsNFT = await ethers.getContractFactory('GoTLandsNFT');
    gotLandsNFT = await GoTLandsNFT.deploy();
    await gotLandsNFT.deployed();

    // Deploy the NFTMarketplace contract
    marketplace = await ethers.getContractFactory('NFTAuctionMarketplace', owner)
      .then(factory => factory.deploy(gotLandsNFT.address, siliquaCoin.address, 15)) // 15% commission
      .then(contract => contract.deployed());
  });

  describe('createAuction', () => {
    it('should allow the seller to create an auction for their NFT', async () => {
      // Get the seller's and bidder's addresses
      const sellerAddress = await seller.getAddress();

      // Mint a siliquaCoin for the seller and approve the marketplace contract
      await siliquaCoin.connect(owner).mint(sellerAddress, ethers.utils.parseEther('1000'));
      await siliquaCoin.connect(seller).approve(marketplace.address, ethers.utils.parseEther('1000'));

      // Mint a new NFT for the seller
      const tokenId = 1;
      await gotLandsNFT.connect(owner).mint(sellerAddress, tokenId, 100);

      // Ensure the seller has approved the marketplace contract to spend their NFTs
      await gotLandsNFT.connect(seller).setApprovalForAll(marketplace.address, true);

      // Get the initial balance of the marketplace contract for the seller's NFT
      const balanceBeforeAuction = await gotLandsNFT.balanceOf(marketplace.address, tokenId);

      // Create an auction for the NFT
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day
      await expect(marketplace.connect(seller).createAuction(tokenId, 50, startingPrice, auctionDuration))
        .to.emit(marketplace, 'AuctionCreated')
        .withArgs(0, sellerAddress, tokenId, 50, startingPrice, auctionDuration);

      // Get the initial balance of the marketplace contract for the seller's NFT after auction creation
      const balanceAfterAuction = await gotLandsNFT.balanceOf(marketplace.address, tokenId);

      // Verify the auction details
      const auction = await marketplace.auctions(0);
      expect(auction.seller).to.equal(sellerAddress);
      expect(auction.tokenId).to.equal(tokenId);
      expect(auction.amount).to.equal(50);
      expect(auction.startingPrice).to.equal(startingPrice);
      expect(auction.highestBid).to.equal(startingPrice);
      expect(auction.highestBidder).to.equal(ethers.constants.AddressZero);
      expect(auction.ended).to.be.false;

      // Verify that the NFT is transferred to the marketplace contract during auction creation
      expect(balanceBeforeAuction).to.equal(0);
      expect(balanceAfterAuction).to.equal(50);
    });

    it('should revert if seller does not own the token', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Attempt to create an auction without owning the token
      await expect(marketplace.connect(bidder1).createAuction(tokenId, amount, startingPrice, auctionDuration))
        .to.be.revertedWith("Insufficient balance");
    });

    it('should revert if seller does not have sufficient balance of the token', async () => {
      // Get the seller's and bidder's addresses
      const sellerAddress = await seller.getAddress();

      // Mint a siliquaCoin for the seller and approve the marketplace contract
      await siliquaCoin.connect(owner).mint(sellerAddress, ethers.utils.parseEther('1000'));
      await siliquaCoin.connect(seller).approve(marketplace.address, ethers.utils.parseEther('1000'));

      // Mint a new NFT for the seller
      const tokenId = 1;
      await gotLandsNFT.connect(owner).mint(sellerAddress, tokenId, 10);

      // Ensure the seller has approved the marketplace contract to spend their NFTs
      await gotLandsNFT.connect(seller).setApprovalForAll(marketplace.address, true);

      // Create an auction for the NFT
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day
      await expect(marketplace.connect(seller).createAuction(tokenId, 50, startingPrice, auctionDuration))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  describe('placeBid', () => {
    it('should revert if auction has already ended', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // endAuction() is called automatically when the auction ends
      marketplace.connect(seller).endAuction(0);

      // Attempt to place a bid after auction has ended
      await expect(marketplace.connect(bidder1).placeBid(0, ethers.utils.parseEther('2')))
        .to.be.revertedWith("Auction has ended");
    });

    it('should revert if bid amount is not higher than current highest bid', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);

      // Attempt to place a bid with an amount equal to current highest bid
      await expect(marketplace.connect(bidder1).placeBid(0, startingPrice))
        .to.be.revertedWith("Bid amount must be higher than the current highest bid");
    });

    it('should allow bidder to place a valid bid', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Place a valid bid
      await expect(marketplace.connect(bidder1).placeBid(0, ethers.utils.parseEther('2')))
        .to.emit(marketplace, 'BidPlaced')
        .withArgs(0, await bidder1.getAddress(), ethers.utils.parseEther('2'));

      // Verify auction details after placing bid
      const auction = await marketplace.auctions(0);
      expect(auction.highestBid).to.equal(ethers.utils.parseEther('2'));
      expect(auction.highestBidder).to.equal(await bidder1.getAddress());
    });

    it('should refund previous highest bidder', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Place an initial bid
      await marketplace.connect(bidder1).placeBid(0, ethers.utils.parseEther('2'));

      // Verify previous highest bidder (bidder1) is refunded
      const previousbidder1Balance = await siliquaCoin.balanceOf(await bidder1.getAddress());
      expect(previousbidder1Balance).to.equal(ethers.utils.parseEther('998'));

      // Increase time to make another bidder place a higher bid
      await ethers.provider.send('evm_increaseTime', [3600]); // 1 hour

      // Place a higher bid from bidder2
      await approveBidder(bidder2);
      await marketplace.connect(bidder2).placeBid(0, ethers.utils.parseEther('3'));

      // Verify previous highest bidder (bidder1) is refunded
      const bidder1Balance = await siliquaCoin.balanceOf(await bidder1.getAddress());
      expect(bidder1Balance).to.equal(ethers.utils.parseEther('1000'));
    });

  });

  describe('endAuction', () => {
    it('should revert if auction has already ended', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // endAuction() is called automatically when the auction ends
      marketplace.connect(seller).endAuction(0);

      // Attempt to place a bid after auction has ended
      await expect(marketplace.connect(bidder1).placeBid(0, ethers.utils.parseEther('2')))
        .to.be.revertedWith("Auction has ended");
    });

    it('should revert if auction has not yet ended', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Attempt to end the auction before it has ended
      await expect(marketplace.connect(owner).endAuction(0))
        .to.be.revertedWith("Auction has not yet ended");
    });

    it('should end the auction and transfer NFT and funds correctly', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);
      await approveBidder(bidder1);

      // Place a bid
      await marketplace.connect(bidder1).placeBid(0, ethers.utils.parseEther('2'));

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // End the auction
      await expect(marketplace.connect(owner).endAuction(0))
        .to.emit(marketplace, 'AuctionEnded')
        .withArgs(0, await bidder1.getAddress(), ethers.utils.parseEther('2'));

      // Verify NFT is transferred to the highest bidder
      const bidder1NFTBalance = await gotLandsNFT.balanceOf(await bidder1.getAddress(), tokenId);
      expect(bidder1NFTBalance).to.equal(amount);

      // Verify NFT is deducted from seller 
      const sellerBalance = await gotLandsNFT.balanceOf(await seller.getAddress(), tokenId);
      expect(sellerBalance).to.equal(amount);

      // Verify auction details after ending
      const auction = await marketplace.auctions(0);
      expect(auction.ended).to.be.true;

      // Verify total seller earned (after commission)
      const bidAmount = ethers.utils.parseEther('2');
      const feeAmount = (bidAmount.mul(15)).div(100);
      const totalCommissionEarned = await marketplace.totalCommissionEarned();
      expect(totalCommissionEarned).to.equal(feeAmount);

      // Verify funds are transferred to the seller (after commission)
      const total = bidAmount.sub(feeAmount);
      const sellerTokenBalance = await siliquaCoin.balanceOf(await seller.getAddress());
      expect(sellerTokenBalance).to.equal(total.add(ethers.utils.parseEther('1000')));
    });

    it('should end the auction and transfer NFT back to seller if no bids were placed', async () => {
      const tokenId = 1;
      const amount = 50;
      const startingPrice = ethers.utils.parseEther('1');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, amount, startingPrice, auctionDuration);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // End the auction with no bids
      await expect(marketplace.connect(owner).endAuction(0))
        .to.emit(marketplace, 'AuctionEnded')
        .withArgs(0, ethers.constants.AddressZero, 0);

      // Verify NFT is transferred back to the seller
      const sellerNFTBalance = await gotLandsNFT.balanceOf(await seller.getAddress(), tokenId);
      expect(sellerNFTBalance).to.equal(100);

      // Verify auction details after ending
      const auction = await marketplace.auctions(0);
      expect(auction.ended).to.be.true;
    });
  });

  async function mintTokensAndCreateAuction(tokenId: BigNumberish, amount: BigNumberish, startingPrice: BigNumberish, auctionDuration: BigNumberish) {
    // Mint a siliquaCoin for the seller and approve the marketplace contract
    await approveBidder(seller);

    // Mint a new NFT for the seller
    await gotLandsNFT.connect(owner).mint(await seller.getAddress(), tokenId, 100);

    // Ensure the seller has approved the marketplace contract to spend their NFTs
    await gotLandsNFT.connect(seller).setApprovalForAll(marketplace.address, true);

    // Create an auction for the NFT
    await marketplace.connect(seller).createAuction(tokenId, amount, startingPrice, auctionDuration);
  }

  async function approveBidder(bidder: Signer) {
    await siliquaCoin.connect(owner).mint(await bidder.getAddress(), ethers.utils.parseEther('1000'));
    await siliquaCoin.connect(bidder).approve(marketplace.address, ethers.utils.parseEther('1000'));
  }

});
