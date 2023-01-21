
const { PROXY_ACTION } = require('../helpers/queries')

const Collect = superclass => class extends superclass {
  freeCollect(publicationId) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(PROXY_ACTION, {
          request: {
            collect: {
              freeCollect: {
                publicationId,
              }
            },
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

module.exports = Collect