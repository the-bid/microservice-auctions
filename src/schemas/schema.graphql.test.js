const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { importSchema } = require('graphql-import')
const { moment, uuid, title } = require('casual')
const { auctionObjectTemplate } = require('../../test/utils')

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
  })
})
