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
    let { loginStatus } = this.props

    if (!loginStatus.authorized) {
      return this.props.children()
    }
    return (
      <Query
        query = {GET_PROFILE}
        fetchOptions = 'cache-and-network'
      >
        {({data: {getProfile}}) => {
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
