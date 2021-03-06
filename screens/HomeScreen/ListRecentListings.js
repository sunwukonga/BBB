import React, { Component } from 'react';
import { Query, graphql } from "react-apollo";
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
import {
  UNSET_AUTH_STATUS
} from '../../graphql/Mutations'
import PureListItem from './PureListItem'
import { w, i18n } from '../../utils/helpers.js'
import { Locations } from "../../constants/"

const ListRecentListings = graphql(UNSET_AUTH_STATUS, {name: "unsetAuthStatus"}) (
  class extends Component {
    constructor(props) {
      super(props);

      this.lastFetchedPage = 1
    }

    shouldComponentUpdate(nextProps, nextState) {
      if ( w(this.props, ['loginStatus', 'authorized']) !== w(nextProps, ['loginStatus', 'authorized']) ) {
        return true
      }
      return false;
    }

    render() {
      let { variables, loginStatus, chatIndexes, createNew, translations } = this.props
      const parentName = "HomeScreen"
      return (
        <Query
          query = {GET_MOST_RECENT_LIST}
          variables = {Object.assign(variables, { countryCode: loginStatus.countryCode })}
          errorPolicy="all"
          fetchPolicy="network-only"
        >
          {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
            // https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts
            // https://github.com/apollographql/apollo-client/issues/3660
            // https://github.com/apollographql/react-apollo/issues/1217
            let dataPointer = w(data, ['getMostRecentListings'])
            if (networkStatus === 1) {
              return <ActivityIndicator size="large" />;
            }
            if (error) {
              let regex = /Invalid Token/g
              let matches = error.message.match(regex)
              if (matches && matches.length > 0 ) {
                // Invalid Token -- Possibly caused by credentials from secureStore.
                this.props.unsetAuthStatus()
              }
              return <Text>{error.message}</Text>;
              /*
                    return (
            <Text>Bad: {error.graphQLErrors.map(({ message }, i) => (
              <Text>{message}</Text>
            ))}
            </Text>
        )
            */
              //Unknown Content-Type from origin
            }
            if (!dataPointer || dataPointer.length == 0) {
              dataPointer = [{emptyList: true}]
            }
                  //onRefresh={() => refetch()}
            return (
              <View style={styles.imagesMainView}>
                <View style={styles.populerSec}>
                  <Text style={styles.populerText}>{i18n(translations, parentName, "MostRecent", loginStatus.iso639_2, "Most Recent Items")}</Text>
                </View>
                <FlatList
                  horizontal = {true}
                  contentContainerStyle={styles.listContent}
                  keyExtractor={(item, index) => "MostRecent-" + item.id}
                  data = {dataPointer}
                  renderItem={({ item }) => {
                    return <PureListItem item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} resetTo={Locations.Home} createNew={createNew} translations={translations} />
                  }}
                  onEndReachedThreshold={0.5}
                  refreshing={networkStatus === 4 || networkStatus === 3}
                  onEndReached={() => {
                    if ( dataPointer.length % variables.limit == 0 ) {
                      let nextPage = (dataPointer.length / variables.limit >> 0) + 1
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
)

export default withNavigation(ListRecentListings)
