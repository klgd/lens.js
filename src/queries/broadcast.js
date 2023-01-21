const { BROADCAST } = require('../helpers/queries')

const Broadcast = superclass => class extends superclass {
  broadcast(id, signature) {
    return new Promise((resolve, reject) => {
      this.client.
        mutation(BROADCAST, {
          request: {
            id,
            signature
          }
        })
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

module.exports = Broadcast
