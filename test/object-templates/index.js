const auctionObjectTemplate = {
  id: expect.any(String),
  createdAt: expect.any(String),
  name: expect.any(String),
  ownerId: expect.any(String)
}

function missingFieldErrorMessage({ method, field, type }) {
  return {
    message: `Field "${method}" argument "${field}" of type "${type}!" is required but not provided.`
  }
}

module.exports = { auctionObjectTemplate, missingFieldErrorMessage }
