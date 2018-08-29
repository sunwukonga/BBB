import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_LISTING
} from '../../graphql/Queries'

class GetCachedListing extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {listingId} = this.props
    return (
      <Query
        query = {GET_LISTING}
        variables = {{ id: listingId }}
        fetchOptions = 'cache-only'
      >
        {({ data }) => {
          if ( data ) {
            return this.props.children( data.getListing )
          } else {
            return this.props.children()
          }
        }}
      </Query>
    )
  }
}

export default GetCachedListing
