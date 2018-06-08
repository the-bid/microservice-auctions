const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { importSchema } = require('graphql-import')
const casual = require('casual')
const { auctionObjectTemplate, missingFieldErrorMessage } = require('../../test/object-templates')

describe('Schema', () => {
  let schema = null
  beforeAll(() => {
    const typeDefs = importSchema(`${__dirname}/schema.graphql`)
    schema = makeExecutableSchema({ typeDefs })
    addMockFunctionsToSchema({
      schema,
      mocks: {
        DateTime: () => casual.moment.toISOString()
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
        await expect(data.auctions).toEqual(expect.any(Array))
        data.auctions.forEach(auction => {
          expect(auction).toMatchObject(auctionObjectTemplate)
        })
      })
    })
    describe('auction', () => {
      test('returns an auction', async () => {
        expect.assertions(1)
        const query = `query auction{
          auction(id:"${casual.uuid}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, query)
        expect(data.auction).toMatchObject(auctionObjectTemplate)
      })
      test('returns a GraphQLError for missing name field', async () => {
        expect.assertions(1)
        const query = `query auction{
          auction{
            id
            createdAt
            name
            ownerId
          }
        }`
        const result = await graphql(schema, query)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(missingFieldErrorMessage({ method: 'auction', field: 'id', type: 'ID' }))
          ])
        )
      })
    })
  })
  describe('Mutation', () => {
    describe('createAuction', () => {
      test('returns an auction', async () => {
        expect.assertions(1)
        const mutation = `mutation createAuction{
          createAuction(name:"${casual.title}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.createAuction).toMatchObject(auctionObjectTemplate)
      })
      test('returns a GraphQLError for missing name field', async () => {
        expect.assertions(1)
        const mutation = `mutation createAuction{
          createAuction{
            id
            createdAt
            name
            ownerId
          }
        }`
        const result = await graphql(schema, mutation)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(
              missingFieldErrorMessage({ method: 'createAuction', field: 'name', type: 'String' })
            )
          ])
        )
      })
    })
    describe('deleteAuction', () => {
      test('returns an auction', async () => {
        const mutation = `mutation deleteAuction{
          deleteAuction(id:"${casual.uuid}"){
            id
            createdAt
            name
            ownerId
          }
        }`
        const { data } = await graphql(schema, mutation)
        expect(data.deleteAuction).toMatchObject(auctionObjectTemplate)
      })
      test('returns a GraphQLError for missing id field', async () => {
        expect.assertions(1)
        const mutation = `mutation deleteAuction{
          deleteAuction{
            id
            createdAt
            name
            ownerId
          }
        }`
        const result = await graphql(schema, mutation)
        expect(result).toHaveProperty(
          'errors',
          expect.arrayContaining([
            expect.objectContaining(missingFieldErrorMessage({ method: 'deleteAuction', field: 'id', type: 'ID' }))
          ])
        )
      })
    })
  })
})
