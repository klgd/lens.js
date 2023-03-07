
const { USER_SIG_NONCES, APPROVED_MODULE_ALLOWANCE_AMOUNT } = require('../helpers/queries')

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

  approvedModuleAllowanceAmount(currencies, collectModules, followModules = [], referenceModules = []) {
    return new Promise((resolve, reject) => {
      this.client
        .query(APPROVED_MODULE_ALLOWANCE_AMOUNT, {
          request: {
            collectModules,
            currencies,
            followModules,
            referenceModules,
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

module.exports = User