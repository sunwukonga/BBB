import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_LOGIN_STATUS
} from '../../graphql/Queries'

class LoginStatus extends Component {
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
            return this.props.children({loginStatus: data.authorized, countryCode: data.countryCode, myProfile: data.myProfile})
        }}
      </Query>
    )
  }
}

export default LoginStatus
/*
// I don't need while checking for Children.only
LoginStatus.propTypes = {
  children: PropTypes.func.isRequired,
}
// Don't need for now, I want this function as streamlined as possible. 
          if (typeof children === 'function') {
            return this.props.children({loginStatus: data.authorized, countryCode: data.countryCode})
          } else {
            return (<Text> HI </Text>)
          }
*/
