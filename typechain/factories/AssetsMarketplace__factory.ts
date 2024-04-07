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
  AssetsMarketplace,
  AssetsMarketplaceInterface,
} from "../AssetsMarketplace";

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
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "BundleMinted",
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
        indexed: false,
        internalType: "string",
        name: "status",
        type: "string",
      },
    ],
    name: "ListingUpdated",
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
    name: "bundlePrice",
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
        name: "listingId",
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
            name: "amount",
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
        internalType: "struct AssetsMarketplace.Listing[]",
        name: "",
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
        name: "listingId",
        type: "uint256",
      },
    ],
    name: "getListingById",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "amount",
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
    name: "nftToken",
    outputs: [
      {
        internalType: "contract AssetsNFT",
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
    inputs: [],
    name: "purchaseBundleNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "purchaseSingleNFT",
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
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "updateBundlePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPercentage",
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
        internalType: "address",
        name: "newContract",
        type: "address",
      },
    ],
    name: "updateNFTContract",
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
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526001600655662386f26fc1000060075534801561002057600080fd5b5060405162001b1138038062001b11833981016040819052610041916100cc565b61004a3361007c565b60018055600280546001600160a01b03909316610100026001600160a81b031990931692909217909155600355610106565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100df57600080fd5b82516001600160a01b03811681146100f657600080fd5b6020939093015192949293505050565b6119fb80620001166000396000f3fe6080604052600436106101665760003560e01c80638456cb59116100d1578063bc197c811161008a578063d575fe6411610064578063d575fe64146104a0578063de74e57b146104b6578063f23a6e6114610513578063f2fde38b1461053f57600080fd5b8063bc197c8114610420578063c73cdd2314610465578063d06fcba81461047b57600080fd5b80638456cb591461035357806387c35bc0146103685780638ce2199e1461038a5780638da5cb5b146103aa5780638dca9e1a146103dc578063b0136c8d1461040057600080fd5b80635995aa6d116101235780635995aa6d146102cb5780635c975abb146102d3578063715018a6146102eb57806378627f2b1461030057806378d48369146103205780637d610c531461033357600080fd5b806301ffc9a71461016b578063150bde03146101a0578063155dd5ee146101b5578063305a67a8146101d55780633f4ba83a146101f55780634f85310f1461020a575b600080fd5b34801561017757600080fd5b5061018b61018636600461148c565b61055f565b60405190151581526020015b60405180910390f35b6101b36101ae3660046114bd565b610596565b005b3480156101c157600080fd5b506101b36101d03660046114bd565b610839565b3480156101e157600080fd5b506101b36101f03660046114bd565b610872565b34801561020157600080fd5b506101b36109d1565b34801561021657600080fd5b506102946102253660046114bd565b600090815260056020818152604092839020835160c081018552815480825260018301546001600160a01b03169382018490526002830154958201869052600383015460608301819052600484015460808401819052939095015460ff16151560a09092018290529592949392565b604080519687526001600160a01b0390951660208701529385019290925260608401526080830152151560a082015260c001610197565b6101b36109e3565b3480156102df57600080fd5b5060025460ff1661018b565b3480156102f757600080fd5b506101b3610bd3565b34801561030c57600080fd5b506101b361031b3660046114f2565b610be5565b6101b361032e3660046114bd565b610c15565b34801561033f57600080fd5b506101b361034e3660046114bd565b610da9565b34801561035f57600080fd5b506101b3610db6565b34801561037457600080fd5b5061037d610dc6565b604051610197919061150d565b34801561039657600080fd5b506101b36103a53660046114bd565b610f30565b3480156103b657600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610197565b3480156103e857600080fd5b506103f260075481565b604051908152602001610197565b34801561040c57600080fd5b506101b361041b366004611590565b610f84565b34801561042c57600080fd5b5061044c61043b3660046116f3565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610197565b34801561047157600080fd5b506103f260045481565b34801561048757600080fd5b506002546103c49061010090046001600160a01b031681565b3480156104ac57600080fd5b506103f260035481565b3480156104c257600080fd5b506102946104d13660046114bd565b600560208190526000918252604090912080546001820154600283015460038401546004850154949095015492946001600160a01b0390921693909260ff1686565b34801561051f57600080fd5b5061044c61052e36600461179d565b63f23a6e6160e01b95945050505050565b34801561054b57600080fd5b506101b361055a3660046114f2565b6111ae565b60006001600160e01b03198216630271189760e51b148061059057506301ffc9a760e01b6001600160e01b03198316145b92915050565b61059e611224565b6105a661127d565b600081815260056020526040902060018101546001600160a01b031661060c5760405162461bcd60e51b8152602060048201526016602482015275131a5cdd1a5b99c8191bd95cc81b9bdd08195e1a5cdd60521b60448201526064015b60405180910390fd5b600581015460ff166106535760405162461bcd60e51b815260206004820152601060248201526f496e616374697665206c697374696e6760801b6044820152606401610603565b806004015434146106985760405162461bcd60e51b815260206004820152600f60248201526e496e636f727265637420707269636560881b6044820152606401610603565b60006064600354346106aa9190611818565b6106b49190611845565b905080600460008282546106c89190611859565b9091555050600080546040516001600160a01b039091169183156108fc02918491818181858888f19350505050158015610706573d6000803e3d6000fd5b50600182015460048301546001600160a01b03909116906108fc9061072c90849061186c565b6040518115909202916000818181858888f19350505050158015610754573d6000803e3d6000fd5b5060028054908301546003840154604051637921219560e11b81526101009093046001600160a01b03169263f242432a926107979230923392919060040161187f565b600060405180830381600087803b1580156107b157600080fd5b505af11580156107c5573d6000803e3d6000fd5b50505060058301805460ff191690555060405183907fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d9190610823906020808252600990820152681c1d5c98da185cd95960ba1b604082015260600190565b60405180910390a2505061083660018055565b50565b6108416112c3565b604051339082156108fc029083906000818181858888f1935050505015801561086e573d6000803e3d6000fd5b5050565b61087a61127d565b600081815260056020526040902060018101546001600160a01b03166108db5760405162461bcd60e51b8152602060048201526016602482015275131a5cdd1a5b99c8191bd95cc81b9bdd08195e1a5cdd60521b6044820152606401610603565b60018101546001600160a01b031633146109245760405162461bcd60e51b815260206004820152600a6024820152692737ba1039b2b63632b960b11b6044820152606401610603565b600581015460ff1661096b5760405162461bcd60e51b815260206004820152601060248201526f416c726561647920696e61637469766560801b6044820152606401610603565b60058101805460ff1916905560405182907fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d91906109c59060208082526009908201526818d85b98d95b1b195960ba1b604082015260600190565b60405180910390a25050565b6109d96112c3565b6109e161131d565b565b6109eb61127d565b6007543414610a3c5760405162461bcd60e51b815260206004820152601a60248201527f496e636f72726563742076616c756520666f722062756e646c650000000000006044820152606401610603565b60408051600580825260c082019092526000916020820160a080368337505060408051600580825260c0820190925292935060009291506020820160a08036833701905050905060005b6005811015610b2957604080514260208201526bffffffffffffffffffffffff193360601b169181019190915260548101829052612710906074016040516020818303038152906040528051906020012060001c610ae491906118b7565b838281518110610af657610af66118cb565b6020026020010181815250506001828281518110610b1657610b166118cb565b6020908102919091010152600101610a86565b5060025460405163d81d0a1560e01b81526101009091046001600160a01b03169063d81d0a1590610b629033908690869060040161191d565b600060405180830381600087803b158015610b7c57600080fd5b505af1158015610b90573d6000803e3d6000fd5b50505050336001600160a01b03167f2b4ebc224819d6a442e194746a6afefca1c9c36b6fc73dd54e4c1460337103ef83836007546040516109c59392919061195d565b610bdb6112c3565b6109e1600061136f565b610bed6112c3565b600280546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b610c1d61127d565b6007543414610c6e5760405162461bcd60e51b815260206004820152601e60248201527f496e636f72726563742076616c756520666f722073696e676c65204e465400006044820152606401610603565b6040805160018082528183019092526000916020808301908036833750506040805160018082528183019092529293506000929150602080830190803683370190505090508282600081518110610cc757610cc76118cb565b602002602001018181525050600181600081518110610ce857610ce86118cb565b602090810291909101015260025460405163d81d0a1560e01b81526101009091046001600160a01b03169063d81d0a1590610d2b9033908690869060040161191d565b600060405180830381600087803b158015610d4557600080fd5b505af1158015610d59573d6000803e3d6000fd5b50505050336001600160a01b03167f2b4ebc224819d6a442e194746a6afefca1c9c36b6fc73dd54e4c1460337103ef8383600754604051610d9c9392919061195d565b60405180910390a2505050565b610db16112c3565b600755565b610dbe6112c3565b6109e16113bf565b60606000610dd26113fc565b905060008167ffffffffffffffff811115610def57610def6115bc565b604051908082528060200260200182016040528015610e6457816020015b610e516040518060c001604052806000815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b815260200190600190039081610e0d5790505b509050600060015b600654811015610f27576000818152600560208190526040909120015460ff1615610f1f57600081815260056020818152604092839020835160c0810185528154815260018201546001600160a01b031692810192909252600281015493820193909352600383015460608201526004830154608082015291015460ff16151560a08201528351849084908110610f0557610f056118cb565b60200260200101819052508180610f1b90611993565b9250505b600101610e6c565b50909392505050565b610f386112c3565b6064811115610f7f5760405162461bcd60e51b81526020600482015260136024820152720a0cae4c6cadce8c2ceca40e8dede40d0d2ced606b1b6044820152606401610603565b600355565b610f8c61127d565b600254604051627eeac760e11b815233600482015260248101859052839161010090046001600160a01b03169062fdd58e90604401602060405180830381865afa158015610fde573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100291906119ac565b10156110475760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606401610603565b600254604051637921219560e11b81526101009091046001600160a01b03169063f242432a9061108190339030908890889060040161187f565b600060405180830381600087803b15801561109b57600080fd5b505af11580156110af573d6000803e3d6000fd5b50506040805160c081018252600680548083523360208085019182528486018b815260608087018c8152608088018c8152600160a08a0181815260009889526005808852988c90209a518b559651908a0180546001600160a01b0319166001600160a01b039092169190911790559251600289015551600388015590516004870155915194909201805460ff1916941515949094179093558154845182815291820192909252651b1a5cdd195960d21b9381019390935293507fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d9192500160405180910390a2600680549060006111a483611993565b9190505550505050565b6111b66112c3565b6001600160a01b03811661121b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610603565b6108368161136f565b6002600154036112765760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610603565b6002600155565b60025460ff16156109e15760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610603565b6000546001600160a01b031633146109e15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610603565b611325611443565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6113c761127d565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586113523390565b60008060015b60065481101561143d576000818152600560208190526040909120015460ff1615611435578161143181611993565b9250505b600101611402565b50919050565b60025460ff166109e15760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610603565b60006020828403121561149e57600080fd5b81356001600160e01b0319811681146114b657600080fd5b9392505050565b6000602082840312156114cf57600080fd5b5035919050565b80356001600160a01b03811681146114ed57600080fd5b919050565b60006020828403121561150457600080fd5b6114b6826114d6565b602080825282518282018190526000919060409081850190868401855b8281101561158357815180518552868101516001600160a01b0316878601528581015186860152606080820151908601526080808201519086015260a09081015115159085015260c0909301929085019060010161152a565b5091979650505050505050565b6000806000606084860312156115a557600080fd5b505081359360208301359350604090920135919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156115fb576115fb6115bc565b604052919050565b600082601f83011261161457600080fd5b8135602067ffffffffffffffff821115611630576116306115bc565b8160051b61163f8282016115d2565b928352848101820192828101908785111561165957600080fd5b83870192505b848310156116785782358252918301919083019061165f565b979650505050505050565b600082601f83011261169457600080fd5b813567ffffffffffffffff8111156116ae576116ae6115bc565b6116c1601f8201601f19166020016115d2565b8181528460208386010111156116d657600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561170b57600080fd5b611714866114d6565b9450611722602087016114d6565b9350604086013567ffffffffffffffff8082111561173f57600080fd5b61174b89838a01611603565b9450606088013591508082111561176157600080fd5b61176d89838a01611603565b9350608088013591508082111561178357600080fd5b5061179088828901611683565b9150509295509295909350565b600080600080600060a086880312156117b557600080fd5b6117be866114d6565b94506117cc602087016114d6565b93506040860135925060608601359150608086013567ffffffffffffffff8111156117f657600080fd5b61179088828901611683565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761059057610590611802565b634e487b7160e01b600052601260045260246000fd5b6000826118545761185461182f565b500490565b8082018082111561059057610590611802565b8181038181111561059057610590611802565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6000826118c6576118c661182f565b500690565b634e487b7160e01b600052603260045260246000fd5b60008151808452602080850194506020840160005b83811015611912578151875295820195908201906001016118f6565b509495945050505050565b6001600160a01b0384168152606060208201819052600090611941908301856118e1565b828103604084015261195381856118e1565b9695505050505050565b60608152600061197060608301866118e1565b828103602084015261198281866118e1565b915050826040830152949350505050565b6000600182016119a5576119a5611802565b5060010190565b6000602082840312156119be57600080fd5b505191905056fea2646970667358221220b3e1a6017c3f423c88a76543290870687d49ed6bd93d78ee850ff24682ba6ac064736f6c63430008170033";

export class AssetsMarketplace__factory extends ContractFactory {
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
  ): Promise<AssetsMarketplace> {
    return super.deploy(
      _nftContractAddress,
      _commissionPercentage,
      overrides || {}
    ) as Promise<AssetsMarketplace>;
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
  attach(address: string): AssetsMarketplace {
    return super.attach(address) as AssetsMarketplace;
  }
  connect(signer: Signer): AssetsMarketplace__factory {
    return super.connect(signer) as AssetsMarketplace__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetsMarketplaceInterface {
    return new utils.Interface(_abi) as AssetsMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetsMarketplace {
    return new Contract(address, _abi, signerOrProvider) as AssetsMarketplace;
  }
}
