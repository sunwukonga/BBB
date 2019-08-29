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
import * as SecureStore from 'expo-secure-store'
//import { RootStackNavigator } from '../../navigation/RootNavigation'

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
, GET_LOCUS
, GET_CACHED_TRANSLATIONS
} from '../../graphql/Queries'
import {
  SET_COUNTRY
, SET_AUTH_STATUS
, UNSET_AUTH_STATUS
} from '../../graphql/Mutations'

// Navigation Actions
const SA_CountryToHome = (navigation) => StackActions.reset({
    index: 0
  , key: null
  , actions: [ NavigationActions.navigate({ routeName: 'mainScreen' }) ]
})

const SA_BackToProfile = (navigate, navigation) => navigate( navigation )

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
, graphql(GET_NESTED_CATEGORY_LIST, {name: "getNestedCategoryList"})
, graphql(GET_COUNTRY_LIST, {name: "getCountryList"})
)(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countryCode: null
      , languageCode: null
      }
      this.gettingCountryCode = true
      this.mutationInFlight = false
      this.countryBackHandler = null

      let parentRouter = props.navigation.dangerouslyGetParent().router
      //const defaultGetStateForAction = RootStackNavigator.router.getStateForAction;
      const defaultGetStateForAction = parentRouter.getStateForAction;
      parentRouter.getStateForAction = (action, state) => {
        if (state && w(action.actions, ['length']) > 0 && action.actions[0].routeName === "countryScreen") {
          this.countryBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this, action.actions[0].params.countryCode, action.actions[0].params.iso639_2))
        }
        return defaultGetStateForAction(action, state);
      };
    }

    onBackPress = (countryCode, iso639_2) => {
      return SecureStore.setItemAsync("countryInfo", JSON.stringify({countryCode: countryCode, iso639_2: iso639_2}))
      .then( () => {
        this.props.navigation.dispatch( SA_CountryToHome( this.props.navigation ) )
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

    componentWillMount() {
      if (! this.state.countryCode) {
        let countryInfoPromise = SecureStore.getItemAsync("countryInfo")
        Promise.all([countryInfoPromise])
        .then( ([ countryInfo ]) => {
          //console.log("countryInfo: ", countryInfo)
          if (countryInfo) {
            //console.log("CountryCode set by SecureStore")
            let country = JSON.parse(countryInfo)
            this.gettingCountryCode = false
            this.setState({
              countryCode: country.countryCode
            , languageCode: country.iso639_2
            })
          } else {
            this.gettingCountryCode = false
            this.setState({
              countryCode: null
            , languageCode: null
            })
          }
        })
      }

    }

    countryHandler( country, setCountry, save ) {
      if ( w(country, ['isoCode']) ) {
        if (!this.mutationInFlight) {
          this.mutationInFlight = true
          let iso639_2 = w(country, ['languages', 0, iso639_2]) ? country.languages[0].iso639_2 : 'eng'
          //console.log("Test: ", iso639_2)
          //console.log("Country: ", country)
          if ( w(country, ['iso639_2']) ) {
            iso639_2 = country.iso639_2
          }
          setCountry({ variables: { countryCode: country.isoCode, iso639_2: iso639_2 }})
          .then( () => {
            if (save) {
              SecureStore.setItemAsync("countryInfo", JSON.stringify({countryCode: country.isoCode, iso639_2: iso639_2}))
              .then( () => {
                this.removeCountryHandler()
                this.props.navigation.dispatch(SA_CountryToHome(this.props.navigation))
                this.mutationInFlight = false
                this.gettingCountryCode = true
              })
            } else {
              this.removeCountryHandler()
              this.props.navigation.dispatch(SA_CountryToHome(this.props.navigation))
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
          onPress={() => this.countryHandler( item, setCountry, true ) }
          leftIcon = {<Flag code={item.isoCode} style={styles.flagStyle} />}
          title = {<Text style={styles.countryNameTxt}>{item.name}</Text>}
          containerStyle={styles.center}
          hideChevron = {true}
        />
      )
    }

    render() {
      if (
           this.gettingCountryCode
        || this.props.getCountryList.loading
        || !this.props.getCountryList.allCountries
      ) {
        return null
      }
      return (
        <CallSetAuthStatus setAuthStatus={this.props.setAuthStatus} >
          <Mutation
            mutation = { SET_COUNTRY }
            update = {(cache, { data: { setCountry } }) => {
              cache.writeQuery({
                query: GET_USER_LIKED_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getUserLikedListings: [] }
              })
              cache.writeQuery({
                query: GET_USER_VISITED_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getUserVisitedListings: [] }
              })
              cache.writeQuery({
                query: GET_USER_POSTED_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getUserPostedListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_RECENT_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getMostRecentListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_VISITED_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getMostVisitedListings: [] }
              })
              cache.writeQuery({
                query: GET_MOST_LIKED_LIST
              , variables: {"countryCode": setCountry.getCachedCountry.isoCode}
              , data: { getMostLikedListings: [] }
              })
              /*
              cache.writeQuery({
                query: GET_CACHED_TRANSLATIONS
              , variables: {"locusId": 1, "countryCode": setCountry.isoCode}
              , data: { getCachedLocus: null }
              })
              */
            }}
            refetchQueries = {({ data: { setCountry } }) => [
              {
                query: GET_LOCUS
              , fetchPolicy: 'network-only'
              , variables: {
                  "locusId": 1
                , "countryCode": setCountry.getCachedCountry.isoCode
                , "languageCodes": setCountry.getCachedCountry.languages.map( language => language.iso639_2 )
                }
              }
            ]}
          >
            {(setCountry, { data }) => {
              return (
                <CallCountryHandler countryHandler={() => this.countryHandler( {isoCode: this.state.countryCode, iso639_2: this.state.languageCode}, setCountry, false )}>
                  <Query
                    query = {GET_COUNTRY_LIST}
                    fetchPolicy = "cache-only"
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
