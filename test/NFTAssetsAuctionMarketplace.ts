import { expect } from 'chai';
import { BigNumberish, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AssetsAuctionMarketplace, AssetsNFT } from '../typechain';

describe('AssetsAuctionMarketplace', () => {
  let owner: Signer;
  let seller: Signer;
  let bidder1: Signer;
  let bidder2: Signer;
  let nftContract: AssetsNFT;
  let marketplace: AssetsAuctionMarketplace;

  beforeEach(async () => {
    [owner, seller, bidder1, bidder2] = await ethers.getSigners();

    // Deploy the AssetsNFT token
    const AssetsNFT = await ethers.getContractFactory('AssetsNFT');
    nftContract = await AssetsNFT.deploy();
    await nftContract.deployed();

    // Deploy the NFTMarketplace contract
    marketplace = await ethers.getContractFactory('AssetsAuctionMarketplace', owner)
      .then(factory => factory.deploy(nftContract.address, 15)) // 15% commission
      .then(contract => contract.deployed());
  });

  describe('createAuction', () => {
    it('should allow the seller to create an auction for their NFT', async () => {
      // Get the seller's and bidder's addresses
      const tokenId = 0;
      const sellerAddress = await seller.getAddress();
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint a new NFT for the seller
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 100, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');

      // Ensure the seller has approved the marketplace contract to spend their NFTs
      await nftContract.connect(seller).setApprovalForAll(marketplace.address, true);

      // Get the initial balance of the marketplace contract for the seller's NFT
      const balanceBeforeAuction = await nftContract.balanceOf(marketplace.address, tokenId);

      // Create an auction for the NFT
      await expect(marketplace.connect(seller).createAuction(tokenId, 50, startingPrice, auctionDuration))
        .to.emit(marketplace, 'AuctionCreated')
        .withArgs(0, sellerAddress, tokenId, 50, startingPrice, auctionDuration);

      // Get the initial balance of the marketplace contract for the seller's NFT after auction creation
      const balanceAfterAuction = await nftContract.balanceOf(marketplace.address, tokenId);

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
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Attempt to create an auction without owning the token
      await expect(marketplace.connect(bidder1).createAuction(tokenId, amount, startingPrice, auctionDuration))
        .to.be.revertedWith("Insufficient balance");
    });

    it('should revert if seller does not have sufficient balance of the token', async () => {
      // Get the seller's and bidder's addresses
      const sellerAddress = await seller.getAddress();

      // Mint a new NFT for the seller
      const tokenId = 0;
      await nftContract.connect(owner).mint(sellerAddress, tokenId, 10, 'https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/0.json');

      // Ensure the seller has approved the marketplace contract to spend their NFTs
      await nftContract.connect(seller).setApprovalForAll(marketplace.address, true);

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
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // endAuction() is called automatically when the auction ends
      marketplace.connect(seller).endAuction(0);

      // Attempt to place a bid after auction has ended
      await expect(marketplace.connect(bidder1).placeBid(0))
        .to.be.revertedWith("Auction has ended");
    });

    it('should revert if bid amount is not higher than current highest bid', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Attempt to place a bid with an amount equal to current highest bid
      await expect(marketplace.connect(bidder1).placeBid(0))
        .to.be.revertedWith("Bid amount must be higher than the current highest bid");
    });

    it('should allow bidder to place a valid bid', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Place a valid bid
      await expect(marketplace.connect(bidder1).placeBid(0, { value: ethers.utils.parseUnits('2', 'ether') }))
        .to.emit(marketplace, 'BidPlaced')
        .withArgs(0, await bidder1.getAddress(), ethers.utils.parseUnits('2', 'ether'));

      // Verify auction details after placing bid
      const auction = await marketplace.auctions(0);
      expect(auction.highestBid).to.equal(ethers.utils.parseUnits('2', 'ether'));
      expect(auction.highestBidder).to.equal(await bidder1.getAddress());
    });

    it('should refund previous highest bidder', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day
      const expectedBalanceBidder1 = ethers.utils.parseUnits('9996872161171977289376', 'wei');
      const newExpectedBalanceBidder1 = ethers.utils.parseUnits('9994872099627976797024', 'wei');
      const finalExpectedBalanceBidder1 = ethers.utils.parseUnits('9996872099627976797024', 'wei');
      const tolerance = ethers.utils.parseUnits('1', 'ether');

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Verify initial balance of bidder1
      const inicialBalanceBidder1 = await ethers.provider.getBalance(await bidder1.getAddress());
      //console.log('bidder1 initial balance: ', ethers.utils.formatEther(inicialBalanceBidder1));
      expect(inicialBalanceBidder1).to.be.closeTo(expectedBalanceBidder1, tolerance, "Initial balance is off by more than the tolerance");

      // Place an initial bid
      await marketplace.connect(bidder1).placeBid(0, { value: ethers.utils.parseUnits('2', 'ether') });

      // veryfy new balance of bidder1
      const newBalanceBidder1 = await ethers.provider.getBalance(await bidder1.getAddress());
      //console.log('bidder1 new balance: ', ethers.utils.formatEther(newBalanceBidder1));
      expect(newBalanceBidder1).to.be.closeTo(newExpectedBalanceBidder1, tolerance, "New balance is off by more than the tolerance");

      // Increase time to make another bidder place a higher bid
      await ethers.provider.send('evm_increaseTime', [3600]); // 1 hour

      // Place a higher bid from bidder2
      await marketplace.connect(bidder2).placeBid(0, { value: ethers.utils.parseUnits('3', 'ether') });

      // Verify previous highest bidder (bidder1) is refunded
      const currentBalanceBidder1 = await ethers.provider.getBalance(await bidder1.getAddress());
      //console.log('bidder1 current balance: ', ethers.utils.formatEther(currentBalanceBidder1));
      expect(currentBalanceBidder1).to.be.closeTo(finalExpectedBalanceBidder1, tolerance, "Final balance is off by more than the tolerance");
    });

  });

  describe('endAuction', () => {
    it('should revert if auction has already ended', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // endAuction() is called automatically when the auction ends
      marketplace.connect(seller).endAuction(0);

      // Attempt to place a bid after auction has ended
      await expect(marketplace.connect(bidder1).placeBid(0))
        .to.be.revertedWith("Auction has ended");
    });

    it('should revert if auction has not yet ended', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Attempt to end the auction before it has ended
      await expect(marketplace.connect(owner).endAuction(0))
        .to.be.revertedWith("Auction has not yet ended");
    });

    it('should end the auction and transfer NFT and funds correctly', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day
      const expectedBalanceSeller1 = ethers.utils.parseUnits('9996572069297936317972', 'wei');
      const tolerance = ethers.utils.parseUnits('1', 'ether');

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Place a bid
      await marketplace.connect(bidder1).placeBid(0, { value: ethers.utils.parseUnits('3', 'ether') });

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // verify initial balance of seller
      const initialBalanceSeller = await ethers.provider.getBalance(await seller.getAddress());
      //console.log('seller initial balance: ', ethers.utils.formatEther(initialBalanceSeller));
      expect(initialBalanceSeller).to.be.closeTo(expectedBalanceSeller1, tolerance, "Initial balance is off by more than the tolerance");

      // End the auction
      await expect(marketplace.connect(owner).endAuction(0))
        .to.emit(marketplace, 'AuctionEnded')
        .withArgs(0, await bidder1.getAddress(), ethers.utils.parseUnits('3', 'ether'));

      // Verify NFT is transferred to the highest bidder
      const bidder1NFTBalance = await nftContract.balanceOf(await bidder1.getAddress(), tokenId);
      expect(bidder1NFTBalance).to.equal(amount);

      // Verify NFT is deducted from seller 
      const sellerBalance = await nftContract.balanceOf(await seller.getAddress(), tokenId);
      expect(sellerBalance).to.equal(initialSupply - amount);

      // Verify auction details after ending
      const auction = await marketplace.auctions(0);
      //console.log('auction ended: ', auction.ended);
      expect(auction.ended).to.be.true;

      // Verify total seller earned (after commission)
      const bidAmount = ethers.utils.parseUnits('3', 'ether');
      const feeAmount = (bidAmount.mul(15)).div(100);
      const totalCommissionEarned = await marketplace.totalCommissionEarned();
      expect(totalCommissionEarned).to.equal(feeAmount);
      //console.log('bidAmount: ', ethers.utils.formatEther(bidAmount));
      //console.log('total Commission Earned: ', ethers.utils.formatEther(totalCommissionEarned));

      // Verify funds are transferred to the seller (after commission)
      const total = bidAmount.sub(feeAmount);
      const newBalanceSeller = await ethers.provider.getBalance(await seller.getAddress());

      expect(newBalanceSeller).to.equal(initialBalanceSeller.add(total));
      //console.log('seller new balance: ', ethers.utils.formatEther(newBalanceSeller));
    });

    it('should end the auction and transfer NFT back to seller if no bids were placed', async () => {
      const tokenId = 1;
      const initialSupply = 100;
      const amount = 50;
      const startingPrice = ethers.utils.parseUnits('1', 'ether');
      const auctionDuration = 86400; // 1 day

      // Mint tokens, create an auction, and approve bidder
      await mintTokensAndCreateAuction(tokenId, initialSupply, amount, startingPrice, auctionDuration);

      // Increase time to make the auction end
      await ethers.provider.send('evm_increaseTime', [86401]); // 1 day + 1 second

      // End the auction with no bids
      await expect(marketplace.connect(owner).endAuction(0))
        .to.emit(marketplace, 'AuctionEnded')
        .withArgs(0, ethers.constants.AddressZero, 0);

      // Verify NFT is transferred back to the seller
      const sellerNFTBalance = await nftContract.balanceOf(await seller.getAddress(), tokenId);
      expect(sellerNFTBalance).to.equal(100);

      // Verify auction details after ending
      const auction = await marketplace.auctions(0);
      expect(auction.ended).to.be.true;
    });
  });

  async function mintTokensAndCreateAuction(tokenId: BigNumberish, initialSupply: BigNumberish, amount: BigNumberish, startingPrice: BigNumberish, auctionDuration: BigNumberish) {
    // Mint a new NFT for the seller
    await nftContract.connect(owner).mint(await seller.getAddress(), tokenId, initialSupply, `https://ipfs/QmUPC5rEe8sYZkRcazmhAtjkv1WbfGzr76kkRrbZgKGW53/${tokenId}.json`);

    // Ensure the seller has approved the marketplace contract to spend their NFTs
    await nftContract.connect(seller).setApprovalForAll(marketplace.address, true);

    // Create an auction for the NFT
    await marketplace.connect(seller).createAuction(tokenId, amount, startingPrice, auctionDuration);
  }
});
