import gql from "graphql-tag";

var fragments = {}

const GET_MOST_RECENT_LIST = gql`
query getMostRecentListings($countryCode:String!,$limit:Int,$page:Int){
  getMostRecentListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getMostRecentListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`



const GET_MOST_VISITED_LIST = gql`
query getMostVisitedListings($countryCode:String!,$limit:Int,$page:Int) {
  getMostVisitedListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getMostVisitedListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_MOST_LIKED_LIST = gql`
query getMostLikedListings($countryCode:String!,$limit:Int,$page:Int) {
  getMostLikedListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getMostLikedListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_USER_VISITED_LIST = gql`
query getUserVisitedListings($countryCode:String!,$limit:Int,$page:Int){
  getUserVisitedListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getUserVisitedListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_USER_POSTED_LIST = gql`
query getUserPostedListings($countryCode:String!,$limit:Int,$page:Int) {
  getUserPostedListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getUserPostedListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_USER_LIKED_LIST = gql`
query getUserLikedListings($countryCode:String!,$limit:Int,$page:Int) {
  getUserLikedListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getUserLikedListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

// Remember this is Client data. Not from server, hence strange form.
const GET_LOGIN_STATUS = gql`
query getLoginStatus @client {
  authorized
  countryCode
  iso639_2
  myProfile {
    id
    profileName
    nameChangeCount
    profileImageURL
  }
}`

const GET_COUNTRY_LIST = gql`
query {
  allCountries {
    isoCode
    name
    currencies {
      iso4217
      currencyName
      currencySymbol
    }
    languages {
      iso639_2
      name
    }
  }
}`

const GET_CACHED_COUNTRY = gql`
query getCachedCountry($isoCode: Int!) {
  getCachedCountry(isoCode: $isoCode) {
    isoCode
    name
    currencies {
      iso4217
      currencyName
      currencySymbol
    }
    languages {
      iso639_2
      name
    }
  }
}`

const GET_CHAT_MESSAGES = gql`
query getChatMessages($chatIndexes:[ChatIndex]) {
  getChatMessages(chatIndexes:$chatIndexes) @connection(key: "getChatMessages") {
    id
    userId
    listing {
      id
      title
      description
      category {
        id
        name
        locus {
          id
          name
          parentName
        }
      }
      user {
        id
        firstName
        lastName
        profileName
        profileImage {
          id
          imageURL
          imageKey
        }
      }
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      template {
        id
        title
        description
        primaryImage {
          id
          imageKey
        }
        tags{
          id
          name
        }
      }
      tags{
        id
        name
      }
    }
    initUser {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
    }
    chatMessages {
      id
      message
      time
      authorId
      image {
        id
        imageKey
      }
    }
  }
}`


const GET_PROFILE = gql`
query {
  getProfile {
    id
    profileName
    profileImage {
      id
      imageKey
    }
  }
}`

const GET_LISTING = gql`
query getListing($id:Int!){
  getListing(id:$id) {
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_NESTED_CATEGORY_LIST = gql`
query {
  allCategoriesNested {
    id
    name
    locus {
      id
      name
      parentName
    }
    children {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
  }
}`

fragments.locusDetails = gql`
fragment LocusDetails on Locus {
  id
  name
  parentName
  content {
    id
    meaning
    countryCode
    translations {
      id
      iso639_2
      text
    }
  }
}
`
const GET_LOCUS = gql`
query getLocus($locusId:Int!, $countryCode:String!, $languageCodes:[String]!) {
  getLocus(locusId:$locusId, countryCode: $countryCode, languageCodes: $languageCodes) @connection(key: "getCachedLocus", filter: ["locusId", "countryCode"]) {
    ...LocusDetails
    children {
      ...LocusDetails
      children {
        ...LocusDetails
        children {
          ...LocusDetails
        }
      }
    }
  }
}
${fragments.locusDetails}
`

const GET_CACHED_TRANSLATIONS = gql`
query getCachedLocus($locusId:Int!, $countryCode:String!) {
  getCachedLocus(locusId:$locusId, countryCode: $countryCode) {
    ...LocusDetails
    children {
      ...LocusDetails
      children {
        ...LocusDetails
        children {
          ...LocusDetails
        }
      }
    }
  }
}
${fragments.locusDetails}
`

const GET_CATEGORY_LIST = gql`
query {
  allCategoriesFlat {
    id
    name
    locus {
      id
      name
      parentName
    }
    children {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
  }
}`;

const SEARCH_LISTINGS = gql`
query searchListings($terms:[String],$limit:Int,$page:Int,$filter:Filters!){
  searchListings(terms:$terms,limit:$limit,page:$page,filters:$filter){
    id
    title
    description
    category {
      id
      name
      locus {
        id
        name
        parentName
      }
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
          lineOne
          lineTwo
          postcode
          longitude
          latitude
          directions
        }
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`
export {
  GET_MOST_RECENT_LIST
, GET_MOST_VISITED_LIST
, GET_MOST_LIKED_LIST
, GET_USER_VISITED_LIST
, GET_USER_LIKED_LIST
, GET_USER_POSTED_LIST
, GET_LOGIN_STATUS
, GET_COUNTRY_LIST
, GET_CACHED_COUNTRY
, GET_CHAT_MESSAGES
, GET_PROFILE
, GET_LISTING
, GET_NESTED_CATEGORY_LIST
, GET_LOCUS
, GET_CACHED_TRANSLATIONS
, GET_CATEGORY_LIST
, SEARCH_LISTINGS
}
