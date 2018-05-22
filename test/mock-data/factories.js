const { integer } = require('casual')
const MockAuction = require('./Auction')

function getAuctionsData() {
  return Array.from(new Array(integer(1, 10)), () => new MockAuction())
}

module.exports = { getAuctionsData }
