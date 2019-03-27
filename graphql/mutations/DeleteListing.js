import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import {
  DELETE_LISTING
} from '../../graphql/Mutations'
import {
  GET_MOST_RECENT_LIST
, GET_MOST_VISITED_LIST
, GET_MOST_LIKED_LIST
, GET_USER_VISITED_LIST
, GET_USER_LIKED_LIST
, GET_USER_POSTED_LIST
} from '../Queries'
//import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'
import { Locations } from '../../constants/';

const NA_resetHomeDrawer = NavigationActions.navigate({ routeName: 'mainScreen' })
/*
const SA_resetHomeDrawer = StackActions.reset({
  index: 0
, actions: [
    NavigationActions.navigate({ routeName: 'mainScreen' })
  ]
})
*/
const SA_resetOwnListing = StackActions.reset({
  index: 1
, actions: [
    NavigationActions.navigate({ routeName: 'mainScreen' })
  , NavigationActions.navigate({
      routeName: 'mainScreen'
    , action: NavigationActions.navigate({ routeName: 'ownListingsScreen' })
    })
  ]
})

export const DeleteListing = compose(
  graphql(DELETE_LISTING)
, withApollo
, withNavigation
)(
  class extends Component {
    constructor(props) {
      super(props)
    }
/*
        options: {
          refetchQueries: [
            { query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode} }
          , { query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode} }
          ]
        },
*/
    //withApollo and this.props.client do not seem to be used anymore.
    render() {
      let { listingId, loginStatus, resetTo, client, navigation } = this.props
//      let optimisticResponse = optimisticCreateChat( item, currentUser )
// , optimisticResponse: optimisticResponse
      return this.props.children( () => this.props.mutate({
        variables: { listingId: listingId },
        update: (cache, { data: { deleteListing } }) => {
          if ( deleteListing ) {
            // ------------------- READING -------------------
            const { getUserVisitedListings } = cache.readQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            /*
            const { getUserPostedListings } = cache.readQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            */
            const { getMostVisitedListings } = cache.readQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getMostLikedListings } = cache.readQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getMostRecentListings } = cache.readQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            // ------------------- WRITING -------------------
            cache.writeQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserVisitedListings: JSON.parse(JSON.stringify( getUserVisitedListings.filter( listing => listing.id != listingId))) }
            })
            /*
            cache.writeQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserPostedListings: JSON.parse(JSON.stringify( getUserPostedListings.filter( listing => listing.id != listingId))) }
            })
            */
            cache.writeQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostVisitedListings: JSON.parse(JSON.stringify( getMostVisitedListings.filter( listing => listing.id != listingId))) }
            })
            cache.writeQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostLikedListings: JSON.parse(JSON.stringify( getMostLikedListings.filter( listing => listing.id != listingId))) }
            })
            cache.writeQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostRecentListings: JSON.parse(JSON.stringify( getMostRecentListings.filter( listing => listing.id != listingId )))}
            })
          } // END if
        }
      })
      .then( ({ data: { deleteListing }} ) => {
        if (deleteListing) {
          //client.queryManager.broadcastQueries()
          if (resetTo === Locations.Home) {
            navigation.dispatch(NA_resetHomeDrawer)
          } else {
            navigation.dispatch(SA_resetOwnListing)
          }
          //client.queryManager.refetchQueryByName(GET_MOST_RECENT_LIST)
        }
      }))
    }
  }
)
