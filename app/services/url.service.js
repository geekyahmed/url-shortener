const Url = require('../models/url').Url

const generateResponse = (res, code, msg) => {
  return res.status(code).json({
    code: code,
    msg: msg
  })
}

// const generateRandString = () => {
//      var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 
// }

module.exports = generateResponse
