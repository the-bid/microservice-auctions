const casual = require('casual')
const jwt = require('jsonwebtoken')
const { auctions, auction, auctionsByUser, isMember } = require('./Query')
const MockAuction = require('../../test/mock-data/Auction')
const { auctionObjectTemplate } = require('../../test/object-templates')
const { expectArrayOfMatchingObjects } = require('../../test/expect-extensions')
const { getAuctionsData } = require('../../test/mock-data/factories')

describe('Query', () => {
  const context = {}
  describe('auctions', () => {
    beforeEach(() => {
      context.prisma = {
        auctions: jest.fn(getAuctionsData)
      }
    })
    afterEach(() => {
      delete context.prisma
    })
    test('returns an array of Auctions', async () => {
      const result = await auctions({}, {}, context)
      expect(result).toEqual(expect.any(Array))
      expectArrayOfMatchingObjects(result, auctionObjectTemplate)
    })
  })
  describe('auction', () => {
    beforeEach(() => {
      context.prisma = {
        auction: jest.fn(() => new MockAuction())
      }
    })
    afterEach(() => {
      delete context.prisma
    })
    test('prisma.auction gets called with where clause', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await auction({}, { id }, context, {})
      expect(context.prisma.auction).toHaveBeenCalledWith({ id })
    })
    test('returns an auction', async () => {
      expect.assertions(1)
      const result = await auction({}, { id: casual.uuid }, context)
      expect(result).toMatchObject(auctionObjectTemplate)
    })
  })
  describe('auctionsByUser', () => {
    beforeEach(() => {
      context.prisma = {
        auctions: jest.fn(getAuctionsData)
      }
    })
    afterEach(() => {
      delete context.prisma
    })
    test('prisma.auctions gets called with where clause', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await auctionsByUser({}, { userId: id }, context, {})
      expect(context.prisma.auctions).toHaveBeenCalledWith({ where: { OR: [{ ownerId: id }] } })
    })
    test('returns a list of auctions', async () => {
      const result = await auctionsByUser({}, { userId: casual.uuid }, context)
      expect(result).toEqual(expect.any(Array))
      expectArrayOfMatchingObjects(result, auctionObjectTemplate)
    })
  })
  describe('isMember', () => {
    let auction
    let userId
    beforeEach(() => {
      userId = casual.uuid
      auction = new MockAuction()
      context.prisma = {
        auction: jest.fn(({ id }) => (auction.id === id ? auction : null))
      }
      context.request = {
        headers: {
          authorization: `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
        }
      }
    })
    afterEach(() => {
      delete context.request
      delete context.prisma
      userId = null
      auction = null
    })
    test('returns true if user is the owner', async () => {
      expect.assertions(1)
      userId = auction.ownerId
      context.request.headers.authorization = `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
      const result = await isMember({}, { id: auction.id, userId }, context)
      expect(result).toEqual(true)
    })
    test('returns true if user is a player', async () => {
      expect.assertions(1)
      userId = auction.playerIds[casual.integer(0, auction.playerIds.length - 1)]
      context.request.headers.authorization = `Bearer ${jwt.sign({ sub: userId }, 'secret')}`
      const result = await isMember({}, { id: auction.id, userId }, context)
      expect(result).toEqual(true)
    })
    test('returns false if user is not a member', async () => {
      expect.assertions(1)
      const result = await isMember({}, { id: auction.id, userId }, context)
      expect(result).toEqual(false)
    })
    test('throws an error if auction does not exist', async () => {
      expect.assertions(1)
      const id = casual.uuid
      await expect(isMember({}, { id, userId }, context)).rejects.toThrow('Auction does not exist')
    })
  })
})
