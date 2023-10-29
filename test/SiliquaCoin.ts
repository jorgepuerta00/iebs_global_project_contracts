import { expect } from 'chai';
import { ContractFactory, Signer } from "ethers";
import { ethers } from 'hardhat';
import { SiliquaCoin } from '../typechain';

describe('SiliquaCoin', () => {
  let SiliquaCoin: ContractFactory;
  let siliquaCoin: SiliquaCoin;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let addr3: Signer;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    SiliquaCoin = await ethers.getContractFactory('SiliquaCoin');
    siliquaCoin = (await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', ethers.utils.parseEther('1000000'))) as SiliquaCoin;
    await siliquaCoin.deployed();
  });

  describe('Deployment', () => {
    it('Should set the correct name, symbol, and decimals', async () => {
      expect(await siliquaCoin.name()).to.equal('SiliquaCoin');
      expect(await siliquaCoin.symbol()).to.equal('SILQ');
      expect(await siliquaCoin.decimals()).to.equal(18);
    });

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await siliquaCoin.balanceOf(await owner.getAddress());
      expect(await siliquaCoin.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions trasnfer', () => {
    it('Should transfer tokens between accounts', async () => {
      await siliquaCoin.transfer(await addr1.getAddress(), ethers.utils.parseEther('100'));
      const addr1Balance = await siliquaCoin.balanceOf(await addr1.getAddress());
      expect(addr1Balance).to.equal(ethers.utils.parseEther('100'));

      await siliquaCoin.connect(addr1).transfer(await addr2.getAddress(), ethers.utils.parseEther('50'));
      const addr2Balance = await siliquaCoin.balanceOf(await addr2.getAddress());
      expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
    });

    it('Should fail if sender doesn’t have enough tokens', async () => {
      const initialOwnerBalance = await siliquaCoin.balanceOf(await owner.getAddress());
      await expect(
        siliquaCoin.connect(addr1).transfer(await owner.getAddress(), ethers.utils.parseEther('1'))
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

      expect(await siliquaCoin.balanceOf(await owner.getAddress())).to.equal(initialOwnerBalance);
    });

    it('Should update balances after transfers', async () => {
      const initialOwnerBalance = await siliquaCoin.balanceOf(await owner.getAddress());

      await siliquaCoin.transfer(await addr1.getAddress(), ethers.utils.parseEther('100'));
      await siliquaCoin.transfer(await addr2.getAddress(), ethers.utils.parseEther('50'));

      const finalOwnerBalance = await siliquaCoin.balanceOf(await owner.getAddress());
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseEther('150')));

      const addr1Balance = await siliquaCoin.balanceOf(await addr1.getAddress());
      expect(addr1Balance).to.equal(ethers.utils.parseEther('100'));

      const addr2Balance = await siliquaCoin.balanceOf(await addr2.getAddress());
      expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
    });
  });

  describe('Transactions transferFrom', () => {
    it('Should allow approved spender to transfer tokens from owner', async () => {
      const amountToTransfer = ethers.utils.parseEther('50');

      // owner transfiere 1000 tokens a addr1 de su cuenta
      await siliquaCoin.connect(owner).transfer(await addr1.getAddress(), ethers.utils.parseEther('1000'));

      // La dirección addr1 aprueba a addr2 para gastar 50 tokens de su cuenta
      await siliquaCoin.connect(addr1).approve(await addr2.getAddress(), amountToTransfer);

      // addr2 usa transferFrom para transferir 50 tokens de addr1 a addr3
      await siliquaCoin.connect(addr2).transferFrom(await addr1.getAddress(), await addr3.getAddress(), amountToTransfer);

      // Verifica que el balance de addr3 es 50
      const addr3Balance = await siliquaCoin.balanceOf(await addr3.getAddress());
      expect(addr3Balance).to.equal(amountToTransfer);

      // Verifica que el balance de addr1 se ha reducido correctamente
      const addr1Balance = await siliquaCoin.balanceOf(await addr1.getAddress());
      expect(addr1Balance).to.equal(ethers.utils.parseEther('950'));

      // Verifica que la asignación de addr2 ha disminuido correctamente
      const allowance = await siliquaCoin.allowance(await addr1.getAddress(), await addr2.getAddress());
      expect(allowance).to.equal(0);
    });

    it('Should revert if spender doesnt have allowance', async () => {
      const amountToTransfer = ethers.utils.parseEther('60');

      // owner transfiere 1000 tokens a addr1 de su cuenta
      await siliquaCoin.connect(owner).transfer(await addr1.getAddress(), ethers.utils.parseEther('1000'));

      // Intenta transferir 60 tokens, debería revertir
      await expect(
        siliquaCoin.connect(addr2).transferFrom(await addr1.getAddress(), await addr3.getAddress(), amountToTransfer)
      ).to.be.revertedWith('ERC20: insufficient allowance');

      // Verifica que el balance de addr3 sigue siendo 0
      const addr3Balance = await siliquaCoin.balanceOf(await addr3.getAddress());
      expect(addr3Balance).to.equal(0);
    });

    it('Should revert if spender tries to transfer more tokens than allowed', async () => {
      const amountToTransfer = ethers.utils.parseEther('60');

      // owner transfiere 1000 tokens a addr1 de su cuenta
      await siliquaCoin.connect(owner).transfer(await addr1.getAddress(), ethers.utils.parseEther('1000'));

      // La dirección addr1 aprueba a addr2 para gastar 50 tokens de su cuenta
      await siliquaCoin.connect(addr1).approve(await addr2.getAddress(), ethers.utils.parseEther('50'));

      // Intenta transferir 60 tokens, debería revertir
      await expect(
        siliquaCoin.connect(addr2).transferFrom(await addr1.getAddress(), await addr3.getAddress(), amountToTransfer)
      ).to.be.revertedWith('ERC20: insufficient allowance');

      // Verifica que el balance de addr3 sigue siendo 0
      const addr3Balance = await siliquaCoin.balanceOf(await addr3.getAddress());
      expect(addr3Balance).to.equal(0);
    });
  });

});
