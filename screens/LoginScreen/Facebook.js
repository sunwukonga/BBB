import React from 'react';
//ApolloConsumer needs react-native 16.3.0
import { Alert } from 'react-native';
import { withApollo, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Layout, Colors } from '../../constants/';
import { Image, View, ImageBackground } from 'react-native';

const FACEBOOK_LOGIN = gql`
  mutation loginFacebook($token: String!) {
    loginFacebook(token: $token)
  }
`;

export default class FacebookLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

 loginDone(){
   console.log('login done');
 }

  render() {
    return (
      <View>
      <Mutation mutation={FACEBOOK_LOGIN}>
        {(loginFacebook, { data }) => (
          <FontAwesome
            name="facebook"
            size={Layout.moderateScale(25)}
            style={{
              color: Colors.fbbgicon,
            }}
            onPress={async () => {
              const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('279793089219775', {
                  permissions: ['public_profile', 'email'],
                });
              if (type === 'success') {
                console.log(token);

                const data = await loginFacebook({
                  variables: { token: token },
                })
                // TODO: Add this returned token to securestore and then navigate on.
                Expo.SecureStore.setItemAsync('token', data.data.loginFacebook);

                this.props.navigation.navigate('homeScreen')
                // console.log(data.data.loginFacebook)

              }
            }}
          />
        )}
      </Mutation>
    </View>
    )
  }
}


/*
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
*/
