const Url = require('../models/url').Url
const generateResponse = require('../services/url.service')

module.exports = {
  generateShortUrl: async (req, res, next) => {
    try {
      if (req.body.url == '') {
        generateResponse(res, 201, 'No URL is provided')
      }

      await Url.findOne({ link: req.body.link }).then(existingLink => {
        if (existingLink) {
          generateResponse(res, 200, 'Link already exists!!')
        } else {
          const newUrl = new Url({
            link: req.body.link
          })
          newUrl.save().then(savedUrl => {
            return res.status(200).json({
              code: 200,
              msg: 'Link have been shortened',
              data: {
                link: req.body.link,
                shortLink: savedUrl.link
              }
            })
          })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
