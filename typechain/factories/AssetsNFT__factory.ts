/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AssetsNFT, AssetsNFTInterface } from "../AssetsNFT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "_uris",
        type: "string[]",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040805160208101909152600081526200002c8162000076565b506004805460ff191690556200004460003362000088565b620000707f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63362000088565b6200029f565b6002620000848282620001d3565b5050565b60008281526003602090815260408083206001600160a01b038516845290915290205460ff16620000845760008281526003602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620000e83390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200015757607f821691505b6020821081036200017857634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001ce576000816000526020600020601f850160051c81016020861015620001a95750805b601f850160051c820191505b81811015620001ca57828155600101620001b5565b5050505b505050565b81516001600160401b03811115620001ef57620001ef6200012c565b620002078162000200845462000142565b846200017e565b602080601f8311600181146200023f5760008415620002265750858301515b600019600386901b1c1916600185901b178555620001ca565b600085815260208120601f198616915b8281101562000270578886015182559484019460019091019084016200024f565b50858210156200028f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61230380620002af6000396000f3fe608060405234801561001057600080fd5b50600436106101415760003560e01c80635c975abb116100b8578063a55784ef1161007c578063a55784ef1461029c578063bb7fde71146102af578063d5391393146102c2578063d547741f146102e9578063e985e9c5146102fc578063f242432a1461033857600080fd5b80635c975abb1461025b5780638456cb591461026657806391d148541461026e578063a217fddf14610281578063a22cb4651461028957600080fd5b80632e1a7d4d1161010a5780632e1a7d4d146101e75780632eb2c2d6146101fa5780632f2ff15d1461020d57806336568abe146102205780633f4ba83a146102335780634e1273f41461023b57600080fd5b8062fdd58e1461014657806301ffc9a71461016c5780630e89341c1461018f578063162094c4146101af578063248a9ca3146101c4575b600080fd5b6101596101543660046116d9565b61034b565b6040519081526020015b60405180910390f35b61017f61017a366004611719565b6103e4565b6040519015158152602001610163565b6101a261019d366004611736565b6103ff565b604051610163919061179f565b6101c26101bd366004611867565b610511565b005b6101596101d2366004611736565b60009081526003602052604090206001015490565b6101c26101f5366004611736565b610542565b6101c2610208366004611946565b61057f565b6101c261021b3660046119ef565b6105cb565b6101c261022e3660046119ef565b6105f0565b6101c261066e565b61024e610249366004611a1b565b610684565b6040516101639190611b17565b60045460ff1661017f565b6101c26107a5565b61017f61027c3660046119ef565b6107b8565b610159600081565b6101c2610297366004611b2a565b6107e3565b6101c26102aa366004611b66565b6107ee565b6101c26102bd366004611c7b565b6108e4565b6101597f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6101c26102f73660046119ef565b6109ad565b61017f61030a366004611cdb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b6101c2610346366004611d05565b6109d2565b60006001600160a01b0383166103bb5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006103ee610a17565b6103f782610a5f565b90505b919050565b6060610409610a17565b6000828152600560205260409020805461042290611d69565b90506000036104735760405162461bcd60e51b815260206004820152601f60248201527f4173736574206e6f74206d696e746564206f7220555249206e6f74207365740060448201526064016103b2565b6000828152600560205260409020805461048c90611d69565b80601f01602080910402602001604051908101604052809291908181526020018280546104b890611d69565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b50505050509050919050565b600061051c81610a84565b610524610a17565b600083815260056020526040902061053c8382611deb565b50505050565b600061054d81610a84565b604051339083156108fc029084906000818181858888f1935050505015801561057a573d6000803e3d6000fd5b505050565b6001600160a01b03851633148061059b575061059b853361030a565b6105b75760405162461bcd60e51b81526004016103b290611eaa565b6105c48585858585610a8e565b5050505050565b6000828152600360205260409020600101546105e681610a84565b61057a8383610c1b565b6001600160a01b03811633146106605760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016103b2565b61066a8282610ca1565b5050565b600061067981610a84565b610681610d08565b50565b606081518351146106e95760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016103b2565b600083516001600160401b03811115610704576107046117b2565b60405190808252806020026020018201604052801561072d578160200160208202803683370190505b50905060005b845181101561079d5761077885828151811061075157610751611ef8565b602002602001015185838151811061076b5761076b611ef8565b602002602001015161034b565b82828151811061078a5761078a611ef8565b6020908102919091010152600101610733565b509392505050565b60006107b081610a84565b610681610d5a565b60009182526003602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61066a338383610d97565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661081881610a84565b610820610a17565b81518451146108715760405162461bcd60e51b815260206004820152601c60248201527f49447320616e642055524973206c656e677468206d69736d617463680000000060448201526064016103b2565b61088c85858560405180602001604052806000815250610e77565b60005b84518110156108dc576108d48582815181106108ad576108ad611ef8565b60200260200101518483815181106108c7576108c7611ef8565b6020026020010151610511565b60010161088f565b505050505050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661090e81610a84565b610916610a17565b6000848152600560205260409020805461092f90611d69565b1590506109885760405162461bcd60e51b815260206004820152602160248201527f417373657420616c7265616479206d696e7465642077697468207468697320696044820152601960fa1b60648201526084016103b2565b6109a385858560405180602001604052806000815250610fb7565b6105c48483610511565b6000828152600360205260409020600101546109c881610a84565b61057a8383610ca1565b6001600160a01b0385163314806109ee57506109ee853361030a565b610a0a5760405162461bcd60e51b81526004016103b290611eaa565b6105c48585858585611091565b60045460ff1615610a5d5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016103b2565b565b60006001600160e01b03198216637965db0b60e01b14806103f757506103f7826111bb565b610681813361120b565b8151835114610aaf5760405162461bcd60e51b81526004016103b290611f0e565b6001600160a01b038416610ad55760405162461bcd60e51b81526004016103b290611f56565b3360005b8451811015610bb5576000858281518110610af657610af6611ef8565b602002602001015190506000858381518110610b1457610b14611ef8565b602090810291909101810151600084815280835260408082206001600160a01b038e168352909352919091205490915081811015610b645760405162461bcd60e51b81526004016103b290611f9b565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610ba1908490611ffb565b909155505060019093019250610ad9915050565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610c0592919061200e565b60405180910390a46108dc818787878787611264565b610c2582826107b8565b61066a5760008281526003602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610c5d3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610cab82826107b8565b1561066a5760008281526003602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b610d106113bf565b6004805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b610d62610a17565b6004805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610d3d3390565b816001600160a01b0316836001600160a01b031603610e0a5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016103b2565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610e9d5760405162461bcd60e51b81526004016103b29061203c565b8151835114610ebe5760405162461bcd60e51b81526004016103b290611f0e565b3360005b8451811015610f4f57838181518110610edd57610edd611ef8565b6020026020010151600080878481518110610efa57610efa611ef8565b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b031681526020019081526020016000206000828254610f429190611ffb565b9091555050600101610ec2565b50846001600160a01b031660006001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610fa092919061200e565b60405180910390a46105c481600087878787611264565b6001600160a01b038416610fdd5760405162461bcd60e51b81526004016103b29061203c565b336000610fe985611408565b90506000610ff685611408565b90506000868152602081815260408083206001600160a01b038b16845290915281208054879290611028908490611ffb565b909155505060408051878152602081018790526001600160a01b03808a1692600092918716917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a461108883600089898989611453565b50505050505050565b6001600160a01b0384166110b75760405162461bcd60e51b81526004016103b290611f56565b3360006110c385611408565b905060006110d085611408565b90506000868152602081815260408083206001600160a01b038c168452909152902054858110156111135760405162461bcd60e51b81526004016103b290611f9b565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a16825281208054889290611150908490611ffb565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46111b0848a8a8a8a8a611453565b505050505050505050565b60006001600160e01b03198216636cdb3d1360e11b14806111ec57506001600160e01b031982166303a24d0760e21b145b806103f757506301ffc9a760e01b6001600160e01b03198316146103f7565b61121582826107b8565b61066a576112228161150e565b61122d836020611520565b60405160200161123e92919061207d565b60408051601f198184030181529082905262461bcd60e51b82526103b29160040161179f565b6001600160a01b0384163b156108dc5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906112a890899089908890889088906004016120f2565b6020604051808303816000875af19250505080156112e3575060408051601f3d908101601f191682019092526112e091810190612150565b60015b61138f576112ef61216d565b806308c379a0036113285750611303612189565b8061130e575061132a565b8060405162461bcd60e51b81526004016103b2919061179f565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e2d455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016103b2565b6001600160e01b0319811663bc197c8160e01b146110885760405162461bcd60e51b81526004016103b290612212565b60045460ff16610a5d5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016103b2565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061144257611442611ef8565b602090810291909101015292915050565b6001600160a01b0384163b156108dc5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190611497908990899088908890889060040161225a565b6020604051808303816000875af19250505080156114d2575060408051601f3d908101601f191682019092526114cf91810190612150565b60015b6114de576112ef61216d565b6001600160e01b0319811663f23a6e6160e01b146110885760405162461bcd60e51b81526004016103b290612212565b60606103f76001600160a01b03831660145b6060600061152f83600261229f565b61153a906002611ffb565b6001600160401b03811115611551576115516117b2565b6040519080825280601f01601f19166020018201604052801561157b576020820181803683370190505b509050600360fc1b8160008151811061159657611596611ef8565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106115c5576115c5611ef8565b60200101906001600160f81b031916908160001a90535060006115e984600261229f565b6115f4906001611ffb565b90505b600181111561166c576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061162857611628611ef8565b1a60f81b82828151811061163e5761163e611ef8565b60200101906001600160f81b031916908160001a90535060049490941c93611665816122b6565b90506115f7565b5083156116bb5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016103b2565b9392505050565b80356001600160a01b03811681146103fa57600080fd5b600080604083850312156116ec57600080fd5b6116f5836116c2565b946020939093013593505050565b6001600160e01b03198116811461068157600080fd5b60006020828403121561172b57600080fd5b81356116bb81611703565b60006020828403121561174857600080fd5b5035919050565b60005b8381101561176a578181015183820152602001611752565b50506000910152565b6000815180845261178b81602086016020860161174f565b601f01601f19169290920160200192915050565b6020815260006116bb6020830184611773565b634e487b7160e01b600052604160045260246000fd5b601f8201601f191681016001600160401b03811182821017156117ed576117ed6117b2565b6040525050565b600082601f83011261180557600080fd5b81356001600160401b0381111561181e5761181e6117b2565b604051611835601f8301601f1916602001826117c8565b81815284602083860101111561184a57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561187a57600080fd5b8235915060208301356001600160401b0381111561189757600080fd5b6118a3858286016117f4565b9150509250929050565b60006001600160401b038211156118c6576118c66117b2565b5060051b60200190565b600082601f8301126118e157600080fd5b813560206118ee826118ad565b6040516118fb82826117c8565b80915083815260208101915060208460051b87010193508684111561191f57600080fd5b602086015b8481101561193b5780358352918301918301611924565b509695505050505050565b600080600080600060a0868803121561195e57600080fd5b611967866116c2565b9450611975602087016116c2565b935060408601356001600160401b038082111561199157600080fd5b61199d89838a016118d0565b945060608801359150808211156119b357600080fd5b6119bf89838a016118d0565b935060808801359150808211156119d557600080fd5b506119e2888289016117f4565b9150509295509295909350565b60008060408385031215611a0257600080fd5b82359150611a12602084016116c2565b90509250929050565b60008060408385031215611a2e57600080fd5b82356001600160401b0380821115611a4557600080fd5b818501915085601f830112611a5957600080fd5b81356020611a66826118ad565b604051611a7382826117c8565b83815260059390931b8501820192828101915089841115611a9357600080fd5b948201945b83861015611ab857611aa9866116c2565b82529482019490820190611a98565b96505086013592505080821115611ace57600080fd5b506118a3858286016118d0565b60008151808452602080850194506020840160005b83811015611b0c57815187529582019590820190600101611af0565b509495945050505050565b6020815260006116bb6020830184611adb565b60008060408385031215611b3d57600080fd5b611b46836116c2565b915060208301358015158114611b5b57600080fd5b809150509250929050565b60008060008060808587031215611b7c57600080fd5b611b85856116c2565b93506020808601356001600160401b0380821115611ba257600080fd5b611bae89838a016118d0565b95506040880135915080821115611bc457600080fd5b611bd089838a016118d0565b94506060880135915080821115611be657600080fd5b818801915088601f830112611bfa57600080fd5b8135611c05816118ad565b604051611c1282826117c8565b82815260059290921b840185019185810191508b831115611c3257600080fd5b8585015b83811015611c6a57803585811115611c4e5760008081fd5b611c5c8e89838a01016117f4565b845250918601918601611c36565b50989b979a50959850505050505050565b60008060008060808587031215611c9157600080fd5b611c9a856116c2565b9350602085013592506040850135915060608501356001600160401b03811115611cc357600080fd5b611ccf878288016117f4565b91505092959194509250565b60008060408385031215611cee57600080fd5b611cf7836116c2565b9150611a12602084016116c2565b600080600080600060a08688031215611d1d57600080fd5b611d26866116c2565b9450611d34602087016116c2565b9350604086013592506060860135915060808601356001600160401b03811115611d5d57600080fd5b6119e2888289016117f4565b600181811c90821680611d7d57607f821691505b602082108103611d9d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561057a576000816000526020600020601f850160051c81016020861015611dcc5750805b601f850160051c820191505b818110156108dc57828155600101611dd8565b81516001600160401b03811115611e0457611e046117b2565b611e1881611e128454611d69565b84611da3565b602080601f831160018114611e4d5760008415611e355750858301515b600019600386901b1c1916600185901b1785556108dc565b600085815260208120601f198616915b82811015611e7c57888601518255948401946001909101908401611e5d565b5085821015611e9a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6020808252602e908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526d195c881bdc88185c1c1c9bdd995960921b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b60208082526028908201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206040820152670dad2e6dac2e8c6d60c31b606082015260800190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b808201808211156103de576103de611fe5565b6040815260006120216040830185611adb565b82810360208401526120338185611adb565b95945050505050565b60208082526021908201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736040820152607360f81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516120b581601785016020880161174f565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516120e681602884016020880161174f565b01602801949350505050565b6001600160a01b0386811682528516602082015260a06040820181905260009061211e90830186611adb565b82810360608401526121308186611adb565b905082810360808401526121448185611773565b98975050505050505050565b60006020828403121561216257600080fd5b81516116bb81611703565b600060033d11156121865760046000803e5060005160e01c5b90565b600060443d10156121975790565b6040516003193d81016004833e81513d6001600160401b0381602484011181841117156121c657505050505090565b82850191508151818111156121de5750505050505090565b843d87010160208285010111156121f85750505050505090565b612207602082860101876117c8565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061229490830184611773565b979650505050505050565b80820281158282048414176103de576103de611fe5565b6000816122c5576122c5611fe5565b50600019019056fea264697066735822122062d4914b7024bd265fd23d2e1f5a2cc2b6bca1597effcfe79bfc26eea79a6a0764736f6c63430008170033";

export class AssetsNFT__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AssetsNFT> {
    return super.deploy(overrides || {}) as Promise<AssetsNFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AssetsNFT {
    return super.attach(address) as AssetsNFT;
  }
  connect(signer: Signer): AssetsNFT__factory {
    return super.connect(signer) as AssetsNFT__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetsNFTInterface {
    return new utils.Interface(_abi) as AssetsNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetsNFT {
    return new Contract(address, _abi, signerOrProvider) as AssetsNFT;
  }
}
