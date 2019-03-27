import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
, TextInput
, Keyboard
} from 'react-native';
/*
import {
  Input,
} from 'native-base';
*/
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import { Ionicons } from '@expo/vector-icons';
import { w } from '../../utils/helpers.js'

import {
  SEND_MESSAGE
} from '../../graphql/Mutations'
import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'


class SendMessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { chatId, lastMessageId } = this.props.variables
    if ( w(this.props, ['variables', 'chatId']) !== w(nextProps, ['variables', 'chatId']) ) {
      return true
    }
    if ( w(this.props, ['variables', 'lastMessageId']) !== w(nextProps, ['variables', 'lastMessageId']) ) {
      return true
    }
    if ( w(this.state, ['message']) !== w(nextState, ['message']) ) {
      return true
    }
    return false;
  }

              /*text={this.state.message}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize="none"
              editable={true}
              maxLength = {100}
          <ScrollView scrollable={false}>
          </ScrollView>
               */

  updateChatMessages = (oldChatList, newChat) => {
    let spliceIndex
    let oldChat = oldChatList.find( (oldChat, index) => {
      if (oldChat) {
        if (newChat.id == oldChat.id) {
          spliceIndex = index
          //oldChat.memo = ''
          return true
        } else return false
      } else return false
    })
    if (oldChat) {
      let deepMessageCopies = newChat.chatMessages.map( chatMessage => {
        let shallowCopy = Object.assign( Object.assign({}, oldChat.chatMessages[0], chatMessage))
        if (chatMessage.image) {
          if (oldChat.chatMessages[0].image) {
            shallowCopy.image = Object.assign({}, oldChat.chatMessages[0].image, chatMessage.image)
          } else {
            // There might be missing values I cannot see here @@id for instance.
            shallowCopy.image = Object.assign(chatMessage.image, {"__typename": "Image"})
          }
        } else {
          shallowCopy.image = null
        }
        return shallowCopy
      })
      let deepOldMessagesCopy = JSON.parse(JSON.stringify( oldChat.chatMessages ))
      plusNewMessages = deepOldMessagesCopy.concat(deepMessageCopies)
      oldChat.chatMessages = plusNewMessages
      oldChatList.splice(spliceIndex, 1, oldChat)
    }
    return oldChatList
  }
/*
        update={(cache, { data: { sendChatMessage } }) => {
          let { getChatMessages } = cache.readQuery({
            query: GET_CHAT_MESSAGES
          })
          let updatedChats = this.updateChatMessages( getChatMessages, {id: chatId, chatMessages: sendChatMessage} )
          cache.writeQuery({
            query: GET_CHAT_MESSAGES,
            data: { getChatMessages : updatedChats }
          })
        }}
        */
  render() {
    let { chatId, lastMessageId } = this.props.variables
    return (
      <Mutation
        mutation={SEND_MESSAGE}
        variables={{ chatId: chatId, message: this.state.message, lastMessageId: lastMessageId }}
        refetchQueries={[{query: GET_CHAT_MESSAGES}]}
      >
        {(sendChatMessage, { data }) => (
          <View style={styles.footerStyle} >
            <TextInput
              value={this.state.message}
              keyboardType='default'
              style={styles.newPostStyle}
              onChangeText={ messageInput => { this.setState({ message: messageInput }) }}
              onSubmitEditing = { () => {
                //console.log("onSubmitEditing")
                if (this.state.message != '') {
                  sendChatMessage()
                  this.setState({ message: ''})
                }
              }}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress = { () => {
                sendChatMessage()
                this.setState({ message: ''})
                Keyboard.dismiss()
              }}
              disabled={this.state.message == ''}
              style={styles.postBtn}>
              <Ionicons
                name="md-send"
                size={Layout.moderateScale(30)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}

export default SendMessageInput
