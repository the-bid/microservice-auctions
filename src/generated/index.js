'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const prisma_lib_1 = require('prisma-client-lib')
const typeDefs = require('./prisma-schema').typeDefs

const models = [
  {
    name: 'Auction',
    embedded: false
  }
]
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466/the-bid-auctions/local`,
  secret: `${process.env['PRISMA_MANAGEMENT_API_SECRET']}`
})
exports.prisma = new exports.Prisma()
