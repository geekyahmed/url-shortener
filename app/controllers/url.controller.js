const Url = require('../models/url').Url
const {
  generateResponse,
  generateRandString
} = require('../services/url.service')

module.exports = {
  index: async (req, res) => {
    res.render('index')
  },
  generateShortUrl: async (req, res, next) => {
    try {
      if (req.body.url == '') {
        generateResponse(res, 201, 'No URL is provided')
      }
      const newUrl = new Url({
        clientIP: getClientIp(req),
        link: req.body.link,
        shortLink: generateRandString(req)
      })
      newUrl.save().then(savedUrl => {
        res.redirect('/urls')
      })
    } catch (error) {
      next(error)
    }
  },
  getUrlPage: async (req, res) => {
    await Url.findOne({ clientIP : getClientIp(req) })
      .then(urls => {
        res.render('url', {urls : urls})
      })
  }
}
