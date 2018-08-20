import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { graphql, Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Layout, Colors, Urls } from '../../constants/';
import {Alert, Image, ImageBackground } from 'react-native';


import { StackActions, NavigationActions } from 'react-navigation';
import {
  FACEBOOK_LOGIN
, SET_AUTH_STATUS
} from '../../graphql/Mutations'
import {
  GET_LISTING
} from '../../graphql/Queries'
import { w } from '../../utils/helpers.js'


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

const FacebookOauth = graphql(SET_AUTH_STATUS)(
  class extends Component {

    onBBToken = ( {user, token} ) => {
      if (user.profileImage.imageKey) {
        return this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: Urls.s3ImagesUrl +  user.profileImage.imageURL}});
      } else if (user.profileImage.imageURL) {
        return this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: user.profileImage.imageURL}});
      } else {
        return this.props.mutate({ variables: {token: token, id: user.id, profileName: user.profileName, profileImageURL: null}});
      }
    };

    render() {
      let { listingId, ownerId, mutateCreateChat, mutateToggleLike, dest } = this.props.navigation.state.params
      return (
        <View>
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
                const { data } = await loginFacebook({
                  variables: { token: token },
                });
                console.log("Time (ms) to get BBToken: ", new Date() - startTime)

                console.log('data.loginFacebook '+JSON.stringify(data.loginFacebook));
                startTime = new Date()
                this.onBBToken(data.loginFacebook)
                .then( ({ data: {setAuthStatus: {userId}}}) => {
                  // Arriving from Home -> drawerOpen
                  if ( dest == 'openDrawer' ) {
                    this.props.navigation.dispatch(NA_LoginToHome)
                  }
                  // Arriving from Home -> CreateNewItemScreen
                  if ( dest == 'createNewItemScreen' ) {
                    this.props.navigation.dispatch(NA_LoginToCreate)
                  }
                  // Arriving from Home -> chatDetail
                  // Arriving from productDetail -> chatDetail
                  if ( dest == 'chatDetailsScreen' ) {
                    if ( userId == ownerId ) {
                      Alert.alert(
                        'This is your listing!',
                        'You cannot chat with yourself.',
                        [
                          {text: 'OK', onPress: () => {
                            this.props.navigation.goBack()
                          }},
                        ],
                        { cancelable: false }
                      )
                    } else {
                      this.props.client.query({
                        query: GET_LISTING,
                        variables: { id: listingId },
                        fetchOptions: 'network-only'
                      })
                      .then( ({data: {getListing}}) => {
                        console.log("CHECK updated: ", getListing.chatId)
                        if ( (_chatId = getListing.chatId) != -1 ) {
                          this.props.navigation.navigate('chatDetailScreen', {
                            chatId: _chatId
                          , chatIndexes: []
                          })
                        } else {
                          mutateCreateChat()
                          .then( ({ data: { createChat }, error }) => {
                            console.log("After create chat promise, ChatId: ", createChat.id)
                            if (error) {
                              console.log("Have ERROR", error)
                            }
                            //console.log("NAV: ", w(this, ['props', 'navigation']))
                            this.props.navigation.navigate('chatDetailScreen', {
                              chatId: createChat.id
                            , chatIndexes: []
                            })
                          })
                        }
                      })
                    }
                  }
                  // Arriving from Home -> (Like) Home
                  // Arriving from productDetail -> (Like) Home
                  if ( dest == 'homeScreen' ) {
                    // Handle like
                    if ( userId == ownerId ) {
                      Alert.alert(
                        'This is your listing!',
                        'You cannot like your own listing.',
                        [
                          {text: 'OK', onPress: () => {
                            this.props.navigation.goBack()
                          }},
                        ],
                        { cancelable: false }
                      )
                    } else {
                      this.props.client.query({
                        query: GET_LISTING,
                        variables: { id: listingId },
                        fetchOptions: 'network-only'
                      })
                      .then( ({data: {getListing}}) => {
                        console.log("CHECK updated: ", getListing.liked)
                          if (!getListing.liked) {
                            mutateToggleLike({listingId: listingId, like: true })
                            .then( ({ data: { likeListing }, error }) => {
                              console.log("After toggle like promise")
                              this.props.navigation.goBack()
                            })
                          } else {
                            this.props.navigation.goBack()
                          }
                      })
                    }
                  }
                  console.log("Time (ms) to store token and profile: ", new Date() - startTime)
                })
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

export default withApollo( FacebookOauth )
