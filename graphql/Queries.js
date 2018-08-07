import gql from "graphql-tag";

const GET_MOST_RECENT_LIST = gql`
query getMostRecentLists($countryCode:String!,$limit:Int,$page:Int){
  getMostRecentListings(countryCode:$countryCode,limit:$limit,page:$page){
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
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
      }
      secondaryImages {
        id
      }
      tags{
        name
      }
    }

    tags{
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
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_MOST_VISITED_LIST = gql`
query getMostVisitedListings($countryCode:String!,$limit:Int,$page:Int){
  getMostVisitedListings(countryCode:$countryCode,limit:$limit,page:$page){
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
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
      }
      secondaryImages {
        id
      }
      tags{
        name
      }
    }

    tags{
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
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_MOST_LIKED_LIST = gql`
query getMostLikedListings($countryCode:String!,$limit:Int,$page:Int){
  getMostLikedListings(countryCode:$countryCode,limit:$limit,page:$page){
    id
    title
    description
    primaryImage {
      id
      imageURL
      imageKey
    }
    secondaryImages {
      id
      imageURL
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageURL
        imageKey
      }
      secondaryImages {
        imageURL
        imageKey
      }
      tags{
        name
      }
    }
    
    tags{
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
      chats {
        id
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
  getUserVisitedListings(countryCode:$countryCode,limit:$limit,page:$page){

    id
    title
    description
    primaryImage {
      id
      imageURL
      imageKey
    }
    secondaryImages {
      id
      imageURL
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageURL
        imageKey
      }
      secondaryImages {
        imageURL
        imageKey
      }
      tags{
        name
      }
    }
  
    tags{
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
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_USER_POSTED_LIST = gql`
query getUserPostedListings($countryCode:String!,$limit:Int,$page:Int){
  getUserPostedListings(countryCode:$countryCode,limit:$limit,page:$page){
    id
    title
    description
    primaryImage {
      id
      imageURL
      imageKey
    }
    secondaryImages {
      id
      imageURL
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageURL
        imageKey
      }
      secondaryImages {
        imageURL
        imageKey
      }
      tags{
        name
      }
    }
  
    tags{
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
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_USER_LIKED_LIST = gql`
query getUserLikedListings($countryCode:String!,$limit:Int,$page:Int){
  getUserLikedListings(countryCode:$countryCode,limit:$limit,page:$page){
    id
    title
    description
    primaryImage {
      id
      imageURL
      imageKey
    }
    secondaryImages {
      id
      imageURL
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageURL
        imageKey
      }
      secondaryImages {
        imageURL
        imageKey
      }
      tags{
        name
      }
    }
    
    tags{
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
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`

const GET_LOGIN_STATUS = gql`
query loginStatus @client{
  logged_in
  countryCode
}`

const GET_COUNTRY_LIST = gql`
query {
  allCountries {
    isoCode
    name
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
}
