import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { graphql,Mutation } from "react-apollo";
import gql from "graphql-tag";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Layout, Colors, Urls } from '../../constants/';
import {Alert, Image, ImageBackground } from 'react-native';


import { StackActions, NavigationActions } from 'react-navigation';
import {
  FACEBOOK_LOGIN
, SET_AUTH_STATUS
} from '../../graphql/Mutations'


// NA -> navigation Action
const NA_LoginToHome = NavigationActions.navigate({
    routeName: 'homeScreen',
    params: { previous_screen: 'loginScreen'
            , doAction: 'openDrawer'
            , loginStatus: true },
})
const NA_LoginToCreate = NavigationActions.navigate({
    routeName: 'createNewItemScreen',
    params: { previous_screen: 'loginScreen'
            , loginStatus: true }
})
/*
const SA_LoginToCreate = StackActions.reset({
    index: 0
  , actions: [
      NavigationActions.navigate({
        routeName: 'mainScreen'
      , actions: [
        NavigationActions.navigate({
          routeName: 'homeScreen'
        , params: { loginStatus: true }
        })
      , NavigationActions.navigate({
          routeName: 'createNewItemScreen'
      })
    ]
})
*/

export default FacebookOauth = graphql(SET_AUTH_STATUS)(
  class extends Component {

    onBBToken = ( {user, token} ) => {
      if (user.profileImage.imageKey) {
        this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: Urls.s3ImagesUrl +  user.profileImage.imageURL}});
      } else if (user.profileImage.imageURL) {
        this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: user.profileImage.imageURL}});
      } else {
        this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: null}});
      }
    };

    render() {
      return (
        <View {...this.props}>
        <Mutation
          mutation={FACEBOOK_LOGIN}
          fetchOptions = 'no-cache'
        >
        {(loginFacebook, { data }) => (
          <FontAwesome
            name="facebook"
            size={Layout.moderateScale(50)}
            style={{
              color: Colors.fbbgicon,
            }}
            onPress={async () => {
              let startTime = new Date()
              const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('279793089219775', {
                  permissions: ['public_profile', 'email'],
                });
              console.log("Time (ms) to get Facebook Token: ", new Date() - startTime)

              if (type === 'success') {

                startTime = new Date()
                const data = await loginFacebook({
                  variables: { token: token },
                });
                console.log("Time (ms) to get BBToken: ", new Date() - startTime)

                console.log('data.data.loginFacebook '+JSON.stringify(data.data.loginFacebook));
                startTime = new Date()
                await this.onBBToken(data.data.loginFacebook)
                console.log("Time (ms) to store token and profile: ", new Date() - startTime)

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
