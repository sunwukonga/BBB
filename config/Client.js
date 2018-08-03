import ApolloClient from 'apollo-boost';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

const cache = new InMemoryCache();

var token = '';
const default_token = '';

export default client = new ApolloClient({
  cache,
  uri: 'http://notify.parker.sg:3000/graphql',
  fetchOptions: {
    credentials: 'include'
  },

  request: async (operation) => {
    token = await Expo.SecureStore.getItemAsync('token');
    default_token = await Expo.SecureStore.getItemAsync('defaultToken');
    console.log('Bearer ' + token);


    //const { cache } = operation.getContext();
    //const { isLogged } = cache.readQuery({ data: { isLogged }});
/*    if ( isLogged ) { */

    operation.setContext({
      headers: {
        authorization: 'Bearer ' + token
      }
    });
/*  } else {
      operation.setContext({
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIiLCJyb2xlIjpbeyJuYW1lIjoiR0VORVJBTCJ9XSwiaWF0IjoxNTIyOTg0NDUzfQ.GK3Mrk1CQmcdEnvlFopzS2dnK88c2kOx6PXkm31IkOU'
        }
      });
    } */
  },
  onError: ({ operation, graphQLErrors, networkError }) => {
    cache  = operation.getContext();
    if (graphQLErrors) {
      console.log('graphql error query fired');
      console.log( graphQLErrors );
    }
    if (networkError) {
      console.log('network error query fired');
      console.log( networkError );

    }
  },
  clientState: {
    defaults: {
      isConnected: true
    , logged_in: false
    , jwt_token: default_token
    , myProfile: {
        __typename: 'Profile'
      , profileName: ""
      , profileImageURL: ""
      }
    },
    resolvers: {
      // Seems that queries work automatically if the data is available.
      /*
      Query: {
        getProfile: (_, args, {cache}) => {
          return myProfile
        },
      },
      */
      Mutation: {
        setAuthStatus: (_, args, { cache }) => {
          console.log('setLoggedIn client-side mutation fired');
          cache.writeData({ data: { logged_in: true, jwt_token: token, myProfile: {__typename: 'Profile', profileName: args.profileName, profileImageURL: args.profileImageURL }}});
          return null;
        },
        unsetAuthStatus: (_, args, { cache }) => {
          console.log('logout query fired');
          cache.writeData({ data: { logged_in: false, jwt_token: default_token, myProfile: {__typename: 'Profile', profileName: "", profileImageURL }}});
          return null;
        },
      }
    }
  },
  //cacheRedirects: {
    //Query: {
      //movie: (_, { id }, { getCacheKey }) =>
        //getCacheKey({ __typename: 'Movie', id });
    //}
  //}
});
