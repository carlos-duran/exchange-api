const Router = require('koa-router')
const { Currency, Rate } = require('../models')
const router = new Router()

router.get('/', welcome)
router.get('/exchange', exchange)

module.exports = [router.routes(), router.allowedMethods()]

async function welcome (ctx) {
  ctx.body = { message: 'Welcome to Exchange API!' }
}

async function exchange (ctx) {
  const { from, to } = ctx.query
  ctx.assert(from && to, 400, 'Currencies are required')

  const base = await Currency.findOne({ code: from })
  ctx.assert(base, 404, from + ' not found')
  const targets = await Currency.find({ code: to.split(',') })
  ctx.assert(targets.length, 404, 'Targets not found')

  const rates = await Rate.find({
    from: base._id,
    to: { $in: targets.map(t => t._id) }
  })

  ctx.body = {
    base: base.code,
    date: (new Date()).toISOString().split('T')[0],
    rates: rates.reduce((o, r) => {
      const { code } = targets.find(t => t._id.equals(r.to))
      o[code] = r.value
      return o
    }, {})
  }
}
