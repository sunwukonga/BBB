import ApolloClient from 'apollo-boost';

export default client = new ApolloClient({

  uri: 'http://notify.parker.sg:3000/graphql',
  fetchOptions: {
    credentials: 'include'
  },

  request: async (operation) => {
    const token = await Expo.SecureStore.getItemAsync('token');

    console.log('Bearer ' + token);
    Expo.SecureStore.setItemAsync('JWTToken', token);

    var jwtt = '';
    jwtt = await Expo.SecureStore.getItemAsync('JWTToken')
    console.log('token' + jwtt);

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
    const { cache } = operation.getContext();
    if (graphQLErrors) {
      console.log( graphQLErrors );
    }
    if (networkError) {
      cache.writeData({ data: { isLogged: true }});
    }
  },
  clientState: {
    defaults: {
        isConnected: true,
        isLogged: false,
        logged_in: false,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected: isConnected }});
          return null;
        }
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
