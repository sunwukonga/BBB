//import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import * as SecureStore from 'expo-secure-store';
//import { Mutation } from "react-apollo";

import {
  GET_CACHED_COUNTRY
} from '../graphql/Queries'

let Production = true
let default_token
let BBB_BASE_URL
if (Production) {
  default_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIiLCJyb2xlcyI6WyJCQVJHQUlORVIiXSwiY291bnRyeUNvZGUiOiJTRyJ9.TOuq0TrlR4Sd9QHGR72a3_84lW8tmK060hV2G3oUrIU'
  BBB_BASE_URL = 'http://bbb.bebebargains.com:3000/graphql'
} else {
  default_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIiLCJyb2xlIjpbeyJuYW1lIjoiR0VORVJBTCJ9XSwiaWF0IjoxNTI1NTA2MjEyfQ.daamAG6JGC8LnlFRAsN4ppB23HhN_BtiuRA7QnXBqrU';
  BBB_BASE_URL = 'http://notify.parker.sg:3000/graphql'
}

var token = default_token
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Country': return `Country:${object.isoCode}`
      case 'Currency': return `Currency:${object.iso4217}`
      case 'Language': return `Language:${object.iso639_2}`
      default: return defaultDataIdFromObject(object) // object.id || object._id // fall back to `id` and `_id` for all other types
    }
  },
  cacheRedirects: {
    Query: {
      getListing: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Listing', id: id })
    , getCachedCountry: (_, { isoCode }, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Country', isoCode: isoCode })
      }
    , getCachedLocus: (_, { locusId, countryCode }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Locus', id: locusId, countryCode: countryCode })
    }
  },
});
const httpLink = new HttpLink({
  uri: BBB_BASE_URL,
/*  headers: {
    authorization: `Bearer ${ process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN }`,
  }, */
});
/*    fetchOptions: {
      credentials: 'include'
     }, */
const middlewareLink = new ApolloLink((operation, forward) => {
  // Possibly put `readQuery` here to fetch token, instead of keeping it in var `token`
  operation.setContext({
    headers: {
     authorization: 'Bearer ' + token
     // authorization: 'Bearer ' + stateLink.cache.readData
    }
  });
  return forward(operation);
});
const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  //cache  = operation.getContext();
  //  if (operation.operationName === "IgnoreErrorsQuery") {
  //    response.errors = null;
  //  }
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      ),
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
})
const stateLink = withClientState({
  cache,
  defaults: {
    isConnected: true
  , authorized: false
  , jwt_token: default_token
  , countryCode: 'SG'
  , iso639_2: 'eng'
  , myProfile: {
      __typename: 'MyProfile'
    , id: -1
    , profileName: ""
    , nameChangeCount: 0
    , profileImageURL: ""
    }
  },
  resolvers: {
    Mutation: {
      setAuthStatus: (_, args, { cache }) => {
        //console.log('setAuthStatus client-side mutation fired');
        if (! args.token ) {
          // populate from secureStore if available.
          return SecureStore.getItemAsync("authStatus")
          .then( ssAuthStatus => {
            if (ssAuthStatus) {
              let authStatus = JSON.parse( ssAuthStatus )
              token = authStatus.jwt_token
              cache.writeData({ data: { authorized: true, jwt_token: authStatus.jwt_token, myProfile: {__typename: 'MyProfile', id: authStatus.myProfile.id, profileName: authStatus.myProfile.profileName, nameChangeCount: authStatus.myProfile.nameChangeCount, profileImageURL: authStatus.myProfile.profileImageURL }}});
              return { userId: authStatus.myProfile.id }
            } else return null
          })
        } else {
          token = args.token
          cache.writeData({ data: { authorized: true, jwt_token: args.token, myProfile: {__typename: 'MyProfile', id: args.id, profileName: args.profileName, nameChangeCount: args.nameChangeCount, profileImageURL: args.profileImageURL }}});
          // populate secureStore
          SecureStore.setItemAsync("authStatus", JSON.stringify({ jwt_token: args.token, myProfile: {id: args.id, profileName: args.profileName, nameChangeCount: args.nameChangeCount, profileImageURL: args.profileImageURL }}))
          return { userId: args.id }
        }
      },
      unsetAuthStatus: (_, args, { cache }) => {
        //console.log('unsetAuthStatus client-side mutation fired');
        token = default_token
        cache.writeData({ data: { authorized: false, jwt_token: default_token, myProfile: {__typename: 'MyProfile', id: -1, profileName: "", nameChangeCount: 0, profileImageURL: "" }}});
        SecureStore.deleteItemAsync("authStatus")
        return null;
      },
      updateAuthStatus: (_, args, { cache }) => {
        //console.log('updateAuthStatus client-side mutation fired');
          let change = false
          let newMyProfile = {
            __typename: 'MyProfile'
          , id: args.id
          }
          if (args.profileName) {
            if (args.nameChangeCount) {
              newMyProfile.profileName = args.profileName
              newMyProfile.nameChangeCount = args.nameChangeCount
              change = true
            } else {
              console.log("udateAuthStatus: profileName AND nameChangeCount must be set together")
            }
          }
          if (args.profileImageURL) {
            newMyProfile.profileImageURL = args.profileImageURL
            change = true
          }
          let writeObject = {
            data: {
              myProfile: newMyProfile
            }
          }
          if (change) {
            cache.writeData( writeObject )
          } else {
            console.log("udateAuthStatus: no valid data supplied to be updated")
          }
        return null
      },
      setCountry: (_, args, { cache }) => {
        let myCountry = cache.readQuery({ query: GET_CACHED_COUNTRY, variables: {isoCode: args.countryCode} })
        cache.writeData({ data: { countryCode: args.countryCode, iso639_2: args.iso639_2 }});
        return myCountry
      },
    }
  },
});

const client = new ApolloClient({
  cache
, link: ApolloLink.from([stateLink, errorLink, middlewareLink, httpLink])
});

client.onResetStore(stateLink.writeDefaults);

export default client
