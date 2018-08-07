import gql from "graphql-tag";


const LIKE_LISTING = gql`
mutation likeListing($listingId:Int!,$like:Boolean){
  likeListing(listingId:$listingId,like:$like)
}`

const SET_AUTH_STATUS = gql`
mutation setAuthStatus( $token: String!, $profileName: String!, $profileImageURL: String ) {
  setAuthStatus( token: $token, profileName: $profileName, profileImageURL: $profileImageURL ) @client
}`

const SET_COUNTRY = gql`
mutation setCountry ( $countryCode: String! ) {
  setCountry( countryCode: $countryCode) @client
}`

export {
  LIKE_LISTING
, SET_AUTH_STATUS
, SET_COUNTRY
}
