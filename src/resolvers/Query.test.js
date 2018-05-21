const { integer, uuid } = require('casual')
const { auctions, auction, auctionsByUser } = require('./Query')
const MockAuction = require('../../test/mock-data/Auction')
const { auctionObjectTemplate } = require('../../test/utils')

describe('Query', () => {
  const context = {}
  describe('auctions', () => {
    beforeEach(() => {
      const auctionsData = Array.from(new Array(integer(1, 100)), () => new MockAuction())
      context.db = {
        query: {
          auctions: jest.fn(() => auctionsData)
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('returns an array of Auctions', () => {
      const result = auctions({}, {}, context)
      expect(result).toEqual(expect.any(Array))
      result.forEach(auction => {
        expect(auction).toMatchObject(auctionObjectTemplate)
      })
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
    test('db.query.auction gets called with where clause', () => {
      const id = uuid
      auction({}, { id }, context, {})
      expect(context.db.query.auction).toBeCalledWith({ where: { id } }, {})
    })
    test('returns an auction', () => {
      const result = auction({}, { id: uuid }, context)
      expect(result).toMatchObject(auctionObjectTemplate)
    })
  })
  describe('auctionsByUser', () => {
    beforeEach(() => {
      const auctionsData = Array.from(new Array(integer(1, 10)), () => new MockAuction())
      context.db = {
        query: {
          auctions: jest.fn(() => auctionsData)
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('db.query.auctions gets called with where clause', () => {
      const id = uuid
      auctionsByUser({}, { userId: id }, context, {})
      expect(context.db.query.auctions).toBeCalledWith({ where: { OR: [{ ownerId: id }] } }, {})
    })
    test('returns a list of auctions', () => {
      const result = auctionsByUser({}, { userId: uuid }, context)
      expect(result).toEqual(expect.any(Array))
      result.forEach(auction => {
        expect(auction).toMatchObject(auctionObjectTemplate)
      })
    })
  })
})
