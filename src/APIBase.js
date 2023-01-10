const { createClient } = require('@urql/core')

const env = {
  testnet: "https://api-mumbai.lens.dev",
  mainnet: "https://api.lens.dev",
}

class APIBase {
  constructor(options) {
    const { client, mode, clientOptions } = options

    clientOptions = clientOptions || {}
    clientOptions.url = clientOptions.url || env[mode || 'mainnet']

    this.client = client || createClient(clientOptions);
  }
}

module.exports = APIBase