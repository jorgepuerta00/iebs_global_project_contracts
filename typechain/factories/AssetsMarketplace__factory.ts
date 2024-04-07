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
  "0x6080604052600160065534801561001557600080fd5b50604051611617380380611617833981016040819052610034916100bf565b61003d3361006f565b60018055600280546001600160a01b03909316610100026001600160a81b0319909316929092179091556003556100f9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100d257600080fd5b82516001600160a01b03811681146100e957600080fd5b6020939093015192949293505050565b61150f806101086000396000f3fe60806040526004361061012a5760003560e01c806387c35bc0116100ab578063c73cdd231161006f578063c73cdd23146103ca578063d06fcba8146103ee578063d575fe6414610413578063de74e57b14610429578063f23a6e6114610486578063f2fde38b146104b257600080fd5b806387c35bc0146102f15780638ce2199e146103135780638da5cb5b14610333578063b0136c8d14610365578063bc197c811461038557600080fd5b80634f85310f116100f25780634f85310f146101ce5780635c975abb1461028f578063715018a6146102a757806378627f2b146102bc5780638456cb59146102dc57600080fd5b806301ffc9a71461012f578063150bde0314610164578063155dd5ee14610179578063305a67a8146101995780633f4ba83a146101b9575b600080fd5b34801561013b57600080fd5b5061014f61014a36600461106e565b6104d2565b60405190151581526020015b60405180910390f35b61017761017236600461109f565b610509565b005b34801561018557600080fd5b5061017761019436600461109f565b6107ac565b3480156101a557600080fd5b506101776101b436600461109f565b6107e5565b3480156101c557600080fd5b50610177610944565b3480156101da57600080fd5b506102586101e936600461109f565b600090815260056020818152604092839020835160c081018552815480825260018301546001600160a01b03169382018490526002830154958201869052600383015460608301819052600484015460808401819052939095015460ff16151560a09092018290529592949392565b604080519687526001600160a01b0390951660208701529385019290925260608401526080830152151560a082015260c00161015b565b34801561029b57600080fd5b5060025460ff1661014f565b3480156102b357600080fd5b50610177610956565b3480156102c857600080fd5b506101776102d73660046110d4565b610968565b3480156102e857600080fd5b50610177610998565b3480156102fd57600080fd5b506103066109a8565b60405161015b91906110ef565b34801561031f57600080fd5b5061017761032e36600461109f565b610b12565b34801561033f57600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200161015b565b34801561037157600080fd5b50610177610380366004611172565b610b66565b34801561039157600080fd5b506103b16103a03660046112d5565b63bc197c8160e01b95945050505050565b6040516001600160e01b0319909116815260200161015b565b3480156103d657600080fd5b506103e060045481565b60405190815260200161015b565b3480156103fa57600080fd5b5060025461034d9061010090046001600160a01b031681565b34801561041f57600080fd5b506103e060035481565b34801561043557600080fd5b5061025861044436600461109f565b600560208190526000918252604090912080546001820154600283015460038401546004850154949095015492946001600160a01b0390921693909260ff1686565b34801561049257600080fd5b506103b16104a136600461137f565b63f23a6e6160e01b95945050505050565b3480156104be57600080fd5b506101776104cd3660046110d4565b610d90565b60006001600160e01b03198216630271189760e51b148061050357506301ffc9a760e01b6001600160e01b03198316145b92915050565b610511610e06565b610519610e5f565b600081815260056020526040902060018101546001600160a01b031661057f5760405162461bcd60e51b8152602060048201526016602482015275131a5cdd1a5b99c8191bd95cc81b9bdd08195e1a5cdd60521b60448201526064015b60405180910390fd5b600581015460ff166105c65760405162461bcd60e51b815260206004820152601060248201526f496e616374697665206c697374696e6760801b6044820152606401610576565b8060040154341461060b5760405162461bcd60e51b815260206004820152600f60248201526e496e636f727265637420707269636560881b6044820152606401610576565b600060646003543461061d91906113fa565b6106279190611411565b9050806004600082825461063b9190611433565b9091555050600080546040516001600160a01b039091169183156108fc02918491818181858888f19350505050158015610679573d6000803e3d6000fd5b50600182015460048301546001600160a01b03909116906108fc9061069f908490611446565b6040518115909202916000818181858888f193505050501580156106c7573d6000803e3d6000fd5b5060028054908301546003840154604051637921219560e11b81526101009093046001600160a01b03169263f242432a9261070a92309233929190600401611459565b600060405180830381600087803b15801561072457600080fd5b505af1158015610738573d6000803e3d6000fd5b50505060058301805460ff191690555060405183907fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d9190610796906020808252600990820152681c1d5c98da185cd95960ba1b604082015260600190565b60405180910390a250506107a960018055565b50565b6107b4610ea5565b604051339082156108fc029083906000818181858888f193505050501580156107e1573d6000803e3d6000fd5b5050565b6107ed610e5f565b600081815260056020526040902060018101546001600160a01b031661084e5760405162461bcd60e51b8152602060048201526016602482015275131a5cdd1a5b99c8191bd95cc81b9bdd08195e1a5cdd60521b6044820152606401610576565b60018101546001600160a01b031633146108975760405162461bcd60e51b815260206004820152600a6024820152692737ba1039b2b63632b960b11b6044820152606401610576565b600581015460ff166108de5760405162461bcd60e51b815260206004820152601060248201526f416c726561647920696e61637469766560801b6044820152606401610576565b60058101805460ff1916905560405182907fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d91906109389060208082526009908201526818d85b98d95b1b195960ba1b604082015260600190565b60405180910390a25050565b61094c610ea5565b610954610eff565b565b61095e610ea5565b6109546000610f51565b610970610ea5565b600280546001600160a01b0390921661010002610100600160a81b0319909216919091179055565b6109a0610ea5565b610954610fa1565b606060006109b4610fde565b905060008167ffffffffffffffff8111156109d1576109d161119e565b604051908082528060200260200182016040528015610a4657816020015b610a336040518060c001604052806000815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b8152602001906001900390816109ef5790505b509050600060015b600654811015610b09576000818152600560208190526040909120015460ff1615610b0157600081815260056020818152604092839020835160c0810185528154815260018201546001600160a01b031692810192909252600281015493820193909352600383015460608201526004830154608082015291015460ff16151560a08201528351849084908110610ae757610ae7611491565b60200260200101819052508180610afd906114a7565b9250505b600101610a4e565b50909392505050565b610b1a610ea5565b6064811115610b615760405162461bcd60e51b81526020600482015260136024820152720a0cae4c6cadce8c2ceca40e8dede40d0d2ced606b1b6044820152606401610576565b600355565b610b6e610e5f565b600254604051627eeac760e11b815233600482015260248101859052839161010090046001600160a01b03169062fdd58e90604401602060405180830381865afa158015610bc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be491906114c0565b1015610c295760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606401610576565b600254604051637921219560e11b81526101009091046001600160a01b03169063f242432a90610c63903390309088908890600401611459565b600060405180830381600087803b158015610c7d57600080fd5b505af1158015610c91573d6000803e3d6000fd5b50506040805160c081018252600680548083523360208085019182528486018b815260608087018c8152608088018c8152600160a08a0181815260009889526005808852988c90209a518b559651908a0180546001600160a01b0319166001600160a01b039092169190911790559251600289015551600388015590516004870155915194909201805460ff1916941515949094179093558154845182815291820192909252651b1a5cdd195960d21b9381019390935293507fd2c26bd2d67a46bf4538eeac1c4c99a4ed72c0db5072804c3e656e12fff35d9192500160405180910390a260068054906000610d86836114a7565b9190505550505050565b610d98610ea5565b6001600160a01b038116610dfd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610576565b6107a981610f51565b600260015403610e585760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610576565b6002600155565b60025460ff16156109545760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610576565b6000546001600160a01b031633146109545760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610576565b610f07611025565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610fa9610e5f565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f343390565b60008060015b60065481101561101f576000818152600560208190526040909120015460ff16156110175781611013816114a7565b9250505b600101610fe4565b50919050565b60025460ff166109545760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610576565b60006020828403121561108057600080fd5b81356001600160e01b03198116811461109857600080fd5b9392505050565b6000602082840312156110b157600080fd5b5035919050565b80356001600160a01b03811681146110cf57600080fd5b919050565b6000602082840312156110e657600080fd5b611098826110b8565b602080825282518282018190526000919060409081850190868401855b8281101561116557815180518552868101516001600160a01b0316878601528581015186860152606080820151908601526080808201519086015260a09081015115159085015260c0909301929085019060010161110c565b5091979650505050505050565b60008060006060848603121561118757600080fd5b505081359360208301359350604090920135919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156111dd576111dd61119e565b604052919050565b600082601f8301126111f657600080fd5b8135602067ffffffffffffffff8211156112125761121261119e565b8160051b6112218282016111b4565b928352848101820192828101908785111561123b57600080fd5b83870192505b8483101561125a57823582529183019190830190611241565b979650505050505050565b600082601f83011261127657600080fd5b813567ffffffffffffffff8111156112905761129061119e565b6112a3601f8201601f19166020016111b4565b8181528460208386010111156112b857600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156112ed57600080fd5b6112f6866110b8565b9450611304602087016110b8565b9350604086013567ffffffffffffffff8082111561132157600080fd5b61132d89838a016111e5565b9450606088013591508082111561134357600080fd5b61134f89838a016111e5565b9350608088013591508082111561136557600080fd5b5061137288828901611265565b9150509295509295909350565b600080600080600060a0868803121561139757600080fd5b6113a0866110b8565b94506113ae602087016110b8565b93506040860135925060608601359150608086013567ffffffffffffffff8111156113d857600080fd5b61137288828901611265565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610503576105036113e4565b60008261142e57634e487b7160e01b600052601260045260246000fd5b500490565b80820180821115610503576105036113e4565b81810381811115610503576105036113e4565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b634e487b7160e01b600052603260045260246000fd5b6000600182016114b9576114b96113e4565b5060010190565b6000602082840312156114d257600080fd5b505191905056fea2646970667358221220a1ed5adca7ab13930f5bdabd031e0b1e3f7f8adc683b7b0877ecece6934f656464736f6c63430008170033";

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
