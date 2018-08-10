import React, { Component } from 'react';
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  GET_LOGIN_STATUS
} from '../../graphql/Queries'


//------------------------------------------------------------
//--UNUSED-------UNUSED--------UNUSED-----------UNUSED--------
//------------------------------------------------------------

// This component violates the principle of never updating state from within render.
class UpdateLoginState extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // Necessary to stop an infinite loop because of the call to setState in the render() below.
    return false;
  }
//        fetchPolicy="cache-only"
  render() {
    return (
      <Query
        query = {GET_LOGIN_STATUS}
        fetchOptions = 'cache-only'
      >
        {({ data, error }) => {
          console.log("GET_LOGIN_STATUS Ran")
          if (error) {
            return <View><Text>Error: {error.message}</Text></View>
          }
          if (data) {
            if (typeof(data.authorized) == typeof(true)) {
              this.props.setLoginState( data.authorized )
            }
          }
          return null
        }}
      </Query>
    )
  }
}

UpdateLoginState.propTypes = {
  setLoginState: PropTypes.func.isRequired,
}

export default UpdateLoginState
