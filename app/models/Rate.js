const mongoose = require('mongoose')
const { Schema } = mongoose

var rateSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true,
    index: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('Rate', rateSchema)
