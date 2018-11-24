const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error)

module.exports = db
