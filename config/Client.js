//import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Mutation } from "react-apollo";

const default_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIiLCJyb2xlIjpbeyJuYW1lIjoiR0VORVJBTCJ9XSwiaWF0IjoxNTI1NTA2MjEyfQ.daamAG6JGC8LnlFRAsN4ppB23HhN_BtiuRA7QnXBqrU';
var token = default_token
//var default_token = await Expo.SecureStore.getItemAsync('defaultToken');
const BBB_BASE_URL = 'http://notify.parker.sg:3000/graphql'

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Country': return object.isoCode
      case 'Currency': return object.iso4217
      case 'Language': return object.iso639_2
      default: return object.id || object._id // fall back to `id` and `_id` for all other types
    }
  },
  cacheRedirects: {
    Query: {
      getListing: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Listing', id })
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
  , myProfile: {
      __typename: 'MyProfile'
    , id: -1
    , profileName: ""
    , profileImageURL: ""
    }
  },
  resolvers: {
    Mutation: {
      setAuthStatus: (_, args, { cache }) => {
        console.log('setAuthStatus client-side mutation fired');
        token = args.token
        cache.writeData({ data: { authorized: true, jwt_token: args.token, myProfile: {__typename: 'MyProfile', id: args.id, profileName: args.profileName, profileImageURL: args.profileImageURL }}});
        return { userId: args.id }
      },
      unsetAuthStatus: (_, args, { cache }) => {
        console.log('unsetAuthStatus client-side mutation fired');
        token = default_token
        cache.writeData({ data: { authorized: false, jwt_token: default_token, myProfile: {__typename: 'MyProfile', id: -1, profileName: "", profileImageURL: "" }}});
        return null;
      },
      setCountry: (_, args, { cache }) => {
        console.log('setCountry client-side mutation fired');
        cache.writeData({ data: { countryCode: args.countryCode }});
        return null;
      },
    }
  },
});
const link = ApolloLink.from([errorLink, stateLink, middlewareLink, httpLink]);

const client = new ApolloClient({
  link
, cache
});

client.onResetStore(stateLink.writeDefaults);

export default client
