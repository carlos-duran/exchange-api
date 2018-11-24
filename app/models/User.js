const mongoose = require('mongoose')
const password = require('mongoose-password')

var userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    index: true,
    unique: true,
    maxlength: 16
  }
}, {
  toJSON: { virtuals: true }
})

userSchema.plugin(password)

module.exports = mongoose.model('User', userSchema)
