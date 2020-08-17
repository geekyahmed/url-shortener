const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = new Schema({
  clientIP: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  shortLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = { Url: mongoose.model('url', UrlSchema) }
