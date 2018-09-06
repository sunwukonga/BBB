import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  LIKE_LISTING
} from '../Mutations'
import {
  GET_MOST_RECENT_LIST
, GET_MOST_VISITED_LIST
, GET_MOST_LIKED_LIST
, GET_USER_VISITED_LIST
, GET_USER_LIKED_LIST
, GET_USER_POSTED_LIST
} from '../Queries'
//import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'

export default ToggleLike = graphql(
  LIKE_LISTING
/*, {
    options: (props) => ({
      variables: {
        width: props.size,
        height: props.size,
      },
    })
  } */
) (
  class extends Component {
    constructor(props) {
      super(props)
    }

   /*     data.updateQuery((previousResult) => ({
            ...previousResult,
            count: previousResult.count + 1,
          })); */

    updateUserLikedListings = (prevArray, newItem) => {
      if (newItem.liked) {
        return JSON.parse(JSON.stringify( prevArray.filter( item => item.id != newItem.id ) ))
      } else {
        let copiedItem = JSON.parse(JSON.stringify(newItem))
        copiedItem.liked = true
        copiedItem.likes = copiedItem.likes + 1
        let copyPrevArray = JSON.parse(JSON.stringify( prevArray.filter( item => item.id != newItem.id ) ))
        copyPrevArray.unshift( copiedItem )
        return copyPrevArray
      }
    }

    adjustListing = (oldListing, item) => {
      let copyOldListing = JSON.parse(JSON.stringify(oldListing))
      if (copyOldListing.id == item.id) {
        if (copyOldListing.liked) {
          copyOldListing.likes = copyOldListing.likes - 1
          copyOldListing.liked = false
        } else {
          copyOldListing.likes = copyOldListing.likes + 1
          copyOldListing.liked = true
        }
      }
      return copyOldListing
    }

    render() {
      let {item, loginStatus} = this.props

//      let optimisticResponse = optimisticCreateChat( item, currentUser )
// , optimisticResponse: optimisticResponse
  // TODO: variables below should be filled with the real country
  // No need for limit or page
      return this.props.children( (inputVariables) => this.props.mutate({
          variables: inputVariables,
          update: (cache, { data: { likeListing } }) => {
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
            const newUserLikedListings = this.updateUserLikedListings( getUserLikedListings, item )
            cache.writeQuery({
              query: GET_USER_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserLikedListings : newUserLikedListings }
            })
            cache.writeQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserVisitedListings: getUserVisitedListings.map( listing => this.adjustListing(listing, item) )}
            })
            cache.writeQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserPostedListings: getUserPostedListings.map( listing => this.adjustListing(listing, item) )}
            })
            cache.writeQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostRecentListings: getMostRecentListings.map( listing => this.adjustListing(listing, item) )}
            })
            cache.writeQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostVisitedListings: getMostVisitedListings.map( listing => this.adjustListing(listing, item) )}
            })
            cache.writeQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostLikedListings: getMostLikedListings.map( listing => this.adjustListing(listing, item) )}
            })
          }
        })
      )
    }
  }
)
