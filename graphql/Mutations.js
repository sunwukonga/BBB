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
mutation createChat($recUserId: Int!, $listingId: Int!) {
  createChat(recUserId: $recUserId, listingId: $listingId) {
    id
    userId
    listing {
      id
      title
      description
      user {
        id
        profileName
        profileImage {
          id
          imageKey
        }
      }
      primaryImage {
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
      }
    }
    initUser {
      id
      profileName
      profileImage {
        id
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

export {
  LIKE_LISTING
, CREATE_CHAT
, SET_AUTH_STATUS
, SET_COUNTRY
, FACEBOOK_LOGIN
, SEND_MESSAGE
}
