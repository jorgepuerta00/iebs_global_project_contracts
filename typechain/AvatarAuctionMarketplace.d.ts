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

interface AvatarAuctionMarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "auctionId()": FunctionFragment;
    "auctions(uint256)": FunctionFragment;
    "commissionPercentage()": FunctionFragment;
    "createAuction(uint256,uint256,uint256)": FunctionFragment;
    "endAuction(uint256)": FunctionFragment;
    "nftToken()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "placeBid(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setNFTContract(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "totalCommissionEarned()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "updateCommissionPercentage(uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "auctionId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "auctions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commissionPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endAuction",
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
    functionFragment: "placeBid",
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
    functionFragment: "updateCommissionPercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "auctionId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "auctions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "commissionPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endAuction", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNFTContract",
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
    functionFragment: "updateCommissionPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AuctionCreated(uint256,address,uint256,uint256,uint256)": EventFragment;
    "AuctionEnded(uint256,address,uint256)": EventFragment;
    "BidPlaced(uint256,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidPlaced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export type AuctionCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, BigNumber] & {
    auctionId: BigNumber;
    seller: string;
    tokenId: BigNumber;
    startingPrice: BigNumber;
    duration: BigNumber;
  }
>;

export type AuctionEndedEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    auctionId: BigNumber;
    winner: string;
    winningBid: BigNumber;
  }
>;

export type BidPlacedEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    auctionId: BigNumber;
    bidder: string;
    bidAmount: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type PausedEvent = TypedEvent<[string] & { account: string }>;

export type UnpausedEvent = TypedEvent<[string] & { account: string }>;

export class AvatarAuctionMarketplace extends BaseContract {
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

  interface: AvatarAuctionMarketplaceInterface;

  functions: {
    auctionId(overrides?: CallOverrides): Promise<[BigNumber]>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        boolean
      ] & {
        auctionId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        startingPrice: BigNumber;
        highestBid: BigNumber;
        highestBidder: string;
        auctionEndTime: BigNumber;
        ended: boolean;
      }
    >;

    commissionPercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    createAuction(
      _tokenId: BigNumberish,
      _startingPrice: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    placeBid(
      _auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNFTContract(
      _nftContractAddress: string,
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

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  auctionId(overrides?: CallOverrides): Promise<BigNumber>;

  auctions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      string,
      BigNumber,
      boolean
    ] & {
      auctionId: BigNumber;
      seller: string;
      tokenId: BigNumber;
      startingPrice: BigNumber;
      highestBid: BigNumber;
      highestBidder: string;
      auctionEndTime: BigNumber;
      ended: boolean;
    }
  >;

  commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

  createAuction(
    _tokenId: BigNumberish,
    _startingPrice: BigNumberish,
    _duration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endAuction(
    _auctionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  placeBid(
    _auctionId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNFTContract(
    _nftContractAddress: string,
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

  updateCommissionPercentage(
    _newCommissionPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    auctionId(overrides?: CallOverrides): Promise<BigNumber>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        boolean
      ] & {
        auctionId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        startingPrice: BigNumber;
        highestBid: BigNumber;
        highestBidder: string;
        auctionEndTime: BigNumber;
        ended: boolean;
      }
    >;

    commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    createAuction(
      _tokenId: BigNumberish,
      _startingPrice: BigNumberish,
      _duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    endAuction(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

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

    placeBid(
      _auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setNFTContract(
      _nftContractAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

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

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AuctionCreated(uint256,address,uint256,uint256,uint256)"(
      auctionId?: BigNumberish | null,
      seller?: null,
      tokenId?: null,
      startingPrice?: null,
      duration?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber],
      {
        auctionId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        startingPrice: BigNumber;
        duration: BigNumber;
      }
    >;

    AuctionCreated(
      auctionId?: BigNumberish | null,
      seller?: null,
      tokenId?: null,
      startingPrice?: null,
      duration?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, BigNumber],
      {
        auctionId: BigNumber;
        seller: string;
        tokenId: BigNumber;
        startingPrice: BigNumber;
        duration: BigNumber;
      }
    >;

    "AuctionEnded(uint256,address,uint256)"(
      auctionId?: BigNumberish | null,
      winner?: string | null,
      winningBid?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { auctionId: BigNumber; winner: string; winningBid: BigNumber }
    >;

    AuctionEnded(
      auctionId?: BigNumberish | null,
      winner?: string | null,
      winningBid?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { auctionId: BigNumber; winner: string; winningBid: BigNumber }
    >;

    "BidPlaced(uint256,address,uint256)"(
      auctionId?: BigNumberish | null,
      bidder?: string | null,
      bidAmount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { auctionId: BigNumber; bidder: string; bidAmount: BigNumber }
    >;

    BidPlaced(
      auctionId?: BigNumberish | null,
      bidder?: string | null,
      bidAmount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { auctionId: BigNumber; bidder: string; bidAmount: BigNumber }
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

    "Unpaused(address)"(
      account?: null
    ): TypedEventFilter<[string], { account: string }>;

    Unpaused(account?: null): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    auctionId(overrides?: CallOverrides): Promise<BigNumber>;

    auctions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    commissionPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    createAuction(
      _tokenId: BigNumberish,
      _startingPrice: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    placeBid(
      _auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNFTContract(
      _nftContractAddress: string,
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

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    auctionId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commissionPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAuction(
      _tokenId: BigNumberish,
      _startingPrice: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endAuction(
      _auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
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

    placeBid(
      _auctionId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNFTContract(
      _nftContractAddress: string,
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

    updateCommissionPercentage(
      _newCommissionPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
