import React,{Component} from 'react';
import {
  Alert
, View
, Image
, TouchableOpacity
, Linking
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Text, Item } from 'native-base';

// custom components
import BBBIcon from '../../components/BBBIcon';
import { Ionicons } from '@expo/vector-icons';
import Flag from 'react-native-round-flags';

// screen style
import styles from './styles';
import { Layout, Images, Colors, Urls } from '../../constants/';

//apollo client
import { graphql, compose } from "react-apollo";
import {
  UNSET_AUTH_STATUS
} from '../../graphql/Mutations'
import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../graphql/Queries'
import LoginStatus from '../HomeScreen/LoginStatus'
import { w, i18n, getElementByKey, fetchLastReadMessages } from '../../utils/helpers.js'
import GetChatMessages from '../../graphql/queries/GetChatMessages'
import LastMessageIds from '../ChatListScreen/LastMessageIds'

export const DrawerContainer = compose(
  graphql(UNSET_AUTH_STATUS, {name: "unsetAuthStatus"})
, graphql(GET_LOGIN_STATUS, {name: "loginStatus"})
, graphql(GET_CACHED_TRANSLATIONS, {
    name: "i18n"
  , skip: ({ loginStatus }) => !loginStatus
  , options: ({loginStatus}) => ({
      variables: {
        locusId: 1
      , countryCode: loginStatus.countryCode
      }
    , fetchPolicy: 'cache-only'
    })
  })
)(
  class extends Component {
    constructor(props) {
      super(props)
      this.fetchLastReadMessages = fetchLastReadMessages.bind(this)
      this.state = {
        lastReadMessageIds: {},
        loading: true,
      }
    }

    componentDidMount() {
      this.willFocusListener = this.props.navigation.addListener(
        'willFocus'
      , payload => {
          this.fetchLastReadMessages()
          .then( () => {
            this.setState({loading: false})
          })
        }
      )
      this.subs = [
        this.willFocusListener
      ]

    }

    componentWillUnmount() {
      this.subs.forEach((sub) => {
        sub.remove();
      });
    }

    render() {
      if (this.state.loading || !w(this.props, ['i18n', 'getCachedLocus'])) {
        return null
      }
      const { navigation, loginStatus, i18n: {getCachedLocus: translations} } = this.props;
      const parentName = "DrawerContainer"
      return (
        <Container style={styles.container} >
          {loginStatus.authorized ?
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: 'profileScreen'
                })
              }}
            >
              <View style={styles.usersDetailsSec}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  {(w(loginStatus, ['myProfile', 'profileImageURL']))
                  ? <Image style={styles.userImage} source={{uri: loginStatus.myProfile.profileImageURL}} />
                  : <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
                  }
                  <Flag code={loginStatus.countryCode} style={styles.flagStyle} />
                </View>
                <View style={styles.usersDetails}>
                  <Text style={styles.userName}>{(w(loginStatus, ['myProfile', 'profileName'])) ? loginStatus.myProfile.profileName : ""}</Text>
                  {/*
                  <Text style={styles.tokenText}>
                    BB Token Balance: <Text style={styles.tokenPrice}>$0.00</Text>
                  </Text>
                  */}
                </View>
              </View>
            </TouchableOpacity>
          : null }
          <Content style={styles.content}>
            <Item
              style={styles.borderView}
              onPress={() =>  navigation.closeDrawer()}>
              <BBBIcon
                name="Home"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "Home", loginStatus.iso639_2, "Home")}</Text>
            </Item>
            <Item
              style={[styles.borderView, {}]}
              onPress={() => {
                this.props.navigation.navigate('chatListScreen')
              }}>
              <BBBIcon
                name="Chat"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "Chat", loginStatus.iso639_2, "Chat")}</Text>
              <View style={{flexGrow: 1}}>
              <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
                <GetChatMessages chatIndexes={chatIndexes} pollInterval={10000} skip={!loginStatus.authorized}>
                  {({ data, networkStatus, error, loading, refetch, startPolling, stopPolling }) => {
                    let newMessageCount = 0
                    if (!loading && w(data, ['getChatMessages'])) {
                      data.getChatMessages.map( chat => {
                        console.log(chat.id, " : ",  w(this.state.lastReadMessageIds, [chat.id]))
                        if (w(this.state.lastReadMessageIds, [chat.id])) {
                          let lastMessageId = this.state.lastReadMessageIds[chat.id]
                          chat.chatMessages.find(function(element, index, array) {
                            if (element.id === lastMessageId) {
                              newMessageCount += array.length - index - 1
                              return true
                            } else {
                              return false
                            }
                          })
                        } else newMessageCount += w(chat, ['chatMessages', 'length'])
                      })
                    }
                    if ( newMessageCount > 0 ) {
                      return <Text style={[styles.count, {alignSelf: 'flex-end'}]}>{newMessageCount}</Text>
                    } else return null
                  }}
                </GetChatMessages>
              )}</LastMessageIds>
              </View>
            </Item>
            <Item
              style={styles.borderView}
              onPress={() => {
                navigation.navigate('ownListingsScreen')
              }}>
              <Ionicons
                name="ios-images-outline"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "YourListings", loginStatus.iso639_2, "Your Listings")}</Text>
            </Item>
            <Item
              style={styles.borderView}
              onPress={() => {
                navigation.navigate('favoriteScreen')
              }}>
              <BBBIcon
                name="Favorite"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "Favorites", loginStatus.iso639_2, "Favorites")}</Text>
            </Item>
            <Item
              style={styles.borderView}
              onPress={() => {
                navigation.navigate('aboutUsScreen')
              }}>
              <Ionicons
                name="ios-link-outline"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "AboutUs", loginStatus.iso639_2, "About Us")}</Text>
            </Item>
            <Item
              style={styles.borderView}
              onPress={() => {
                Alert.alert(
                  i18n(translations, parentName, "ExternalLink", loginStatus.iso639_2, "This is an external link"),
                  i18n(translations, parentName, "QueryFollowIt", loginStatus.iso639_2, "Do you wish to follow it?"),
                  [
                    {text: i18n(translations, parentName, "OK", loginStatus.iso639_2, "OK"), onPress: () => {
                      Linking.openURL( "http://www.bebebargains.com/contact/" )
                    }},
                  ],
                  { cancelable: true }
                )
              }}>
              <BBBIcon
                name="Support"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "Support", loginStatus.iso639_2, "Support")}</Text>
            </Item>
            <Item
              style={[
                styles.borderView,
                {
                  borderBottomWidth: 0,
                  borderBottomColor: Colors.menuitemborder,
                },
              ]}
              onPress={() => {
                this.props.unsetAuthStatus({ variables: { id: loginStatus.myProfile.id }})
                .then( () => {
                  this.props.navigation.closeDrawer()
                })
              }}>
              <BBBIcon
                name="Logout"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>{i18n(translations, parentName, "LogOut", loginStatus.iso639_2, "Logout")}</Text>
            </Item>
          </Content>
        </Container>
      )
    }
  }
);
/*
          //)}</LoginStatus>
              <Item
                style={styles.borderView}
                onPress={() => {
                  navigation.navigate('notificationScreen')
                }}>
                <BBBIcon
                  name="Notification"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.uglyDrawerItem}>Notifications</Text>
              </Item>
*/
