import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_CACHED_COUNTRY
} from '../../graphql/Queries'

class GetCachedCountry extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {loginStatus} = this.props
    return (
      <Query
        query = {GET_CACHED_COUNTRY}
        variables = {{ isoCode: loginStatus.countryCode }}
        fetchOptions = 'cache-only'
      >
        {({ data }) => {
          if ( data ) {
            return this.props.children( data.getCachedCountry )
          } else {
            return this.props.children()
          }
        }}
      </Query>
    )
  }
}

export default GetCachedCountry
