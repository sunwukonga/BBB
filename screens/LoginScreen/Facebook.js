import { withApollo } from 'react-apollo';
//ApolloConsumer needs react-native 16.3.0
import gql from "graphql-tag";

const FACEBOOK_LOGIN = gql`
  mutation loginFacebook($token: String!) {
    loginFacebook(token: $token) {
      result
    }
  }
`;

function facebookLogin( token ) {
  console.log('Token value: ' + token );
  //const { data } = await this.props.client.mutation({
  this.props.client.mutation({
    query: FACEBOOK_LOGIN,
    variables: { token: { token } },
  }).then( data => {
    console.log('GraphQL data: ' + data);
  });
}

export default withApollo(facebookLogin);
