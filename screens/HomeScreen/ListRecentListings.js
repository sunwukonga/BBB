import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  FlatList
, ActivityIndicator
} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation'

import PureListItem from './PureListItem'

// TESTING Incremental Loading with fetchMore
const GET_MOST_RECENT_LIST = gql`
query getMostRecentLists($countryCode:String!,$limit:Int,$page:Int){
  getMostRecentListings(countryCode:$countryCode,limit:$limit,page:$page){

    id
    title
    description
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
      }
      secondaryImages {
        id
      }
      tags{
        name
      }
    }

    tags{
      name
    }

    viewers
    likes
    liked
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`;

class ListRecentListings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let variables = this.props.variables
    let renderFunc = this.props.renderFunc
    return (
      <Query
        query = {GET_MOST_RECENT_LIST}
        variables = {variables}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables }) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }

          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          console.log("networkStatus: ", networkStatus)
          console.log("error: ", error)
          console.log("variables: ", variables)
          console.log("New page: ", (data.getMostRecentListings.length / variables.limit >> 0) + 1)
          return (
            <FlatList
              horizontal = {true}
              contentContainerStyle={styles.listContent}
              //onEndReached={this.onEndReached.bind(this)}
              //onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              keyExtractor={(item, index) => index.toString()}
              //ListFooterComponent={this.renderFooter.bind(this)}

              data = {data.getMostRecentListings || []}
//              renderItem={renderFunc}
              renderItem={({ item }) =>
                 <PureListItem item={item} />
              }
             // renderItem={this._renderItem}
              onEndReachedThreshold={0.5}
              refreshing={networkStatus === 4}
              onRefresh={() => refetch()}
              onEndReached={() =>
                fetchMore({
                  variables: {
                  //  countryCode: variables.countryCode,
                  //  limit: variables.limit,
                    page: (data.getMostRecentListings.length / variables.limit >> 0) + 1
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
              //console.log("PREV: ", JSON.stringify(prev))
              //console.log("fetchMoreResult: ", JSON.stringify(fetchMoreResult))
                    console.log("*****************************updateQuery called")
                    if (!fetchMoreResult) return prev
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
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListRecentListings)
