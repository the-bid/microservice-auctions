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
  const auctionToDelete = await context.prisma.auction({ id })
  if (!auctionToDelete) {
    throw new Error('Auction does not exist')
  }
  if (userId !== auctionToDelete.ownerId) {
    throw new Error('User cannot delete an auction they do not own.')
  }
  return context.prisma.deleteAuction({
    id
  })
}
