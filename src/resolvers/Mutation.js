const { getUserId } = require('../utils')

module.exports = {
  addPlayer,
  createAuction,
  deleteAuction
}

async function addPlayer(root, { id, userId }, context) {
  const auction = await context.prisma.auction({ id })
  if (!auction) {
    throw new Error('Auction does not exist')
  }
  const { ownerId, playerIds } = auction
  if (ownerId === userId) {
    throw new Error('User is already the owner of the auction')
  }
  if (playerIds.includes(userId)) {
    throw new Error('User is already a player in the auction')
  }
  return context.prisma.updateAuction({
    data: {
      playerIds: [...playerIds, userId]
    },
    where: { id }
  })
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
