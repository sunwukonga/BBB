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
  GET_MOST_RECENT_LIST
} from '../../graphql/Queries'
import PureListItem from './PureListItem'


class ListRecentListings extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let inputVariables = this.props.variables
    let { countryCode } = this.props.loginStatus
    return (
      <Query
        query = {GET_MOST_RECENT_LIST}
        variables = {Object.assign(inputVariables, { countryCode: countryCode })}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          return (
            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>Most Recent Items</Text>
              </View>
              <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => index.toString()}
                data = {data.getMostRecentListings || []}
                renderItem={({ item }) =>
                   <PureListItem item={item} loginStatus={this.props.loginStatus} />
                }
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      page: (data.getMostRecentListings.length / variables.limit >> 0) + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      console.log("*****************************updateQuery called")
                      if (!fetchMoreResult) return prev
                      if (!prev) {
                        prev = {}
                      }
                      if (!prev.getMostRecentListings) {
                        prev.getMostRecentListings = []
                      }
                      return { 
                        getMostRecentListings:
                          prev.getMostRecentListings
                          .concat(fetchMoreResult.getMostRecentListings)
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

export default withNavigation(ListRecentListings)
