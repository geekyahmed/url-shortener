const express = require('express')
const urlController = require('../controllers/url.controller')
const api = express.Router()

api
  .route('/')
  .get(urlController.index)
  .post(urlController.generateShortUrl)

api.route('/url').get(urlController.getUrlPage)

module.exports = api
