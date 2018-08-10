import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
, ScrollView
, TextInput
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

  updateChatMessages = (oldChatList, newChat) => {
    console.log("OldChatList: ", oldChatList)
    console.log("NewChat: ", newChat)
    let oldChat = oldChatList.find( (oldChat, index) => {
      if (newChat.id == oldChat.id) {
        oldChat.spliceIndex = index
        oldChat.memo = ''
        return true
      }
    })
    if (oldChat) {
      console.log("OldChat: ", oldChat)
    }
    oldChat.chatMessages.push(newChat.chatMessages[0])
    oldChatList.splice(oldChat.spliceIndex, 1, oldChat)
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
          const updatedChats = this.updateChatMessages( getChatMessages, {id: chatId, chatMessages: [sendChatMessage]} )
          cache.writeQuery({
            query: GET_CHAT_MESSAGES,
            data: { getChatMessages : updatedChats }
          })
              /*text={this.state.message}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize="none"
              editable={true}
              maxLength = {100}
            <TouchableOpacity
              onPress = {sendChatMessage}
              disabled={this.state.message == ''}
              style={styles.postBtn}>
              <Ionicons
                name="md-send"
                size={Layout.moderateScale(30)}
                color={Colors.white}
              />
            </TouchableOpacity>
          <ScrollView scrollable={false}>
          </ScrollView>
               */
        }}
      >
        {(sendChatMessage, { data }) => (
          <View style={styles.footerStyle} >
            <Input
              value={this.state.message}
              keyboardType='default'
              style={styles.newPostStyle}
              onChangeText={ messageInput => this.setState({ message: messageInput })}
              onSubmitEditing = {sendChatMessage}
              returnKeyType="send"
            />
          </View>
        )}
      </Mutation>
    )
  }
}

export default SendMessageInput
