const mongoose = require('mongoose')

var currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    index: true,
    unique: true,
    maxlength: 3
  }
}, {
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('Partner', currencySchema)
