import gql from "graphql-tag";


const LIKE_LISTING = gql`
mutation likeListing($listingId:Int!,$like:Boolean){
  likeListing(listingId:$listingId,like:$like)
}`

const SET_AUTH_STATUS = gql`
mutation setAuthStatus( $token: String!, $id: Int!, $profileName: String!, $profileImageURL: String ) {
  setAuthStatus( token: $token, id: $id, profileName: $profileName, profileImageURL: $profileImageURL ) @client
}`

const SET_COUNTRY = gql`
mutation setCountry ( $countryCode: String! ) {
  setCountry( countryCode: $countryCode) @client
}`

const FACEBOOK_LOGIN = gql`
mutation loginFacebook($token: String!) {
  loginFacebook(token: $token) {
    token
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

const CREATE_CHAT = gql`
mutation createChat($listingId: Int!) {
  createChat(listingId: $listingId) {
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
      sellerRating
      sellerRatingCount
      online
      idVerification
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

const SEND_MESSAGE = gql`mutation
sendChatMessage($chatId: Int!, $message: String,$image:UploadedImage,$lastMessageId:Int) {
  sendChatMessage(chatId: $chatId, message: $message,image:$image,lastMessageId:$lastMessageId) {
    id
    message
    time
    authorId
    image {
      id
      imageKey
    }
  }
}`

const CREATE_LISTING = gql`
mutation createListing(
  $mode: String!
, $images: [UploadedImage]
, $currency: String!
, $cost: Float
, $counterOffer: Boolean
, $countryCode:String!
, $barterTemplates: [[TemplateQty]]
, $address: Address
, $post: Postage
, $title: String
, $description: String
, $category: Int
, $template: Int
, $tags: [Int]) {
  createListing(
    mode: $mode
  , images: $images
  , currency: $currency
  , cost: $cost
  , counterOffer: $counterOffer
  , countryCode:$countryCode
  , barterTemplates: $barterTemplates
  , address: $address
  , post: $post
  , title: $title
  , description: $description
  , categoryId: $category
  , templateId: $template
  , tagIds: $tags) {
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



export {
  LIKE_LISTING
, CREATE_CHAT
, SET_AUTH_STATUS
, SET_COUNTRY
, FACEBOOK_LOGIN
, SEND_MESSAGE
, CREATE_LISTING
}
