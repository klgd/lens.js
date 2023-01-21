const { ENABLED_MODULES } = require('@klgd/lens.js/src/helpers/queries')

const Module = superclass => class extends superclass {
  getEnabledModules() {
    return new Promise((resolve, reject) => {
      this.client
        .query(ENABLED_MODULES)
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

module.exports = Module
