module.exports = {
  auctions,
  auction,
  auctionsByUser
}

function auctions(root,args,context,info){
  return context.db.query.auctions({},info)
}

function auction(root,{id},context,info){
  return context.db.query.auction({where:{id:id}},info)
}

function auctionsByUser(root,{userId},context,info){
  const where = {
    OR: [
      {ownerId:userId}
    ]
  }
  return context.db.query.auctions({where},info)
}
