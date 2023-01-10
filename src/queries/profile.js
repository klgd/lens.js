const { GET_DEFAULT_PROFILES, GET_PROFILES } = require('../helpers/queries')

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

}

module.exports = Profile
