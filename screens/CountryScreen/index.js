import React from 'react';
import { Query, Mutation, graphql, compose } from "react-apollo";
import {
  FlatList
, ActivityIndicator
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

// custom components
import BBBHeader from '../../components/BBBHeader/';

// screen style
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import Flag from 'react-native-round-flags';

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
} from '../../graphql/Mutations'

// Navigation Actions
const SA_CountryToHome = StackActions.reset({
    index: 0
  , actions: [NavigationActions.navigate({
      routeName: 'mainScreen'
    , action: NavigationActions.navigate({ routeName: 'homeScreen' })
  })]
})

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
  graphql(GET_NESTED_CATEGORY_LIST)
, graphql(SET_AUTH_STATUS)
)(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countryCode: null
      }
      this.mutationInFlight = false
      this.gettingCountryCode = false
    }

    componentWillMount(props) {
      if (! this.state.countryCode) {
        this.gettingCountryCode = true
        let countryCodePromise = Expo.SecureStore.getItemAsync("countryCode")
        Promise.all([countryCodePromise])
        .then( ([ countryCode ]) => {
          console.log("constructor.countryCode: ", countryCode)
          if (countryCode) {
            this.setState({
              countryCode: countryCode
            })
          }
          this.gettingCountryCode = false
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
                this.props.navigation.dispatch(SA_CountryToHome)
                this.mutationInFlight = false
              })
            } else {
              this.props.navigation.dispatch(SA_CountryToHome)
              this.mutationInFlight = false
            }
          })
        }
      }
    }

    renderItem = ({ item }, setCountry) => {
      console.log("renderItem.item.isoCode: ", item.isoCode)
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
      if ( this.gettingCountryCode ) {
        return null
      }
      return (
        <CallSetAuthStatus setAuthStatus={this.props.mutate} >
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
                        // TODO: Retry icon on error
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
