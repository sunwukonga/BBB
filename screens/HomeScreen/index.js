import React from 'react'
import {
  View
, Text
, TouchableOpacity
, FlatList
, Alert
} from 'react-native';
// For creating Actions. Will move out to external file later
import { NavigationActions } from 'react-navigation'
import {
  Icon
, Button
, Left
, Right
, Header
, Body
, Title
, Item
, Input
, Container
, Content
, Fab
} from 'native-base'
import { graphql, compose } from "react-apollo";
//custom components
//import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'
import { Ionicons } from '@expo/vector-icons'
// style
import styles from './styles'
import headerStyles from '../../components/BBBHeader/styles'
import { Layout, Colors, Images, IconNames } from '../../constants/'
import { w, i18n, fetchLastReadMessages } from '../../utils/helpers.js'
//import Toast from 'react-native-simple-toast'
//import Toast, {DURATION} from 'react-native-easy-toast';
//import { Permissions } from 'expo'

// FlatLists with embedded Queries
import ListRecentListings from './ListRecentListings'
import ListVisitedListings from './ListVisitedListings'
import ListLikedListings from './ListLikedListings'
import ListUserVisitedListings from './ListUserVisitedListings'

import LoginStatus from './LoginStatus'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import GetChatMessages from '../../graphql/queries/GetChatMessages'
import GetCachedTranslations from '../../graphql/queries/GetCachedTranslations'

import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../graphql/Queries'

//Navigation Actions
const NA_HomeToLoginToDrawer = NavigationActions.navigate({
  routeName: 'loginScreen'
, params: { source: 'homeScreen'
          , dest: 'openDrawer'}
})
const NA_HomeToLoginToCreate = NavigationActions.navigate({
  routeName: 'loginScreen'
, params: { source: 'homeScreen'
          , dest: 'createNewItemScreen'}
})

const showIcons = false

export default class HomeScreen extends React.Component {

  static navigationOptions = () => ({
    drawerLockMode: 'locked-closed',
  })

  onBackPress = () => {
    this.props.navigation.closeDrawer()
    return true
  }

  openDrawerAndSetState = () => {
    this.props.navigation.openDrawer()
  }

  constructor(props) {
    super(props);

    this.fetchLastReadMessages = fetchLastReadMessages.bind(this)
    this.state = {
      limit:10,
      page:1,
      searchTerms:[],
      lastReadMessageIds: {},
      loading: true,
    }
    //Permissions.askAsync(Permissions.LOCATION)
  }

  // REDUNDANT; NOT USED
  // Proxy method for child component to set this.state
  setLoginState = ( logged ) => {
    if (typeof(logged) == typeof(true)) {
      // assign does NOT trigger a render
      //Object.assign(this.state, { loginStatus: logged })
      this.setState({
        loginStatus: logged
      })
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
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        /*
        if ( this.drawerOpen ) {
          // reattach the listener as we never closed the drawer
          this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
        }
        */
        if ( this.props.navigation.state && this.props.navigation.state.params ) {
          if ( this.props.navigation.state.params.doAction == 'openDrawer' ) {
            this.props.navigation.state.params.doAction = ''
            this.openDrawerAndSetState()
          }
        }
      }
    )
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur'
    , payload => {
      }
    )
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur'
    , payload => {
      /*
        if (this.drawerBackHandler) {
          // Handler still exists. This means that the drawer was not closed before navigating away.
            // I.e. drawerOpen: true
          this.drawerBackHandler.remove()
        }
        */
      }
    )

    this.subs = [
      this.willFocusListener
    , this.didFocusListener
    , this.willBlurListener
    , this.didBlurListener
    ]

  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  //-----------------------------------
  // Auth checking functions
  //-----------------------------------
  checkAuthForCreate = (loginStatus) => {
    console.log(loginStatus)
    if( loginStatus.authorized ) {
      this.props.navigation.navigate('createNewItemScreen')
    } else{
      this.props.navigation.dispatch(NA_HomeToLoginToCreate);
    }
  }
 
  checkAuthForChat = (item, loginStatus) => {
    if( loginStatus.authorized ) {
      var recUserId_ = item.user.id;
      var listingId_ = item.id;
      var chatId_ = item.chatId;
      var chatExists = chatId_!=null;
      this.props.navigation.navigate('chatDetailScreen', {
        recUserId: recUserId_
      , listingId: listingId_
      , isChatExists: chatExists
      , chatId: chatId_
      });
    } else {
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer);
    }
  }

  checkAuthForDrawer = (loginStatus) => {
    if ( loginStatus.authorized ) {
      //this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
      this.props.navigation.openDrawer()
    }
    else {
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer)
    }
  }
      //^^^ There can be no gap between  `>` and `{`  OR  `}` and `<`
      // when using components accessing children
  render() {
    var leftComponent = (loginStatus, newMessageCount) => (
      <Button transparent onPress={ () => this.checkAuthForDrawer(loginStatus)}>
        { loginStatus.authorized ?
        <View>
          { newMessageCount > 0
          ? <Text style={styles.count}>{newMessageCount}</Text>
          :
          <BBBIcon
            name="Menu"
            size={Layout.moderateScale(18)}
            color={Colors.white}
            style={{ color: Colors.white }}
          />
          }
        </View>
        :
        <Ionicons
          name="ios-log-in"
          size={Layout.moderateScale(18)}
          color={Colors.white}
          style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
        />
        }
      </Button>
    )

    var rightComponent = (loginStatus) => (
      <Button transparent onPress={ () => this.props.navigation.navigate('categoryScreen', {loginStatus: loginStatus})}>
        <BBBIcon
          name="CategoryIcon"
          size={Layout.moderateScale(18)}
          style={{ color: Colors.white }}
        />
      </Button>
    );

            //<GetProfile loginStatus={loginStatus}>{ currentUser => (
            //)}</GetProfile>
    if (this.state.loading) {
      return null
    } else {
      let parentName = "HomeScreen"
      return (
        <LoginStatus>{ loginStatus => (
          <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
            <GetCachedTranslations loginStatus={loginStatus}>{ translations => (
              <Container>
                <GetChatMessages chatIndexes={chatIndexes} pollInterval={10000} skip={!loginStatus.authorized}>
                  {({ data, networkStatus, error, loading, refetch, startPolling, stopPolling }) => {
                    let newMessageCount = 0
                    if (!loading && w(data, ['getChatMessages'])) {
                      data.getChatMessages.map( chat => {
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
                    return (
                      <Header
                        androidStatusBarColor={Colors.mainheaderbg}
                        style={headerStyles.header}
                      >
                        <Left style={headerStyles.left}>{leftComponent(loginStatus, newMessageCount)}</Left>
                        <Body style={headerStyles.body}><Title style={headerStyles.headerTitle}>Bebe Bargains</Title></Body>
                        <Right style={headerStyles.right}>{rightComponent(loginStatus)}</Right>
                      </Header>
                    )
                  }}
                </GetChatMessages>

                <Content style={styles.container}>
                  <View>
                    <View style={styles.searchSec}>
                      <Item regular style={styles.searchItem}>
                {/*TODO: Change searchTerms from String to Array of Strings */
                }
                        <Input
                          placeholder={i18n(translations, parentName, "LookingFor", loginStatus.iso639_2, "What are you looking for?")}
                          style={styles.mainSearch}
                          keyboardType="default"
                          returnKeyType="search"
                          onChangeText={(text) => {
                              this.setState({ searchTerms: text.split(/\s+/g)});
                          }}
                          onSubmitEditing={ () =>
                            this.props.navigation.navigate('searchResultScreen', { terms: this.state.searchTerms, loginStatus: loginStatus})
                          }
                        />
                        <TouchableOpacity onPress={() =>
                          this.props.navigation.navigate('searchResultScreen', { terms: this.state.searchTerms, loginStatus: loginStatus})
                        }>
                          <BBBIcon name="Search" style={styles.searchicon} />
                        </TouchableOpacity>
                      </Item>
                    </View>
                { showIcons ?
                <FlatList
                  horizontal = {true}
                  contentContainerStyle={styles.listContent}
                  keyExtractor={(item, index) => index.toString()}
                  data = { IconNames || ["md-create"]}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => Alert.alert("IconName: " + item)}>
                        <Ionicons
                          name={item}
                          size={Layout.moderateScale(24)}
                          color={Colors.primaryColor}
                          style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                        />
                      </TouchableOpacity>
                    )
                  }}
                />
                : null }

                    <ListRecentListings
                      loginStatus={loginStatus}
                      variables={{"limit":this.state.limit,"page":this.state.page}}
                      chatIndexes={chatIndexes}
                      createNew={() => this.checkAuthForCreate(loginStatus) }
                      translations={translations} />
                    <View style={styles.adSec}>
                      <Text style={styles.mainadText}>
                        {i18n(translations, parentName, "QuestionSell", loginStatus.iso639_2, "Do you have something to sell or give away?")}
                      </Text>
                      <Text style={styles.subtitle}>
                        {i18n(translations, parentName, "SuggestionPost", loginStatus.iso639_2, "Post it with us and we'll give you an audience.")}
                      </Text>
                    </View>
                    <View>
                      <ListVisitedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} translations={translations} />
                      <ListLikedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} translations={translations} />
                      <View style={styles.hr} />
                      <ListUserVisitedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} translations={translations} />
                    </View>
                  </View>
                </Content>
                <Fab
                  direction="up"
                  style={styles.fabStyle}
                  position="bottomRight"
                  onPress={() => this.checkAuthForCreate(loginStatus)}
                >
                  <Icon name="ios-add" style={{ fontSize: Layout.moderateScale(20) }} />
                </Fab>
              </Container>
            )}</GetCachedTranslations>
          )}</LastMessageIds>
        )}</LoginStatus>
      )
    }
  }
}
