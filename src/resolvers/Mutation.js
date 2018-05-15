const { getUserId } = require('../utils')

module.exports = {
  createAuction,
  deleteAuction
}

function createAuction(root, { name }, context, info) {
  const userId = getUserId(context.request)
  if (!userId) {
    throw new Error('JWT missing "sub"')
  }
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
  return context.db.mutation.deleteAuction(
    {
      where: {
        id
      }
    },
    info
  )
}
