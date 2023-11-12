require('dotenv').config();

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

const chainIds = {
  eth_goerli_id: 5,
  eth_sepolia_id: 11155111,
  eth_ganache_id: 1337,
  polygon_mumbai_id: 80001,
};

const {
  SIGNER_PRIVATE_KEY,
  ETH_GOERLI_TESTNET_RPC,
  ETH_SCAN_API_KEY,
  ETH_SEPOLIA_TESTNET_RPC,
  LOCALHOST_GANACHE_TESTNET_RPC,
  GANACHE_SIGNER_PRIVATE_KEY
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  networks: {
    ganache: {
      url: LOCALHOST_GANACHE_TESTNET_RPC,
      chainId: chainIds.eth_ganache_id,
      accounts: GANACHE_SIGNER_PRIVATE_KEY !== undefined ? [GANACHE_SIGNER_PRIVATE_KEY] : [],
    },
    goerli: {
      url: ETH_GOERLI_TESTNET_RPC,
      chainId: chainIds.eth_goerli_id,
      accounts: SIGNER_PRIVATE_KEY !== undefined ? [SIGNER_PRIVATE_KEY] : [],
    },
    sepolia: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_PRIVATE_KEY !== undefined ? [SIGNER_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETH_SCAN_API_KEY !== undefined ? ETH_SCAN_API_KEY : "",
      sepolia: ETH_SCAN_API_KEY !== undefined ? ETH_SCAN_API_KEY : "",
    }
  },
  mocha: {
    timeout: 0
  },
  paths: {
    artifacts: "./src/artifacts",
  }
};

export default config;