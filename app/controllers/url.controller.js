const Url = require('../models/url').Url
const {
  generateResponse,
  generateRandString,
  getClientIpAddr
} = require('../services/url.service')

module.exports = {
  index: async (req, res) => {
    await Url.find({ clientIP: getClientIpAddr(req) }).then(urls => {
      return res.status(200).json(
        urls.map(url => {
          return {
            link: url.link,
            shorten_link: url.shortLink,
            date: url.createdAt
          }
        })
      )
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
        res.status(200).json({
          msg: 'URL is now shortened',
          data: savedUrl
        })
      })
    } catch (error) {
      next(error)
    }
  },
  redirectUrl: async (req, res, next) => {
    const id = req.params.shortLink
    try {
      const shortLinkUrl = await Url.findOne({ shortLink: id })
      res.redirect(`${shortLinkUrl.link}`)
    } catch (err) {
      next(err)
    }
  }
}
