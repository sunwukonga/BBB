import React, { Component } from 'react';
import {
  View
, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../../constants/';
import BBBIcon from '../../BBBIcon';
import { withNavigation, NavigationActions } from 'react-navigation'

const NA_HomeToLoginToChat = ( item, mutateCreateChat ) => NavigationActions.navigate({
  routeName: 'loginScreen'
, params: { dest: 'chatDetailsScreen'
          , item: item
          , mutateCreateChat: mutateCreateChat
          }
})

class ChatButton extends Component {
  constructor(props) {
    super(props);
  }

  navOrCreate( mutateCreateChat, item, loginStatus, chatIndexes ) {
    if ( loginStatus.loginStatus ) {
      if ( item.chatId ) {
        // chat already exists
        this.props.navigation.navigate('chatDetailScreen', {
          chatId: item.chatId
        , chatIndexes: chatIndexes
        })
      } else {
        // Create a new Chat
        mutateCreateChat()
        .then( ({ data: { createChat }}) => {
          this.props.navigation.navigate('chatDetailScreen', {
            chatId: createChat.id
          , chatIndexes: chatIndexes
          })
        })
      }
    } else {
      this.props.navigation.dispatch(NA_HomeToLoginToChat( item, mutateCreateChat ))
    }
  }

  render() {
    const {item, loginStatus, chatIndexes, currentUser} = this.props


    if (loginStatus.userId == item.user.id) {
      // Cannot chat with yourself. Button should not exist.
      return null
    } else {
      return (
        <CreateChat item={item} currentUser={currentUser}>{ mutateCreateChat  => (
          <TouchableOpacity
            style={styles.chatIconSec}
            onPress={ () => this.navOrCreate( mutateCreateChat, item, loginStatus, chatIndexes ) }
          >
            <View >
              <BBBIcon
                name="Chat"
                size={Layout.moderateScale(18)}
                color={item.chatId!==null ? Colors.tintColor : Colors.white}
                style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
              />
            </View>
          </TouchableOpacity>
        )}</CreateChat>
      )
    }
  }
}

export default withNavigation(ChatButton)
