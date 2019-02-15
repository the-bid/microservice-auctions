// Code generated by Prisma (prisma@1.26.4). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  auction: (where?: AuctionWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  auction: (where: AuctionWhereUniqueInput) => AuctionPromise;
  auctions: (args?: {
    where?: AuctionWhereInput;
    orderBy?: AuctionOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Auction>;
  auctionsConnection: (args?: {
    where?: AuctionWhereInput;
    orderBy?: AuctionOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => AuctionConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createAuction: (data: AuctionCreateInput) => AuctionPromise;
  updateAuction: (args: {
    data: AuctionUpdateInput;
    where: AuctionWhereUniqueInput;
  }) => AuctionPromise;
  updateManyAuctions: (args: {
    data: AuctionUpdateManyMutationInput;
    where?: AuctionWhereInput;
  }) => BatchPayloadPromise;
  upsertAuction: (args: {
    where: AuctionWhereUniqueInput;
    create: AuctionCreateInput;
    update: AuctionUpdateInput;
  }) => AuctionPromise;
  deleteAuction: (where: AuctionWhereUniqueInput) => AuctionPromise;
  deleteManyAuctions: (where?: AuctionWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  auction: (
    where?: AuctionSubscriptionWhereInput
  ) => AuctionSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type AuctionOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "name_ASC"
  | "name_DESC"
  | "ownerId_ASC"
  | "ownerId_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type AuctionWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  name?: String;
}>;

export interface AuctionCreateInput {
  name: String;
  ownerId: String;
  playerIds?: AuctionCreateplayerIdsInput;
}

export interface AuctionCreateplayerIdsInput {
  set?: ID_Input[] | ID_Input;
}

export interface AuctionUpdateInput {
  name?: String;
  ownerId?: String;
  playerIds?: AuctionUpdateplayerIdsInput;
}

export interface AuctionUpdateplayerIdsInput {
  set?: ID_Input[] | ID_Input;
}

export interface AuctionSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: AuctionWhereInput;
  AND?: AuctionSubscriptionWhereInput[] | AuctionSubscriptionWhereInput;
  OR?: AuctionSubscriptionWhereInput[] | AuctionSubscriptionWhereInput;
  NOT?: AuctionSubscriptionWhereInput[] | AuctionSubscriptionWhereInput;
}

export interface AuctionWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  ownerId?: String;
  ownerId_not?: String;
  ownerId_in?: String[] | String;
  ownerId_not_in?: String[] | String;
  ownerId_lt?: String;
  ownerId_lte?: String;
  ownerId_gt?: String;
  ownerId_gte?: String;
  ownerId_contains?: String;
  ownerId_not_contains?: String;
  ownerId_starts_with?: String;
  ownerId_not_starts_with?: String;
  ownerId_ends_with?: String;
  ownerId_not_ends_with?: String;
  AND?: AuctionWhereInput[] | AuctionWhereInput;
  OR?: AuctionWhereInput[] | AuctionWhereInput;
  NOT?: AuctionWhereInput[] | AuctionWhereInput;
}

export interface AuctionUpdateManyMutationInput {
  name?: String;
  ownerId?: String;
  playerIds?: AuctionUpdateplayerIdsInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface AggregateAuction {
  count: Int;
}

export interface AggregateAuctionPromise
  extends Promise<AggregateAuction>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateAuctionSubscription
  extends Promise<AsyncIterator<AggregateAuction>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AuctionEdge {
  node: Auction;
  cursor: String;
}

export interface AuctionEdgePromise extends Promise<AuctionEdge>, Fragmentable {
  node: <T = AuctionPromise>() => T;
  cursor: () => Promise<String>;
}

export interface AuctionEdgeSubscription
  extends Promise<AsyncIterator<AuctionEdge>>,
    Fragmentable {
  node: <T = AuctionSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface Auction {
  id: ID_Output;
  createdAt: DateTimeOutput;
  name: String;
  ownerId: String;
  playerIds: ID_Output[];
}

export interface AuctionPromise extends Promise<Auction>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  ownerId: () => Promise<String>;
  playerIds: () => Promise<ID_Output[]>;
}

export interface AuctionSubscription
  extends Promise<AsyncIterator<Auction>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  ownerId: () => Promise<AsyncIterator<String>>;
  playerIds: () => Promise<AsyncIterator<ID_Output[]>>;
}

export interface AuctionConnection {
  pageInfo: PageInfo;
  edges: AuctionEdge[];
}

export interface AuctionConnectionPromise
  extends Promise<AuctionConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<AuctionEdge>>() => T;
  aggregate: <T = AggregateAuctionPromise>() => T;
}

export interface AuctionConnectionSubscription
  extends Promise<AsyncIterator<AuctionConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<AuctionEdgeSubscription>>>() => T;
  aggregate: <T = AggregateAuctionSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AuctionSubscriptionPayload {
  mutation: MutationType;
  node: Auction;
  updatedFields: String[];
  previousValues: AuctionPreviousValues;
}

export interface AuctionSubscriptionPayloadPromise
  extends Promise<AuctionSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = AuctionPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = AuctionPreviousValuesPromise>() => T;
}

export interface AuctionSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<AuctionSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = AuctionSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = AuctionPreviousValuesSubscription>() => T;
}

export interface AuctionPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  name: String;
  ownerId: String;
  playerIds: ID_Output[];
}

export interface AuctionPreviousValuesPromise
  extends Promise<AuctionPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  ownerId: () => Promise<String>;
  playerIds: () => Promise<ID_Output[]>;
}

export interface AuctionPreviousValuesSubscription
  extends Promise<AsyncIterator<AuctionPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  ownerId: () => Promise<AsyncIterator<String>>;
  playerIds: () => Promise<AsyncIterator<ID_Output[]>>;
}

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Auction",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;