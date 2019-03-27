import React from 'react'
import {
  FlatList
, Image
, TouchableOpacity
, View
, Picker
} from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

//apollo client
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { StackActions } from 'react-navigation'
import Flag from 'react-native-round-flags';
import { Ionicons } from '@expo/vector-icons';

import LoginStatus from '../HomeScreen/LoginStatus'
import ChangeButton from '../../components/buttons/ChangeButton'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

import {
  GET_LOGIN_STATUS
, GET_CACHED_COUNTRY
} from '../../graphql/Queries'
import {
  SET_COUNTRY
} from '../../graphql/Mutations'

const SA_changeCountry = (isoCode, iso639_2) => StackActions.reset({
  index: 0
, key: null
, actions: [
    StackActions.push({
      routeName: 'countryScreen'
    , params: { countryCode: isoCode, iso639_2: iso639_2 }
    })
  ]
})

export default ProfileScreen = compose(
  graphql(GET_LOGIN_STATUS, {name: "loginStatus"})
, graphql(GET_CACHED_COUNTRY, {
    name: "cachedCountry"
  , skip: ({ loginStatus }) => !loginStatus
  , options: ({loginStatus}) => ({
      variables: { isoCode: loginStatus.countryCode }
    , fetchPolicy: 'cache-only'
    })
  })
, graphql(SET_COUNTRY, { name: "setCountry" })
)(
class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  render() {
    let { loginStatus, cachedCountry, setCountry } = this.props

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
                          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
                        </Button>

    var DisplayProfileImage = ({imageURL}) => {
      // rowImage, swiperSec, Baby
      if (!imageURL) {
        return (
          <View style={styles.swiperSec}>
            <Baby style={styles.babyIcon} />
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
    if (!cachedCountry || !cachedCountry.getCachedCountry) {
      return null
    }
    return (
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
              right: Layout.WIDTH * 0.02, backgroundColor: 'rgba(255, 255, 255, 0)',
              borderRadius: Layout.moderateScale(8),
            }}>
              <ChangeButton />
            </View>

          </View>
          <View style={styles.getStartedContainer}>
            <View style={styles.hr} />
          </View>

          <View style={styles.dataFacetoFace}>
            <Text style={styles.txtTitle}>Selected Language: {
              cachedCountry.getCachedCountry.languages.find( lang => lang.iso639_2 == loginStatus.iso639_2 ).name
            }</Text>
            <Picker
              style={styles.dateDropDown}
              selectedValue={loginStatus.iso639_2}
              onValueChange={(value, index, data) => {
                // The setTimeout fixes a problem with every second change not propagating
                // https://github.com/facebook/react-native/pull/22821
                setTimeout(() => {
                  setCountry({ variables: { countryCode: cachedCountry.getCachedCountry.isoCode, iso639_2: value }})
                  Expo.SecureStore.setItemAsync("countryInfo", JSON.stringify({countryCode: cachedCountry.getCachedCountry.isoCode, iso639_2: value}))
                }, 0)
              }}
            >
              {cachedCountry.getCachedCountry.languages.map((l, i) => {
                return <Picker.Item key={l.name} label={l.name} value={l.iso639_2} />
              })}
            </Picker>
          </View>

          <TouchableOpacity
            onPress = {() => {
              Expo.SecureStore.deleteItemAsync("countryInfo")
              .then( () => {
                //console.log("key: ", this.props.navigation.state.params.rootNavigation.state.key)
                //this.props.navigation.dispatch(SA_changeCountry(loginStatus.countryCode, this.props.navigation, this.props.navigation.state.params.rootNavigation.state.key))
                this.props.navigation.dispatch(SA_changeCountry(loginStatus.countryCode, loginStatus.iso639_2))
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
    )
  }
}
)
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
