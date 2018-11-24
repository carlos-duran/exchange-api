const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const koaJwt = require('koa-jwt')
const { User } = require('../models')

const router = new Router()

router.post('/login', login)

router.use(koaJwt({ secret: process.env.APP_SECRET, key: 'jwtdata' }))
router.use(setUser)

router.get('/account', account)

module.exports = [router.routes(), router.allowedMethods()]

async function setUser (ctx, next) {
  const { id, type } = ctx.state.jwtdata
  ctx.assert(type === 'user', 'Forbidden token')
  const user = await User.findOne({ _id: id })
  ctx.assert(user, 401, 'User doesn\'t exist!')
  ctx.state.user = user
  await next()
}

async function login (ctx) {
  const body = ctx.request.body
  const user = await User.findOne({ nickname: body.email })
  ctx.assert(user, 401, 'Auth failed!') // user not found
  const match = await user.comparePassword(body.password)
  ctx.assert(match, 401, 'Auth failed!') // Wrong password
  const token = jwt.sign({ id: user._id, type: 'user' }, process.env.APP_SECRET)
  ctx.body = { token, message: 'Auth success' }
}

async function account (ctx) {
  ctx.body = ctx.state.user
}
