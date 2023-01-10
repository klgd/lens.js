const { GET_PING } = require('../helpers/queries')

const Ping = superclass => class extends superclass {
  ping() {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PING)
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Ping
