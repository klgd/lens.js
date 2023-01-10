
const { PROXY_ACTION } = require('../helpers/queries')

const Collect = superclass => class extends superclass {
  freeCollect(publicationId, token) {
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
        },
        {
          fetchOptions: {
            headers: {
              'x-access-token': token,
            },
          },
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