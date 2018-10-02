import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
, ScrollView
, TextInput
, Keyboard
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Input,
} from 'native-base';
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import BBBIcon from '../../components/BBBIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  render() {
    let { chatId, lastMessageId } = this.props.variables
    return (
      <Mutation
        mutation={SEND_MESSAGE}
        variables= {{ chatId: chatId, message: this.state.message, lastMessageId: lastMessageId }}
        update={(cache, { data: { sendChatMessage } }) => {
          const { getChatMessages } = cache.readQuery({
            query: GET_CHAT_MESSAGES
          })
          const updatedChats = this.updateChatMessages( getChatMessages, {id: chatId, chatMessages: sendChatMessage} )
          cache.writeQuery({
            query: GET_CHAT_MESSAGES,
            data: { getChatMessages : updatedChats }
          })
        }}
      >
        {(sendChatMessage, { data }) => (
          <View style={styles.footerStyle} >
            <Input
              value={this.state.message}
              keyboardType='default'
              style={styles.newPostStyle}
              onChangeText={ messageInput => this.setState({ message: messageInput })}
              onSubmitEditing = { () => {
                this.setState({ message: ''})
                sendChatMessage()
              }}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress = { () => {
                this.setState({ message: ''})
                Keyboard.dismiss()
                sendChatMessage()
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
