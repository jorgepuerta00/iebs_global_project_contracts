import { ethers } from "hardhat";

async function main() {
  // Obtenemos las cuentas del despliegue
  const [deployer] = await ethers.getSigners();

  console.log('Desplegando contratos con el siguiente address del deployer:', deployer.address);

  // Compilamos los contratos
  console.log('Compilando contratos...');
  const SiliquaCoin = await ethers.getContractFactory('SiliquaCoin');
  const ArtNFT = await ethers.getContractFactory('ArtNFT');
  const GoTLandsNFT = await ethers.getContractFactory('GoTLandsNFT');
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');

  // Desplegamos el contrato Token
  console.log('Desplegando SiliquaCoin...');
  const siliquaCoin = await SiliquaCoin.deploy('SiliquaCoin', 'SILQ', ethers.utils.parseEther('100000000'));
  await siliquaCoin.deployed();
  console.log('SiliquaCoin desplegado en:', siliquaCoin.address);

  // Desplegamos el contrato ArtNFT
  //console.log('Desplegando ArtNFT...');
  //const artNFT = await ArtNFT.deploy();
  //await artNFT.deployed();
  //console.log('ArtNFT desplegado en:', artNFT.address);

  // Desplegamos el contrato GoTLandsNFT
  //console.log('Desplegando GoTLandsNFT...');
  //const gotLandsNFT = await GoTLandsNFT.deploy();
  //await gotLandsNFT.deployed();
  //console.log('GoTLandsNFT desplegado en:', gotLandsNFT.address);

  // Desplegamos el contrato NFTMarketplace, pasando las direcciones de los contratos necesarios como argumentos al constructor
  //console.log('Desplegando NFTMarketplace...');
  //const marketplace = await NFTMarketplace.deploy(siliquaCoin.address, gotLandsNFT.address, 1);
  //await marketplace.deployed();
  //console.log('NFTMarketplace desplegado en:', marketplace.address);

  // Aprobamos el contrato de mercado para gastar los NFT del propietario
  //await artNFT.connect(deployer).setApprovalForAll(marketplace.address, true);
  //await gotLandsNFT.connect(deployer).setApprovalForAll(marketplace.address, true);

  console.log('Contratos desplegados exitosamente.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error al desplegar contratos:', error);
    process.exit(1);
  });