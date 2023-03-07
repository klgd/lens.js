
const {
  CREATE_COMMENT_TYPED_DATA,
  CREATE_MIRROR_TYPED_DATA,
  CREATE_POST_TYPED_DATA,
  GET_PUBLICATIONS,
  HIDE_PUBLICATION,
  GET_PUBLICATION,
  GET_PUBLICATION_WITH_PROFILEID,
  CREATE_POST_VIA_DISPATCHER,
  CREATE_MIRROR_VIA_DISPATCHER,
  CREATE_COMMENT_VIA_DISPATCHER
} = require('../helpers/queries')

const Publication = superclass => class extends superclass {
  createPostTypedData(
    overrideSigNonce,
    profileId,
    contentURI,
    collectModule,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_POST_TYPED_DATA, {
          options: {
            overrideSigNonce
          },
          request: {
            profileId,
            contentURI,
            collectModule,
            referenceModule,
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

  createCommentTypedData(
    overrideSigNonce,
    profileId,
    contentURI,
    publicationId,
    collectModule,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_COMMENT_TYPED_DATA, {
          options: {
            overrideSigNonce
          },
          request: {
            profileId,
            contentURI,
            publicationId,
            collectModule,
            referenceModule,
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

  createMirrorTypedData(
    overrideSigNonce,
    profileId,
    publicationId,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_MIRROR_TYPED_DATA, {
          options: {
            overrideSigNonce
          },
          request: {
            profileId,
            publicationId,
            referenceModule,
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
        .query(GET_PUBLICATION, {
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

  getPublicationWithProfileId(publicationId, profileId) {
    return new Promise((resolve, reject) => {
      this.client
        .query(GET_PUBLICATION_WITH_PROFILEID, {
          request: {
            publicationId,
          },
          reactionRequest: {
            profileId
          },
          profileId
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

  hidePublication(publicationId) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(HIDE_PUBLICATION, {
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

  createPostViaDispatcher(
    profileId,
    contentURI,
    collectModule,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_POST_VIA_DISPATCHER, {
          request: {
            profileId,
            contentURI,
            collectModule,
            referenceModule,
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

  createMirrorViaDispatcher(
    profileId,
    publicationId,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_MIRROR_VIA_DISPATCHER, {
          request: {
            profileId,
            publicationId,
            referenceModule,
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

  createCommentViaDispatcher(
    profileId,
    contentURI,
    publicationId,
    collectModule,
    referenceModule = { followerOnlyReferenceModule: false }
  ) {
    return new Promise((resolve, reject) => {
      this.client
        .mutation(CREATE_COMMENT_VIA_DISPATCHER, {
          request: {
            profileId,
            contentURI,
            publicationId,
            collectModule,
            referenceModule,
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

module.exports = Publication