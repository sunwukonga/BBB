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
import { w } from '../../utils/helpers.js'


class ListUserPostedListings extends Component {
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
    if (!loginStatus.loginStatus) {
      return null
    }
    return (
      <Query
        query = {GET_USER_POSTED_LIST}
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
                onEndReached={() => {
                  if ( data.getUserPostedListings.length % variables.limit == 0 ) {
                    let nextPage = (data.getUserPostedListings.length / variables.limit >> 0) + 1
                    if ( this.lastFetchedPage < nextPage ) {
                      return fetchMore({
                        variables: Object.assign({}, variables, { page: nextPage }),
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.lastFetchedPage++
                          if (!fetchMoreResult) return prev
                          if (!prev) {
                            prev = {}
                          }
                          if (!prev.getUserPostedListings) {
                            prev.getUserPostedListings = []
                          }
                          return {
                            getUserPostedListings:
                              fetchMoreResult.getUserPostedListings.reduce( (acc, cur) => {
                                if ( listing = acc.find( listing => cur.id == listing.id ) ) {
                                  listing.chatId = cur.chatId
                                  listing.likes = cur.likes
                                  listing.liked = cur.liked
                                  return acc
                                } else {
                                  acc.push(cur)
                                  return acc
                                }
                              }, JSON.parse(JSON.stringify(prev.getUserPostedListings)))
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

export default withNavigation(ListUserPostedListings)
