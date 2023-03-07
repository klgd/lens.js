
const { PROXY_ACTION, CREATE_COLLECT_TYPED_DATA } = require('../helpers/queries')

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

  createCollectTypedData(overrideSigNonce, publicationId) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_COLLECT_TYPED_DATA, {
          options: overrideSigNonce ? {
            overrideSigNonce
          } : null,
          request: {
            publicationId
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