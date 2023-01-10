const { CREATE_FOLLOW_TYPED_DATA, PROXY_ACTION } = require('../helpers/queries')

const Follow = superclass => class extends superclass {
  follow(overrideSigNonce, profile, followModule, token) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(
          CREATE_FOLLOW_TYPED_DATA,
          {
            options: {
              overrideSigNonce
            },
            request: {
              follow: [
                {
                  profile,
                  followModule
                },
              ],
            },
          },
          {
            fetchOptions: {
              headers: {
                'x-access-token': token,
              },
            },
          }
        )
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  freeFollow(profileId, token) {
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

module.exports = Follow
