module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAuction {
  count: Int!
}

type Auction {
  id: ID!
  createdAt: DateTime!
  name: String!
  ownerId: String!
  playerIds: [ID!]!
}

type AuctionConnection {
  pageInfo: PageInfo!
  edges: [AuctionEdge]!
  aggregate: AggregateAuction!
}

input AuctionCreateInput {
  name: String!
  ownerId: String!
  playerIds: AuctionCreateplayerIdsInput
}

input AuctionCreateplayerIdsInput {
  set: [ID!]
}

type AuctionEdge {
  node: Auction!
  cursor: String!
}

enum AuctionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  name_ASC
  name_DESC
  ownerId_ASC
  ownerId_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AuctionPreviousValues {
  id: ID!
  createdAt: DateTime!
  name: String!
  ownerId: String!
  playerIds: [ID!]!
}

type AuctionSubscriptionPayload {
  mutation: MutationType!
  node: Auction
  updatedFields: [String!]
  previousValues: AuctionPreviousValues
}

input AuctionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AuctionWhereInput
  AND: [AuctionSubscriptionWhereInput!]
  OR: [AuctionSubscriptionWhereInput!]
  NOT: [AuctionSubscriptionWhereInput!]
}

input AuctionUpdateInput {
  name: String
  ownerId: String
  playerIds: AuctionUpdateplayerIdsInput
}

input AuctionUpdateManyMutationInput {
  name: String
  ownerId: String
  playerIds: AuctionUpdateplayerIdsInput
}

input AuctionUpdateplayerIdsInput {
  set: [ID!]
}

input AuctionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  ownerId: String
  ownerId_not: String
  ownerId_in: [String!]
  ownerId_not_in: [String!]
  ownerId_lt: String
  ownerId_lte: String
  ownerId_gt: String
  ownerId_gte: String
  ownerId_contains: String
  ownerId_not_contains: String
  ownerId_starts_with: String
  ownerId_not_starts_with: String
  ownerId_ends_with: String
  ownerId_not_ends_with: String
  AND: [AuctionWhereInput!]
  OR: [AuctionWhereInput!]
  NOT: [AuctionWhereInput!]
}

input AuctionWhereUniqueInput {
  id: ID
  name: String
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createAuction(data: AuctionCreateInput!): Auction!
  updateAuction(data: AuctionUpdateInput!, where: AuctionWhereUniqueInput!): Auction
  updateManyAuctions(data: AuctionUpdateManyMutationInput!, where: AuctionWhereInput): BatchPayload!
  upsertAuction(where: AuctionWhereUniqueInput!, create: AuctionCreateInput!, update: AuctionUpdateInput!): Auction!
  deleteAuction(where: AuctionWhereUniqueInput!): Auction
  deleteManyAuctions(where: AuctionWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  auction(where: AuctionWhereUniqueInput!): Auction
  auctions(where: AuctionWhereInput, orderBy: AuctionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Auction]!
  auctionsConnection(where: AuctionWhereInput, orderBy: AuctionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AuctionConnection!
  node(id: ID!): Node
}

type Subscription {
  auction(where: AuctionSubscriptionWhereInput): AuctionSubscriptionPayload
}
`
      }
    