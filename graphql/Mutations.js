import gql from "graphql-tag";


const LIKE_LISTING = gql`
mutation likeListing($listingId:Int!,$like:Boolean){
  likeListing(listingId:$listingId,like:$like)
}`

const SET_AUTH_STATUS = gql`
mutation setAuthStatus( $token: String!, $id: Int!, $profileName: String!, $nameChangeCount: Int, $profileImageURL: String ) {
  setAuthStatus( token: $token, id: $id, profileName: $profileName, nameChangeCount: $nameChangeCount, profileImageURL: $profileImageURL ) @client
}`

// Decided not to use this after all. Easier with a cache query read and write
const UPDATE_AUTH_STATUS = gql`
mutation updateAuthStatus( $id: Int!, $profileName: String!, $nameChangeCount: Int, $profileImageURL: String ) {
  updateAuthStatus( id: $id, profileName: $profileName, nameChangeCount: $nameChangeCount, profileImageURL: $profileImageURL ) @client
}`

const UNSET_AUTH_STATUS = gql`
mutation unsetAuthStatus( $id: Int! ) {
  unsetAuthStatus( id: $id ) @client
}`

const SET_COUNTRY = gql`
mutation setCountry ( $countryCode: String!, $iso639_2: String! ) {
  setCountry( countryCode: $countryCode, iso639_2: $iso639_2) @client
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
      nameChangeCount
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

const DELETE_CHAT = gql`
mutation deleteChat($chatId: Int!) {
  deleteChat(chatId: $chatId)
}`

const DELETE_LISTING = gql`
mutation deleteListing($listingId: Int!) {
  deleteListing(listingId: $listingId)
}`

const SEND_MESSAGE = gql`
mutation sendChatMessage($chatId: Int!, $message: String,$image:UploadedImage,$lastMessageId:Int) {
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

const SET_PROFILE_IMAGE = gql`
mutation setProfileImage ( $image: UploadedImage! ) {
  setProfileImage(image: $image) {
    id
    imageKey
  }
}`

const SET_PROFILE_NAME = gql`
mutation setProfileName ( $profileName: String! ) {
  setProfileName(profileName: $profileName)
}`

const DELETE_PROFILE_IMAGE = gql`
mutation deleteProfileImage {
  deleteProfileImage {
    imageURL
  }
}`

const GET_S3_SIGNED_URL = gql`
  mutation getSignedUrl($imageType: String!) {
    getSignedUrl(imageType: $imageType) {
      id,
      key,
      bucket,
      X_Amz_Date,
      X_Amz_Algorithm,
      X_Amz_Signature,
      X_Amz_Credential,
      policy
    }
  }
`;

export {
  LIKE_LISTING
, CREATE_CHAT
, SET_AUTH_STATUS
, UNSET_AUTH_STATUS
, UPDATE_AUTH_STATUS
, SET_COUNTRY
, FACEBOOK_LOGIN
, SEND_MESSAGE
, CREATE_LISTING
, DELETE_CHAT
, DELETE_LISTING
, SET_PROFILE_IMAGE
, SET_PROFILE_NAME
, DELETE_PROFILE_IMAGE
, GET_S3_SIGNED_URL
}
