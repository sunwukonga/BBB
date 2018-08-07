import React from 'react';
import { Query, Mutation } from "react-apollo";
import {
  FlatList
, ActivityIndicator
} from 'react-native';
import {
  ListItem
, Text
} from 'react-native-elements'
import {
  Container
, Content
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
      <Mutation mutation={SET_COUNTRY}>
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
        fetchPolicy = "cache-and-network"
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
