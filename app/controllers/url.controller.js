const Url = require('../models/url').Url
const {
  generateResponse,
  generateRandString
} = require('../services/url.service')

module.exports = {
  getUrlPage: async (req, res) => {
    res.render('index')
  },
  generateShortUrl: async (req, res, next) => {
    try {
      if (req.body.url == '') {
        generateResponse(res, 201, 'No URL is provided')
      }

      await Url.findOne({ link: req.body.link }).then(existingLink => {
        if (existingLink) {
          generateResponse(res, 201, 'Link already exists!!')
        } else {
          const newUrl = new Url({
            link: req.body.link,
            shortLink: generateRandString()
          })
          newUrl.save().then(savedUrl => {
            res.render('home', { savedUrl: savedUrl })
          })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
