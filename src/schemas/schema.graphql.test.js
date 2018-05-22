const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { importSchema } = require('graphql-import')
const { moment, uuid, title } = require('casual')
const { auctionObjectTemplate } = require('../../test/object-templates')

describe('Schema', () => {
  let schema = null
  beforeAll(() => {
    const typeDefs = importSchema(`${__dirname}/schema.graphql`)
    schema = makeExecutableSchema({ typeDefs })
    addMockFunctionsToSchema({
      schema,
      mocks: {
        DateTime: () => moment.toISOString()
      }
    })
  })
  afterAll(() => {
    schema = null
  })
  describe('Query', () => {
    describe('auctions', () => {
      test('returns a list of auctions', async () => {
        expect.hasAssertions()
        const query = `query auctions{
          auctions{
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, query)
        expect(data.auctions).toEqual(expect.any(Array))
        data.auctions.forEach(auction => {
          expect(auction).toMatchObject(auctionObjectTemplate)
        })
      })
      test('returns a GraphQLError for unknown query property', async () => {
        expect.assertions(2)
        const query = `query auctions{
          auctions{
            unknown
          }
        }`
        const result = await graphql(schema, query)
        expect(result).toHaveProperty('errors')
        expect(result.errors[0]).toHaveProperty('message', 'Cannot query field "unknown" on type "Auction".')
      })
    })
    describe('auction', () => {
      test('returns an auction', async () => {
        expect.assertions(1)
        const query = `query auction{
          auction(id:"${uuid}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, query)
        expect(data.auction).toMatchObject(auctionObjectTemplate)
      })
    })
    test('returns a GraphQLError for unknown query', async () => {
      expect.assertions(2)
      const query = `query unknown{
        unknown{
          id
        }
      }`
      const result = await graphql(schema, query)
      expect(result).toHaveProperty('errors')
      expect(result.errors[0]).toHaveProperty('message', 'Cannot query field "unknown" on type "Query".')
    })
  })
  describe('Mutation', () => {
    describe('createAuction', () => {
      test('returns an auction', async () => {
        const mutation = `mutation createAuction{
          createAuction(name:"${title}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.createAuction).toMatchObject(auctionObjectTemplate)
      })
    })
    describe('deleteAuction', () => {
      test('returns an auction', async () => {
        const mutation = `mutation deleteAuction{
          deleteAuction(id:"${uuid}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.deleteAuction).toMatchObject(auctionObjectTemplate)
      })
    })
    test('returns a GraphQLError for unknown mutation', async () => {
      expect.assertions(2)
      const query = `mutation unknown{
        unknown{
          id
        }
      }`
      const result = await graphql(schema, query)
      expect(result).toHaveProperty('errors')
      expect(result.errors[0]).toHaveProperty('message', 'Cannot query field "unknown" on type "Mutation".')
    })
  })
})
