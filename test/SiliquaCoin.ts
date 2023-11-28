import { expect } from 'chai';
import { ContractFactory, Signer } from "ethers";
import { ethers } from 'hardhat';
import { SiliquaCoin } from '../typechain';

xdescribe('SiliquaCoin', () => {
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

  describe('Receive Ether', () => {
    it('SiliquaCoin should receive 0.5 ETH and mint 0.25 SiliquaCoin to addr3 address', async () => {
      const initialBalance = await siliquaCoin.balanceOf(await addr3.getAddress());
      expect(initialBalance).to.equal(0);

      // send 100 ETH to the contract
      await addr3.sendTransaction({
        to: siliquaCoin.address,
        value: ethers.utils.parseEther('0.5')
      });

      // validate contract balance is 100 ETH
      const contractBalance = await ethers.provider.getBalance(siliquaCoin.address);
      expect(contractBalance).to.equal(ethers.utils.parseEther('0.5'));

      // validate addr3 balance is initial balance + 50 SiliquaCoin
      const finalBalance = await siliquaCoin.balanceOf(await addr3.getAddress());
      expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseEther('500')));
    });
  });

  describe('Claim Tokens', () => {
    it('Should allow user to claim tokens', async () => {
      // get user initial balance
      const initialBalance = await siliquaCoin.balanceOf(await addr1.getAddress());

      // increase time by 1 day
      await ethers.provider.send('evm_increaseTime', [24 * 60 * 60]); // 24 horas

      // claim tokens
      await siliquaCoin.connect(addr1).claimTokens();

      // validate user balance has increased by 100 tokens
      const addr1BalanceAfterClaim = await siliquaCoin.balanceOf(await addr1.getAddress());
      expect(addr1BalanceAfterClaim).to.equal(initialBalance.add(ethers.utils.parseEther('1')));
    });

    it("Shouldn't allow user to claim tokens before 1 day", async () => {
      // claim tokens
      await siliquaCoin.connect(addr1).claimTokens();

      // get user initial balance
      const initialBalance = await siliquaCoin.balanceOf(await addr1.getAddress());

      // claim tokens again, should revert
      await expect(siliquaCoin.connect(addr1).claimTokens()).to.be.revertedWith('You can claim tokens once per day');

      // validate user balance hasn't changed
      const addr1BalanceAfterFailedClaim = await siliquaCoin.balanceOf(await addr1.getAddress());
      expect(addr1BalanceAfterFailedClaim).to.equal(initialBalance);
    });
  });

});
