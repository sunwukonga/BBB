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
import { w } from '../../utils/helpers.js'


class ListRecentListings extends Component {
  constructor(props) {
    super(props);

    this.lastFetchedPage = 1
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['loginStatus', 'loginStatus']) !== w(nextProps, ['loginStatus', 'loginStatus']) ) {
      return true
    }
    return false;
  }

  render() {
    let { variables, loginStatus, chatIndexes, currentUser } = this.props
    console.log("LISTRECENT Render")
    return (
      <Query
        query = {GET_MOST_RECENT_LIST}
        variables = {Object.assign(variables, { countryCode: loginStatus.countryCode })}
        fetchPolicy="network-only"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          // https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts
          // https://github.com/apollographql/apollo-client/issues/3660
          // https://github.com/apollographql/react-apollo/issues/1217
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
                renderItem={({ item }) => {
                  console.log('LRL: ', item.id)
                  return <PureListItem item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} currentUser={currentUser} />
                }}
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onRefresh={() => refetch()}
                onEndReached={() => {
                  if ( data.getMostRecentListings.length % variables.limit == 0 ) {
                    let nextPage = (data.getMostRecentListings.length / variables.limit >> 0) + 1
                    if ( this.lastFetchedPage < nextPage ) {
                      return fetchMore({
                        variables: Object.assign({}, variables, { page: nextPage }),
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.lastFetchedPage++
                          if (!fetchMoreResult) return prev
                          if (!prev) {
                            prev = {}
                          }
                          if (!prev.getMostRecentListings) {
                            prev.getMostRecentListings = []
                          }
                          return {
                            getMostRecentListings:
                              fetchMoreResult.getMostRecentListings.reduce( (acc, cur) => {
                                if ( listing = acc.find( listing => cur.id == listing.id ) ) {
                                  // Because `listing` is an object, it is passed by reference.
                                  // Changing it below, changes the original.
                                  listing.chatId = cur.chatId
                                  listing.likes = cur.likes
                                  listing.liked = cur.liked
                                  return acc
                                } else {
                                  acc.push(cur)
                                  return acc
                                }
                              }, JSON.parse(JSON.stringify(prev.getMostRecentListings)))
                          }
                        }
                      })
                    }
                  }
                }}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListRecentListings)
