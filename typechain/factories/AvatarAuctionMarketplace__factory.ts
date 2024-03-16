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
  AvatarAuctionMarketplace,
  AvatarAuctionMarketplaceInterface,
} from "../AvatarAuctionMarketplace";

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
];

const _bytecode =
  "0x6080604052600060065534801561001557600080fd5b5060405161142b38038061142b833981016040819052610034916100bf565b61003d3361006f565b60018055600280546001600160a01b03909316610100026001600160a81b0319909316929092179091556003556100f9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100d257600080fd5b82516001600160a01b03811681146100e957600080fd5b6020939093015192949293505050565b611323806101086000396000f3fe6080604052600436106101145760003560e01c80639979ef45116100a0578063cda4beef11610064578063cda4beef14610386578063d06fcba8146103a6578063d575fe64146103cb578063f23a6e61146103e1578063f2fde38b1461040d57600080fd5b80639979ef45146102d8578063a7ccabdf146102eb578063b9a2de3a1461030b578063bc197c811461032b578063c73cdd231461037057600080fd5b80635c975abb116100e75780635c975abb14610244578063715018a61461025c5780638456cb59146102715780638ce2199e146102865780638da5cb5b146102a657600080fd5b806301ffc9a71461011957806310782f8f1461014e5780633f4ba83a14610172578063571a26a014610189575b600080fd5b34801561012557600080fd5b50610139610134366004610f65565b61042d565b60405190151581526020015b60405180910390f35b34801561015a57600080fd5b5061016460065481565b604051908152602001610145565b34801561017e57600080fd5b50610187610464565b005b34801561019557600080fd5b506101f76101a4366004610f96565b60056020819052600091825260409091208054600182015460028301546003840154600485015495850154600686015460079096015494966001600160a01b039485169693959294909391169160ff1688565b604080519889526001600160a01b0397881660208a01528801959095526060870193909352608086019190915290921660a084015260c0830191909152151560e082015261010001610145565b34801561025057600080fd5b5060025460ff16610139565b34801561026857600080fd5b50610187610476565b34801561027d57600080fd5b50610187610488565b34801561029257600080fd5b506101876102a1366004610f96565b610498565b3480156102b257600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610145565b6101876102e6366004610f96565b610503565b3480156102f757600080fd5b50610187610306366004610fc4565b6106e0565b34801561031757600080fd5b50610187610326366004610f96565b610718565b34801561033757600080fd5b50610357610346366004611118565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610145565b34801561037c57600080fd5b5061016460045481565b34801561039257600080fd5b506101876103a13660046111c6565b610a18565b3480156103b257600080fd5b506002546102c09061010090046001600160a01b031681565b3480156103d757600080fd5b5061016460035481565b3480156103ed57600080fd5b506103576103fc3660046111f2565b63f23a6e6160e01b95945050505050565b34801561041957600080fd5b50610187610428366004610fc4565b610cce565b60006001600160e01b03198216630271189760e51b148061045e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b61046c610d44565b610474610d9e565b565b61047e610d44565b6104746000610df0565b610490610d44565b610474610e40565b6104a0610d44565b6104a8610e7d565b60648111156104fe5760405162461bcd60e51b815260206004820152601d60248201527f496e76616c696420636f6d6d697373696f6e2070657263656e7461676500000060448201526064015b60405180910390fd5b600355565b61050b610ec3565b610513610e7d565b6000818152600560205260409020600781015460ff161561056e5760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b60448201526064016104f5565b806006015442106105b55760405162461bcd60e51b8152602060048201526011602482015270105d58dd1a5bdb881a185cc8195b991959607a1b60448201526064016104f5565b806004015434116106275760405162461bcd60e51b815260206004820152603660248201527f42696420616d6f756e74206d75737420626520686967686572207468616e20746044820152751a194818dd5c9c995b9d081a1a59da195cdd08189a5960521b60648201526084016104f5565b60058101546001600160a01b03161561067c57600581015460048201546040516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801561067a573d6000803e3d6000fd5b505b34600482018190556005820180546001600160a01b03191633908117909155825460405192835290917f0e54eff26401bf69b81b26f60bd85ef47f5d85275c1d268d84f68d6897431c47906020015b60405180910390a3506106dd60018055565b50565b6106e8610d44565b6106f0610e7d565b600280546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b610720610d44565b610728610ec3565b610730610e7d565b6000818152600560205260409020600781015460ff161561078b5760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b60448201526064016104f5565b80600601544210156107df5760405162461bcd60e51b815260206004820152601960248201527f41756374696f6e20686173206e6f742079657420656e6465640000000000000060448201526064016104f5565b60078101805460ff1916600117905560058101546001600160a01b03161561095a576000606460035483600401546108179190611271565b6108219190611288565b9050806004600082825461083591906112aa565b9091555050600482015460009061084d9083906112bd565b60018401546040519192506001600160a01b03169082156108fc029083906000818181858888f1935050505015801561088a573d6000803e3d6000fd5b5060028054600585015491850154604051632142170760e11b81523060048201526001600160a01b0393841660248201526044810191909152610100909104909116906342842e0e90606401600060405180830381600087803b1580156108f057600080fd5b505af1158015610904573d6000803e3d6000fd5b505050506005830154835460048501546040519081526001600160a01b03909216917fd2aa34a4fdbbc6dff6a3e56f46e0f3ae2a31d7785ff3487aa5c95c642acea5019060200160405180910390a35050610a0e565b60028054600183015491830154604051632142170760e11b81523060048201526001600160a01b0393841660248201526044810191909152610100909104909116906342842e0e90606401600060405180830381600087803b1580156109bf57600080fd5b505af11580156109d3573d6000803e3d6000fd5b50508254604051600080825293509091507fd2aa34a4fdbbc6dff6a3e56f46e0f3ae2a31d7785ff3487aa5c95c642acea501906020016106cb565b506106dd60018055565b610a20610e7d565b6002546040516331a9108f60e11b815260048101859052339161010090046001600160a01b031690636352211e90602401602060405180830381865afa158015610a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9291906112d0565b6001600160a01b031614610ade5760405162461bcd60e51b815260206004820152601360248201527213db9b1e481bdddb995c8818d85b881cd95b1b606a1b60448201526064016104f5565b60008111610b2e5760405162461bcd60e51b815260206004820152601f60248201527f4475726174696f6e206d7573742062652067726561746572207468616e20300060448201526064016104f5565b604080516101008101825260065481523360208201529081018490526060810183905260808101839052600060a082015260c08101610b6d83426112aa565b815260006020918201819052600680548252600580845260409283902085518155938501516001850180546001600160a01b03199081166001600160a01b03938416179091558685015160028088019190915560608801516003880155608088015160048089019190915560a089015194880180549093169484169490941790915560c08701519386019390935560e0909501516007909401805460ff1916941515949094179093555490516323b872dd60e01b81523392810192909252306024830152604482018690526101009004909116906323b872dd90606401600060405180830381600087803b158015610c6457600080fd5b505af1158015610c78573d6000803e3d6000fd5b50506006546040805133815260208101889052908101869052606081018590529092507f05f9bf100dd0ca9f37f08e0526690286d357ed7d6c5a4ac29730440b6e2dfd62915060800160405180910390a2505050565b610cd6610d44565b6001600160a01b038116610d3b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104f5565b6106dd81610df0565b6000546001600160a01b031633146104745760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f5565b610da6610f1c565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610e48610e7d565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610dd33390565b60025460ff16156104745760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104f5565b600260015403610f155760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016104f5565b6002600155565b60025460ff166104745760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104f5565b600060208284031215610f7757600080fd5b81356001600160e01b031981168114610f8f57600080fd5b9392505050565b600060208284031215610fa857600080fd5b5035919050565b6001600160a01b03811681146106dd57600080fd5b600060208284031215610fd657600080fd5b8135610f8f81610faf565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561102057611020610fe1565b604052919050565b600082601f83011261103957600080fd5b8135602067ffffffffffffffff82111561105557611055610fe1565b8160051b611064828201610ff7565b928352848101820192828101908785111561107e57600080fd5b83870192505b8483101561109d57823582529183019190830190611084565b979650505050505050565b600082601f8301126110b957600080fd5b813567ffffffffffffffff8111156110d3576110d3610fe1565b6110e6601f8201601f1916602001610ff7565b8181528460208386010111156110fb57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561113057600080fd5b853561113b81610faf565b9450602086013561114b81610faf565b9350604086013567ffffffffffffffff8082111561116857600080fd5b61117489838a01611028565b9450606088013591508082111561118a57600080fd5b61119689838a01611028565b935060808801359150808211156111ac57600080fd5b506111b9888289016110a8565b9150509295509295909350565b6000806000606084860312156111db57600080fd5b505081359360208301359350604090920135919050565b600080600080600060a0868803121561120a57600080fd5b853561121581610faf565b9450602086013561122581610faf565b93506040860135925060608601359150608086013567ffffffffffffffff81111561124f57600080fd5b6111b9888289016110a8565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761045e5761045e61125b565b6000826112a557634e487b7160e01b600052601260045260246000fd5b500490565b8082018082111561045e5761045e61125b565b8181038181111561045e5761045e61125b565b6000602082840312156112e257600080fd5b8151610f8f81610faf56fea26469706673582212205e831839f8d6853fc252c3f2decd836e9dc545001cd6dbb8b725c7ce487bae6164736f6c63430008170033";

export class AvatarAuctionMarketplace__factory extends ContractFactory {
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
  ): Promise<AvatarAuctionMarketplace> {
    return super.deploy(
      _nftContractAddress,
      _commissionPercentage,
      overrides || {}
    ) as Promise<AvatarAuctionMarketplace>;
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
  attach(address: string): AvatarAuctionMarketplace {
    return super.attach(address) as AvatarAuctionMarketplace;
  }
  connect(signer: Signer): AvatarAuctionMarketplace__factory {
    return super.connect(signer) as AvatarAuctionMarketplace__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AvatarAuctionMarketplaceInterface {
    return new utils.Interface(_abi) as AvatarAuctionMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AvatarAuctionMarketplace {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AvatarAuctionMarketplace;
  }
}
