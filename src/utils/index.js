const jwt = require('jsonwebtoken')
const {get} = require('lodash')

function getUserId(request){
  const {sub} = jwt.decode(parseBearerToken(request))
  return sub
}

function parseBearerToken(request){
  const token = get(request,'headers.authorization')
  if(!token){
    throw new Error('Authorization header required')
  }
  return token.replace('Bearer ','')
}

module.exports = {getUserId}
