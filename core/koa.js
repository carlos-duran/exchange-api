const Koa = require('koa')
const cors = require('@koa/cors')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')

const app = new Koa()
app.proxy = true

// Global error handler
app.use((ctx, next) => {
  return next().catch(e => {
    // Mongoose errors
    const me = ['CastError', 'ValidationError'].includes(e.name)

    // Normal flow
    ctx.status = e.status || (me ? 400 : 500)
    ctx.body = { message: e.message }
    ctx.app.emit('error', e, ctx)
  })
})

app.use(logger())
app.use(cors())
app.use(compress())
app.use(bodyParser({ jsonLimit: '1mb' }))

module.exports = app
