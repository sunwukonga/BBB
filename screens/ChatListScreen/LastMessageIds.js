import React, { Component, Children } from 'react';
import { Query } from "react-apollo";
import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'

class LastMessageIds extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { loginStatus } = this.props
    if (!loginStatus.loginStatus) {
      return this.props.children()
    }
    return (
      <Query
        query = {GET_CHAT_MESSAGES}
        fetchOptions = 'cache-only'
      >
        {({ getChatMessages }) => {
          if ( getChatMessages ) {
            let chatIndexes = getChatMessages.map( chat => {
              let latestMsg = chat.chatMessages.reduce( (accMsg, curMsg) => (accMsg.id >= curMsg.id) ? accMsg.id : curMsg.id )
              return { chatId: chat.id, lastMessageId: highestMsg.id }
            })
            return this.props.children( chatIndexes )
          } else {
            return this.props.children()
          }
        }}
      </Query>
    )
  }
}

export default LastMessageIds
