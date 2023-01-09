
const { AUTHENTICATION, GET_CHALLENGE, VERIFY } = require('../helpers/queries')

const Auth = superclass => class extends superclass {
  getChallenge(address) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_CHALLENGE, {
          request: {
            address,
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

  authenticate(address, signature) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(AUTHENTICATION, {
          request: {
            address,
            signature,
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

  verify(accessToken) {
    return new Promise((resolve, reject) => {
      this.client
        .query(VERIFY, {
          request: {
            accessToken,
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
  };
}

module.exports = Auth