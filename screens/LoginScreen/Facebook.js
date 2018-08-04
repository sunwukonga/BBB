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
import { Layout, Colors, Urls } from '../../constants/';
import {Alert, Image, ImageBackground } from 'react-native';


import { StackActions, NavigationActions } from 'react-navigation';


var facebook_jwt= null;

const FACEBOOK_LOGIN = gql`
  mutation loginFacebook($token: String!) {
    loginFacebook(token: $token) {
      token
      user {
        profileName
        profileImage {
          imageKey
          imageURL
        }
      }
    }
  }
`;

// NA -> navigation Action

const NA_LoginToHome = NavigationActions.navigate({
    routeName: 'homeScreen',
    params: { previous_screen: 'loginScreen'
            , doAction: 'openDrawer' },
    //action: NavigationActions.navigate({ routeName: 'NEXT_SCREEN' }),
})
const NA_LoginToCreate = NavigationActions.navigate({
    routeName: 'createNewItemScreen',
    params: { previous_screen: 'loginScreen'
            }
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
  mutation setAuthStatus( $profileName: String!, $profileImageURL: String ) {
    setAuthStatus( profileName: $profileName, profileImageURL: $profileImageURL ) @client
  }
`)(
  class extends Component {

    onLoggedinState = ( user ) => {
      if (user.profileImage.imageKey) {
        // Image is stored with us, need s3Url + imageKey
        this.props.mutate({ variables: {__typename: 'Profile', profileName: user.profileName, profileImageURL: Urls.s3ImagesUrl +  user.profileImage.imageURL}});
      } else if (user.profileImage.imageURL) {
        this.props.mutate({ variables: {__typename: 'Profile', profileName: user.profileName, profileImageURL: user.profileImage.imageURL}});
      } else {
        this.props.mutate({ variables: {__typename: 'Profile', profileName: user.profileName, profileImageURL: null}});
      }
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
                Expo.SecureStore.setItemAsync('token', data.data.loginFacebook.token);

                console.log('data.data.loginFacebook '+JSON.stringify(data.data.loginFacebook));

                await this.onLoggedinState(data.data.loginFacebook.user);

                console.log("Our status should be logged in")
                if ( this.props.navigation.state && this.props.navigation.state.params ) {
                  // Arriving from Home -> drawerOpen
                  if ( this.props.navigation.state.params.dest == 'openDrawer' ) {
                    this.props.navigation.dispatch(NA_LoginToHome)
                  }
                  // Arriving from Home -> CreateNewItemScreen
                  if ( this.props.navigation.state.params.dest == 'createNewItemScreen' ) {
                    this.props.navigation.dispatch(NA_LoginToCreate)
                  }
                }
                // Arriving from Home(drawerOpen) -> chatList
                // Arriving from Home -> chatDetail
                // Arriving from productDetail -> chatDetail
                // Arriving from 
              } else {
                console.log("login failed")
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
