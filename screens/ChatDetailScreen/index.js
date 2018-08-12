import React, { Component } from 'react';
import {
  Image
, Platform
, Text
, TouchableOpacity
, View
, KeyboardAvoidingView
, ScrollView
, Alert
, TouchableWithoutFeedback
, Keyboard
, ActivityIndicator
, InteractionManager
} from 'react-native';
import {
  Container
, Content
, Header
, Left
, Body
, Right
, Title
, Button
, Icon
, Input
} from 'native-base'
import { graphql, Query } from "react-apollo";
import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import Baby from '../../components/Baby';
import { updateChatMessages } from '../../utils/helpers.js'

// screen style
import styles from './styles';
import { Layout, Images, Colors } from '../../constants/';

import SendMessageInput from './SendMessageInput'
import getChatMessages from './GetChatMessages';
import sendChatMessage from './SendMessage';
//import createChat from './CreateChat';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';

var isFromChat=false;

export default class ChatScreen extends Component {

  constructor(props) {
    super(props);

    this.yOffset = null
    this.scrollEvent = null
    this.textInputHeight = Layout.HEIGHT * 0.08

    this.keyboardDidShow = this.keyboardDidShow.bind(this)
    this.keyboardDidHide = this.keyboardDidHide.bind(this)

    this.state = {
      keyboardPadding: Layout.HEIGHT * 0.08
    }
  }

  keyboardDidShow(e) {
    //this._scrollView.scrollTo({x:0, y: (this.textInputHeight + e.endCoordinates.height), animated: true})
    let newPaddingHeight = (Layout.HEIGHT * 0.08) + e.endCoordinates.height
    let newScrollOffset = this.yOffset - e.endCoordinates.height
    this.setState({ keyboardPadding: newPaddingHeight })
    //this._scrollView.scrollTo({x: 0, y: newScrollOffset, animated: true})
  }

  keyboardDidHide(e) {
    this.setState({ keyboardPadding: Layout.HEIGHT * 0.08 })
    this._scrollView.scrollToEnd({animated: true})
  }

  componentDidMount() {
    console.log("Layout.HEIGHT: ", Layout.HEIGHT)
    InteractionManager.runAfterInteractions(() => {
      this._scrollView.scrollToEnd({animated: true})
    })
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('didFocus-SendMessageInput')
        //this.scrollReporter = setInterval( () => console.log("Scroll.Event: ", this.scrollEvent), 4000)
      }
    )
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur'
    , payload => {
        console.log('didBlur-SendMessageInput')
        if ( this.keyboardDidHideLister ) {
          this.keyboardDidHideListener.remove()
        console.log('didBlur-SendMessageInput: removeHideListener')
        }
        if ( this.keyboardDidShowLister ) {
          this.keyboardDidShowListener.remove()
        console.log('didBlur-SendMessageInput: removeShowListener')
        }
      }

    )

    this.subs = [
      this.didFocusListener
    , this.didBlurListener
    , this.keyboardDidShowListener
    , this.keyboardDidHideListener
    ]
  }

  componentWillUnmount() {
    console.log('willUnmount')
    this.subs.forEach((sub, i) => {
      if (sub) {
        sub.remove();
      } else {
        console.log("The listener at: ", i, " did not exist.")
      }
    });
    //clearInterval(scrollReporter)
  }

  deleteSelectedMessage(msgId){
      Alert.alert("Delete:"+msgId)
  }

  deleteItem(item){
    var msgId=item.id;
     Alert.alert("Delete "+msgId);
  }

  onBack(){
      if(isFromChat){
        this.props.navigation.navigate('ChatListScreen')
      } else {
        this.props.navigation.navigate('homeScreen')
      }
  }

  // Get the other chat participants Image and ProfileName
  otherImageAndName( chat ) {
    let profileImage
    let profileName

    if ( chat && chat.listing && chat.listing.user && chat.listing.user.id != chat.userId ) {
      if ( chat.listing.user.profileImage && chat.listing.user.profileImage.imageKey ) {
        profileImage = <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/" + chat.listing.user.profileImage.imageKey }} style={styles.profileImage} />
      } else {
        profileImage = <Baby style={styles.profileImage} />
      }
      if ( chat.listing.user.profileName ) {
        profileName = <Title style={styles.headerTitle}>{chat.listing.user.profileName}</Title>
      } else {
        profileName = <Text>Nothing to show</Text>
      }
    } else if ( chat.initUser != chat.userId ) {
      if ( chat.initUser.profileImage && chat.initUser.profileImage.imageKey ) {
        profileImage = <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/" + chat.initUser.primaryImage.imageKey }} style={styles.profileImage} />
      } else {
        profileImage = <Baby style={styles.profileImage} />
      }
      if ( chat.initUser.profileName ) {
        profileName = <Title style={styles.headerTitle}>{chat.initUser.profileName}</Title>
      } else {
        profileName = <Text> Nothing to show </Text>
      }
    }
    return (
      <View style={styles.body}>
        <View>{ profileImage }</View>
        <View>{ profileName }</View>
      </View>
    )
  }

  formatTime( time ) {
    let T = new Date(time)
    let d = (new Date() - time)
    let D = (d - (d % 1000))/1000
    let optionHours = { hour: 'numeric', minute: '2-digit'}
    let optionDays = { weekday: "short", day: "numeric", month: "short", year: "numeric" } 
    // < 1 minute --> seconds
    if (D < 60) {
      return "[" + this.pluralize( D, "second", true)
    }
    // < 7 minutes --> minutes and seconds
    if (D < 420) {
      return "[" + this.pluralize((D - (D % 60))/60, "minute", false) + this.pluralize((D % 60), "second", true)
    }
    // < 1 hr --> minutes
    if (D < 420) {
      return "[" + this.pluralize((D - (D % 60))/60, "minute", true)
    }
    // < 3hrs --> hr + minutes
    if (D < 10800) {
      return "[" + this.pluralize((D - (D % 3600))/3600, "hour", false) + this.pluralize(((D % 3600) - (D % 60))/60, "minute", true)
    }
    // ---------Reverse Order----------------------------
    // > 1 month -> Time + (months + days OR weeks)
    if ( D >= 2681500 ) {
      return T.toLocaleDateString('en-US', optionDays) + " [~" + this.pluralize((D - (D % 2681500))/2681500, "month", false) + this.pluralize((D % 2681500 )/86500, "day", true)
    }
    // > 1 day -> Time + (days + hr)
    if ( D >= 86500 ) {
      return T.toLocaleDateString('en-US', optionDays) + " [" + this.pluralize((D - (D % 86500))/86500, "day", false) + this.pluralize(((D % 86500) - ((D % 86500) % 3600))/3600, "hour", true)
    }
    // > 3 hrs -> Time + (hr + minutes)
    if ( D >= 10800 ) {
      return T.toLocaleTimeString('en-US', optionHours) + " [" + this.pluralize((D - (D % 3600))/3600, "hour", false) + this.pluralize(((D % 3600) - (D % 60))/60, "minute", true)
    }
  }

  pluralize( number, nom, end ) {
    let singular = false
    let postscript = 's'
    let psEnd = ' '
    let preEnd = ''
    if (number < 2) {
      singular = true
    }
    if (singular) {
      postscript = ''
    }
    if (end) {
      psEnd = ' ago]' 
      preEnd = ' '
    }
    if (number == 0) {
      if (end) {
        return ']'
      } else {
        return ''
      }

    }
    return preEnd + number + " " + nom + postscript + psEnd
  }
      //<KeyboardAvoidingView behavior="padding" contentContainerStyle={{flex: 1, justifyContent: 'space-between' }}>
      //</KeyboardAvoidingView>
//------------------------------------------------------------------------------------------------
//---------------------------------------RENDER---------------------------------------------------
//------------------------------------------------------------------------------------------------
  render() {
    console.log("RENDER CHAT")
    //let { chat } = this.props.navigation.state.params
    var leftComponent = (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <BBBIcon
          name="BackArrow"
          size={Layout.moderateScale(18)}
          style={styles.backarrow}
        />
      </Button>
    )
    let { chatId } = this.props.navigation.state.params
    return (
      <LastMessageIds>{ chatIndexes => (
        <Query
          query = {GET_CHAT_MESSAGES}
          variables = {{ chatIndexes: chatIndexes }}
          fetchPolicy = "cache-and-network"
          update={(cache, { data: { getChatMessages } }) => {
            const data = cache.readQuery({
              query: GET_CHAT_MESSAGES
            })
            const updatedChats = updateChatMessages( data.getChatMessages, getChatMessages )
            cache.writeQuery({
              query: GET_CHAT_MESSAGES,
              data: { getChatMessages : updatedChats }
            })
          }}
        >
          {({ data, networkStatus, error }) => {
            if (networkStatus === 1) {
              return <ActivityIndicator size="large" />;
            }
            if (error) {
              return <Text>Error: {error.message}</Text>;
            }
            if (!data.getChatMessages || data.getChatMessages.length == 0) {
              return (
                <View style={styles.left}>
                  <Text style={[styles.title, styles.clearMarginTop]}>No love? Maybe you need more listings ;)</Text>
                </View>
              )
            }
            let chat = data.getChatMessages.find( chat => chat.id == chatId )
            return (
              <View style={{ flex: 1, height: Layout.HEIGHT }}>
                <BBBHeader
                  titleComponent={ this.otherImageAndName( chat ) }
                  leftComponent={leftComponent}
                />
                <View style={styles.notifyContainer}>
                  { (chat && chat.listing && chat.listing.primaryImage && chat.listing.primaryImage.imageKey)
                  ? <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/" + chat.listing.primaryImage.imageKey}} style={styles.notifyImage} />
                  : <Baby style={styles.profileImage} />
                  }
                  <Text style={styles.regularSmall}>
                    { (chat && chat.listing && chat.listing.title)
                    ? (chat.listing.title)
                    : null
                    }
                  </Text>
                </View>
              <View style={{ flex: 1 }}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  ref={component => this._scrollView = component}
                  onScroll={event => {
                    this.yOffset = event.nativeEvent.contentOffset.y
                    this.scrollEvent = event.nativeEvent
                  }}
                  onScrollEndDrag={event => {
                    this.yOffset = event.nativeEvent.contentOffset.y
                    this.scrollEvent = event.nativeEvent
                  }}
                  scrollEventThrottle={160}
                >
                  <View style={styles.contentStyle}>
                    {chat.chatMessages.map((chatMessage, index) => {
                      return (
                        <View key={index} style={(chatMessage.authorId == chat.userId) ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}}>
                          <TouchableOpacity key={index} onLongPress={()=> this.deleteItem(chatMessage)}>
                            <View
                              key={index}
                              style={[{marginHorizontal: Layout.moderateScale(10)}, styles.chat ]}>
                              {chatMessage.authorId == chat.userId ? (
                                <BBBIcon
                                  name="MsgRightSvg"
                                  color={Colors.avtarBorder}
                                  size={Layout.moderateScale(15)}
                                  style={{
                                    position: 'absolute',
                                    right: Layout.moderateScale(-10),
                                  }}
                                />
                              ) : (
                                <BBBIcon
                                  name="MsgLeftSvg"
                                  color="#f5f5f5"
                                  size={Layout.moderateScale(15)}
                                  style={{
                                    position: 'absolute',
                                    left: Layout.moderateScale(-12.5),
                                  }}
                                />
                              )}
                              {(chatMessage.authorId == chat.userId)
                              ? (
                              <View>
                                <Text style={[styles.regularSmall, {textAlign: 'right'}]}>{chatMessage.message}</Text>
                                <Text style={[styles.timeStyle, {textAlign: 'right'}]}>{this.formatTime(chatMessage.time)}</Text>
                              </View>
                              )
                              :(
                              <View>
                                <Text style={[styles.regularSmall, {textAlign: 'left'}]}>{chatMessage.message}</Text>
                                <Text style={[styles.timeStyle, {textAlign: 'left'}]}>{this.formatTime(chatMessage.time)}</Text>
                              </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
                <View>
                <SendMessageInput variables = {
                  { chatId: chat.id
                  , lastMessageId: (chat.chatMessages.length > 0) ? chat.chatMessages[chat.chatMessages.length-1].id : 0
                  }} />
                </View>
                <View style={{paddingBottom: this.state.keyboardPadding}}>
                </View>
              </View>
            )
          }}
        </Query>
    )}</LastMessageIds>
    ) // Render Return
  } // Render Method
} // Class
