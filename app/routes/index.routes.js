const express = require('express')
const urlController = require('../controllers/url.controller')
const api = express.Router()

api.route('/').get(urlController.index)

api.route('/new').post(urlController.generateShortUrl)

api.route('/url/:shortLink').get(urlController.redirectUrl)

module.exports = api
