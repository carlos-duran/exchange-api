const Router = require('koa-router')
const { koa } = require('../../core')

const router = new Router()

router.use(...require('./public'))
router.use('/user', ...require('./user'))

koa.use(router.routes())
koa.use(router.allowedMethods())

// catch 404 and forward to error handler
koa.use(async ctx => ctx.throw(404))
