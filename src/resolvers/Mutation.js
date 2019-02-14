const { getUserId } = require('../utils')

module.exports = {
  createAuction,
  deleteAuction
}

function createAuction(root, { name }, context) {
  const userId = getUserId(context.request)
  return context.prisma.createAuction({
    name,
    ownerId: userId
  })
}

async function deleteAuction(root, { id }, context) {
  const userId = getUserId(context.request)
  const isOwner = await context.prisma.$exists.auction({ AND: [{ id }, { ownerId: userId }] })
  if (isOwner) {
    return context.prisma.deleteAuction({
      id
    })
  } else {
    //TODO: what if it does not exist
    throw new Error('User cannot delete an auction they do not own.')
  }
}
