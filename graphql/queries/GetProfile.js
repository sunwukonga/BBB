import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_PROFILE
} from '../../graphql/Queries'

class GetProfile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Query
        query = {GET_PROFILE}
        fetchOptions = 'network-only'
      >
        {({ getProfile }) => {
          if ( getProfile ) {
            return this.props.children( getProfile )
          } else {
            return this.props.children()
          }
        }}
      </Query>
    )
  }
}

export default GetProfile
