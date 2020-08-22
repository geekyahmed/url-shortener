const Url = require('../models/url').Url
const {
  generateResponse,
  generateRandString,
  getClientIpAddr
} = require('../services/url.service')

module.exports = {
  //Get All URLs In DB
  index: async (req, res) => {
    await Url.find({ clientIP: getClientIpAddr(req) }).then(urls => {
      return res.status(200).json(
        urls.map(url => {
          return {
            link: url.link,
            shorten_link: url.shortLink,
            views: url.views,
            date: url.createdAt
          }
        })
      )
    })
  },
  //Save URL Data To DB After Link Is Shorten
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
  //Redirect URL When Clicked
  redirectUrl: async (req, res, next) => {
    const url = `${req.protocol}://${req.headers.host}/url/${req.params.shortLink}`
    try {
      //Find shorten link and increase counter
      await Url.findOneAndUpdate(
        { shortLink: url },
        {
          $inc: {
            views: 1
          }
        }
      ).then(shortLinkUrl => {
        res.redirect(`${shortLinkUrl.link}`)
      })
    } catch (err) {
      next(err)
    }
  }
}
