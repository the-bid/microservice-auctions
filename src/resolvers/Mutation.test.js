const jwt = require('jsonwebtoken')
const casual = require('casual')
const { createAuction, deleteAuction } = require('./Mutation')
const MockAuction = require('../../test/mock-data/Auction')

describe('Mutation', () => {
  const context = {}
  let userId = null
  beforeEach(() => {
    userId = casual.uuid
    context.request = {
      headers: {
        authorization: `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
      }
    }
  })
  afterEach(() => {
    delete context.request
    userId = null
  })
  describe('createAuction', () => {
    beforeEach(() => {
      context.prisma = {
        createAuction: jest.fn()
      }
    })
    afterEach(() => {
      delete context.prisma
    })
    test('prisma.createAuction called with name and ownerId', async () => {
      const auctionName = casual.title
      await createAuction({}, { name: auctionName }, context)
      expect(context.prisma.createAuction).toHaveBeenCalledWith({ name: auctionName, ownerId: userId })
    })
  })
  describe('deleteAuction', () => {
    let auction
    beforeEach(() => {
      auction = new MockAuction({ ownerId: userId })
      context.prisma = {
        deleteAuction: jest.fn(),
        auction: jest.fn(({ id }) => (auction.id === id ? auction : null))
      }
    })
    afterEach(() => {
      auction = null
      delete context.prisma
    })
    test('prisma.deleteAuction called with id if userId is owner of the auction', async () => {
      const id = auction.id
      await deleteAuction({}, { id }, context)
      expect(context.prisma.deleteAuction).toHaveBeenCalledWith({ id })
    })
    test('deleteAuction throws error if auction does not exist', async () => {
      const id = casual.uuid
      await expect(deleteAuction({}, { id }, context)).rejects.toThrow('Auction does not exist')
    })
    test('deleteAuction throws error if userId is not owner of the auction', async () => {
      auction.ownerId = casual.uuid
      const id = auction.id
      await expect(deleteAuction({}, { id }, context)).rejects.toThrow('User cannot delete an auction they do not own.')
    })
  })
})
