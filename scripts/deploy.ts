import { ethers } from "hardhat";

async function main() {
  // Obtenemos las cuentas del despliegue
  const [deployer] = await ethers.getSigners();

  console.log('Desplegando contratos con el siguiente address del deployer:', deployer.address);

  // Compilamos los contratos
  console.log('Compilando contratos...');
  const Token = await ethers.getContractFactory('SiliquaCoin');
  const LoanPlatform = await ethers.getContractFactory('LoanPlatform');

  // Desplegamos el contrato Token
  console.log('Desplegando Token...');
  const token = await Token.deploy('SiliquaCoin', 'SILQ', 18, ethers.utils.parseEther('60000000'));
  await token.deployed();
  console.log('Token desplegado en:', token.address);

  // Desplegamos el contrato LoanPlatform, pasando la dirección del token como argumento al constructor
  console.log('Desplegando LoanPlatform...');
  const loanPlatform = await LoanPlatform.deploy(token.address, 10);
  await loanPlatform.deployed();
  console.log('LoanPlatform desplegado en:', loanPlatform.address);

  console.log('Contratos desplegados exitosamente.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error al desplegar contratos:', error);
    process.exit(1);
  });
