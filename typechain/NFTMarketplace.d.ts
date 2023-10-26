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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface NFTMarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "cancelListing(uint256)": FunctionFragment;
    "commissionPercentage()": FunctionFragment;
    "getActiveListings()": FunctionFragment;
    "listNFT(uint256,uint256,uint256)": FunctionFragment;
    "listings(uint256)": FunctionFragment;
    "nextListingId()": FunctionFragment;
    "nftContract()": FunctionFragment;
    "owner()": FunctionFragment;
    "purchaseNFT(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setNFTContract(address)": FunctionFragment;
    "setSiliquaCoin(address)": FunctionFragment;
    "siliquaCoinContract()": FunctionFragment;
    "totalCommissionEarned()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateCommissionPercentage(uint256)": FunctionFragment;
  };

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
    functionFragment: "listNFT",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listings",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextListingId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseNFT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setNFTContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setSiliquaCoin",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "siliquaCoinContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalCommissionEarned",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCommissionPercentage",
    values: [BigNumberish]
  ): string;

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
  decodeFunctionResult(functionFragment: "listNFT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listings", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextListingId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nftContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSiliquaCoin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "siliquaCoinContract",
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
  decodeFunctionResult(
    functionFragment: "updateCommissionPercentage",
    data: BytesLike
  ): Result;

  events: {
    "NFTListed(uint256,address,uint256,uint256,uint256,string)": EventFragment;
    "NFTListingCancelled(uint256,address,uint256,uint256,uint256,string)": EventFragment;
    "NFTPurchased(uint256,address,address,uint256,uint256,uint256,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NFTListed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTListingCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTPurchased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type NFTListedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, BigNumber, string] & {
    listingId: BigNumber;
    seller: string;
    tokenId: BigNumber;
    amount: BigNumber;
    price: BigNumber;
    status: string;
  }
>;

export type NFTListingCancelledEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, BigNumber, string] & {
    listingId: BigNumber;
    seller: string;
    tokenId: BigNumber;
    amount: BigNumber;
    price: BigNumber;
    status: string;
  }
>;

export type NFTPurchasedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber, BigNumber, string] & {
    listingId: BigNumber;
    buyer: string;
    seller: string;
    tokenId: BigNumber;
    amount: BigNumber;
    price: BigNumber;
    status: string;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class NFTMarketplace extends BaseContract {
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

  interface: NFTMarketplaceInterface;

  functions: {
    cancelListing(
      _listingId: BigNumberish,
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
      ] & {
        activeListings: ([
          BigNumber,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          boolean
        ] & {
          listingId: BigNumber;
          seller: string;
          tokenId: BigNumber;
          amount: BigNumber;
          price: BigNumber;
          isActive: boolean;
        })[];
      }
    >;

    listNFT(
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _price: BigNumberish,
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

    nextListingId(overrides?: CallOverrides): Promise<[BigNumber]>;

    nftContract(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    purchaseNFT(
      _listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNFTContract(
      _nftContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSiliquaCoin(
      _siliquaCoinAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    siliquaCoinContract(overrides?: CallOverrides): Promise<[string]>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  cancelListing(
    _listingId: BigNumberish,
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

  listNFT(
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _price: BigNumberish,
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

  nextListingId(overrides?: CallOverrides): Promise<BigNumber>;

  nftContract(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  purchaseNFT(
    _listingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNFTContract(
    _nftContractAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSiliquaCoin(
    _siliquaCoinAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  siliquaCoinContract(overrides?: CallOverrides): Promise<string>;

  totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateCommissionPercentage(
    _newCommissionPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelListing(
      _listingId: BigNumberish,
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

    listNFT(
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _price: BigNumberish,
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

    nextListingId(overrides?: CallOverrides): Promise<BigNumber>;

    nftContract(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    purchaseNFT(
      _listingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setNFTContract(
      _nftContractAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setSiliquaCoin(
      _siliquaCoinAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    siliquaCoinContract(overrides?: CallOverrides): Promise<string>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NFTListed(uint256,address,uint256,uint256,uint256,string)"(
      listingId?: BigNumberish | null,
      seller?: string | null,
      tokenId?: BigNumberish | null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
    >;

    NFTListed(
      listingId?: BigNumberish | null,
      seller?: string | null,
      tokenId?: BigNumberish | null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
    >;

    "NFTListingCancelled(uint256,address,uint256,uint256,uint256,string)"(
      listingId?: BigNumberish | null,
      seller?: string | null,
      tokenId?: BigNumberish | null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
    >;

    NFTListingCancelled(
      listingId?: BigNumberish | null,
      seller?: string | null,
      tokenId?: BigNumberish | null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
    >;

    "NFTPurchased(uint256,address,address,uint256,uint256,uint256,string)"(
      listingId?: BigNumberish | null,
      buyer?: string | null,
      seller?: string | null,
      tokenId?: null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        buyer: string;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
    >;

    NFTPurchased(
      listingId?: BigNumberish | null,
      buyer?: string | null,
      seller?: string | null,
      tokenId?: null,
      amount?: null,
      price?: null,
      status?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber, BigNumber, BigNumber, string],
      {
        listingId: BigNumber;
        buyer: string;
        seller: string;
        tokenId: BigNumber;
        amount: BigNumber;
        price: BigNumber;
        status: string;
      }
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
  };

  estimateGas: {
    cancelListing(
      _listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getActiveListings(overrides?: CallOverrides): Promise<BigNumber>;

    listNFT(
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    listings(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    nextListingId(overrides?: CallOverrides): Promise<BigNumber>;

    nftContract(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseNFT(
      _listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNFTContract(
      _nftContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSiliquaCoin(
      _siliquaCoinAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    siliquaCoinContract(overrides?: CallOverrides): Promise<BigNumber>;

    totalCommissionEarned(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelListing(
      _listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commissionPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActiveListings(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listNFT(
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextListingId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchaseNFT(
      _listingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNFTContract(
      _nftContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSiliquaCoin(
      _siliquaCoinAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    siliquaCoinContract(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalCommissionEarned(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
