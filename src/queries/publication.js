
const { 
  CREATE_COMMENT_TYPED_DATA,
  CREATE_MIRROR_TYPED_DATA,
  CREATE_POST_TYPED_DATA,
  GET_PUBLICATIONS,
  HIDE_PUBLICATION
} = require('../helpers/queries')

const Publication = superclass => class extends superclass {
  createPostTypedData(
    profileId,
    contentURI,
    collectModule,
    referenceModule,
    token
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(
          CREATE_POST_TYPED_DATA,
          {
            request: {
              profileId,
              contentURI,
              collectModule,
              referenceModule,
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
  
  createCommentTypedData(
    profileId,
    contentURI,
    collectModule,
    referenceModule,
    token
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(
          CREATE_COMMENT_TYPED_DATA,
          {
            request: {
              profileId,
              contentURI,
              collectModule,
              referenceModule,
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
  };
  
  createMirrorTypedData(
    profileId,
    publicationId,
    referenceModule,
    token
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(
          CREATE_MIRROR_TYPED_DATA,
          {
            request: {
              profileId,
              publicationId,
              referenceModule,
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
  
  getPublications(profileId, publicationTypes, limit) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PUBLICATIONS, {
          request: {
            profileId,
            publicationTypes,
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
  
  getPublication(publicationId) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PUBLICATIONS, {
          request: {
            publicationId,
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
  
  hidePublication(publicationId, token) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(
          HIDE_PUBLICATION,
          {
            request: {
              publicationId,
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

}

module.exports = Publication