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
, TextInput
, ActivityIndicator
, InteractionManager
, AsyncStorage
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
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import { Ionicons } from '@expo/vector-icons';

//custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import Baby from '../../components/Baby';
import { updateChatMessages } from '../../utils/helpers.js'

// screen style
import styles from './styles';
import { Layout, Images, Colors, Urls } from '../../constants/';

import SendMessageInput from './SendMessageInput'
//import getChatMessages from './GetChatMessages';
import GetChatMessages from '../../graphql/queries/GetChatMessages'
//import sendChatMessage from './SendMessage';
//import createChat from './CreateChat';
import { ProgressDialog } from 'react-native-simple-dialogs';
//import Toast from 'react-native-simple-toast';
import { w } from '../../utils/helpers.js'

var isFromChat=false;

export default class ChatScreen extends Component {

  constructor(props) {
    super(props);

    this.newRender = true
    this.yOffset = null
    this.scrollEvent = null
    this.textInputHeight = Layout.HEIGHT * 0.08

    this.keyboardDidShow = this.keyboardDidShow.bind(this)
    this.keyboardDidHide = this.keyboardDidHide.bind(this)

    this.state = {
      keyboardPadding: Layout.HEIGHT * 0.08
//    , lastMessageId: 0
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
    try {
      if (this._scrollView) {
        this._scrollView.scrollToEnd({animated: false})
      }
    } catch(e) {
      Alert.alert("Error:" + e.message)
    }
  }

  componentDidMount() {
    //console.log("Layout.HEIGHT: ", Layout.HEIGHT)
    this.newRender = true
    InteractionManager.runAfterInteractions(() => {
    })
    //console.log("keyboardListeners Added")
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        //console.log('didFocus-SendMessageInput')
        //this.scrollReporter = setInterval( () => console.log("Scroll.Event: ", this.scrollEvent), 4000)
      }
    )
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur'
    , payload => {
        //console.log('didBlur-SendMessageInput')
        if ( this.keyboardDidHideLister ) {
          this.keyboardDidHideListener.remove()
         // console.log('didBlur-SendMessageInput: removeHideListener')
        }
        if ( this.keyboardDidShowLister ) {
          this.keyboardDidShowListener.remove()
          //console.log('didBlur-SendMessageInput: removeShowListener')
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
    //console.log('willUnmount')
    this.subs.forEach((sub, i) => {
      if (sub) {
        sub.remove();
        //console.log("Subscriptions removed for didFocus, didBlur, didShow, didHide")
      } else {
        //console.log("The listener at: ", i, " did not exist.")
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
    let profileImage =  <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
    let profileName = <Text style={{ paddingLeft: Layout.WIDTH * 0.05 }}>Other user not found</Text>

    if ( w(chat, ['listing']) ) {
      if ( w(chat, ['listing', 'user', 'id']) != chat.userId ) {
        if ( w(chat, ['listing', 'user', 'profileImage', 'imageKey']) || w(chat, ['listing', 'user', 'profileImage', 'imageURL']) ) {
          if ( w(chat, ['listing', 'user', 'profileImage', 'imageKey']) ) {
            profileImage = <Image source={{ uri: Urls.s3ImagesURL + chat.listing.user.profileImage.imageKey }} style={styles.profileImage} />
          } else {
            profileImage = <Image source={{ uri: chat.listing.user.profileImage.imageURL }} style={styles.profileImage} />
          }
        }
        if ( w(chat, ['listing', 'user', 'profileName']) ) {
          profileName = <Title style={styles.headerTitle}>{chat.listing.user.profileName}</Title>
        }
      } else if ( w(chat, ['initUser', 'id']) != chat.userId ) {
        if ( w(chat, ['initUser', 'profileImage', 'imageKey']) || w(chat, ['initUser', 'profileImage', 'imageURL']) ) {
          if ( w(chat, ['initUser', 'profileImage', 'imageKey'])) {
            profileImage = <Image source={{ uri: Urls.s3ImagesURL + chat.initUser.profileImage.imageKey }} style={styles.profileImage} />
          } else {
            profileImage = <Image source={{ uri: chat.initUser.profileImage.imageURL }} style={styles.profileImage} />
          }
        }
        if ( w(chat, ['initUser', 'profileName']) ) {
          profileName = <Title style={styles.headerTitle}>{chat.initUser.profileName}</Title>
        }
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

  _retrieveLastReadMessageIds = async () => {
    try {
      const value = await AsyncStorage.getItem('lastReadMessages')
      if (value !== null) {
        // We have data!!
        //console.log("retrieved: ", value);
        return value
      }
     } catch (error) {
       // Error retrieving data
       //console.log("Retrieve error: ", error)
       return null
     }
  }
  _storeLastReadMessageIds = async ( stringified ) => {
    console.log("Storing lastReadMessages")
    try {
      await AsyncStorage.setItem('lastReadMessages', stringified)
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }
      //<KeyboardAvoidingView behavior="padding" contentContainerStyle={{flex: 1, justifyContent: 'space-between' }}>
      //</KeyboardAvoidingView>
//------------------------------------------------------------------------------------------------
//---------------------------------------RENDER---------------------------------------------------
//------------------------------------------------------------------------------------------------
  render() {
    //console.log("RENDER CHAT")
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
    let { chatId, chatIndexes } = this.props.navigation.state.params
      //<LastMessageIds loginStatus={{loginStatus: true}}>{ chatIndexes => (
    return (
        <GetChatMessages chatIndexes={chatIndexes} pollInterval={10000}>
          {({ data, networkStatus, error, loading, refetch, startPolling, stopPolling }) => {
            //console.log("GetChatMessages Ran.")
            if (networkStatus === 1) {
              return <ActivityIndicator size="large" />;
            }
            if (error) {
              // TODO: Turn this error into a retry ICON
              return (
                <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Text>Unable to reach server</Text>
                  <Text>Try again?</Text>
                  <TouchableOpacity transparent onPress={() => refetch()} >
                    <Ionicons
                      name={'md-sync'}
                      size={Layout.WIDTH * 0.30}
                      color={Colors.primaryColor}
                      style={styles.refetch}
                    />
                  </TouchableOpacity>
                </View>)
            }
            if (!data.getChatMessages || data.getChatMessages.length == 0 ) {
              return (
                <View style={styles.left}>
                  <Text style={[styles.title, styles.clearMarginTop]}>Apparently there's no chat by that ID</Text>
                </View>
              )
            }

            let chat = data.getChatMessages.find( chat => chat.id == chatId )
            this._retrieveLastReadMessageIds()
            .then( ids => {
              let lastReadMessages = {}
              if (ids) {
                lastReadMessages = JSON.parse( ids )
              }
              if (w(chat, ["chatMessages", "length"]) > 0) {
                lastReadMessages[chat.id] = chat.chatMessages[chat.chatMessages.length-1].id
              } else lastReadMessages[chat.id] = 0
              this._storeLastReadMessageIds(JSON.stringify(lastReadMessages))
            })
            //console.log("ChatID: ", chatId)
            //console.log("Data: ", data.getChatMessages)
            if (!chat) {
              return (
                <View style={styles.left}>
                  <Text style={[styles.title, styles.clearMarginTop]}>Apparently there's no chat</Text>
                </View>
              )
            }/* else {
              if (chat.chatMessages.length > 0) {
                if (chat.chatMessages[chat.chatMessages.length-1].id > this.state.lastMessageId) {
                  this.setState({lastMessageId:  chat.chatMessages[chat.chatMessages.length-1].id})
                }
              }
            }*/
            if (this.newRender) {
              setTimeout(() => {
                try {
                  if (this._scrollView) {
                    //console.log("Scroll on visual")
                    this._scrollView.scrollToEnd({animated: false})
                  }
                } catch(e) {
                  Alert.alert("Error:" + e.message)
                }
              }, 300);
              this.newRender = false
            }
            return (
              <View style={{ flex: 1, height: Layout.HEIGHT }}>
                <BBBHeader
                  titleComponent={ this.otherImageAndName( chat ) }
                  leftComponent={leftComponent}
                />
                <View style={styles.notifyContainer}>
                  { (w(chat, ['listing', 'primaryImage', 'imageKey']))
                  ? <Image source={{ uri: Urls.s3ImagesURL + chat.listing.primaryImage.imageKey }} style={styles.notifyImage} />
                  : <Baby style={styles.babyIcon} />
                  }
                  <Text style={styles.regularSmall}>
                    { ! w(chat, ['listing'])
                    ? ("This listing has been deleted")
                    : w(chat, ['listing', 'title'])
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
                  <View style={{paddingBottom: this.state.keyboardPadding}}>
                    <View style={styles.footerStyle} >
                      <SendMessageInput variables={
                        { chatId: chatId
                        , lastMessageId: (chat.chatMessages.length > 0) ? chat.chatMessages[chat.chatMessages.length-1].id : 0
                        }} />
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        </GetChatMessages>
    ) // Render Return
  } // Render Method
} // Class

//)}</LastMessageIds>
/*
                <SendMessageInput variables = {
                  { chatId: chat.id
                  , lastMessageId: (chat.chatMessages.length > 0) ? chat.chatMessages[chat.chatMessages.length-1].id : 0
                  }} />
                      <SendMessageInput variables = {
                        { chatId: chatId
                        , lastMessageId: (chat.chatMessages.length > 0) ? chat.chatMessages[chat.chatMessages.length-1].id : 0
                        }} />

*/
