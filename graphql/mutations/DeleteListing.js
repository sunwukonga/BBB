import React, { Component } from 'react'
import { graphql } from 'react-apollo'
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

export default DeleteListing = graphql(DELETE_LISTING) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      let { listingId, loginStatus } = this.props

//      let optimisticResponse = optimisticCreateChat( item, currentUser )
// , optimisticResponse: optimisticResponse
      return this.props.children( () => this.props.mutate({
        variables: { listingId: listingId },
        update: (cache, { data: { deleteListing } }) => {
          console.log("deleteListing: ", deleteListing)
          if ( deleteListing ) {
            // ------------------- READING -------------------
            const { getUserLikedListings } = cache.readQuery({
              query: GET_USER_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getUserVisitedListings } = cache.readQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getUserPostedListings } = cache.readQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getMostRecentListings } = cache.readQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getMostVisitedListings } = cache.readQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            const { getMostLikedListings } = cache.readQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            })
            // ------------------- WRITING -------------------
            cache.writeQuery({
              query: GET_USER_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserLikedListings: getUserLikedListings.filter( listing => listing.id != listingId) }
            })
            cache.writeQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserVisitedListings: getUserVisitedListings.filter( listing => listing.id != listingId) }
            })
            cache.writeQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserPostedListings: getUserPostedListings.filter( listing => listing.id != listingId) }
            })
            cache.writeQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostRecentListings: getMostRecentListings.filter( listing => listing.id != listingId) }
            })
            cache.writeQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostVisitedListings: getMostVisitedListings.filter( listing => listing.id != listingId) }
            })
            cache.writeQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostLikedListings: getMostLikedListings.filter( listing => listing.id != listingId) }
            })
          } // END if
        }
      }))
    }
  }
)
