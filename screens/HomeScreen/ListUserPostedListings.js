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
  GET_USER_POSTED_LIST
} from '../../graphql/Queries'
import PureListItem from './PureListItem'


class ListUserPostedListings extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { variables, loginStatus, chatIndexes, currentUser } = this.props
    if (!loginStatus.loginStatus) {
      return null
    }
    return (
      <Query
        query = {GET_USER_POSTED_LIST}
        variables = {Object.assign(variables, { countryCode: loginStatus.countryCode })}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.getUserPostedListings || data.getUserPostedListings.length == 0) {
            return null
          }
          return (
            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>
                  Your Listed Items
                </Text>
              </View>
              <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => index.toString()}
                data = {data.getUserPostedListings || []}
                renderItem={({ item }) =>
                   <PureListItem item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} currentUser={currentUser} />
                }
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      page: (data.getUserPostedListings.length / variables.limit >> 0) + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev
                      console.log("Prev: ", prev)
                      if (!prev) {
                        prev = {}
                      }
                      if (!prev.getUserPostedListings) {
                        prev.getUserPostedListings = []
                      }
                      return {
                        getUserPostedListings:
                          prev.getUserPostedListings
                          .concat(fetchMoreResult.getUserPostedListings)
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

export default withNavigation(ListUserPostedListings)
