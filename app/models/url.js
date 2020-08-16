const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UrlSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = { Url: mongoose.model('url', UrlSchema) }
