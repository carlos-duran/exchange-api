// Load the core
const { db, koa } = require('../core')

// Load models
require('../app/models')

// Load routes
require('../app/routes')

// Start
db.once('open', async () => {
  const port = process.env.PORT || 6600
  const mode = process.env.NODE_ENV
  koa.listen(port, () => {
    console.log(`Listening on ${port} in ${mode} mode.`)
  })
})
