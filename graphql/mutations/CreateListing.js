import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  CREATE_LISTING
} from '../../graphql/Mutations'
import {
  GET_MOST_RECENT_LIST
, GET_USER_POSTED_LIST
} from '../Queries'

export const CreateListing = graphql(CREATE_LISTING) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    createListing( mutate, variables, loginStatus ) {

      let mutateOptions = {
        update: (cache, { data: { createListing } }) => {
          if ( createListing ) {
            // ------------------- READING -------------------
            tryRecentListings = () => {
              try {
                return cache.readQuery({
                  query: GET_MOST_RECENT_LIST
                , variables: {"countryCode": loginStatus.countryCode}
                })
              } catch (e) {
                console.log("CreateListing:Update:read:getMostRecentListings: ", e.message.substring(0, 200))
                return {}
              }
            }
            const { getMostRecentListings = [] } = tryRecentListings()
            tryUserPostedListings = () => {
              try {
                return cache.readQuery({
                  query: GET_USER_POSTED_LIST
                , variables: {"countryCode": loginStatus.countryCode}
                })
              } catch (e) {
                console.log("CreateListing:Update:read:getUserPostedListings: ", e.message.substring(0, 200))
                return {}
              }
            }
            const { getUserPostedListings = [] } = tryUserPostedListings()
            // ------------------- WRITING -------------------
            let updatedMostRecent = JSON.parse(JSON.stringify( getMostRecentListings ))
            updatedMostRecent.unshift(createListing)
            try {
              cache.writeQuery({
                query: GET_MOST_RECENT_LIST
              , variables: {"countryCode": loginStatus.countryCode}
              , data: { getMostRecentListings: updatedMostRecent }
              })
            } catch (e) {
              console.log("CreateListing:Update:write:getMostRecentListings: ", e.message.substring(0, 200))
            }
            let updatedUserPosted = JSON.parse(JSON.stringify( getUserPostedListings ))
            updatedUserPosted.unshift(createListing)
            try {
              cache.writeQuery({
                query: GET_USER_POSTED_LIST
              , variables: {"countryCode": loginStatus.countryCode}
              , data: { getUserPostedListings: updatedUserPosted }
              })
            } catch (e) {
              console.log("CreateListing:Update:write:getUserPostedListings: ", e.message.substring(0, 200))
            }
          }
        }
      }

      return mutate(Object.assign(mutateOptions, variables))
    }

    render() {
      return this.props.children( (variables, loginStatus) => this.createListing(this.props.mutate, variables, loginStatus ))
    }
  }
)
