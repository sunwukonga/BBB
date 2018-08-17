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
import { w } from '../../utils/helpers.js'


class ListUserLikedListings extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['item', 'liked']) !== w(nextProps, ['item', 'liked']) ) {
      return true
    }
    if ( w(this.props, ['item', 'chatId']) !== w(nextProps, ['item', 'chatId']) ) {
      return true
    }
    if ( w(this.props, ['loginStatus', 'loginStatus']) !== w(nextProps, ['loginStatus', 'loginStatus']) ) {
      return true
    }
    return false;
  }

  render() {
    let { variables, loginStatus, chatIndexes, currentUser } = this.props
    if (!loginStatus.loginStatus) {
      return null
    }
    return (
      <Query
        query = {GET_USER_LIKED_LIST}
        variables = {Object.assign(variables, { countryCode: loginStatus.countryCode })}
        fetchPolicy="network-only"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.getUserLikedListings || data.getUserLikedListings.length == 0) {
            return null
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
                   <PureListItem item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} currentUser={currentUser} />
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
                      console.log("PREV: ", prev)
                      if (!fetchMoreResult) return prev
                      if (!prev.getUserLikedListings) {
                        return {
                          getUserLikedListings: fetchMoreResult.getUserLikedListings
                        }
                      }
           //           console.log("*****************PREV: ", prev.getUserLikedListings)
            //          console.log("*****************POST: ", fetchMoreResult.getUserLikedListings)
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
