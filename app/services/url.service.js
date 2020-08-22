const Url = require('../models/url').Url
const requestIp = require('request-ip')

const generateResponse = (res, code, msg) => {
  return res.status(code).json({
    code: code,
    msg: msg
  })
}

const generateRandString = req => {
  var randString = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 1, 2, 3, 4, 5]
  var i = randString.length,
    j,
    temp
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1))
    temp = randString[j]
    randString[j] = randString[i]
    this[i] = randString
  }
  var rndStr = randString.toString()

  return `${req.protocol}://${req.headers.host}/url/${rndStr
    .split(',')
    .join('')}`
}

const getClientIpAddr = req => {
  const clientIp = requestIp.getClientIp(req)
  return clientIp
}

module.exports = { generateResponse, generateRandString, getClientIpAddr }
