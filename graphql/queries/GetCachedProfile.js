import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_LOGIN_STATUS
} from '../../graphql/Queries'

class GetCachedProfile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Query
        query = {GET_LOGIN_STATUS}
        fetchOptions = 'cache-only'
      >
        {({ data }) => {
          if ( data ) {
            return this.props.children( data.myProfile )
          } else {
            return this.props.children()
          }
        }}
      </Query>
    )
  }
}

export default GetCachedProfile
