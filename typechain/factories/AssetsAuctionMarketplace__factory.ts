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
  AssetsAuctionMarketplace,
  AssetsAuctionMarketplaceInterface,
} from "../AssetsAuctionMarketplace";

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
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
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
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startingPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winningBid",
        type: "uint256",
      },
    ],
    name: "AuctionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bidAmount",
        type: "uint256",
      },
    ],
    name: "BidPlaced",
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
    name: "auctionId",
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
    name: "auctions",
    outputs: [
      {
        internalType: "uint256",
        name: "auctionId",
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
        name: "startingPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "highestBid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "highestBidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "auctionEndTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "ended",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
    inputs: [
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
        internalType: "uint256",
        name: "_startingPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "endAuction",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_auctionId",
        type: "uint256",
      },
    ],
    name: "placeBid",
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
  "0x6080604052600060065534801561001557600080fd5b506040516114d03803806114d0833981016040819052610034916100bf565b61003d3361006f565b60018055600280546001600160a01b03909316610100026001600160a81b0319909316929092179091556003556100f9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100d257600080fd5b82516001600160a01b03811681146100e957600080fd5b6020939093015192949293505050565b6113c8806101086000396000f3fe60806040526004361061011f5760003560e01c80638da5cb5b116100a0578063c73cdd2311610064578063c73cdd23146103c9578063d06fcba8146103df578063d575fe6414610404578063f23a6e611461041a578063f2fde38b1461044657600080fd5b80638da5cb5b146102ff5780639979ef4514610331578063a7ccabdf14610344578063b9a2de3a14610364578063bc197c811461038457600080fd5b8063571a26a0116100e7578063571a26a0146101d45780635c975abb1461029d578063715018a6146102b55780638456cb59146102ca5780638ce2199e146102df57600080fd5b806301ffc9a71461012457806310782f8f146101595780632e1a7d4d1461017d5780633f4ba83a1461019f578063431f21da146101b4575b600080fd5b34801561013057600080fd5b5061014461013f366004610fe2565b610466565b60405190151581526020015b60405180910390f35b34801561016557600080fd5b5061016f60065481565b604051908152602001610150565b34801561018957600080fd5b5061019d610198366004611013565b61049d565b005b3480156101ab57600080fd5b5061019d6104d6565b3480156101c057600080fd5b5061019d6101cf36600461102c565b6104e8565b3480156101e057600080fd5b5061024a6101ef366004611013565b600560208190526000918252604090912080546001820154600283015460038401546004850154958501546006860154600787015460089097015495976001600160a01b039586169794969395909492939116919060ff1689565b60408051998a526001600160a01b0398891660208b01528901969096526060880194909452608087019290925260a086015290921660c084015260e0830191909152151561010082015261012001610150565b3480156102a957600080fd5b5060025460ff16610144565b3480156102c157600080fd5b5061019d6107b2565b3480156102d657600080fd5b5061019d6107c4565b3480156102eb57600080fd5b5061019d6102fa366004611013565b6107d4565b34801561030b57600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610150565b61019d61033f366004611013565b61083a565b34801561035057600080fd5b5061019d61035f36600461107a565b610a17565b34801561037057600080fd5b5061019d61037f366004611013565b610a4f565b34801561039057600080fd5b506103b061039f3660046111cc565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610150565b3480156103d557600080fd5b5061016f60045481565b3480156103eb57600080fd5b506002546103199061010090046001600160a01b031681565b34801561041057600080fd5b5061016f60035481565b34801561042657600080fd5b506103b0610435366004611276565b63f23a6e6160e01b95945050505050565b34801561045257600080fd5b5061019d61046136600461107a565b610d4b565b60006001600160e01b03198216630271189760e51b148061049757506301ffc9a760e01b6001600160e01b03198316145b92915050565b6104a5610dc1565b604051339082156108fc029083906000818181858888f193505050501580156104d2573d6000803e3d6000fd5b5050565b6104de610dc1565b6104e6610e1b565b565b6104f0610e6d565b600254604051627eeac760e11b815233600482015260248101869052849161010090046001600160a01b03169062fdd58e90604401602060405180830381865afa158015610542573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056691906112db565b10156105b05760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064015b60405180910390fd5b600081116106005760405162461bcd60e51b815260206004820152601f60248201527f4475726174696f6e206d7573742062652067726561746572207468616e20300060448201526064016105a7565b60408051610120810182526006548152336020820152908101859052606081018490526080810183905260a08101839052600060c082015260e08101610646834261130a565b815260006020918201819052600680548252600580845260409283902085518155938501516001850180546001600160a01b03199081166001600160a01b03938416179091558685015160028088019190915560608801516003880155608088015160048089019190915560a08901519488019490945560c0880151948701805490921694831694909417905560e08601516007860155610100958601516008909501805460ff19169515159590951790945590549151637f4c824d60e11b8152939091049091169163fe99049a9161072791339130918a918a910161131d565b600060405180830381600087803b15801561074157600080fd5b505af1158015610755573d6000803e3d6000fd5b5050600654604080513381526020810189905290810187905260608101869052608081018590529092507e09646912aaa7019ad837e57cc5c0613299c8432f5268d4450ab8673fe0fa03915060a00160405180910390a250505050565b6107ba610dc1565b6104e66000610eb3565b6107cc610dc1565b6104e6610f03565b6107dc610dc1565b6107e4610e6d565b60648111156108355760405162461bcd60e51b815260206004820152601d60248201527f496e76616c696420636f6d6d697373696f6e2070657263656e7461676500000060448201526064016105a7565b600355565b610842610f40565b61084a610e6d565b6000818152600560205260409020600881015460ff16156108a55760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b60448201526064016105a7565b806007015442106108ec5760405162461bcd60e51b8152602060048201526011602482015270105d58dd1a5bdb881a185cc8195b991959607a1b60448201526064016105a7565b8060050154341161095e5760405162461bcd60e51b815260206004820152603660248201527f42696420616d6f756e74206d75737420626520686967686572207468616e20746044820152751a194818dd5c9c995b9d081a1a59da195cdd08189a5960521b60648201526084016105a7565b60068101546001600160a01b0316156109b357600681015460058201546040516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156109b1573d6000803e3d6000fd5b505b34600582018190556006820180546001600160a01b03191633908117909155825460405192835290917f0e54eff26401bf69b81b26f60bd85ef47f5d85275c1d268d84f68d6897431c47906020015b60405180910390a350610a1460018055565b50565b610a1f610dc1565b610a27610e6d565b600280546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b610a57610dc1565b610a5f610f40565b610a67610e6d565b6000818152600560205260409020600881015460ff1615610ac25760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b60448201526064016105a7565b8060070154421015610b165760405162461bcd60e51b815260206004820152601960248201527f41756374696f6e20686173206e6f742079657420656e6465640000000000000060448201526064016105a7565b60088101805460ff1916600117905560068101546001600160a01b031615610c8f57600060646003548360050154610b4e9190611346565b610b58919061135d565b90508060046000828254610b6c919061130a565b90915550506005820154600090610b8490839061137f565b60018401546040519192506001600160a01b03169082156108fc029083906000818181858888f19350505050158015610bc1573d6000803e3d6000fd5b50600280546006850154918501546003860154604051637f4c824d60e11b81526001600160a01b0361010090940484169463fe99049a94610c0b943094919092169260040161131d565b600060405180830381600087803b158015610c2557600080fd5b505af1158015610c39573d6000803e3d6000fd5b505050506006830154835460058501546040519081526001600160a01b03909216917fd2aa34a4fdbbc6dff6a3e56f46e0f3ae2a31d7785ff3487aa5c95c642acea5019060200160405180910390a35050610d41565b600280546001830154918301546003840154604051637f4c824d60e11b81526001600160a01b0361010090940484169463fe99049a94610cd8943094919092169260040161131d565b600060405180830381600087803b158015610cf257600080fd5b505af1158015610d06573d6000803e3d6000fd5b50508254604051600080825293509091507fd2aa34a4fdbbc6dff6a3e56f46e0f3ae2a31d7785ff3487aa5c95c642acea50190602001610a02565b50610a1460018055565b610d53610dc1565b6001600160a01b038116610db85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105a7565b610a1481610eb3565b6000546001600160a01b031633146104e65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105a7565b610e23610f99565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60025460ff16156104e65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016105a7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610f0b610e6d565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e503390565b600260015403610f925760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016105a7565b6002600155565b60025460ff166104e65760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016105a7565b600060208284031215610ff457600080fd5b81356001600160e01b03198116811461100c57600080fd5b9392505050565b60006020828403121561102557600080fd5b5035919050565b6000806000806080858703121561104257600080fd5b5050823594602084013594506040840135936060013592509050565b80356001600160a01b038116811461107557600080fd5b919050565b60006020828403121561108c57600080fd5b61100c8261105e565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156110d4576110d4611095565b604052919050565b600082601f8301126110ed57600080fd5b8135602067ffffffffffffffff82111561110957611109611095565b8160051b6111188282016110ab565b928352848101820192828101908785111561113257600080fd5b83870192505b8483101561115157823582529183019190830190611138565b979650505050505050565b600082601f83011261116d57600080fd5b813567ffffffffffffffff81111561118757611187611095565b61119a601f8201601f19166020016110ab565b8181528460208386010111156111af57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156111e457600080fd5b6111ed8661105e565b94506111fb6020870161105e565b9350604086013567ffffffffffffffff8082111561121857600080fd5b61122489838a016110dc565b9450606088013591508082111561123a57600080fd5b61124689838a016110dc565b9350608088013591508082111561125c57600080fd5b506112698882890161115c565b9150509295509295909350565b600080600080600060a0868803121561128e57600080fd5b6112978661105e565b94506112a56020870161105e565b93506040860135925060608601359150608086013567ffffffffffffffff8111156112cf57600080fd5b6112698882890161115c565b6000602082840312156112ed57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610497576104976112f4565b6001600160a01b0394851681529290931660208301526040820152606081019190915260800190565b8082028115828204841417610497576104976112f4565b60008261137a57634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115610497576104976112f456fea26469706673582212209793cd09b9dc41e7654eba61ea3e2447f9b00220f6a0132f7d878eebfe03464464736f6c63430008170033";

export class AssetsAuctionMarketplace__factory extends ContractFactory {
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
  ): Promise<AssetsAuctionMarketplace> {
    return super.deploy(
      _nftContractAddress,
      _commissionPercentage,
      overrides || {}
    ) as Promise<AssetsAuctionMarketplace>;
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
  attach(address: string): AssetsAuctionMarketplace {
    return super.attach(address) as AssetsAuctionMarketplace;
  }
  connect(signer: Signer): AssetsAuctionMarketplace__factory {
    return super.connect(signer) as AssetsAuctionMarketplace__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssetsAuctionMarketplaceInterface {
    return new utils.Interface(_abi) as AssetsAuctionMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssetsAuctionMarketplace {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AssetsAuctionMarketplace;
  }
}
