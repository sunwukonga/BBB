import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Layout, Colors } from '../../constants/';
import {Alert, Image, ImageBackground } from 'react-native';


import { StackActions, NavigationActions } from 'react-navigation';


var facebook_jwt= null;

const FACEBOOK_LOGIN = gql`
  mutation loginFacebook($token: String!) {
    loginFacebook(token: $token)
  }
`;

// NA -> navigation Action

const NA_LoginToHome = NavigationActions.navigate({
    routeName: 'homeScreen',
    params: { previous_screen: 'loginScreen'
            , doAction: 'openDrawer' },
    //action: NavigationActions.navigate({ routeName: 'NEXT_SCREEN' }),
})
const SA_LoginToHome = StackActions.reset({
    index: 0
  , actions: [
        NavigationActions.navigate({
            routeName: 'mainScreen'
          , params: { previous_screen: 'loginScreen'
                    , doAction: 'openDrawer' }
          , action: NavigationActions.back()
        })
    ]
})

export default LoggedinState = graphql(gql`
  mutation logstatus {
    logstatus @client
  }
`)(
  class extends Component {

    onLoggedinState = () => {
      this.props.mutate({});
    };

    render() {
      return (
        <View {...this.props}>
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

                const data = await loginFacebook({
                  variables: { token: token },
                });
                //TODO: Add this returned token to securestore and then navigate on.
                Expo.SecureStore.setItemAsync('token', data.data.loginFacebook);

                console.log('jwt from data.data.loginFacebook '+JSON.stringify(data.data.loginFacebook));

                await this.onLoggedinState();

                //this.props.navigation.navigate('homeScreen');
                //this.props.navigation.dispatch(NA_loginToHome)
                console.log("Our status should be logged in")
                this.props.navigation.dispatch(NA_LoginToHome)
              }
              else{
                console.log("login failed");
              }
            }}
          />
        )}
        </Mutation>
        </View>
      );
    }
  }
);
