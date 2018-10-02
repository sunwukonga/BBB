import React from 'react';
import { Query, Mutation, graphql, compose } from "react-apollo";
import {
  FlatList
, ActivityIndicator
, BackHandler
} from 'react-native';
import {
  ListItem
} from 'react-native-elements'
import {
  Container
, Content
, Text
} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { RootStackNavigator } from '../../navigation/RootNavigation'
import MainStackNavigator from '../../navigation/MainDrawerNavigator'

// custom components
import BBBHeader from '../../components/BBBHeader/';

// screen style
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import Flag from 'react-native-round-flags';
import { w } from '../../utils/helpers.js'

import {
  GET_COUNTRY_LIST
, GET_MOST_RECENT_LIST
, GET_MOST_VISITED_LIST
, GET_MOST_LIKED_LIST
, GET_USER_VISITED_LIST
, GET_USER_LIKED_LIST
, GET_USER_POSTED_LIST
, GET_NESTED_CATEGORY_LIST
} from '../../graphql/Queries'
import {
  SET_COUNTRY
, SET_AUTH_STATUS
, UNSET_AUTH_STATUS
} from '../../graphql/Mutations'

// Navigation Actions
const SA_CountryToHome = (navigation) => StackActions.reset({
    index: 0
  , actions: [ NavigationActions.navigate({ routeName: 'mainScreen' }) ]
})
/*
const SA_CountryToHome = (navigation) => StackActions.reset({
    index: 0
  , actions: [
      NavigationActions.navigate({
        routeName: 'mainScreen'
      , action: NavigationActions.navigate({
          routeName: 'homeDrawer'
        , action: NavigationActions.navigate({
            routeName: 'homeScreen'
          , params: { rootNavigation: navigation }
          })
        })
      })
    ]
})
*/

const SA_BackToProfile = (navigate, navigation) => navigate( navigation )
/*
const SA_BackToProfile = StackActions.reset({
  index: 1
, key: 'id-1538193255286-1'
, actions: [
    NavigationActions.navigate({
      routeName: 'homeDrawer'
    , action: NavigationActions.navigate({ routeName: 'homeScreen' })
    })
  , NavigationActions.navigate({ routeName: 'profileScreen' })
  ]
})
*/
//    "react-navigation": "^2.13.0"
/*
const SA_BackToProfile = StackActions.reset({
    index: 0
  , actions: [NavigationActions.navigate({
      routeName: 'homeDrawer'
    , action: NavigationActions.navigate({
        routeName: 'profileScreen'
      })
    })]
})
*/
/*
const SA_BackToProfile = StackActions.reset({
    index: 0
  , actions: [NavigationActions.navigate({
      routeName: 'mainScreen'
    , action: NavigationActions.navigate({
        routeName: 'homeScreen'
      , action: NavigationActions.navigate({
          routeName: 'profileScreen'
        })
      })
    })]
})
*/
/*
const SA_BackToProfile = StackActions.reset({
  index: 0
, actions: [
    NavigationActions.navigate({
      routeName: 'mainScreen'
    , action: StackActions.reset({
        index: 1
      , actions: [
          StackActions.push({ routeName: 'homeDrawer' })
        , StackActions.push({ routeName: 'profileScreen' })
        ]
      })
    })
  ]
})
*/

class CallSetAuthStatus extends React.Component {
  componentDidMount() {
    this.props.setAuthStatus()
  }
  render() {
    return this.props.children
  }
}
class CallCountryHandler extends React.Component {
  componentDidMount() {
    this.props.countryHandler()
  }
  render() {
    return this.props.children
  }
}

//#############################################################
const CountryScreen = compose (
  graphql(UNSET_AUTH_STATUS, {name: "unsetAuthStatus"})
, graphql(SET_AUTH_STATUS, {name: "setAuthStatus"})
, graphql(GET_NESTED_CATEGORY_LIST)
)(
  class extends React.Component {
    constructor(props) {
      //console.log("CountryScreen Constructor")
      super(props)
      this.state = {
        countryCode: null
      }
      this.gettingCountryCode = true
      this.mutationInFlight = false
      this.countryBackHandler = null

      const defaultGetStateForAction = RootStackNavigator.router.getStateForAction;
      RootStackNavigator.router.getStateForAction = (action, state) => {
        if (state && w(action.actions, ['length']) > 0 && action.actions[0].routeName === "countryScreen") {
          this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this, action.actions[0].params.countryCode, action.actions[0].params.mainNavigation))
        }
        return defaultGetStateForAction(action, state);
      };
    }

    onBackPress = (countryCode, navigation) => {
      return Expo.SecureStore.setItemAsync("countryCode", countryCode)
      .then( () => {
        this.props.navigation.dispatch( SA_CountryToHome( this.props.navigation ) )
        //console.log("routeName: ", navigation.state.routeName)
        //navigation.navigate({routeName: navigation.state.routeName})
        //navigation.navigate({ routeName: navigation.state.routeName })
        /*
        navigation.reset({
          index: 1
        , actions: [
            navigation.navigate({
              routeName: 'homeDrawer'
            , params: {
                rootNavigation: navigation.state.params.rootNavigation
              }
            , action: navigation.navigate({
                routeName: navigation.state.routeName
              , params: {
                  rootNavigation: navigation.state.params.rootNavigation
                }
              })
            })
          ]
        })
        */
        this.removeCountryHandler()
        this.mutationInFlight = false
        this.gettingCountryCode = true
        return
      })
    }

    removeCountryHandler = () => {
      if (this.countryBackHandler) {
        this.countryBackHandler.remove()
        this.countryBackHandler = null
      }
    }

    componentWillMount(props) {
      if (! this.state.countryCode) {
        //console.log("mainNavigation: ", this.props.navigation)
        let countryCodePromise = Expo.SecureStore.getItemAsync("countryCode")
        Promise.all([countryCodePromise])
        .then( ([ countryCode ]) => {
          if (countryCode) {
            this.gettingCountryCode = false
            this.setState({
              countryCode: countryCode
            })
          } else {
            this.gettingCountryCode = false
            this.setState({
              countryCode: null
            })
          }
        })
      }

    }

    countryHandler( countryCode, setCountry, save ) {
      if ( countryCode ) {
        if (!this.mutationInFlight) {
          this.mutationInFlight = true
          setCountry({ variables: { countryCode: countryCode }})
          .then( () => {
            // cache: NESTED CATEGORY LIST
            if (save) {
              Expo.SecureStore.setItemAsync("countryCode", countryCode)
              .then( () => {
                this.props.navigation.dispatch(SA_CountryToHome(this.props.navigation))
                //this.props.navigation.navigate(MainStackNavigator, { params: { rootStackNavigator: RootStackNavigator, mainStackNavigator: MainStackNavigator }})
                this.removeCountryHandler()
                this.mutationInFlight = false
                this.gettingCountryCode = true
              })
            } else {
              this.props.navigation.dispatch(SA_CountryToHome(this.props.navigation))
              //this.props.navigation.navigate(MainStackNavigator, { params: { rootStackNavigator: RootStackNavigator, mainStackNavigator: MainStackNavigator }})
              this.removeCountryHandler()
              this.mutationInFlight = false
              this.gettingCountryCode = true
            }
          })
        }
      }
    }

    renderItem = ({ item }, setCountry) => {
      return (
        <ListItem
          onPress={() => this.countryHandler( item.isoCode, setCountry, true ) }
          leftIcon = {<Flag code={item.isoCode} style={styles.flagStyle} />}
          title = {<Text style={styles.countryNameTxt}>{item.name}</Text>}
          containerStyle={styles.center}
          hideChevron = {true}
        />
      )
    }

    render() {
      //console.log("Root Navigator: ", this.props.navigation.state)
      if ( this.gettingCountryCode ) {
        return null
      }
      return (
        <CallSetAuthStatus setAuthStatus={this.props.setAuthStatus} >
          <Mutation
            mutation = { SET_COUNTRY }
            update = {(cache, { data: { setCountry } }) => {
              cache.writeQuery({
                query: GET_USER_LIKED_LIST
              , variables: {"countryCode": setCountry}
              , data: { getUserLikedListings: [] }
              })
              cache.writeQuery({
                query: GET_USER_VISITED_LIST
              , variables: {"countryCode": setCountry}
              , data: { getUserVisitedListings: [] }
              })
              cache.writeQuery({
                query: GET_USER_POSTED_LIST
              , variables: {"countryCode": setCountry}
              , data: { getUserPostedListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_RECENT_LIST
              , variables: {"countryCode": setCountry}
              , data: { getMostRecentListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_VISITED_LIST
              , variables: {"countryCode": setCountry}
              , data: { getMostVisitedListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_LIKED_LIST
              , variables: {"countryCode": setCountry}
              , data: { getMostLikedListings: [] }
              })
            }}
          >
            {(setCountry, { data }) => {
              return (
                <CallCountryHandler countryHandler={() => this.countryHandler( this.state.countryCode, setCountry, false )}>
                  <Query
                    query = {GET_COUNTRY_LIST}
                    fetchPolicy = "network-only"
                  >
                    {({ data, networkStatus, error }) => {
                      if (networkStatus === 1) {
                        return <ActivityIndicator size="large" />;
                      }
                      if (error) {
                        this.props.unSetAuthStatus()
                        return <Text>Error: {error.message}</Text>;
                      }
                      return (
                        <Container style={styles.container}>
                          <BBBHeader title="Select Your Country" />
                          <Content>
                            <FlatList
                              data = {data.allCountries || []}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={(data) => this.renderItem(data, setCountry)}
                            />
                          </Content>
                        </Container>
                      )
                    }}
                  </Query>
                </CallCountryHandler>
              )
            }}
          </Mutation>
        </CallSetAuthStatus>
      )
    }
  }
)

export default CountryScreen
