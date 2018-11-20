import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'
import { w } from '../../utils/helpers.js'

class GetChatMessages extends Component {

  hasDifferentChatIndexes = (nextProps) => {
    if ( w(this.props, ['chatIndexes', 'length']) != w(nextProps, ['chatIndexes', 'length']) ) {
      return true
    }
    if ( w(this.props, ['chatIndexes', 'length']) > 0 ) {
      // self document by abstracting out anon function below into named function
      let differentElement = this.props.chatIndexes.find( (chatIndex, index) => {
        if (chatIndex.chatId != w(nextProps.chatIndexes, [index, 'chatId'])) {
          return true
        } else if (chatIndex.lastMessageId != w(nextProps.chatIndexes, [index, 'lastMessageId'])) {
          return true
        } else return false
      })
      if (differentElement) {
        return true
      } else { return false }
    }
  }

/*
  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['pollInterval']) !== w(nextProps, ['pollInterval']) ) {
      return true
    }
    if ( this.hasDifferentChatIndexes( nextProps ) ) {
      return true
    }
    if ( w(this.props, ['renderControl']) != w(nextProps, ['renderControl']) ) {
      return true
    }
    return false;
  }
*/

  render() {
    let { chatIndexes, pollInterval, skip = false } = this.props
    if (pollInterval) {
      return (
        <Query
          query = {GET_CHAT_MESSAGES}
          skip={skip}
          variables = {{chatIndexes: chatIndexes}}
          fetchPolicy = "network-and-cache"
          pollInterval={pollInterval}
        >
          { data => this.props.children( data ) }
        </Query>
      )
    } else {
      return (
        <Query
          query = {GET_CHAT_MESSAGES}
          variables = {{chatIndexes: chatIndexes}}
          fetchPolicy = "network-and-cache"
        >
          { data => this.props.children( data ) }
        </Query>
      )
    }
  }
}

export default GetChatMessages
