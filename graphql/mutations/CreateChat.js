import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  CREATE_CHAT
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

export const CreateChat = graphql(CREATE_CHAT) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    adjustListing = (listing, chat) => {
      let copyListing = JSON.parse(JSON.stringify( listing ))
      if (copyListing.id == chat.listing.id) {
        copyListing.chatId = chat.id
      }
      return copyListing
    }

    render() {
      let {item, loginStatus } = this.props

//      let optimisticResponse = optimisticCreateChat( item, currentUser )
// , optimisticResponse: optimisticResponse
      return this.props.children( () => this.props.mutate({
        variables: { listingId: item.id },
        update: (cache, { data: { createChat } }) => {
          // ------------------- READING -------------------
          console.log("CreateChat: ", createChat)
          const { getChatMessages } = cache.readQuery({
            query: GET_CHAT_MESSAGES
          })
          console.log("getChatMessages: ", getChatMessages)
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
          let copiedChatMessages = JSON.parse(JSON.stringify( getChatMessages ))
          copiedChatMessages.push( JSON.parse(JSON.stringify( createChat )))
          cache.writeQuery({
            query: GET_CHAT_MESSAGES
          , data: { getChatMessages: copiedChatMessages }
          })
          cache.writeQuery({
            query: GET_USER_LIKED_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getUserLikedListings: getUserLikedListings.map( listing => this.adjustListing(listing, createChat) )}
          })
          cache.writeQuery({
            query: GET_USER_VISITED_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getUserVisitedListings: getUserVisitedListings.map( listing => this.adjustListing(listing, createChat) )}
          })
          cache.writeQuery({
            query: GET_USER_POSTED_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getUserPostedListings: getUserPostedListings.map( listing => this.adjustListing(listing, createChat) )}
          })
          cache.writeQuery({
            query: GET_MOST_RECENT_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getMostRecentListings: getMostRecentListings.map( listing => this.adjustListing(listing, createChat) )}
          })
          cache.writeQuery({
            query: GET_MOST_VISITED_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getMostVisitedListings: getMostVisitedListings.map( listing => this.adjustListing(listing, createChat) )}
          })
          cache.writeQuery({
            query: GET_MOST_LIKED_LIST
          , variables: {"countryCode": loginStatus.countryCode}
          , data: { getMostLikedListings: getMostLikedListings.map( listing => this.adjustListing(listing, createChat) )}
          })
        }
      }))
    }
  }
)
