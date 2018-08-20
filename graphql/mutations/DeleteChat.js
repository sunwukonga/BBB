import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  DELETE_CHAT
} from '../../graphql/Mutations'
import {
  GET_MOST_RECENT_LIST
, GET_MOST_VISITED_LIST
, GET_MOST_LIKED_LIST
, GET_USER_VISITED_LIST
, GET_USER_LIKED_LIST
, GET_USER_POSTED_LIST
, GET_CHAT_MESSAGES
} from '../Queries'
//import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'

export default DeleteChat = graphql(DELETE_CHAT) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    adjustListing = (listing, chat) => {
      if (listing.id == chat.listing.id) {
        listing.chatId = -1
      }
      return listing
    }

    render() {
      let { chat, loginStatus } = this.props

//      let optimisticResponse = optimisticCreateChat( item, currentUser )
// , optimisticResponse: optimisticResponse
      return this.props.children( () => this.props.mutate({
        variables: { chatId: chat.id },
        update: (cache, { data: { deleteChat } }) => {
          console.log("deleteChat: ", deleteChat)
          if ( deleteChat ) {
            // ------------------- READING -------------------
            const { getChatMessages } = cache.readQuery({
              query: GET_CHAT_MESSAGES
            })
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
              query: GET_CHAT_MESSAGES,
              data: { getChatMessages : getChatMessages.filter( mapChat => {
                console.log("chats: ", mapChat.id, ", ", chat.id)
                return mapChat.id != chat.id
              }
              )  }
            })
            cache.writeQuery({
              query: GET_USER_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserLikedListings: getUserLikedListings.map( listing => this.adjustListing(listing, chat) )}
            })
            cache.writeQuery({
              query: GET_USER_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserVisitedListings: getUserVisitedListings.map( listing => this.adjustListing(listing, chat) )}
            })
            cache.writeQuery({
              query: GET_USER_POSTED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getUserPostedListings: getUserPostedListings.map( listing => this.adjustListing(listing, chat) )}
            })
            cache.writeQuery({
              query: GET_MOST_RECENT_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostRecentListings: getMostRecentListings.map( listing => this.adjustListing(listing, chat) )}
            })
            cache.writeQuery({
              query: GET_MOST_VISITED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostVisitedListings: getMostVisitedListings.map( listing => this.adjustListing(listing, chat) )}
            })
            cache.writeQuery({
              query: GET_MOST_LIKED_LIST
            , variables: {"countryCode": loginStatus.countryCode}
            , data: { getMostLikedListings: getMostLikedListings.map( listing => this.adjustListing(listing, chat) )}
            })
          } // END if
        }
      }))
    }
  }
)
