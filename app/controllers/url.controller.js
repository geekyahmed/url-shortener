const Url = require('../models/url').Url
const {
  generateResponse,
  generateRandString,
  getClientIpAddr
} = require('../services/url.service')

module.exports = {
  index: async (req, res) => {
    await Url.find({ clientIP: getClientIpAddr(req) }).then(urls => {
      res.render('index', { urls: urls })
    })
  },
  generateShortUrl: async (req, res, next) => {
    try {
      if (req.body.url > 0) {
        generateResponse(res, 201, 'No URL is provided')
      }
      const newUrl = new Url({
        clientIP: getClientIpAddr(req),
        link: req.body.link,
        shortLink: generateRandString(req)
      })
      newUrl.save().then(savedUrl => {
        res.redirect('/')
      })
    } catch (error) {
      next(error)
    }
  }
}
