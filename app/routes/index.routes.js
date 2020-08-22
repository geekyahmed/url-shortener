const express = require('express')
const urlController = require('../controllers/url.controller')
const api = express.Router()

//GET all URLS
api.route('/').get(urlController.index)

//Create and Shorten URL
api.route('/new').post(urlController.generateShortUrl)

//Get Shortened Link And Redirect To Original Link
api.route('/url/:shortLink').get(urlController.redirectUrl)

module.exports = api
