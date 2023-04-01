
const { USER_SIG_NONCES, APPROVED_MODULE_ALLOWANCE_AMOUNT, TIMELINE, RECOMMENDED_PROFILES, GET_FOLLOWERS } = require('../helpers/queries')

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

  timeline(profileId, limit = 50, feedEventItemTypes = ['POST', 'COMMENT', 'COLLECT_POST', 'COLLECT_COMMENT', 'MIRROR']) {
    return new Promise((resolve, reject) => {
      this.client
        .query(TIMELINE, {
          profileId,
          reactionRequest: { profileId },
          request: {
            profileId,
            feedEventItemTypes,
            limit,
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

  recommendedProfiles(shuffle = false) {
    return new Promise((resolve, reject) => {
      this.client
        .query(RECOMMENDED_PROFILES, {
          options: { shuffle },
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

  followers(profileId, limit = 50) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_FOLLOWERS, {
          request: { 
            profileId,
            limit,
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

module.exports = User