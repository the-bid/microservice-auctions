const casual = require('casual')

class MockAuction {
  constructor({ id, createdAt, name, ownerId, playerIds } = {}) {
    this.id = id || casual.uuid
    this.createdAt = createdAt || casual.moment.toISOString()
    this.name = name || casual.title
    this.ownerId = ownerId || casual.uuid
    this.playerIds = playerIds || Array.from(new Array(casual.integer(0, 64)), () => casual.uuid)
  }
}

module.exports = MockAuction
