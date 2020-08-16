const Url = require('../models/url').Url

const generateResponse = (res, code, msg) => {
  return res.status(code).json({
    code: code,
    msg: msg
  })
}

module.exports = generateResponse
