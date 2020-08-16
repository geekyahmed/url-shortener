const express = require('express')
const urlController = require('../controllers/url.controller')
const api = express.Router()

api
  .route('/')
  .get(urlController.generateShortUrl)
  .post(urlController.generateShortUrl)

module.exports = api
