const casual = require('casual')
const { auctions, auction, auctionsByUser } = require('./Query')
const MockAuction = require('../../test/mock-data/Auction')
const { auctionObjectTemplate } = require('../../test/object-templates')
const { expectArrayOfMatchingObjects } = require('../../test/expect-extensions')
const { getAuctionsData } = require('../../test/mock-data/factories')

describe('Query', () => {
  const context = {}
  describe('auctions', () => {
    beforeEach(() => {
      context.db = {
        query: {
          auctions: jest.fn(getAuctionsData)
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('returns an array of Auctions', async () => {
      const result = await auctions({}, {}, context)
      expect(result).toEqual(expect.any(Array))
      expectArrayOfMatchingObjects(result, auctionObjectTemplate)
    })
  })
  describe('auction', () => {
    beforeEach(() => {
      context.db = {
        query: {
          auction: jest.fn(() => new MockAuction())
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('db.query.auction gets called with where clause', async () => {
      const id = casual.uuid
      await auction({}, { id }, context, {})
      expect(context.db.query.auction).toBeCalledWith({ where: { id } }, {})
    })
    test('returns an auction', async () => {
      const result = await auction({}, { id: casual.uuid }, context)
      expect(result).toMatchObject(auctionObjectTemplate)
    })
  })
  describe('auctionsByUser', () => {
    beforeEach(() => {
      context.db = {
        query: {
          auctions: jest.fn(getAuctionsData)
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('db.query.auctions gets called with where clause', async () => {
      const id = casual.uuid
      await auctionsByUser({}, { userId: id }, context, {})
      expect(context.db.query.auctions).toBeCalledWith({ where: { OR: [{ ownerId: id }] } }, {})
    })
    test('returns a list of auctions', async () => {
      const result = await auctionsByUser({}, { userId: casual.uuid }, context)
      expect(result).toEqual(expect.any(Array))
      expectArrayOfMatchingObjects(result, auctionObjectTemplate)
    })
  })
})
