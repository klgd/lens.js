
const { USER_SIG_NONCES } = require('../helpers/queries')

const User = superclass => class extends superclass {
  getUserSigNonces() {
    return new Promise((resolve, reject) => {
      this.client
        .query(USER_SIG_NONCES)
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

module.exports = User