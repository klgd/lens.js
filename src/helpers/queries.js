
module.exports.GET_PING = `
  query {
    ping
  }
`;

module.exports.GET_DEFAULT_PROFILES = `
  query($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
  }
`;

module.exports.GET_PROFILE_FROM_ID = `
query Profile($request: SingleProfileQueryRequest!, $who: ProfileId) {
  profile(request: $request) {
    id
    handle
    ownedBy
    name
    bio
    metadata
    followNftAddress
    isFollowedByMe
    isFollowing(who: $who)
    attributes {
      key
      value
      __typename
    }
    dispatcher {
      canUseRelay
      __typename
    }
    onChainIdentity {
      proofOfHumanity
      sybilDotOrg {
        verified
        source {
          twitter {
            handle
            __typename
          }
          __typename
        }
        __typename
      }
      ens {
        name
        __typename
      }
      worldcoin {
        isHuman
        __typename
      }
      __typename
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      __typename
    }
    picture {
      ... on MediaSet {
        original {
          url
          __typename
        }
        __typename
      }
      ... on NftImage {
        uri
        __typename
      }
      __typename
    }
    coverPicture {
      ... on MediaSet {
        original {
          url
          __typename
        }
        __typename
      }
      __typename
    }
    followModule {
      __typename
    }
    __typename
  }
}
`;

module.exports.GET_RECOMMENDED_PROFILES = `
query RecommendedProfiles {
  recommendedProfiles {
        id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
        followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
  }
}
`;

module.exports.GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

module.exports.AUTHENTICATION = `
mutation($request: SignedAuthChallenge!) { 
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

module.exports.REFRESH_AUTHENTICATION = `
mutation($request: RefreshRequest!) { 
  refresh(request: $request) {
    accessToken
    refreshToken
  }
}
`;

module.exports.VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

module.exports.EXPLORE_PUBLICATIONS = `
  query($request: ExplorePublicationRequest!) {
    explorePublications(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    width
    height
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
        isFollowedByMe
    isFollowing(who: null)
        followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
         ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
        mirrors(by: null)
    hasCollectedByMe
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
      hidden
    reaction(request: null)
    hasCollectedByMe
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
     ... on Post {
        ...PostFields          
     }
     ... on Comment {
        ...CommentFields          
     }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
      hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
             ...PostFields          
          }
          ... on Comment {
             ...CommentMirrorOfFields        
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
         ...MirrorBaseFields
      }
    }
  }
`;

module.exports.EXPLORE_PROFILES = `
query($request: ExploreProfileResult!) {
  exploreProfiles(request: $request) {
    items {
      id
      name
      bio
      isDefault
      attributes {
        displayType
        traitType
        key
        value
      }
      metadata
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          contractAddress
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
        type
        }
        ... on RevertFollowModuleSettings {
        type
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

module.exports.GET_USERS_NFTS = `
  query($request: NFTsRequest!) {
    nfts(request: $request) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
    pageInfo {
        prev
        next
        totalCount
    }
  }
}
`;

module.exports.GET_GLOBAL_PROTOCOL_STATS = `
query($request: GlobalProtocolStatsRequest) {
  globalProtocolStats(request: $request) {
      totalProfiles
      totalBurntProfiles
      totalPosts
      totalMirrors
      totalComments
      totalCollects
      totalFollows
      totalRevenue {
          asset {
              name
              symbol
              decimals
              address
          }
          value
      }
   }
}
`;

module.exports.GET_PROFILE_REVENUE = `
query($request: ProfileRevenueQueryRequest!) {
  profileRevenue(request: $request) {
    items {
      publication {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      earnings {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  location
  website
  twitterUrl
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
       ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  ownedBy
  depatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
      recipient
    }
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
    small {
      ...MediaFields
    }
    medium {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on EmptyCollectModuleSettings {
    type
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}
`;

module.exports.GET_PUBLICATION_REVENUE = `
query($request: PublicationRevenueQueryRequest!) {
  publicationRevenue(request: $request) {
    publication {
      __typename 
      ... on Post {
          ...PostFields
      }
      ... on Comment {
          ...CommentFields
      }
      ... on Mirror {
          ...MirrorFields
      }
    }
    earnings {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
  }
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
       ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
      recipient
    }
    ... on ProfileFollowModuleSettings {
     type
    }
    ... on RevertFollowModuleSettings {
     type
    }
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
    small {
      ...MediaFields
    }
    medium {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment CollectModuleFields on CollectModule {
  __typename
      ... on FreeCollectModuleSettings {
          type
    followerOnly
    contractAddress
    }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}
`;

module.exports.SEARCH = `
query($request: SearchQueryRequest!) {
  search(request: $request) {
          ... on PublicationSearchResult {
     __typename 
    items {
      __typename 
      ... on Comment {
        ...CommentFields
      }
      ... on Post {
        ...PostFields
      }
    }
    pageInfo {
      prev
      totalCount
      next
    }
  }
  ... on ProfileSearchResult {
    __typename 
    items {
      ... on Profile {
        ...ProfileFields
      }
    }
    pageInfo {
      prev
      totalCount
      next
    }
   }
  }
}

fragment MediaFields on Media {
url
mimeType
}

fragment MirrorBaseFields on Mirror {
id
profile {
  ...ProfileFields
}
stats {
  ...PublicationStatsFields
}
metadata {
  ...MetadataOutputFields
}
createdAt
collectModule {
  ...CollectModuleFields
}
referenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
  }
}
appId
}

fragment ProfileFields on Profile {
profileId: id,
name
bio
attributes {
  displayType
  traitType
  key
  value
}
isFollowedByMe
isFollowing(who: null)
metadataUrl: metadata
isDefault
handle
picture {
  ... on NftImage {
    contractAddress
    tokenId
    uri
    verified
  }
  ... on MediaSet {
    original {
      ...MediaFields
    }
  }
}
coverPicture {
  ... on NftImage {
    contractAddress
    tokenId
    uri
    verified
  }
  ... on MediaSet {
    original {
      ...MediaFields
    }
  }
}
ownedBy
dispatcher {
  address
}
stats {
  totalFollowers
  totalFollowing
  totalPosts
  totalComments
  totalMirrors
  totalPublications
  totalCollects
}
followModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
   type
  }
  ... on RevertFollowModuleSettings {
   type
  }
}
}

fragment PublicationStatsFields on PublicationStats { 
totalAmountOfMirrors
totalAmountOfCollects
totalAmountOfComments
}

fragment MetadataOutputFields on MetadataOutput {
name
description
content
media {
  original {
    ...MediaFields
  }
}
attributes {
  displayType
  traitType
  value
}
}

fragment Erc20Fields on Erc20 {
name
symbol
decimals
address
}

fragment CollectModuleFields on CollectModule {
__typename
  ... on FreeCollectModuleSettings {
      type
  followerOnly
  contractAddress
}
... on FeeCollectModuleSettings {
  type
  amount {
    asset {
      ...Erc20Fields
    }
    value
  }
  recipient
  referralFee
}
... on LimitedFeeCollectModuleSettings {
  type
  collectLimit
  amount {
    asset {
      ...Erc20Fields
    }
    value
  }
  recipient
  referralFee
}
... on LimitedTimedFeeCollectModuleSettings {
  type
  collectLimit
  amount {
    asset {
      ...Erc20Fields
    }
    value
  }
  recipient
  referralFee
  endTimestamp
}
... on RevertCollectModuleSettings {
  type
}
... on TimedFeeCollectModuleSettings {
  type
  amount {
    asset {
      ...Erc20Fields
    }
    value
  }
  recipient
  referralFee
  endTimestamp
}
}

fragment PostFields on Post {
id
profile {
  ...ProfileFields
}
stats {
  ...PublicationStatsFields
}
metadata {
  ...MetadataOutputFields
}
createdAt
collectModule {
  ...CollectModuleFields
}
referenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
  }
}
appId
  hidden
  reaction(request: null)
  mirrors(by: null)
hasCollectedByMe
}

fragment CommentBaseFields on Comment {
id
profile {
  ...ProfileFields
}
stats {
  ...PublicationStatsFields
}
metadata {
  ...MetadataOutputFields
}
createdAt
collectModule {
  ...CollectModuleFields
}
referenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
  }
}
appId
hidden
reaction(request: null)
  mirrors(by: null)
hasCollectedByMe
}

fragment CommentFields on Comment {
...CommentBaseFields
mainPost {
  ... on Post {
    ...PostFields
  }
  ... on Mirror {
    ...MirrorBaseFields
    mirrorOf {
      ... on Post {
         ...PostFields          
      }
      ... on Comment {
         ...CommentMirrorOfFields        
      }
    }
  }
}
}

fragment CommentMirrorOfFields on Comment {
...CommentBaseFields
mainPost {
  ... on Post {
    ...PostFields
  }
  ... on Mirror {
     ...MirrorBaseFields
  }
}
}
`;

module.exports.CREATE_FOLLOW_TYPED_DATA = `
mutation CreateFollowTypedData($options: TypedDataOptions, $request: FollowRequest!) {
  createFollowTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}
`;

module.exports.GET_FOLLOWING = `
query($request: FollowingRequest!) {
  following(request: $request) { 
    items {
         profile {
            id
            name
            bio
            handle
                          attributes {
              displayType
              traitType
              key
              value
            }
                          followNftAddress
                          metadata
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  width
                  height
                  mimeType
                }
                medium {
                  url
                  width
                  height
                  mimeType
                }
                small {
                  url
                  width
                  height
                  mimeType
                }
              }
            }
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  width
                  height
                  mimeType
                }
                small {
                  width
                  url
                  height
                  mimeType
                }
                medium {
                  url
                  width
                  height
                  mimeType
                }
              }
            }
            ownedBy
            dispatcher {
              address
              canUseRelay
            }
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
            followModule {
              ... on FeeFollowModuleSettings {
                type
                amount {
                  asset {
                    name
                    symbol
                    decimals
                    address
                  }
                  value
                }
                recipient
             }
                           ... on ProfileFollowModuleSettings {
               type
             }
             ... on RevertFollowModuleSettings {
               type
             }
          }
        }
      }
     pageInfo {
        prev
        next
        totalCount
     }
      }
}
`;

module.exports.GET_FOLLOWERS = `
  query($request: FollowersRequest!) {
    followers(request: $request) { 
             items {
        wallet {
          address
          defaultProfile {
            id
            name
            bio
            handle
                        followNftAddress
                        metadata
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
            }
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
            }
            ownedBy
            dispatcher {
              address
              canUseRelay
            }
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
            followModule {
              ... on FeeFollowModuleSettings {
                type
                contractAddress
                amount {
                  asset {
                    name
                    symbol
                    decimals
                    address
                  }
                  value
                }
                recipient
              }
              ... on ProfileFollowModuleSettings {
               type
              }
              ... on RevertFollowModuleSettings {
               type
              }
            }
          }
        }
        totalAmountOfTimesFollowed
      }
      pageInfo {
        prev
        next
        totalCount
      }
        }
  }
`;

module.exports.GET_TIMELINE = `
  query($request: TimelineRequest!) {
    timeline(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    width
    height
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
        isFollowedByMe
    isFollowing(who: null)
        followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
         ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on EmptyCollectModuleSettings {
      type
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    collectedBy {
      ...WalletFields
    }
        hidden
        reaction(request: null)
        mirrors(by: null)
    hasCollectedByMe
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    hidden
    reaction(request: null)
    hasCollectedByMe
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
     ... on Post {
        ...PostFields          
     }
     ... on Comment {
        ...CommentFields          
     }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
    collectedBy {
      ...WalletFields
    }
    hidden
        reaction(request: null)
        mirrors(by: null)
    hasCollectedByMe
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
             ...PostFields          
          }
          ... on Comment {
             ...CommentMirrorOfFields        
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
         ...MirrorBaseFields
      }
    }
  }

fragment WalletFields on Wallet {
   address,
   defaultProfile {
    ...ProfileFields
   }
  }
`;

module.exports.REPORT_PUBLICATION = `
  mutation($request: ReportPublicationRequest!) { 
   reportPublication(request: $request)
 }
`;

module.exports.ADD_REACTION = `
  mutation($request: ReactionRequest!) { 
   addReaction(request: $request)
 }
`;

module.exports.REMOVE_REACTION = `
  mutation($request: ReactionRequest!) { 
   removeReaction(request: $request)
 }
`;

module.exports.CREATE_POST_TYPED_DATA = `
mutation CreatePostTypedData($options: TypedDataOptions, $request: CreatePublicPostRequest!) {
  createPostTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

module.exports.CREATE_COMMENT_TYPED_DATA = `
mutation CreateCommentTypedData($options: TypedDataOptions, $request: CreatePublicCommentRequest!) {
  createCommentTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        CommentWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleData
        referenceModuleInitData
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

module.exports.GET_PUBLICATIONS = `
  query($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
        isFollowedByMe
    isFollowing(who: null)
        followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on EmptyCollectModuleSettings {
      type
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
    mirrors(profileId: null)
    hasCollectedByMe
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
    hasCollectedByMe
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
     ... on Post {
        ...PostFields          
     }
     ... on Comment {
        ...CommentFields          
     }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
    mirrors(profileId: null)
    hasCollectedByMe
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
             ...PostFields          
          }
          ... on Comment {
             ...CommentMirrorOfFields        
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
         ...MirrorBaseFields
      }
    }
  }
`;

module.exports.GET_PUBLICATION = `
  query($request: PublicationQueryRequest!) {
    publication(request: $request) {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
      }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
        isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
        type
        followerOnly
        contractAddress
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
        mirrors(by: null)
    hasCollectedByMe
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
    hasCollectedByMe
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
     ... on Post {
        ...PostFields          
     }
     ... on Comment {
        ...CommentFields          
     }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
        hidden
        reaction(request: null)
        mirrors(by: null)
    hasCollectedByMe
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
             ...PostFields          
          }
          ... on Comment {
             ...CommentMirrorOfFields        
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
         ...MirrorBaseFields
      }
    }
  }
`;

module.exports.GET_PUBLICATION_WITH_PROFILEID = `
query Publication($request: PublicationQueryRequest!, $reactionRequest: ReactionFieldResolverRequest, $profileId: ProfileId) {
  publication(request: $request) {
    ... on Post {
      ...PostFields
      onChainContentURI
      collectNftAddress
      profile {
        isFollowedByMe
        __typename
      }
      referenceModule {
        __typename
      }
      __typename
    }
    ... on Comment {
      ...CommentFields
      onChainContentURI
      collectNftAddress
      profile {
        isFollowedByMe
        __typename
      }
      referenceModule {
        __typename
      }
      __typename
    }
    ... on Mirror {
      ...MirrorFields
      onChainContentURI
      collectNftAddress
      profile {
        isFollowedByMe
        __typename
      }
      referenceModule {
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  hasCollectedByMe
  collectedBy {
    address
    defaultProfile {
      ...ProfileFields
      __typename
    }
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  __typename
}

fragment ProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  attributes {
    key
    value
    __typename
  }
  picture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    ... on NftImage {
      uri
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}

fragment CollectModuleFields on CollectModule {
  ... on FreeCollectModuleSettings {
    type
    contractAddress
    followerOnly
    __typename
  }
  ... on FeeCollectModuleSettings {
    type
    recipient
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    recipient
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    recipient
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on TimedFeeCollectModuleSettings {
    type
    recipient
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  __typename
}

fragment StatsFields on PublicationStats {
  totalUpvotes
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  __typename
}

fragment MetadataFields on MetadataOutput {
  name
  description
  content
  cover {
    original {
      url
      __typename
    }
    __typename
  }
  media {
    original {
      url
      mimeType
      __typename
    }
    __typename
  }
  __typename
}

fragment CommentFields on Comment {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  hasCollectedByMe
  collectedBy {
    address
    defaultProfile {
      ...ProfileFields
      __typename
    }
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  commentOn {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      hasCollectedByMe
      collectedBy {
        address
        defaultProfile {
          handle
          __typename
        }
        __typename
      }
      collectModule {
        ...CollectModuleFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      mainPost {
        ... on Post {
          ...PostFields
          __typename
        }
        ... on Mirror {
          ...MirrorFields
          __typename
        }
        __typename
      }
      hidden
      createdAt
      __typename
    }
    ... on Mirror {
      ...MirrorFields
      __typename
    }
    __typename
  }
  __typename
}

fragment MirrorFields on Mirror {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  mirrorOf {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      createdAt
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}
`

module.exports.HIDE_PUBLICATION = `
  mutation($request: HidePublicationRequest!) { 
   hidePublication(request: $request)
 }
`;

module.exports.GET_NOTIFICATIONS = `
  mutation($request: NotificationRequest!) { 
    items {
      ... on NewFollowerNotification {
        ...NewFollowerNotificationFields
      }

      ... on NewMirrorNotification {
        ...NewMirrorNotificationFields
      }

      ... on NewCollectNotification {
        ...NewCollectNotificationFields
      }

      ... on NewCommentNotification {
        ...NewCommentNotificationFields
      }

      ... on NewMentionNotification {
        mentionPublication {
           ... on Post {
              ...CompactPost
            }
            ... on Comment {
              ...CompactComment
            }
        }
        createdAt
      }
    }
    pageInfo {
      ...CommonPaginatedResultInfo
    }
  }
 }
 
 fragment CommentWithCommentedPublicationFields on Comment {
  ...CompactComment
  commentOn {
    ... on Post {
      ...CompactPost
    }
    ... on Mirror {
      ...CompactMirror
    }
    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewFollowerNotificationFields on NewFollowerNotification {
  __typename
  createdAt
  isFollowedByMe
  wallet {
    ...Wallet
  }
}

fragment NewCollectNotificationFields on NewCollectNotification {
  __typename
  createdAt
  wallet {
    ...Wallet
  }
  collectedPublication {
    __typename
    ... on Post {
      ...CompactPost
    }

    ... on Mirror {
      ...CompactMirror
    }

    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewMirrorNotificationFields on NewMirrorNotification {
  __typename
  createdAt
  profile {
    ...CompactProfile
  }
  publication {
    ... on Post {
      ...CompactPost
    }
    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewCommentNotificationFields on NewCommentNotification {
  __typename
  createdAt
  profile {
    ...CompactProfile
  }
  comment {
    ...CommentWithCommentedPublicationFields
  }
}

fragment CompactProfile on Profile {
  id
  name
  handle
  picture {
    ...ProfileMediaFields
  }
}
fragment CompactPublicationStats on PublicationStats {
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment CompactMetadata on MetadataOutput {
  name
  description
  content
  media {
    ...ProfileMediaFields
  }
}

fragment CompactPost on Post {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  collectedBy {
    ...Wallet
  }
  createdAt
}

fragment CompactMirror on Mirror {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  createdAt
}

fragment CompactComment on Comment {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  collectedBy {
    ...Wallet
  }
  createdAt
}

fragment CommonPaginatedResultInfo on PaginatedResultInfo {
  prev
  next
  totalCount
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileMediaFields on ProfileMedia {
  ... on NftImage {
    contractAddress
    tokenId
    uri
    verified
  }

  ... on MediaSet {
    original {
      ...MediaFields
    }

    small {
      ...MediaFields
    }

    medium {
      ...MediaFields
    }
  }
}

fragment Wallet on Wallet {
  address
  defaultProfile {
    ...CompactProfile
  }
  totalAmountOfProfiles
}
`;

module.exports.GET_PROFILES = `
query ($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      name
      bio
      metadata
      attributes {
        displayType
        traitType
        key
        value
        __typename
      }
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
          __typename
        }
        ... on MediaSet {
          original {
            url
            mimeType
            __typename
          }
          __typename
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
          __typename
        }
        ... on MediaSet {
          original {
            url
            mimeType
            __typename
          }
          __typename
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
        __typename
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
        __typename
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
              __typename
            }
            value
            __typename
          }
          recipient
          __typename
        }
        ... on ProfileFollowModuleSettings {
          type
          __typename
        }
        ... on RevertFollowModuleSettings {
          type
          __typename
        }
        __typename
      }
      dispatcher {
        canUseRelay
        __typename
      }
      __typename
    }
    pageInfo {
      prev
      next
      totalCount
      __typename
    }
    __typename
  }
}`

module.exports.PROXY_ACTION = `
mutation ProxyAction($request: ProxyActionRequest!) {
  proxyAction(request: $request)
}
`

module.exports.PROXY_ACTION_STATUS = `
query ProxyActionStatus($proxyActionId: ProxyActionId!) {
  proxyActionStatus(proxyActionId: $proxyActionId) {
    ... on ProxyActionStatusResult {
      txHash
      txId
      status
    }
    ... on ProxyActionError {
      reason
      lastKnownTxId
    }
    ... on ProxyActionQueued {
      queuedAt
    }
  }
}
`

module.exports.USER_SIG_NONCES = `
query UserSigNonces {
  userSigNonces {
    lensHubOnChainSigNonce
    peripheryOnChainSigNonce
  }
}
`

module.exports.BROADCAST = `
mutation Broadcast($request: BroadcastRequest!) {
  broadcast(request: $request) {
    ... on RelayerResult {
      txHash
      __typename
    }
    ... on RelayError {
      reason
      __typename
    }
    __typename
  }
}
`

module.exports.ENABLED_MODULES = `
query EnabledModules {
  enabledModules {
    collectModules {
      moduleName
      contractAddress
      __typename
    }
    __typename
  }
  enabledModuleCurrencies {
    name
    symbol
    decimals
    address
    __typename
  }
}
`

module.exports.CREATE_SET_DISPATCHER_TYPED_DATA = `
mutation CreateSetDispatcherTypedData($options: TypedDataOptions, $request: SetDispatcherRequest!) {
  createSetDispatcherTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        SetDispatcherWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        dispatcher
        __typename
      }
      __typename
    }
    __typename
  }
}
`

module.exports.CREATE_POST_VIA_DISPATCHER = `
mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
  createPostViaDispatcher(request: $request) {
    ...RelayerResultFields
    __typename
  }
}

fragment RelayerResultFields on RelayResult {
  ... on RelayerResult {
    txHash
    txId
    __typename
  }
  ... on RelayError {
    reason
    __typename
  }
  __typename
}
`

module.exports.PROFILE_FEED = `
query ProfileFeed($request: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest, $profileId: ProfileId) {
  publications(request: $request) {
    items {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        ...CommentFields
        __typename
      }
      ... on Mirror {
        ...MirrorFields
        __typename
      }
      __typename
    }
    pageInfo {
      totalCount
      next
      __typename
    }
    __typename
  }
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  hasCollectedByMe
  onChainContentURI
  isGated
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectedBy {
    address
    defaultProfile {
      ...ProfileFields
      __typename
    }
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  __typename
}

fragment ProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  isFollowedByMe
  stats {
    totalFollowers
    totalFollowing
    __typename
  }
  attributes {
    key
    value
    __typename
  }
  picture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    ... on NftImage {
      uri
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}

fragment CollectModuleFields on CollectModule {
  ... on FreeCollectModuleSettings {
    type
    contractAddress
    followerOnly
    __typename
  }
  ... on FeeCollectModuleSettings {
    type
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  ... on TimedFeeCollectModuleSettings {
    type
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      asset {
        symbol
        decimals
        address
        __typename
      }
      value
      __typename
    }
    __typename
  }
  __typename
}

fragment StatsFields on PublicationStats {
  totalUpvotes
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  __typename
}

fragment MetadataFields on MetadataOutput {
  name
  description
  content
  image
  attributes {
    traitType
    value
    __typename
  }
  cover {
    original {
      url
      __typename
    }
    __typename
  }
  media {
    original {
      url
      mimeType
      __typename
    }
    __typename
  }
  encryptionParams {
    accessCondition {
      or {
        criteria {
          ...SimpleConditionFields
          and {
            criteria {
              ...SimpleConditionFields
              __typename
            }
            __typename
          }
          or {
            criteria {
              ...SimpleConditionFields
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment SimpleConditionFields on AccessConditionOutput {
  nft {
    contractAddress
    chainID
    contractType
    tokenIds
    __typename
  }
  eoa {
    address
    __typename
  }
  token {
    contractAddress
    amount
    chainID
    condition
    decimals
    __typename
  }
  follow {
    profileId
    __typename
  }
  collect {
    publicationId
    thisPublication
    __typename
  }
  __typename
}

fragment CommentFields on Comment {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  hasCollectedByMe
  onChainContentURI
  isGated
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectedBy {
    address
    defaultProfile {
      ...ProfileFields
      __typename
    }
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  commentOn {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      hasCollectedByMe
      onChainContentURI
      isGated
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      canDecrypt(profileId: $profileId) {
        result
        reasons
        __typename
      }
      collectedBy {
        address
        defaultProfile {
          handle
          __typename
        }
        __typename
      }
      collectModule {
        ...CollectModuleFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      mainPost {
        ... on Post {
          ...PostFields
          __typename
        }
        ... on Mirror {
          ...MirrorFields
          __typename
        }
        __typename
      }
      hidden
      createdAt
      __typename
    }
    ... on Mirror {
      ...MirrorFields
      __typename
    }
    __typename
  }
  __typename
}

fragment MirrorFields on Mirror {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  isGated
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  mirrorOf {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      onChainContentURI
      isGated
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      canDecrypt(profileId: $profileId) {
        result
        reasons
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      createdAt
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}
`

module.exports.APPROVED_MODULE_ALLOWANCE_AMOUNT = `
query ApprovedModuleAllowanceAmount($request: ApprovedModuleAllowanceAmountRequest!) {
  approvedModuleAllowanceAmount(request: $request) {
    currency
    module
    allowance
    contractAddress
    __typename
  }
  enabledModuleCurrencies {
    name
    symbol
    decimals
    address
    __typename
  }
}
`

module.exports.CREATE_COLLECT_TYPED_DATA = `
mutation CreateCollectTypedData($options: TypedDataOptions, $request: CreateCollectRequest!) {
  createCollectTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        CollectWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        pubId
        data
        __typename
      }
      __typename
    }
    __typename
  }
}
`

module.exports.CREATE_MIRROR_TYPED_DATA = `
mutation CreateMirrorTypedData($options: TypedDataOptions, $request: CreateMirrorRequest!) {
  createMirrorTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        referenceModule
        referenceModuleData
        referenceModuleInitData
        __typename
      }
      __typename
    }
    __typename
  }
}
`

module.exports.CREATE_MIRROR_VIA_DISPATCHER = `
mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {
  createMirrorViaDispatcher(request: $request) {
    ...RelayerResultFields
    __typename
  }
}

fragment RelayerResultFields on RelayResult {
  ... on RelayerResult {
    txHash
    txId
    __typename
  }
  ... on RelayError {
    reason
    __typename
  }
  __typename
}
`

module.exports.CREATE_COMMENT_VIA_DISPATCHER = `
mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
  createCommentViaDispatcher(request: $request) {
    ...RelayerResultFields
    __typename
  }
}

fragment RelayerResultFields on RelayResult {
  ... on RelayerResult {
    txHash
    txId
    __typename
  }
  ... on RelayError {
    reason
    __typename
  }
  __typename
}
`