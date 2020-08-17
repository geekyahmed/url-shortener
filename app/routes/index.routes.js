const express = require('express')
const urlController = require('../controllers/url.controller')
const api = express.Router()

api
  .route('/')
  .get(urlController.getUrlPage)
  .post(urlController.generateShortUrl)

// api.route('/url')
//   .get(urlController)

module.exports = api
