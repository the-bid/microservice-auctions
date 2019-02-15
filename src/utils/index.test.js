const jwt = require('jsonwebtoken')
const { uuid } = require('casual')
const { getUserId } = require('./index.js')

describe('Utils', () => {
  describe('getUserId', () => {
    const request = {}
    beforeEach(() => {
      const token = jwt.sign({ sub: uuid }, 'secret')
      request.headers = {
        authorization: `Bearer ${token}`
      }
    })
    afterEach(() => {
      delete request.headers
    })
    test('returns the sub of a jwt', () => {
      const result = getUserId(request)
      expect(result).toEqual(expect.stringMatching(/^(?!Bearer).*$/))
    })
    test('throws error if the auth header is not a bearer token', () => {
      request.headers.authorization = `Basic ${uuid}`
      expect(() => getUserId(request)).toThrow('Authorization header Bearer token required')
    })
    test('throws error if there is no auth header', () => {
      delete request.headers.authorization
      expect(() => getUserId(request)).toThrow('Authorization header Bearer token required')
    })
  })
})
