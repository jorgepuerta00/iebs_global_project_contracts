/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AvatarMarketplace,
  AvatarMarketplaceInterface,
} from "../AvatarMarketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_commissionPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCommissionPercentage",
        type: "uint256",
      },
    ],
    name: "CommissionPercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newNFTContractAddress",
        type: "address",
      },
    ],
    name: "NFTContractUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "NFTListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "NFTListingCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "NFTPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfNFTs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "NFTsPurchasedPackage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
        internalType: "address",
        name: "newSiliquaCoinAddress",
        type: "address",
      },
    ],
    name: "SiliquaCoinUpdated",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_listingId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "commissionPercentage",
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
    inputs: [],
    name: "getActiveListings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "listingId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct AvatarMarketplace.Listing[]",
        name: "activeListings",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "listingId",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
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
    inputs: [],
    name: "nftToken",
    outputs: [
      {
        internalType: "contract AvatarNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "_listingId",
        type: "uint256",
      },
    ],
    name: "purchaseNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_numberOfNFTs",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isRevealed",
        type: "bool",
      },
    ],
    name: "purchaseNFTsPackage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMintPrice",
        type: "uint256",
      },
    ],
    name: "setMintPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
    ],
    name: "setNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
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
    name: "totalCommissionEarned",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_newCommissionPercentage",
        type: "uint256",
      },
    ],
    name: "updateCommissionPercentage",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60806040526000600655671bc16d674ec8000060075534801561002157600080fd5b5060405161185f38038061185f833981016040819052610040916100cb565b6100493361007b565b60018055600280546001600160a01b03909316610100026001600160a81b031990931692909217909155600355610105565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100de57600080fd5b82516001600160a01b03811681146100f557600080fd5b6020939093015192949293505050565b61174b806101146000396000f3fe60806040526004361061014b5760003560e01c80639405dfdd116100b6578063d2bfeb6d1161006f578063d2bfeb6d1461039f578063d575fe64146103b2578063de74e57b146103c8578063f23a6e6114610451578063f2fde38b1461047d578063f4a0a5281461049d57600080fd5b80639405dfdd146102c957806394383f14146102df578063a7ccabdf146102ff578063bc197c811461031f578063c73cdd2314610364578063d06fcba81461037a57600080fd5b80636817c76c116101085780636817c76c14610207578063715018a61461022b5780638456cb591461024057806387c35bc0146102555780638ce2199e146102775780638da5cb5b1461029757600080fd5b806301ffc9a714610150578063150bde03146101855780632e1a7d4d1461019a578063305a67a8146101ba5780633f4ba83a146101da5780635c975abb146101ef575b600080fd5b34801561015c57600080fd5b5061017061016b3660046112ba565b6104bd565b60405190151581526020015b60405180910390f35b6101986101933660046112eb565b6104f4565b005b3480156101a657600080fd5b506101986101b53660046112eb565b6107b0565b3480156101c657600080fd5b506101986101d53660046112eb565b6107e9565b3480156101e657600080fd5b506101986109df565b3480156101fb57600080fd5b5060025460ff16610170565b34801561021357600080fd5b5061021d60075481565b60405190815260200161017c565b34801561023757600080fd5b506101986109f1565b34801561024c57600080fd5b50610198610a03565b34801561026157600080fd5b5061026a610a13565b60405161017c9190611304565b34801561028357600080fd5b506101986102923660046112eb565b610ba3565b3480156102a357600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200161017c565b3480156102d557600080fd5b5061021d60065481565b3480156102eb57600080fd5b506101986102fa36600461137d565b610c3f565b34801561030b57600080fd5b5061019861031a3660046113b4565b610e69565b34801561032b57600080fd5b5061034b61033a366004611508565b63bc197c8160e01b95945050505050565b6040516001600160e01b0319909116815260200161017c565b34801561037057600080fd5b5061021d60045481565b34801561038657600080fd5b506002546102b19061010090046001600160a01b031681565b6101986103ad3660046115b6565b610ecb565b3480156103be57600080fd5b5061021d60035481565b3480156103d457600080fd5b5061041f6103e33660046112eb565b6005602052600090815260409020805460018201546002830154600384015460049094015492936001600160a01b039092169290919060ff1685565b604080519586526001600160a01b0390941660208601529284019190915260608301521515608082015260a00161017c565b34801561045d57600080fd5b5061034b61046c3660046115eb565b63f23a6e6160e01b95945050505050565b34801561048957600080fd5b506101986104983660046113b4565b611016565b3480156104a957600080fd5b506101986104b83660046112eb565b61108c565b60006001600160e01b03198216630271189760e51b14806104ee57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6104fc611099565b6105046110f2565b600654811061054d5760405162461bcd60e51b815260206004820152601060248201526f125108191bd95cdb89dd08195e1a5cdd60821b60448201526064015b60405180910390fd5b6000818152600560205260409020600481015460ff166105a75760405162461bcd60e51b81526020600482015260156024820152744c697374696e67206973206e6f742061637469766560581b6044820152606401610544565b806003015434146105ec5760405162461bcd60e51b815260206004820152600f60248201526e496e636f727265637420707269636560881b6044820152606401610544565b600060646003548360030154610602919061166a565b61060c9190611681565b9050806004600082825461062091906116a3565b9091555050600080546040516001600160a01b039091169183156108fc02918491818181858888f1935050505015801561065e573d6000803e3d6000fd5b50600081836003015461067191906116b6565b60018401546040519192506001600160a01b03169082156108fc029083906000818181858888f193505050501580156106ae573d6000803e3d6000fd5b506002805490840154604051632142170760e11b815230600482015233602482015260448101919091526101009091046001600160a01b0316906342842e0e90606401600060405180830381600087803b15801561070b57600080fd5b505af115801561071f573d6000803e3d6000fd5b5050505060048301805460ff1916905560018301546002840154604080519182523460208301526060828201819052600990830152681c1d5c98da185cd95960ba1b6080830152516001600160a01b0390921691339187917f12c5db205c15a58219d216eea2f3362efc64a7e2db9a9b7237eae6ea6e6e30049181900360a00190a45050506107ad60018055565b50565b6107b8611138565b604051339082156108fc029083906000818181858888f193505050501580156107e5573d6000803e3d6000fd5b5050565b6107f16110f2565b60065481106108375760405162461bcd60e51b8152602060048201526012602482015271125b9d985b1a59081b1a5cdd1a5b99c8125160721b6044820152606401610544565b600081815260056020526040902060018101546001600160a01b031633146108b05760405162461bcd60e51b815260206004820152602660248201527f4f6e6c79207468652073656c6c65722063616e2063616e63656c20746865206c604482015265697374696e6760d01b6064820152608401610544565b600481015460ff166108fc5760405162461bcd60e51b81526020600482015260156024820152744c697374696e67206973206e6f742061637469766560581b6044820152606401610544565b60028054908201546040516323b872dd60e01b815230600482015233602482015260448101919091526101009091046001600160a01b0316906323b872dd90606401600060405180830381600087803b15801561095857600080fd5b505af115801561096c573d6000803e3d6000fd5b5050505060048101805460ff191690556002810154600382015460408051918252602082018190526009828201526818d85b98d95b1b195960ba1b606083015251339185917f4365cb53484debef7671e094e8cead2a45d4b329d842264eb2c68b1f1f46d3a39181900360800190a45050565b6109e7611138565b6109ef611192565b565b6109f9611138565b6109ef60006111e4565b610a0b611138565b6109ef611234565b6060610a1d6110f2565b6000805b600654811015610a5b5760008181526005602052604090206004015460ff1615610a535781610a4f816116c9565b9250505b600101610a21565b508067ffffffffffffffff811115610a7557610a756113d1565b604051908082528060200260200182016040528015610ae357816020015b610ad06040518060a001604052806000815260200160006001600160a01b0316815260200160008152602001600081526020016000151581525090565b815260200190600190039081610a935790505b5091506000805b600654811015610b9d5760008181526005602052604090206004015460ff1615610b9557600081815260056020908152604091829020825160a0810184528154815260018201546001600160a01b0316928101929092526002810154928201929092526003820154606082015260049091015460ff16151560808201528451859084908110610b7b57610b7b6116e2565b60200260200101819052508180610b91906116c9565b9250505b600101610aea565b50505090565b610bab611138565b610bb36110f2565b6064811115610c045760405162461bcd60e51b815260206004820152601d60248201527f496e76616c696420636f6d6d697373696f6e2070657263656e746167650000006044820152606401610544565b60038190556040518181527f7e3665a83046ac3c4ec146cf309edab9d75086c48761909ce868f5c65743f4f19060200160405180910390a150565b610c476110f2565b6002546040516331a9108f60e11b815260048101849052339161010090046001600160a01b031690636352211e90602401602060405180830381865afa158015610c95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb991906116f8565b6001600160a01b031614610d055760405162461bcd60e51b815260206004820152601360248201527213db9b1e481bdddb995c8818d85b881cd95b1b606a1b6044820152606401610544565b6002546040516323b872dd60e01b8152336004820152306024820152604481018490526101009091046001600160a01b0316906323b872dd90606401600060405180830381600087803b158015610d5b57600080fd5b505af1158015610d6f573d6000803e3d6000fd5b50506040805160a081018252600680548083523360208085018281528587018b815260608088018c815260016080808b018281526000998a5260058852988c90209a518b559451908a0180546001600160a01b0319166001600160a01b03909216919091179055915160028901559051600388015593516004909601805460ff191696151596909617909555835486518a815291820187905295810193909352651b1a5cdd195960d21b9183019190915287955093507f1874edc4dd8ef51672d2c7645e73e04998f9bed81a6dbc28eb3dc65a06d725bf910160405180910390a460068054906000610e60836116c9565b91905055505050565b610e71611138565b610e796110f2565b60028054610100600160a81b0319166101006001600160a01b038416908102919091179091556040517ff2610996d245d9b77e4ff84c2174eea0b76fb44c422218404f66e28816d78fb990600090a250565b610ed3611099565b610edb6110f2565b600082600754610eeb919061166a565b9050803414610f505760405162461bcd60e51b815260206004820152602b60248201527f4d7573742073656e6420746865206578616374206d696e74207072696365206660448201526a6f7220616c6c204e46547360a81b6064820152608401610544565b60005b83811015610fd057600254604051630424cb0d60e01b815233600482015284151560248201526101009091046001600160a01b031690630424cb0d90604401600060405180830381600087803b158015610fac57600080fd5b505af1158015610fc0573d6000803e3d6000fd5b505060019092019150610f539050565b50604080518481526020810183905233917ff7ef44022af801ee362390dbe22b2c145e7dfc5e2b651b22e2b1d486b161e654910160405180910390a2506107e560018055565b61101e611138565b6001600160a01b0381166110835760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610544565b6107ad816111e4565b611094611138565b600755565b6002600154036110eb5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610544565b6002600155565b60025460ff16156109ef5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610544565b6000546001600160a01b031633146109ef5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610544565b61119a611271565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61123c6110f2565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586111c73390565b60025460ff166109ef5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610544565b6000602082840312156112cc57600080fd5b81356001600160e01b0319811681146112e457600080fd5b9392505050565b6000602082840312156112fd57600080fd5b5035919050565b602080825282518282018190526000919060409081850190868401855b8281101561137057815180518552868101516001600160a01b03168786015285810151868601526060808201519086015260809081015115159085015260a09093019290850190600101611321565b5091979650505050505050565b6000806040838503121561139057600080fd5b50508035926020909101359150565b6001600160a01b03811681146107ad57600080fd5b6000602082840312156113c657600080fd5b81356112e48161139f565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611410576114106113d1565b604052919050565b600082601f83011261142957600080fd5b8135602067ffffffffffffffff821115611445576114456113d1565b8160051b6114548282016113e7565b928352848101820192828101908785111561146e57600080fd5b83870192505b8483101561148d57823582529183019190830190611474565b979650505050505050565b600082601f8301126114a957600080fd5b813567ffffffffffffffff8111156114c3576114c36113d1565b6114d6601f8201601f19166020016113e7565b8181528460208386010111156114eb57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561152057600080fd5b853561152b8161139f565b9450602086013561153b8161139f565b9350604086013567ffffffffffffffff8082111561155857600080fd5b61156489838a01611418565b9450606088013591508082111561157a57600080fd5b61158689838a01611418565b9350608088013591508082111561159c57600080fd5b506115a988828901611498565b9150509295509295909350565b600080604083850312156115c957600080fd5b82359150602083013580151581146115e057600080fd5b809150509250929050565b600080600080600060a0868803121561160357600080fd5b853561160e8161139f565b9450602086013561161e8161139f565b93506040860135925060608601359150608086013567ffffffffffffffff81111561164857600080fd5b6115a988828901611498565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176104ee576104ee611654565b60008261169e57634e487b7160e01b600052601260045260246000fd5b500490565b808201808211156104ee576104ee611654565b818103818111156104ee576104ee611654565b6000600182016116db576116db611654565b5060010190565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561170a57600080fd5b81516112e48161139f56fea26469706673582212208502a5e4c9aa76ac5b0bc1a1d77748bb6007729ebe4048a9b27bc738deb5a5dc64736f6c63430008170033";

export class AvatarMarketplace__factory extends ContractFactory {
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
    _nftContractAddress: string,
    _commissionPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AvatarMarketplace> {
    return super.deploy(
      _nftContractAddress,
      _commissionPercentage,
      overrides || {}
    ) as Promise<AvatarMarketplace>;
  }
  getDeployTransaction(
    _nftContractAddress: string,
    _commissionPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _nftContractAddress,
      _commissionPercentage,
      overrides || {}
    );
  }
  attach(address: string): AvatarMarketplace {
    return super.attach(address) as AvatarMarketplace;
  }
  connect(signer: Signer): AvatarMarketplace__factory {
    return super.connect(signer) as AvatarMarketplace__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AvatarMarketplaceInterface {
    return new utils.Interface(_abi) as AvatarMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AvatarMarketplace {
    return new Contract(address, _abi, signerOrProvider) as AvatarMarketplace;
  }
}
