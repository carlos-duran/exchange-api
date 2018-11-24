require('../env')
const db = require('../core/mongoose')
const { User, Currency, Rate } = require('../app/models')

db.once('open', run)

async function run () {
  try {
    await createUsers()
    console.log('Users have been created')

    const currencies = await createCurrencies()
    console.log('Currencies have been created')

    await createRates(currencies)
    console.log('Rates have been created')
  } catch (e) {
    console.log(e.message)
  } finally {
    db.close()
  }
}

async function createUsers () {
  return User.create([
    {
      nickname: 'user001',
      password: 'pass001*'
    },
    {
      nickname: 'user002',
      password: 'pass002*'
    }
  ])
}

async function createCurrencies () {
  return Currency.create([
    {
      code: 'USD',
      name: 'United States dollar'
    },
    {
      code: 'EUR',
      name: 'Euro'
    }
    // Add more...
  ])
}

async function createRates (currencies) {
  const raw = [
    {
      from: 'USD',
      to: 'EUR',
      value: 0.88
    }
    // Add more...
  ]

  // Process
  return Rate.create(raw.map(r => ({
    ...r,
    from: currencies.find(c => c.code === r.from).id,
    to: currencies.find(c => c.code === r.to).id
  })))
}
