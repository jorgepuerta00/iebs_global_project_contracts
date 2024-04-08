/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface AssetsMarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "bundlePrice()": FunctionFragment;
    "cancelListing(uint256)": FunctionFragment;
    "commissionPercentage()": FunctionFragment;
    "getActiveListings()": FunctionFragment;
    "getListingById(uint256)": FunctionFragment;
    "listNFT(uint256,uint256,uint256)": FunctionFragment;
    "listings(uint256)": FunctionFragment;
    "nftToken()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "purchaseBundleNFT()": FunctionFragment;
    "purchaseNFT(uint256)": FunctionFragment;
    "purchaseSingleNFT(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "totalCommissionEarned()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "updateBundlePrice(uint256)": FunctionFragment;
    "updateCommissionPercentage(uint256)": FunctionFragment;
    "updateNFTContract(address)": FunctionFragment;
    "withdrawFunds(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "bundlePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelListing",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commissionPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveListings",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getListingById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listNFT",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listings",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "nftToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseBundleNFT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseNFT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseSingleNFT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalCommissionEarned",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateBundlePrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCommissionPercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateNFTContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "bundlePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commissionPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActiveListings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getListingById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listNFT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listings", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nftToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseBundleNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseSingleNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalCommissionEarned",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateBundlePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCommissionPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;

  events: {
    "BundleMinted(address,uint256[],uint256[],uint256)": EventFragment;
    "ListingUpdated(uint256,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "SingleMinted(address,uint256,uint256,uint256)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BundleMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ListingUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SingleMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export type BundleMintedEvent = TypedEvent<
  [string, BigNumber[], BigNumber[], BigNumber] & {
    account: string;
    tokenIds: BigNumber[];
    amounts: BigNumber[];
    price: BigNumber;
  }
>;

export type ListingUpdatedEvent = TypedEvent<
  [BigNumber, string] & { listingId: BigNumber; status: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type PausedEvent = TypedEvent<[string] & { account: string }>;

export type SingleMintedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber] & {
    account: string;
    tokenId: BigNumber;
    amount: BigNumber;
    price: BigNumber;
  }
>;

export type UnpausedEvent = TypedEvent<[string] & { account: string }>;

export class AssetsMarketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: AssetsMarketplaceInterface;

  functions: {
    bundlePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    cancelListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commissionPercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    getActiveListings(
      overrides?: CallOverrides
    ): Promise<
      [
        ([BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
          listingId: BigNumber;
          seller: string;
          tokenId: BigNumber;
          amount: BigNumber;
          price: BigNumber;
          isActive: boolean;
        })[]
      ]
    >;

    getListingById(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string, BigNumber, BigNumber, BigNumber, boolean]>;

    listNFT(
      tokenId: BigNumberish,
      amount: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        isActive: boolean;
      }
    >;

    nftToken(overrides?: CallOverrides): Promise<[string]>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    purchaseBundleNFT(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseNFT(
      listingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseSingleNFT(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateBundlePrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateCommissionPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateNFTContract(
      newContract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawFunds(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bundlePrice(overrides?: CallOverrides): Promise<BigNumber>;

  cancelListing(
    listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

  getActiveListings(
    overrides?: CallOverrides
  ): Promise<
    ([BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
      listingId: BigNumber;
      seller: string;
      tokenId: BigNumber;
      amount: BigNumber;
      price: BigNumber;
      isActive: boolean;
    })[]
  >;

  getListingById(
    listingId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string, BigNumber, BigNumber, BigNumber, boolean]>;

  listNFT(
    tokenId: BigNumberish,
    amount: BigNumberish,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  listings(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
      listingId: BigNumber;
      seller: string;
      tokenId: BigNumber;
      amount: BigNumber;
      price: BigNumber;
      isActive: boolean;
    }
  >;

  nftToken(overrides?: CallOverrides): Promise<string>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  purchaseBundleNFT(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseNFT(
    listingId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseSingleNFT(
    tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateBundlePrice(
    newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateCommissionPercentage(
    newPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateNFTContract(
    newContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawFunds(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bundlePrice(overrides?: CallOverrides): Promise<BigNumber>;

    cancelListing(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getActiveListings(
      overrides?: CallOverrides
    ): Promise<
      ([BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        isActive: boolean;
      })[]
    >;

    getListingById(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string, BigNumber, BigNumber, BigNumber, boolean]>;

    listNFT(
      tokenId: BigNumberish,
      amount: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, boolean] & {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        isActive: boolean;
      }
    >;

    nftToken(overrides?: CallOverrides): Promise<string>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    purchaseBundleNFT(overrides?: CallOverrides): Promise<void>;

    purchaseNFT(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    purchaseSingleNFT(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    updateBundlePrice(
      newPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateCommissionPercentage(
      newPercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateNFTContract(
      newContract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFunds(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BundleMinted(address,uint256[],uint256[],uint256)"(
      account?: string | null,
      tokenIds?: null,
      amounts?: null,
      price?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber],
      {
        account: string;
        tokenIds: BigNumber[];
        amounts: BigNumber[];
        price: BigNumber;
      }
    >;

    BundleMinted(
      account?: string | null,
      tokenIds?: null,
      amounts?: null,
      price?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber],
      {
        account: string;
        tokenIds: BigNumber[];
        amounts: BigNumber[];
        price: BigNumber;
      }
    >;

    "ListingUpdated(uint256,string)"(
      listingId?: BigNumberish | null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { listingId: BigNumber; status: string }
    >;

    ListingUpdated(
      listingId?: BigNumberish | null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { listingId: BigNumber; status: string }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "Paused(address)"(
      account?: null
    ): TypedEventFilter<[string], { account: string }>;

    Paused(account?: null): TypedEventFilter<[string], { account: string }>;

    "SingleMinted(address,uint256,uint256,uint256)"(
      account?: string | null,
      tokenId?: null,
      amount?: null,
      price?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        account: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
      }
    >;

    SingleMinted(
      account?: string | null,
      tokenId?: null,
      amount?: null,
      price?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        account: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
      }
    >;

    "Unpaused(address)"(
      account?: null
    ): TypedEventFilter<[string], { account: string }>;

    Unpaused(account?: null): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    bundlePrice(overrides?: CallOverrides): Promise<BigNumber>;

    cancelListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getActiveListings(overrides?: CallOverrides): Promise<BigNumber>;

    getListingById(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listNFT(
      tokenId: BigNumberish,
      amount: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    listings(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nftToken(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseBundleNFT(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseNFT(
      listingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseSingleNFT(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateBundlePrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateCommissionPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateNFTContract(
      newContract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawFunds(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bundlePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cancelListing(
      listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commissionPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActiveListings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getListingById(
      listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listNFT(
      tokenId: BigNumberish,
      amount: BigNumberish,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nftToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchaseBundleNFT(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseNFT(
      listingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseSingleNFT(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalCommissionEarned(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateBundlePrice(
      newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateCommissionPercentage(
      newPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateNFTContract(
      newContract: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
