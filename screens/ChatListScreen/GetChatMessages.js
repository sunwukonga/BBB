import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, View
, Text
, ActivityIndicator
} from 'react-native';
import {
  Container,
  Content,
  Left,
  Body,
} from 'native-base';
import styles from './styles';
import Baby from '../../components/Baby';
import { withNavigation } from 'react-navigation'
import { Urls } from '../../../constants/';

import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'


class ListChatMessages extends Component {
  constructor(props) {
    super(props);
  }
  otherImage( chat ) {
    if ( chat.listing && chat.listing.user && chat.listing.user.id != chat.userId ) {
      return (
       ( chat.listing.user.profileImage && chat.listing.user.profileImage.imageKey )
       ? <Image source={{ uri: Urls.s3ImagesURL + chat.listing.user.profileImage.imageKey }} style={styles.profileImage} />
       : <Baby style={styles.rowImage} />
      )
    } else if ( chat && chat.initUser ) {
      return (
       ( chat.initUser.profileImage && chat.initUser.profileImage.imageKey )
       ? <Image source={{ uri: Urls.s3ImagesURL + chat.initUser.profileImage.imageKey }} style={styles.profileImage} />
       : <Baby style={styles.rowImage} />
      )
    }
  }
  otherProfileName( chat ) {
    if ( chat && chat.listing && chat.listing.user && chat.listing.user.id != chat.userId ) {
      return (
       ( chat && chat.listing && chat.listing.user && chat.listing.user.profileName )
       ? <Title style={styles.headerTitle}>{chat.listing.user.profileName}</Title>
       : null
      )
    } else if (chat && chat.initUser) {
      return (
       ( chat.initUser.profileName != chat.userId )
       ? <Title style={styles.headerTitle}>{chat.initUser.profileName}</Title>
       : null
      )
    }
  }
// TODO: Change target to chatScreen
  renderChat = ({ item }) => (
    <List
      style={styles.mainlist}
      key={item.id}>
      <ListItem
        avatar
        onPress={() => {
          this.props.navigation.navigate('chatDetailScreen', {
            chat: item
          })
        }}>
        <Left style={styles.left}>
          <View style={styles.bebyview}>
            { this.otherImage() }
          </View>
        </Left>
        <Body style={styles.bodys}>
          <View style={styles.titleview}>
          { item.listing.primaryImage===null ||  item.listing.primaryImage.imageKey===null
            ? <Baby style={styles.rowImage} />
            : <Image source={{ uri: Urls.s3ImagesURL + item.listing.primaryImage.imageKey }} style={styles.rowImage} />
          }
            <Text style={styles.title}>{item.listing.title}</Text>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.namecount}>
            { this.otherProfileName() }
            {item.chatMessages.length==0?null:(
              <Text style={styles.count}>{item.chatMessages.length}</Text>
            )}
          </View>
        </Body>
      </ListItem>
    </List>
  )

  updateChatMessages = (oldChatList, newChatList) => {
    let newChats = newChatList.filter( chat => chat.chatMessages.length > 0 )
                    .map( chat => {
                    oldChat = oldChatList.find( oldChat => chat.id == oldChat.id )
                    Object.assign(
                      chat
                    , {newMessageCount: chat.chatMessages.length + (oldChat.newMessageCount ? oldChat.newMessageCount : 0)}
                    )
                    let combinedChatMessages = chat.chatMessages.concat(oldChat.chatMessages)
                                               .sort((a, b) => Math.sign(b.id - a.id))
                                               .filter( (item, index, items) => {
                                                 return !index || item.id != items[index - 1].id
                                               })
                    return Object.assign(chat, {chatMessages: combinedChatMessages})
                  })
  }

  // TODO: This is naive. If a message list gets HUGE, it will start to take up
  // too many resources. A better approach is to fetch the preceding 20 messages,
  // then give the option in the ChatScreen to fetch more from the cache as neede.
  // I.e. the user scrolls up.
  // kkkk
  render() {
    return (
      <Query
        query = {GET_CHAT_MESSAGES}
        variables = {Object.assign(inputVariables, { countryCode: countryCode })}
        fetchPolicy = "cache-and-network"
        update={(cache, { data: { getChatMessages } }) => {
          const data = cache.readQuery({
            query: GET_CHAT_MESSAGES
          })
          const updatedChats = this.updateChatMessages( data.getChatMessages, getChatMessages )
          cache.writeQuery({
            query: GET_CHAT_MESSAGES,
            data: { getUserLikedListings : updatedChats }
          })
        }}
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.getChatMessages || data.getChatMessages.length == 0) {
            return <Text>No messages!</Text>
          }
          return (
            <Container style={styles.container}>
              <BBBHeader title="Chats" leftComponent={leftComponent} />
              <Content>
                <FlatList
                  horizontal = {true}
                  contentContainerStyle={styles.listContent}
                  keyExtractor={(item, index) => index.toString()}
                  data = {data.getChatMessages || []}
                  renderItem={this.renderChat}
                  refreshing={networkStatus === 4 || networkStatus === 3}
                  onRefresh={() => refetch()}
                />
              </Content>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListChatMessages)
