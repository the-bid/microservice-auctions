const auctionObjectTemplate = {
  id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  name: expect.any(String),
  ownerId: expect.any(String),
  playerIds: expect.any(Array)
}

function missingFieldErrorMessage({ method, field, type }) {
  return {
    message: `Field "${method}" argument "${field}" of type "${type}!" is required, but it was not provided.`
  }
}

module.exports = { auctionObjectTemplate, missingFieldErrorMessage }
