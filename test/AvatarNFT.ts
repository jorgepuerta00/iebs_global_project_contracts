import { expect } from 'chai';
import { ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { AvatarNFT } from '../typechain';

describe('AvatarNFT', () => {
  let NFTFactory: ContractFactory;
  let nftContract: AvatarNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    NFTFactory = await ethers.getContractFactory('AvatarNFT');
    nftContract = (await NFTFactory.deploy('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6')) as AvatarNFT;
    await nftContract.deployed();
  });

  xdescribe('Deployment', () => {
    it('Should set the correct name and symbol', async () => {
      expect(await nftContract.name()).to.equal('AvatarNFT');
      expect(await nftContract.symbol()).to.equal('AVA');
    });
  });

  xdescribe('Minting', () => {
    it('Should allow owner to mint new tokens', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      expect(await nftContract.ownerOf(0)).to.equal(await addr1.getAddress());
      expect(await nftContract.tokenURI(0)).to.equal('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/0.json');
    });

    it('Should revert if non-owner tries to mint', async () => {
      await expect(nftContract.connect(addr1).safeMint(await addr2.getAddress())).to.be.revertedWith(
        'AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
      );
    });
  });

  xdescribe('Token Burning', () => {
    it('Should allow owner to burn tokens', async () => {
      await nftContract.connect(owner).safeMint(await owner.getAddress());
      await expect(nftContract.connect(owner).burn(1)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('Should revert if non-owner tries to burn tokens', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      await expect(nftContract.connect(addr1).burn(1)).to.be.revertedWith('AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6');
    });
  });

  xdescribe('URI and Interface', () => {
    it('Should return correct token URI', async () => {
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      const uri = await nftContract.tokenURI(0);
      expect(uri).to.equal('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/0.json');
    });

    it('Should support ERC721 and ERC721URIStorage interfaces', async () => {
      expect(await nftContract.supportsInterface('0x80ac58cd')).to.be.true;
      expect(await nftContract.supportsInterface('0x5b5e139f')).to.be.true;
    });
  });

  xdescribe('Ownership Tracking', () => {
    it('Should track token ownership correctly', async () => {
      // Mint tokens to addr1
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      await nftContract.connect(owner).safeMint(await addr1.getAddress());

      // Mint a token to addr2
      await nftContract.connect(owner).safeMint(await addr2.getAddress());

      // Get owned tokens for addr1 and addr2
      const ownedTokensAddr1 = await nftContract.getOwnedTokens(await addr1.getAddress());
      const ownedTokensAddr2 = await nftContract.getOwnedTokens(await addr2.getAddress());

      // Check that addr1 owns 2 tokens and their IDs are correct
      expect(ownedTokensAddr1.length).to.equal(2);
      expect(ownedTokensAddr1[0]).to.equal(ethers.BigNumber.from(0));
      expect(ownedTokensAddr1[1]).to.equal(ethers.BigNumber.from(1));

      // Check that addr2 owns 1 token and its ID is correct
      expect(ownedTokensAddr2.length).to.equal(1);
      expect(ownedTokensAddr2[0]).to.equal(ethers.BigNumber.from(2));

      // verify that querying a non-owner address returns an empty array
      const ownedTokensNonOwner = await nftContract.getOwnedTokens(await addr3.getAddress());
      expect(ownedTokensNonOwner.length).to.equal(0);
    });
  });

  xdescribe('Token URI Management', () => {
    it('Should return the correct list of token URIs for a given owner', async () => {
      // Mint tokens to addr1
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      await nftContract.connect(owner).safeMint(await addr1.getAddress());

      // Mint a token to addr2 for diversity
      await nftContract.connect(owner).safeMint(await addr2.getAddress());

      // Expected URIs for addr1's tokens
      const expectedURIs = [
        'https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/0.json',
        'https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/1.json',
        'https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/2.json'
      ];

      // Fetching the actual URIs for addr1's tokens using the new method
      const actualURIs = await nftContract.getTokenURLsByOwner(await addr1.getAddress());

      // Check if the expectedURIs match the actualURIs returned by the contract
      expect(actualURIs.length).to.equal(expectedURIs.length);
      for (let i = 0; i < actualURIs.length; i++) {
        expect(actualURIs[i]).to.equal(expectedURIs[i]);
      }

      // Expected URIs for addr2's tokens
      const addr2TokenURIs = await nftContract.getTokenURLsByOwner(await addr2.getAddress());
      expect(addr2TokenURIs.length).to.equal(1);
      expect(addr2TokenURIs[0]).to.equal('https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/3.json');

      // Expected URIs for addr3's tokens
      const noTokenURIs = await nftContract.getTokenURLsByOwner(await addr3.getAddress());
      expect(noTokenURIs.length).to.equal(0);

      // expected total token count 
      const totalTokenCount = await nftContract.getTotalTokenCount();
      expect(totalTokenCount).to.equal(4);
    });
  });

  describe('Existing NFT Minting', () => {
    it('Should mint an NFT with the metadata of an existing NFT', async () => {
      // Mint an original NFT to copy
      await nftContract.connect(owner).safeMint(await addr1.getAddress());
      const originalTokenURI = await nftContract.tokenURI(0);
      const buyerAddress = await addr2.getAddress();

      // Mint a new NFT copying the first one's metadata
      await expect(nftContract.connect(owner).safeMintExistingNFT(await addr2.getAddress(), "https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/0.json"))
        .to.emit(nftContract, 'ExistingTokenMinted')
        .withArgs(buyerAddress, 1, originalTokenURI);

      // Verify ownership of the copied NFT
      expect(await nftContract.ownerOf(1)).to.equal(await addr2.getAddress());
    });

    xit('Should revert if copying a non-existent token ID', async () => {
      // Attempt to mint an NFT with metadata copied from a non-existent token
      await expect(nftContract.connect(owner).safeMintExistingNFT(await addr2.getAddress(), "https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/999.json"))
        .to.be.revertedWith("Token URL does not exist, cannot copy metadata");
    });

    xit('Should revert if non-owner tries to mint an existing NFT', async () => {
      // Mint an original NFT to setup
      await nftContract.connect(owner).safeMint(await addr1.getAddress());

      // Attempt to mint a copy of the NFT as a non-owner
      await expect(nftContract.connect(addr2).safeMintExistingNFT(await addr3.getAddress(), "https://ipfs.io/ipfs/QmNtQKh7qGRyQau3oeWeHQBc4Y71uUy2t6N9DkuKT3T9p6/0.json"))
        .to.be.revertedWith('AccessControl: account');
    });
  });

});
