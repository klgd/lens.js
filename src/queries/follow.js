const { CREATE_FOLLOW_TYPED_DATA, PROXY_ACTION } = require('../helpers/queries')

const Follow = superclass => class extends superclass {
  createFollowTypedData(overrideSigNonce, profile, followModule) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_FOLLOW_TYPED_DATA, {
          options: overrideSigNonce ? {
            overrideSigNonce
          } : null,
          request: {
            follow: [
              {
                profile,
                followModule
              },
            ],
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

  freeFollow(profileId) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(PROXY_ACTION, {
          request: {
            follow: {
              freeFollow: {
                profileId,
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

module.exports = Follow
