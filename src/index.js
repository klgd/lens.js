const APIBase = require('./APIBase')
const queries = require('./queries')
const { flowRight } = require('./helpers/utils')

class Lens extends flowRight(...Object.values(queries))(APIBase) {
  constructor () {
    super()
  }
}

module.exports = Lens