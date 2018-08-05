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
  GET_USER_LIKED_LIST
} from '../../graphql/Queries'
import PureListItem from './PureListItem'


class ListUserLikedListings extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let variables = this.props.variables
    return (
      <Query
        query = {GET_USER_LIKED_LIST}
        variables = {variables}
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
                <Text style={styles.populerText}>
                  Your Liked Listings
                </Text>
              </View>
              <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => index.toString()}
                data = {data.getUserLikedListings || []}
                renderItem={({ item }) =>
                   <PureListItem item={item} />
                }
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      page: (data.getUserLikedListings.length / variables.limit >> 0) + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev
                      return {
                        getUserLikedListings:
                          prev.getUserLikedListings
                          .concat(fetchMoreResult.getUserLikedListings)
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

export default withNavigation(ListUserLikedListings)
