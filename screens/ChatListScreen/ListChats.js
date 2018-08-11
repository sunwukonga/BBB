import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, Image
, View
, Text
, ActivityIndicator
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
import { Layout, Colors } from '../../constants/';
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import { withNavigation } from 'react-navigation'

import {
  GET_CHAT_MESSAGES
} from '../../graphql/Queries'
import { updateChatMessages } from '../../utils/helpers.js'
import LastMessageIds from './LastMessageIds'


class ListChats extends Component {
  constructor(props) {
    super(props);
  }

  otherImage( chat ) {
    if ( chat.listing && chat.listing.user && chat.listing.user.id != chat.userId ) {
      return (
       ( chat.listing.user.profileImage && chat.listing.user.profileImage.imageKey )
       ? <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/" + chat.listing.user.profileImage.imageKey }} style={styles.profileImage} />
       : <Baby style={styles.rowImage} />
      )
    } else if ( chat && chat.initUser ) {
      return (
       ( chat.initUser.profileImage && chat.initUser.profileImage.imageKey )
       ? <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/" + chat.initUser.profileImage.imageKey }} style={styles.profileImage} />
       : <Baby style={styles.rowImage} />
      )
    }
  }
  otherProfileName( chat ) {
    if ( chat && chat.listing && chat.listing.user && chat.listing.user.id != chat.userId ) {
      return (
       ( chat && chat.listing && chat.listing.user && chat.listing.user.profileName )
       ? <Text style={styles.name}>{chat.listing.user.profileName}</Text>
       : null
      )
    } else if (chat && chat.initUser && chat.initUser.id != chat.userId) {
      console.log("initUser not me")
      return (
       ( chat.initUser.profileName )
       ? <Text style={styles.name}>{chat.initUser.profileName}</Text>
       : null
      )
    }
  }

// TODO: Change target to chatScreen
//  renderChat = ( { item }) => {
  renderChat = ( chats ) => {
    let { item } = chats
    return (
      <LastMessageIds>{ chatIndexes  => (
        <List
          style={styles.mainlist}
          key={item.id}
        >
          <ListItem
            avatar
            onPress={() => {
              this.props.navigation.navigate('chatDetailScreen', {
                chatId: item.id
              , chatIndexes: chatIndexes
              })
            }}>
            <Left style={styles.left}>
              <View style={styles.bebyview}>
                { this.otherImage( item ) }
              </View>
            </Left>
            <Body style={styles.bodys}>
              <View style={styles.titleview}>
              { item.listing.primaryImage===null ||  item.listing.primaryImage.imageKey===null
                ? <Baby style={styles.rowImage} />
                : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.listing.primaryImage.imageKey}} style={styles.rowImage} />
              }
                <Text style={styles.title}>{item.listing.title}</Text>
              </View>
              <View style={styles.bottomline} />
              <View>{ this.otherProfileName( item ) }</View>
              <View style={styles.namecount}>
                  { item.newMessageCount && item.newMessageCount > 0
                  ? <Text style={styles.count}>{item.newMessageCount}</Text>
                  : null
                  }
              </View>
            </Body>
          </ListItem>
        </List>
      )}</LastMessageIds>
    )
  }


  // TODO: This is naive. If a message list gets HUGE, it will start to take up
  // too many resources. A better approach is to fetch the preceding 20 messages,
  // then give the option in the ChatScreen to fetch more from the cache as neede.
  // I.e. the user scrolls up.
  // kkkk
  render() {
    let { variables } = this.props
    return (
      <Query
        query = {GET_CHAT_MESSAGES}
        variables = {variables}
        fetchPolicy = "cache-and-network"
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
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
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
          return (
                <FlatList
                  horizontal = {true}
                  contentContainerStyle={styles.listContent}
                  keyExtractor={(item, index) => index.toString()}
                  data = {data.getChatMessages || []}
                  renderItem={this.renderChat}
                  refreshing={networkStatus === 4 || networkStatus === 3}
                  onRefresh={() => refetch()}
                />
          )
        }}
      </Query>
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
