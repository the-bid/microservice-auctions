const jwt = require('jsonwebtoken')
const casual = require('casual')
const { addPlayer, removePlayer, createAuction, deleteAuction } = require('./Mutation')
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
  describe('addPlayer', () => {
    let auction
    beforeEach(() => {
      auction = new MockAuction()
      context.prisma = {
        auction: jest.fn(({ id }) => (auction.id === id ? auction : null)),
        updateAuction: jest.fn()
      }
    })
    afterEach(() => {
      delete context.prisma
      auction = null
    })
    test('prisma.updateAuction called with playerIds', async () => {
      expect.assertions(1)
      await addPlayer({}, { id: auction.id, userId }, context)
      expect(context.prisma.updateAuction).toHaveBeenCalledWith({
        data: {
          playerIds: {
            set: expect.arrayContaining([userId])
          }
        },
        where: { id: auction.id }
      })
    })
    test('uses userId from auth header if no userId provided', async () => {
      expect.assertions(1)
      await addPlayer({}, { id: auction.id }, context)
      expect(context.prisma.updateAuction).toHaveBeenCalledWith({
        data: {
          playerIds: {
            set: expect.arrayContaining([userId])
          }
        },
        where: { id: auction.id }
      })
    })
    test('throw error if auction does not exist', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await expect(addPlayer({}, { id, userId }, context)).rejects.toThrow('Auction does not exist')
    })
    test('throw error if user is the owner of the auction', async () => {
      expect.assertions(1)
      userId = auction.ownerId
      await expect(addPlayer({}, { id: auction.id, userId }, context)).rejects.toThrow(
        'User is already the owner of the auction'
      )
    })
    test('throw error if user is already a player in the auction', async () => {
      expect.assertions(1)
      userId = auction.playerIds[casual.integer(0, auction.playerIds.length - 1)]
      await expect(addPlayer({}, { id: auction.id, userId }, context)).rejects.toThrow(
        'User is already a player in the auction'
      )
    })
  })
  describe('removePlayer', () => {
    let auction
    beforeEach(() => {
      auction = new MockAuction()
      context.prisma = {
        auction: jest.fn(({ id }) => (auction.id === id ? auction : null)),
        updateAuction: jest.fn()
      }
    })
    afterEach(() => {
      delete context.prisma
      auction = null
    })
    test('prisma.updateAuction called without playerIds', async () => {
      expect.assertions(1)
      const userId = auction.playerIds[casual.integer(0, auction.playerIds.length - 1)]
      await removePlayer({}, { id: auction.id, userId }, context)
      expect(context.prisma.updateAuction).toHaveBeenCalledWith({
        data: {
          playerIds: {
            set: expect.not.arrayContaining([userId])
          }
        },
        where: { id: auction.id }
      })
    })
    test('uses userId from auth header if no userId provided', async () => {
      expect.assertions(1)
      const userId = auction.playerIds[casual.integer(0, auction.playerIds.length - 1)]
      context.request.headers.authorization = `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
      await removePlayer({}, { id: auction.id }, context)
      expect(context.prisma.updateAuction).toHaveBeenCalledWith({
        data: {
          playerIds: {
            set: expect.not.arrayContaining([userId])
          }
        },
        where: { id: auction.id }
      })
    })
    test('throw error if auction does not exist', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await expect(removePlayer({}, { id, userId }, context)).rejects.toThrow('Auction does not exist')
    })
    test('throw error if user is the owner of the auction', async () => {
      expect.assertions(1)
      userId = auction.ownerId
      await expect(removePlayer({}, { id: auction.id, userId }, context)).rejects.toThrow(
        'Cannot remove the owner of the auction'
      )
    })
    test('throw error if user is not a player in the auction', async () => {
      expect.assertions(1)
      userId = casual.uuid
      await expect(removePlayer({}, { id: auction.id, userId }, context)).rejects.toThrow(
        'User is not a player in the auction'
      )
    })
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
      expect.assertions(1)
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
      expect.assertions(1)
      const id = auction.id
      await deleteAuction({}, { id }, context)
      expect(context.prisma.deleteAuction).toHaveBeenCalledWith({ id })
    })
    test('deleteAuction throws error if auction does not exist', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await expect(deleteAuction({}, { id }, context)).rejects.toThrow('Auction does not exist')
    })
    test('deleteAuction throws error if userId is not owner of the auction', async () => {
      expect.assertions(1)
      auction.ownerId = casual.uuid
      const id = auction.id
      await expect(deleteAuction({}, { id }, context)).rejects.toThrow('User cannot delete an auction they do not own.')
    })
  })
})
