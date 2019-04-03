module.exports = {
  auctions,
  auction,
  auctionsByUser,
  isMember
}

function auctions(root, args, context) {
  return context.prisma.auctions()
}

function auction(root, { id }, context) {
  return context.prisma.auction({ id })
}

function auctionsByUser(root, { userId }, context) {
  const where = {
    OR: [{ ownerId: userId }]
  }
  return context.prisma.auctions({ where })
}

async function isMember(root, { id, userId }, context) {
  const auction = await context.prisma.auction({ id })
  if (!auction) {
    throw new Error('Auction does not exist')
  }
  const { ownerId, playerIds } = auction
  return ownerId === userId || playerIds.includes(userId)
}
