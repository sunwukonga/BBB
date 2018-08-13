import React from 'react';
import {
  View
, Text
, TouchableOpacity
, AsyncStorage
, BackHandler
} from 'react-native';
// For creating Actions. Will move out to external file later
import { NavigationActions } from 'react-navigation';
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
} from 'native-base';
//custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
// style
import styles from './styles';
import headerStyles from '../../components/BBBHeader/styles';
import { Layout, Colors, Images } from '../../constants/';

// FlatLists with embedded Queries
import ListRecentListings from './ListRecentListings'
import ListVisitedListings from './ListVisitedListings'
import ListLikedListings from './ListLikedListings'
import ListUserVisitedListings from './ListUserVisitedListings'
import ListUserLikedListings from './ListUserLikedListings'
import ListUserPostedListings from './ListUserPostedListings'

import likeProductApi from './LikeProductApi';
import LoginStatus from './LoginStatus'

import MainDrawer from '../../navigation/MainDrawerNavigator'

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


export default class HomeScreen extends React.Component {

  static navigationOptions = () => ({
    drawerLockMode: 'locked-closed',
  })

  onBackPress = () => {
    this.props.navigation.closeDrawer()
    return true
  }

  openDrawerAndSetState = () => {
    this.setState({ drawerOpen: true })
    this.props.navigation.openDrawer()
  }

  constructor(props) {
    super(props);

    this.state = {
      limit:10,
      page:1,
      searchTerms:'',
      drawerOpen: false,
    }

    this.drawerBackHandler = null
    const defaultGetStateForAction = MainDrawer.router.getStateForAction;
    MainDrawer.router.getStateForAction = (action, state) => {
      if (state && action.type === 'Navigation/OPEN_DRAWER') {
        this.setState({ drawerOpen: true })
          console.log('<===============>DrawerOpen');
        this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
          console.log('Listener ADDED');
      }
      if (state && action.type === 'Navigation/DRAWER_CLOSED') {
        this.setState({ drawerOpen: false })
          console.log('<|||||||||||||||>DrawerClose');
        this.drawerBackHandler.remove()
        this.drawerBackHandler = null
          console.log('Listener REMOVED');
      }
      return defaultGetStateForAction(action, state);
    };
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

  sendLikeRequest(item){

    var _like=!item.liked;
    console.log("Is Liked",_like);
		var variables={"listingId": item.id,"like": _like}
		likeProductApi(variables).then((res)=>{

        if(res.data.likeListing){
          var mostVisitedList=this.state.mostVisitedList;
          for(var i=0;i<mostVisitedList.length;i++){
            if(mostVisitedList[i].id==item.id){
              console.log("Selected Id: ",item.id);
                console.log("Is Liked - 1: ",_like);
                console.log("Selected Item Id","ID:"+item.id+", ID:"+mostVisitedList[i].id+", liked value : "+mostVisitedList[i].liked);
              mostVisitedList[i].liked=_like;
              console.log(mostVisitedList[i]);
            }
          }

          var _count=this.state.count+1;

            this.setState({
              mostVisitedList:mostVisitedList,
              progressVisible:false,
              count:_count,
            })


        }

		})
		.catch(error => {
      this.setState({
				progressVisible: false,
			});
			console.log("Error:" + error.message);
			Toast.show(error.message,Toast.SHORT);

		});
	}

  /*
  componentWillReceiveProps(nextProps) {
    console.log("WillReceiveProps")
  }
  */
/*
  _retrieveCountry = async () => {
      try {
          const value = await AsyncStorage.getItem('countryCode');
          if (value) {
            this.setState({
              countryCode: value
            });
          }
       } catch (error) {
         console.log(error);
       }
    }
 */ 
  componentDidMount() {

    this.willFocusListener = this.props.navigation.addListener(
      'willFocus'
    , payload => {
        console.log('willFocus')
      }
    )
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('didFocus')
        if ( this.state.drawerOpen ) {
          // reattach the listener as we never closed the drawer
          this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
        }
        if ( this.props.navigation.state && this.props.navigation.state.params ) {
          if ( this.props.navigation.state.params.doAction == 'openDrawer' ) {
            this.openDrawerAndSetState()
          }
        }
      }
    )
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur'
    , payload => {
        console.log('didBlur')
      }
    )
    this.didBlurListener = this.props.navigation.addListener(
      'didBlur'
    , payload => {
        console.log('didBlur')
        if (this.drawerBackHandler) {
          // Handler still exists. This means that the drawer was not closed before navigating away.
            // I.e. drawerOpen: true
          this.drawerBackHandler.remove()
        }
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
    console.log('willUnmount')
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  //-----------------------------------
  // Auth checking functions
  //-----------------------------------
  checkAuthForCreate = (loginStatus) => {
    if( loginStatus.loginStatus ) {
      this.props.navigation.navigate('createNewItemScreen')
    } else{
      this.props.navigation.dispatch(NA_HomeToLoginToCreate);
    }
  }
 
  checkAuthForChat = (item, loginStatus) => {
    if( loginStatus.loginStatus ) {
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
    if ( loginStatus.loginStatus ) {
      //this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
      this.props.navigation.openDrawer()
    }
    else {
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer)
    }
  }
/*
      <LoginStatus>{ loginStatus => (
      )}</LoginStatus>
      ^^^ There can be no gap between  `>` and `{`  OR  `}` and `<`
      */
  render() {
    var leftComponent = (
      <LoginStatus>{ loginStatus => (
        <Button transparent onPress={ () => this.checkAuthForDrawer(loginStatus)}>
          <BBBIcon
            name="Menu"
            size={Layout.moderateScale(18)}
            color={Colors.white}
            style={{ color: Colors.white }}
          />
        </Button>
      )}</LoginStatus>
    );

    var rightComponent = (
      <Button transparent onPress={ () => this.props.navigation.navigate('categoryScreen')}>
        <BBBIcon
          name="CategoryIcon"
          size={Layout.moderateScale(18)}
          style={{ color: Colors.white }}
        />
      </Button>
    );

      /*
        <LoginStatus>{ loginStatus => {
          this.loginStatus = loginStatus
          return null
        }}</LoginStatus>
        */
    /*
        <BBBHeader
          title="Bebe Bargains"
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
        */
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.mainheaderbg}
          style={headerStyles.header}>
          <Left style={headerStyles.left}>{leftComponent}</Left>
          <Body style={headerStyles.body}><Title style={headerStyles.headerTitle}>Bebe Bargains</Title></Body>
          <Right style={headerStyles.right}>{rightComponent}</Right>
        </Header>
        <Content style={styles.container}>
          <View>
            <View style={styles.searchSec}>
              <Item regular style={styles.searchItem}>
      {/* TODO: Link with searchResultScreen where searchListings will be called */}
                  <Input
                  placeholder="What are you looking for?"
                  style={styles.mainSearch}
                  keyboardType="default"
                  returnKeyType="search"
                  onChangeText={(text) => {
                      console.log("Title",text);
                      this.setState({ searchTerms:text});
                  }}
                  onSubmitEditing={(content) =>
                    this.props.navigation.navigate('searchResultScreen', { searchTerms: this.state.searchTerms})

                  }
                />
                <BBBIcon name="Search" style={styles.searchicon} />
              </Item>
            </View>

            <LoginStatus>{ loginStatus => (
              <ListRecentListings loginStatus={loginStatus} variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} /> 
            )}</LoginStatus>

            <View style={styles.adSec}>
              <Text style={styles.mainadText}>
                Do you have something to sell or give away?
              </Text>
              <Text style={styles.subtitle}>
                Post it with us and we'll give you an audience.
              </Text>
            </View>
            <LoginStatus>{ loginStatus => (
              <View>
                <ListVisitedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} />
                <ListLikedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} />
                <View style={styles.hr} />
                <ListUserVisitedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} />
                <ListUserLikedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} />
                <ListUserPostedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} />
              </View>
            )}</LoginStatus>
          </View>
        </Content>
        <LoginStatus>{ loginStatus => (
          <Fab
            direction="up"
            style={styles.fabStyle}
            position="bottomRight"
            onPress={() => this.checkAuthForCreate(loginStatus)}
          >
            <Icon name="ios-add" style={{ fontSize: Layout.moderateScale(20) }} />
          </Fab>
        )}</LoginStatus>
      </Container>
    );
  }
}
