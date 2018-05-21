const { uuid, moment, title, integer } = require('casual')

class MockAuction {
  constructor() {
    this.id = uuid
    this.createdAt = moment.toISOString()
    this.name = title
    this.ownerId = uuid
    this.playerIds = Array.from(new Array(integer(0, 64)), () => uuid)
  }
}

module.exports = MockAuction
