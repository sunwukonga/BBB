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
  GET_MOST_LIKED_LIST
} from '../../graphql/Queries'
import PureListItem from './PureListItem'
import { w, i18n } from '../../utils/helpers.js'
import { Locations } from "../../constants/"

class ListLikedListings extends Component {
  constructor(props) {
    super(props);

    this.lastFetchedPage = 1
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['item', 'liked']) !== w(nextProps, ['item', 'liked']) ) {
      return true
    }
    if ( w(this.props, ['item', 'chatId']) !== w(nextProps, ['item', 'chatId']) ) {
      return true
    }
    if ( w(this.props, ['loginStatus', 'authorized']) !== w(nextProps, ['loginStatus', 'authorized']) ) {
      return true
    }
    return false;
  }


  render() {
    let { variables, loginStatus, chatIndexes, translations } = this.props
    const parentName = "HomeScreen"
    return (
      <Query
        query = {GET_MOST_LIKED_LIST}
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
          if (!data.getMostLikedListings || data.getMostLikedListings.length == 0) {
            return null
          }
                //onRefresh={() => refetch()}
          return (
            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>
                  {i18n(translations, parentName, "MostLiked", loginStatus.iso639_2, "Most Liked Items")}
                </Text>
              </View>
              <FlatList
                horizontal = {true}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item, index) => "MostLiked-" + item.id}
                data = {data.getMostLikedListings || []}
                renderItem={({ item }) =>
                   <PureListItem item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} resetTo={Locations.Home} translations={translations} />
                }
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onEndReached={() => {
                  if ( data.getMostLikedListings.length % variables.limit == 0 ) {
                    let nextPage = (data.getMostLikedListings.length / variables.limit >> 0) + 1
                    if ( this.lastFetchedPage < nextPage ) {
                      return fetchMore({
                        variables: Object.assign({}, variables, { page: nextPage }),
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.lastFetchedPage++
                          if (!fetchMoreResult) return prev
                          if (!prev) {
                            console.log("ListLikedListings:Fetchmore:prev was undefined")
                            prev = {}
                          }
                          if (!prev.getMostLikedListings) {
                            console.log("ListLikedListings:Fetchmore:prev.getMostLikedListings was undefined")
                            prev.getMostLikedListings = []
                          }
                          return {
                            getMostLikedListings:
                              fetchMoreResult.getMostLikedListings.reduce( (acc, cur) => {
                                if ( listing = acc.find( listing => cur.id == listing.id ) ) {
                                  listing.chatId = cur.chatId
                                  listing.likes = cur.likes
                                  listing.liked = cur.liked
                                  return acc
                                } else {
                                  acc.push(cur)
                                  return acc
                                }
                              }, JSON.parse(JSON.stringify(prev.getMostLikedListings)))
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

export default withNavigation(ListLikedListings)
