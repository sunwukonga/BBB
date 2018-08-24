import React from 'react';
import { Query, Mutation } from "react-apollo";
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
} from '../../graphql/Queries'
import {
  SET_COUNTRY
} from '../../graphql/Mutations'

// Navigation Actions
const SA_CountryToHome = StackActions.reset({
    index: 0
  , actions: [NavigationActions.navigate({
      routeName: 'mainScreen'
    , action: NavigationActions.navigate({ routeName: 'homeScreen' })
  })]
})


export default class CountryScreen extends React.Component {
  constructor(props) {
    super(props)

    var mutationInFlight = false
  }

  renderItem = ({ item }) => {
    return (
      <Mutation
        mutation = { SET_COUNTRY }
        update = {(cache, { data: { setCountry } }) => {
          cache.writeQuery({
            query: GET_USER_LIKED_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getUserLikedListings: [] }
          })
          cache.writeQuery({
            query: GET_USER_VISITED_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getUserVisitedListings: [] }
          })
          cache.writeQuery({
            query: GET_USER_POSTED_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getUserPostedListings: [] }
          })
          cache.writeQuery({
            query: GET_MOST_RECENT_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getMostRecentListings: [] }
          })
          cache.writeQuery({
            query: GET_MOST_VISITED_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getMostVisitedListings: [] }
          })
          cache.writeQuery({
            query: GET_MOST_LIKED_LIST
          , variables: {"countryCode": item.isoCode}
          , data: { getMostLikedListings: [] }
          })
        }}
      >
        {(setCountry, { data }) => (
          <ListItem
            onPress={() => {
              if (!this.mutationInFlight) {
                this.mutationInFlight = true
                setCountry({ variables: { countryCode: item.isoCode }})
                this.props.navigation.dispatch(SA_CountryToHome)
              }
            }}
            leftIcon = {<Flag code={item.isoCode} style={styles.flagStyle} />}
            title = {<Text style={styles.countryNameTxt}>{item.name}</Text>}
            containerStyle={styles.center}
            hideChevron = {true}
          />
        )}
      </Mutation>
    )
  }

  render() {
    return (
      <Query
        query = {GET_COUNTRY_LIST}
        fetchPolicy = "network-only"
      >
        {({ data, networkStatus, error }) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          return (
            <Container style={styles.container}>
              <BBBHeader title="Select Your Country" />
              <Content>
                <FlatList
                  data = {data.allCountries || []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                />
              </Content>
            </Container>
          )
        }}
      </Query>
    )
  }
}
