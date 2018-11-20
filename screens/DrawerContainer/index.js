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
import { graphql } from "react-apollo";
import {
  UNSET_AUTH_STATUS
} from '../../graphql/Mutations'
import LoginStatus from '../HomeScreen/LoginStatus'
import { w, getElementByKey, fetchLastReadMessages } from '../../utils/helpers.js'
import GetChatMessages from '../../graphql/queries/GetChatMessages'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
//import MainDrawer from '../../navigation/MainDrawerNavigator'

//reset the appolo cache
export const DrawerContainer = graphql(UNSET_AUTH_STATUS)(
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

    /*
    shouldComponentUpdate(nextProps, nextState) {
      return false
    }
    */

    render() {
      const { navigation } = this.props;
      //console.log("Navigation: ", navigation)
      //console.log("navStateParams: ", getElementByKey(navigation, 'rootNavigation'))
      if (this.state.loading) {
        return null
      } else {
        return (
          <LoginStatus>{ loginStatus => (
            <Container style={styles.container} >
              {loginStatus.loginStatus ?
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate({
                      routeName: 'profileScreen'
         //           , params: { rootNavigation: getElementByKey( navigation, 'rootNavigation') }
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
                  <Text style={styles.uglyDrawerItem}>Home</Text>
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
                  <Text style={styles.uglyDrawerItem}>Chat</Text>
                  <View style={{flexGrow: 1}}>
                  <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
                    <GetChatMessages chatIndexes={chatIndexes} pollInterval={10000} skip={!loginStatus.loginStatus}>
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
                  <Text style={styles.uglyDrawerItem}>Your Listings</Text>
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
                  <Text style={styles.uglyDrawerItem}>Favorites</Text>
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
                  <Text style={styles.uglyDrawerItem}>About Us</Text>
                </Item>
                <Item
                  style={styles.borderView}
                  onPress={() => {
                    Alert.alert(
                      'This is an external link',
                      'Do you wish to follow it?',
                      [
                        {text: 'OK', onPress: () => {
                          Linking.openURL( "http://www.bebebargains.com/contact/" )
                        }},
                      ],
                      { cancelable: true }
                    )
                      //navigation.navigate('supportScreen')
                  }}>
                  <BBBIcon
                    name="Support"
                    size={Layout.moderateScale(20)}
                    color={Colors.secondaryColor}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.uglyDrawerItem}>Support</Text>
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
                    this.props.mutate({ variables: { id: loginStatus.myProfile.id }})
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
                  <Text style={styles.uglyDrawerItem}>Log Out</Text>
                </Item>
              </Content>
            </Container>
          )}</LoginStatus>
        )
      }
    }
  }
);
/*
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
