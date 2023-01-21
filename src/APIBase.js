
const createUrqlClient = require('@urql/core').createClient
const { deepMerge } = require('./helpers/utils')
const fetch = require("isomorphic-unfetch")

const envs = {
  testnet: "https://api-mumbai.lens.dev",
  mainnet: "https://api.lens.dev",
}

class APIBase {
  constructor(clientOptions, env = 'mainnet') {
    this.clientOptions = deepMerge({
      url: envs[env],
      fetchOptions: {
        headers: {
          accept: 'application/graphql+json, application/json',
          'content-type': 'application/json',
        },
      },
    }, clientOptions || {})



    this.createClient()
  }

  createClient() {
    this.client = createUrqlClient(this.clientOptions)
    return this
  }

  setAccessToken(val) {
    this.clientOptions.fetchOptions.headers['x-access-token'] = `Bearer ${val}`

    return this.createClient()
  }
}

module.exports = APIBase