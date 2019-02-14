const jwt = require('jsonwebtoken')
const casual = require('casual')
const { createAuction, deleteAuction } = require('./Mutation')

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
      expect(context.prisma.createAuction).toBeCalledWith({ name: auctionName, ownerId: userId })
    })
  })
  describe('deleteAuction', () => {
    let auctionOwner
    beforeEach(() => {
      context.prisma = {
        deleteAuction: jest.fn(),
        $exists: {
          auction: jest.fn(() => auctionOwner === userId)
        }
      }
    })
    afterEach(() => {
      auctionOwner = null
      delete context.prisma
    })
    test('prisma.deleteAuction called with id if userId is owner of the auction', async () => {
      auctionOwner = userId
      const id = casual.uuid
      await deleteAuction({}, { id }, context)
      expect(context.prisma.deleteAuction).toBeCalledWith({ id })
    })
    test('deleteAuction throws error if userId is not owner of the auction', async () => {
      auctionOwner = casual.uuid
      const id = casual.uuid
      await expect(deleteAuction({}, { id }, context)).rejects.toThrow('User cannot delete an auction they do not own.')
    })
  })
})
