import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";
import { StackActions } from 'react-navigation'
import Flag from 'react-native-round-flags';
import { Ionicons } from '@expo/vector-icons';

import LoginStatus from '../HomeScreen/LoginStatus'
import ChangeButton from '../../components/buttons/ChangeButton'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'


const SA_changeCountry = (isoCode) => StackActions.reset({
  index: 0
, key: null
, actions: [
    StackActions.push({
      routeName: 'countryScreen'
    , params: { countryCode: isoCode }
    })
  ]
})
/*
const SA_changeCountry = StackActions.reset({
  index: 0
, key: 'root'
, actions: [
    StackActions.push({ routeName: 'loginScreen' })
  ]
})
*/

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }

  }



render() {

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
                          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
                        </Button>

    var DisplayProfileImage = ({imageURL}) => {
      // rowImage, swiperSec, Baby
      if (!imageURL) {
        return (
          <View style={styles.swiperSec}>
            <Baby style={styles.rowImage} />
          </View>
        )
      } else {
        return (
          <View style={styles.swiperSec}>
            <Image source={{uri: imageURL}} style={styles.rowImage} />
          </View>
        )
      }
    }
                //style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
    return (
      <LoginStatus>{ loginStatus => (
        <Container style={styles.container}>
          <BBBHeader title="Profile" leftComponent={ leftComponent } />
          <Content>
            <View>
              <DisplayProfileImage imageURL={loginStatus.myProfile.profileImageURL} />
              <View style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.0)',
                alignItems:'flex-end',
                justifyContent:'flex-start',
                flexDirection: 'column',
                width: Layout.WIDTH * 0.2,
                height:Layout.WIDTH * 0.4,
                position: 'absolute',
                top: Layout.WIDTH * 0.02,
                right: Layout.WIDTH * 0.02,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderRadius: Layout.moderateScale(8),
              }}>
                <ChangeButton />
              </View>

            </View>
            <View style={styles.getStartedContainer}>
              <View style={styles.hr} />
            </View>
            <TouchableOpacity
              onPress = {() => {
                Expo.SecureStore.deleteItemAsync("countryCode")
                .then( () => {
                  this.props.navigation.dispatch(SA_changeCountry(loginStatus.countryCode))
                })
              }}
              style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <View style={{justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingLeft: Layout.WIDTH * 0.05}} >
                <Text style={{fontWeight: 'bold'}}>Current country: {loginStatus.countryCode}</Text>
              </View>
              <View style={styles.changeCountryContainer} >
                <Flag code={loginStatus.countryCode} style={styles.flagStyle} />
                <Ionicons
                  name={'md-sync'}
                  size={Layout.WIDTH * 0.22}
                  color={Colors.lightGray}
                  style={styles.changeCountry}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.getStartedContainer}>
              <View style={styles.hr} />
            </View>

          </Content>
        </Container>
      )}</LoginStatus>
    )
  }

}
                  // Floating CHANGE ICON
            // TODO: Current Profile image with CHANGE ICON + DELETE ICON
        // EDIT AUTH STATUS
        // ProfileName with CHANGE ICON iff nameChangeCount > 0
        // Your ROLES. Must return with GetProfile.
        // Future: Stats associated with ROLES
        //   i.e. BARGAINER, TRANSLATOR, CATALOGUER, ADMIN
//   
              //<View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end', width: Layout.Width * 0.30, borderWidth: 1 }} >
              //</View>
