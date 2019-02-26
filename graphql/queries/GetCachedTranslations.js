import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_CACHED_TRANSLATIONS
} from '../Queries'
import { w } from '../../utils/helpers.js'

class GetCachedTranslations extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {loginStatus} = this.props
    return (
      <Query
        query = {GET_CACHED_TRANSLATIONS}
        variables = {{ locusId: 1, countryCode: loginStatus.countryCode }}
        skip = { !loginStatus }
        fetchPolicy = 'cache-only'
      >
        {({ data }) => {
          if ( w(data, ['getCachedLocus']) ) {
            return this.props.children( data.getCachedLocus )
          } else {
            //return this.props.children()
            return null
          }
        }}
      </Query>
    )
  }
}

export default GetCachedTranslations
