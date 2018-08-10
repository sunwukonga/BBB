import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, View
, Text
, ActivityIndicator
} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation'

import {
  GET_USER_VISITED_LIST
} from '../../graphql/Queries'
import PureListItem from './PureListItem'


class ListUserVisitedListings extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let inputVariables = this.props.variables
    let { loginStatus, countryCode } = this.props.loginStatus
    if (!loginStatus) {
      return null
    }
    return (
      <Query
        query = {GET_USER_VISITED_LIST}
        variables = {Object.assign(inputVariables, { countryCode: countryCode})}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables }) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.getUserVisitedListings || data.getUserVisitedListings.length == 0) {
            return null
          }
          return (
            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>
                  Your Visited Items
                </Text>
              </View>
              <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => index.toString()}
                data = {data.getUserVisitedListings || []}
                renderItem={({ item }) =>
                   <PureListItem item={item} />
                }
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      page: (data.getUserVisitedListings.length / variables.limit >> 0) + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev
                      return {
                        getUserVisitedListings:
                          prev.getUserVisitedListings
                          .concat(fetchMoreResult.getUserVisitedListings)
                          .filter( (item, index, items) => {
                            return !index || item.id != items[index - 1].id
                          })
                      }
                    }
                  })
                }
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListUserVisitedListings)
