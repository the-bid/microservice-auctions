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
      context.db = {
        mutation: {
          createAuction: jest.fn()
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('db.mutation.createAuction called with name and ownerId', async () => {
      const auctionName = casual.title
      await createAuction({}, { name: auctionName }, context, {})
      expect(context.db.mutation.createAuction).toBeCalledWith({ data: { name: auctionName, ownerId: userId } }, {})
    })
  })
  describe('deleteAuction', () => {
    beforeEach(() => {
      context.db = {
        mutation: {
          deleteAuction: jest.fn()
        }
      }
    })
    afterEach(() => {
      delete context.db
    })
    test('db.mutation.deleteAuction called with id and ownerId', async () => {
      const id = casual.uuid
      await deleteAuction({}, { id }, context, {})
      expect(context.db.mutation.deleteAuction).toBeCalledWith({ where: { AND: { id, ownerId: userId } } }, {})
    })
  })
})
