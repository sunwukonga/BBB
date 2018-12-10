import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, Image
, View
, Text
, Alert
, ActivityIndicator
, TouchableOpacity
, AsyncStorage
} from 'react-native';
import {
  Button
, Container
, Content
, List
, ListItem
, Title
, Left
, Body
} from 'native-base';
import styles from './styles';
import { Layout, Colors, Urls } from '../../constants/';
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import { withNavigation } from 'react-navigation'
import { w } from '../../utils/helpers.js'

import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'
import GetChatMessages from '../../graphql/queries/GetChatMessages'
import { updateChatMessages } from '../../utils/helpers.js'
import LastMessageIds from './LastMessageIds'
import { DeleteChat } from '../../graphql/mutations/DeleteChat'


class ListChats extends Component {
  constructor(props) {
    super(props);
    this.renderChat = this.renderChat.bind(this)
    this.fetchLastReadMessages = this._fetchLastReadMessages.bind(this)
    this.state = {
      lastReadMessageIds: {}
    , toggle: true
    }
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus'
    , payload => {
        //console.log("willFocus")
        this.fetchLastReadMessages()
      }
    )
    /*
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus'
    , payload => {
        console.log("didFocus")
      }
    )
    */
    this.subs = [
      this.willFocusListener
    //, this.didFocusListener
    ]
  }
/*
  componentWillMount(){
    this._fetchLastReadMessages()
  }
  */
  componentWillUnmount() {
    this.subs.forEach((sub, i) => {
      if (sub) {
        sub.remove();
      } else {
        //console.log("The listener at: ", i, " did not exist.")
      }
    });
  }

  _fetchLastReadMessages = async () => {
    let item = await AsyncStorage.getItem('lastReadMessages')
    let parsedItem = JSON.parse(item)
    //console.log("Item: ", item)
    //console.log("Stringify state: ", JSON.stringify(this.state.lastReadMessageIds))
    if (JSON.stringify(this.state.lastReadMessageIds) !== item) {
      //console.log("Stored value different")
      this.setState({
        lastReadMessageIds: parsedItem
      , toggle: !this.state.toggle
      })
      //console.log("State: ", this.state.lastReadMessageIds)
    } //else console.log("Stored value NOT different")
  }

  deleteChat( chatId, mutateDeleteChat ) {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this chat?',
      [
        {text: 'DELETE', onPress: () => mutateDeleteChat()},
      ],
      { cancelable: true }
    )
  }

      //<LastMessageIds>{ chatIndexes  => (
// TODO: Change target to chatScreen
//  renderChat = ( { item }) => {
  renderChat = ( item, chatIndexes, loginStatus ) => {
    //console.log("renderChat")
    let { item: chat } = item
    function OtherImage( props ) {
      const {chat} = props
      if ( w(chat, ['listing', 'user', 'id']) != chat.userId ) {
        if ( w(chat, ['listing', 'user', 'profileImage', 'imageKey']) || w(chat, ['listing', 'user', 'profileImage', 'imageURL']) ) {
          if ( w(chat, ['listing', 'user', 'profileImage', 'imageKey']) ) {
            return <Image source={{ uri: Urls.s3ImagesURL + chat.listing.user.profileImage.imageKey }} style={styles.profileImage} />
          } else {
            return <Image source={{ uri: chat.listing.user.profileImage.imageURL }} style={styles.profileImage} />
          }
        } else {
          return <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
        }
      } else if ( w(chat, ['initUser', 'id']) != chat.userId ) {
        if ( w(chat, ['initUser', 'profileImage', 'imageKey']) || w(chat, ['initUser', 'profileImage', 'imageURL']) ) {
          if ( w(chat, ['initUser', 'profileImage', 'imageKey'])) {
            return <Image source={{ uri: Urls.s3ImagesURL + chat.initUser.profileImage.imageKey }} style={styles.profileImage} />
          } else {
            return <Image source={{ uri: chat.initUser.profileImage.imageURL }} style={styles.profileImage} />
          }
        } else {
          return <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
        }
      }
    }

    function OtherProfileName( props ) {
      const {chat} = props
      if ( ! w(chat, ['listing']) ) {
        return <Text>This listing has been deleted</Text>
      }
      if ( w(chat, ['listing', 'user', 'id']) != chat.userId ) {
        if ( w(chat, ['listing', 'user', 'profileName']) ) {
          return <Title style={styles.headerTitle}>{chat.listing.user.profileName}</Title>
        } else {
          return <Text>Other user no longer exists</Text>
        }
      } else if ( w(chat, ['initUser', 'id']) != chat.userId ) {
        if ( w(chat, ['initUser', 'profileName']) ) {
          return <Title style={styles.headerTitle}>{chat.initUser.profileName}</Title>
        } else {
          return <Text>Other user no longer exists</Text>
        }
      }
    }
    // find chat in this.state.lastReadMessageId and get last message ID
    // get index of ID in chat.chatMessages
           // if (w(chat, ["chatMessages", "length"]) > 0) {
    // this.state.lastReadMessageIds[chat.id]
    let newMessageCount = null
    if (w(this.state.lastReadMessageIds, [chat.id])) {
      let lastMessageId = this.state.lastReadMessageIds[chat.id]
      chat.chatMessages.find(function(element, index, array) {
        if (element.id === lastMessageId) {
          newMessageCount = array.length - index - 1
          return true
        } else {
          return false
        }
      })
    } else newMessageCount = w(chat, ['chatMessages', 'length'])
    //console.log("NewMessages: ", newMessageCount)

    return (
      <DeleteChat chat={chat} loginStatus={loginStatus}>{ mutateDeleteChat => (
        <ListItem
          avatar
          style={styles.mainlist}
          key={item.index}
          onLongPress={()=> this.deleteChat( chat.id, mutateDeleteChat )}
          onPress={() => {
            this.props.navigation.navigate('chatDetailScreen', {
              chatId: chat.id
            , chatIndexes: chatIndexes
            })
          }}
        >
          <Left style={styles.left}>
            <View style={styles.bebyview}>
              <OtherImage chat={chat} />
            </View>
          </Left>
          <Body style={styles.bodys}>
            <View style={styles.titleview}>
            { w(chat, ['listing', 'primaryImage', 'imageKey'])
              ? <Image source={{ uri: Urls.s3ImagesURL + chat.listing.primaryImage.imageKey }} style={styles.rowImage} />
              : <Baby style={styles.rowImage} />
            }
              <Text style={styles.title}>{w(chat, ['listing', 'title'])}</Text>
            </View>
            <View style={styles.bottomline} />
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignContent: 'center'}}>
              <OtherProfileName chat={chat} />
              <View style={styles.namecount}>
                  { newMessageCount > 0
                  ? <Text style={styles.count}>{newMessageCount}</Text>
                  : null
                  }
              </View>
            </View>
          </Body>
        </ListItem>
      )}</DeleteChat>
    )
  }

      //)}</LastMessageIds>

  // TODO: This is naive. If a message list gets HUGE, it will start to take up
  // too many resources. A better approach is to fetch the preceding 20 messages,
  // then give the option in the ChatScreen to fetch more from the cache as neede.
  // I.e. the user scrolls up.
  /*
        update={(cache, { data: { getChatMessages } }) => {
          const data = cache.readQuery({
            query: GET_CHAT_MESSAGES
          })
          const updatedChats = this.updateChatMessages( data.getChatMessages, getChatMessages )
          cache.writeQuery({
            query: GET_CHAT_MESSAGES,
            data: { getChatMessages : updatedChats }
          })
        }}
        */
  /*
      <Query
        query = {GET_CHAT_MESSAGES}
        variables = {{chatIndexes: chatIndexes}}
        fetchPolicy = "network-and-cache"
        pollInterval={10000}
      >
      */
  render() {
    let { chatIndexes, loginStatus } = this.props
    //console.log("Render")
    return (
      <GetChatMessages chatIndexes={chatIndexes} pollInterval={10000} renderControl={this.state.toggle}>
        {({ data, fetchMore, networkStatus, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.getChatMessages || data.getChatMessages.length == 0) {
            return (
              <View style={styles.left}>
                <Text style={[styles.title, styles.cleaMarginTop]}>No love? Maybe you need more listings ;)</Text>
              </View>
            )
          }
          /*
          let leftComponent = (
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <BBBIcon
                name="BackArrow"
                size={Layout.moderateScale(18)}
                color={Colors.white}
              />
            </Button>
          )*/
          let mapped = data.getChatMessages.map( (chat, index) => {
            if (w(chat, ["chatMessages", "length"]) > 0) {
              return {index: index, id: chat.id, value: chat.chatMessages[chat.chatMessages.length -1].id}
            } else return {index: index, id: chat.id, value: 0}
          })
          mapped.sort( (a, b) => {
            if (a.value > b.value) {
              return -1
            }
            if (a.value < b.value) {
              return 1
            }
            if (a.id < b.id) {
              return 1
            }
            if (a.id > b.id) {
              return -1
            }
            return 0
          })
          let sortedGetChatMessages = mapped.map( el => {
            return JSON.parse(JSON.stringify(data.getChatMessages[el.index]))
          })
          /*
          sortedGetChatMessages.map( chat => {
            if (w(chat, ["chatMessages", "length"]) > 0) {
              console.log(chat.chatMessages[chat.chatMessages.length -1].id)
            }
          })
          */

          //console.log("GetChatMessages ran")
          return (
                <FlatList
                  horizontal = {false}
                  contentContainerStyle={styles.listContent}
                  keyExtractor={(item, index) => index.toString()}
                  data = {sortedGetChatMessages || []}
                  extradata = {this.state.toggle}
                  renderItem={ (item) => this.renderChat(item, chatIndexes, loginStatus)}
                  refreshing={networkStatus === 4 || networkStatus === 3}
                />
          )
        }}
      </GetChatMessages>
    )
  }
}

export default withNavigation(ListChats)

/*
            <Container style={styles.container}>
              <BBBHeader title="Chats" leftComponent={leftComponent} />
              <Content>
              </Content>
            </Container>
            */
