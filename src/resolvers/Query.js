module.exports = {
  auctions,
  auction,
  auctionsByUser
}

function auctions(root, args, context) {
  return context.prisma.auctions()
}

function auction(root, { id }, context) {
  return context.prisma.auction({ id: id })
}

function auctionsByUser(root, { userId }, context) {
  const where = {
    OR: [{ ownerId: userId }]
  }
  return context.prisma.auctions({ where })
}
