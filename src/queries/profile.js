const { GET_DEFAULT_PROFILES, GET_PROFILES, GET_PROFILE_FROM_ID, CREATE_SET_DISPATCHER_TYPED_DATA, PROFILE_FEED } = require('../helpers/queries')

const Profile = superclass => class extends superclass {
  defaultProfile(ethereumAddress) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_DEFAULT_PROFILES, {
          request: {
            ethereumAddress,
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

  getProfiles(ownedBy, limit) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PROFILES, {
          request: {
            ownedBy,
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

  profileById(profileId, who) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PROFILE_FROM_ID, {
          request: {
            profileId,
          },
          who
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

  profileByHandle(handle, who) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PROFILE_FROM_ID, {
          request: {
            handle,
          },
          who
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


  createSetDispatcherTypedData(
    profileId,
    enable
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_SET_DISPATCHER_TYPED_DATA, {
          request: {
            profileId,
            enable,
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

  profileFeed(profileId, sources = [], publicationTypes = ['POST', 'MIRROR'], limit = 5, metadata = null) {
    return new Promise((resolve, reject) => {
      this.client
        .query(PROFILE_FEED, {
          profileId,
          reactionRequest: {
            profileId
          },
          request: {
            metadata,
            limit,
            profileId,
            publicationTypes,
            sources
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

module.exports = Profile
