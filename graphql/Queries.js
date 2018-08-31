import gql from "graphql-tag";

const GET_MOST_RECENT_LIST = gql`
query getMostRecentListings($countryCode:String!,$limit:Int,$page:Int){
  getMostRecentListings(countryCode:$countryCode,limit:$limit,page:$page) @connection(key: "getMostRecentListings", filter: ["countryCode"]) {
    id
    title
    description
    category {
      id
      name
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
          long
          lat
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
          long
          lat
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
          long
          lat
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
          long
          lat
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
          long
          lat
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
          long
          lat
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
  getCachedCountry(isoCode: $isoCode) @client {
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
  getChatMessages(chatIndexes:$chatIndexes) {
    id
    userId
    listing {
      id
      title
      description
      category {
        id
        name
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
          long
          lat
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
    children {
      id
      name
    }
  }
}`;

const GET_CATEGORY_LIST = gql`
query {
  allCategoriesFlat {
    id
    name
    children {
      id
      name
    }
  }
}`;

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
, GET_CATEGORY_LIST
}
