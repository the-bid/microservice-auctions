const { getUserId } = require('../utils')

module.exports = {
  createAuction,
  deleteAuction
}

function createAuction(root, { name }, context, info) {
  const userId = getUserId(context.request)
  return context.db.mutation.createAuction(
    {
      data: {
        name,
        ownerId: userId
      }
    },
    info
  )
}

function deleteAuction(root, { id }, context, info) {
  const userId = getUserId(context.request)
  return context.db.mutation.deleteAuction(
    {
      where: {
        AND: {
          id,
          ownerId: userId
        }
      }
    },
    info
  )
}
