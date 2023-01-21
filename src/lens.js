const APIBase = require('./APIBase')
const queries = require('./queries')
const { flowRight } = require('./helpers/utils')

class Lens extends flowRight(...Object.values(queries))(APIBase) {
  constructor (options, env = 'mainnet') {
    super(options, env)
  }
}

module.exports = Lens