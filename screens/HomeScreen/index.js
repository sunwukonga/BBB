import React from 'react';
import {
  Image
, TouchableOpacity
, View
, FlatList,ActivityIndicator
, AsyncStorage
, BackHandler
} from 'react-native';
// For creating Actions. Will move out to external file later
import { NavigationActions } from 'react-navigation';
import {
  Container
, Content
, List
, ListItem
, Text
, Button
, Icon
, Item
, Input
, Fab
} from 'native-base';
//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';
// style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';
//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";

// FlatLists with embedded Queries
import ListRecentListings from './ListRecentListings'
import ListVisitedListings from './ListVisitedListings'
import ListLikedListings from './ListLikedListings'
import ListUserVisitedListings from './ListUserVisitedListings'
import ListUserLikedListings from './ListUserLikedListings'
import ListUserPostedListings from './ListUserPostedListings'

import getProfile from './GetProfile';
import likeProductApi from './LikeProductApi';
// As beautiful as this Component is, it violates a principle and must be removed.
import UpdateLoginState from './UpdateLoginState'

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

const drawerStatus = 'locked-closed';


export default class HomeScreen extends React.Component {

  static navigationOptions = () => ({
    drawerLockMode: drawerStatus,
  });

  onBackPress = () => {
    console.log("onBackPress called to close drawer")
    this.props.navigation.closeDrawer()
    return true
  }
  
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: false,
      countryCode:"",
      limit:10,
      page:1,
    }

    console.log("HOME Constructor Ran.")
    this.drawerBackHandler = null
    const defaultGetStateForAction = MainDrawer.router.getStateForAction;
    MainDrawer.router.getStateForAction = (action, state) => {
      console.log('getStateForAction called');
      if (state && action.type === 'Navigation/OPEN_DRAWER') {
          console.log('<===============>DrawerOpen');
        this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
          console.log('Listener ADDED');
      }
      if (state && action.type === 'Navigation/DRAWER_CLOSED') {
          console.log('<|||||||||||||||>DrawerClose');
        this.drawerBackHandler.remove()
          console.log('Listener REMOVED');
      }
      return defaultGetStateForAction(action, state);
    };
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        if ( this.props.navigation.state && this.props.navigation.state.params ) {
          if ( this.props.navigation.state.params.doAction == 'openDrawer' ) {
            if ( this.state.loginStatus ) {
              console.log("loginStatus was true")
              getProfile()
              .then( myProfile => {
                this.props.navigation.state.params = myProfile
                this.props.navigation.openDrawer()
              })
            } else {
              console.log("loginStatus was false")
            }
          }
        }
      }
    )
  }

  setLoginState = ( logged ) => {
    if (typeof(logged) == typeof(true)) {
      //Object.assign(this.state, { loginStatus: logged })
      this.setState({
        loginStatus: logged
      })
    }
  }
/*
  App = () => (
    <Query query={GET_LOGIN_STATUS}>
      {({ loading, error, data }) => {
         if (loading) return <Text>{`Loading...`}</Text>;
         if (error) return <Text>{`Error: ${error}`}</Text>;

          this.setState({
            loginStatus: data.logged_in
          })
      //	drawerStatus = 'unlocked';
      
          if(login_status==true){
            drawerStatus = 'unlocked';
          }
          else{
          drawerStatus = 'locked-closed';
          }
          
        return (
          <View/>
        )
      }}
    </Query>
  )
*/
  sendLikeRequest(item){
		this.setState({
				progressVisible:true,
		})

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

        //  this._resetAllListValues();

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
    console.log(nextProps)
  }
  */

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
  
  componentDidMount(){
    console.log("Retrieve country")
    this._retrieveCountry()
  }

  //-----------------------------------
  // Auth checking functions
  //-----------------------------------
  checkAuthForCreate = () =>{
    console.log("Log Status: " + this.state.loginStatus);
    if( this.state.loginStatus == false ) {
      this.props.navigation.dispatch(NA_HomeToLoginToCreate);
    } else{
      this.props.navigation.navigate('createNewItemScreen')
    }
  }
 
  checkAuthForChat = (item) => {
    console.log("Log Status: " + this.state.loginStatus);
    if( this.state.loginStatus == false ) {
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer);
    } else {
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

    }
  }

  checkAuthForDrawer=() =>{
    if(this.state.loginStatus==true){
      this.props.navigation.openDrawer()
    }
    else{
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer)
    }
  }

  render() {
    var leftComponent = (
      <Button transparent onPress={() => this.checkAuthForDrawer() }>
        <BBBIcon
          name="Menu"
          size={Layout.moderateScale(18)}
          color={Colors.white}
          style={{ color: Colors.white }}
        />
      </Button>
    );

    var rightComponent = (
      <Button transparent onPress={() => this.props.navigation.navigate( 'categoryScreen' )}>
      
        <BBBIcon
          name="CategoryIcon"
          size={Layout.moderateScale(18)}
          style={{ color: Colors.white }}
        />
      </Button>
    );
    return (
      <Container>
        <UpdateLoginState setLoginState={this.setLoginState} />
        <BBBHeader
          title="Bebe Bargains"
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
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
                  onSubmitEditing={(content) =>
                    /* TODO: this.props.navigation.navigate('searchResultScreen', { searchTerms: content }) */
                    this.props.navigation.navigate('strollersScreen')
                  }
                />
                <BBBIcon name="Search" style={styles.searchicon} />
              </Item>
            </View>

            <ListRecentListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />

            <View style={styles.adSec}>
              <Text style={styles.mainadText}>
                Do you have something to sell or give away?
              </Text>
              <Text style={styles.subtitle}>
                Post it with us and we'll give you an audience.
              </Text>
            </View>

            <ListVisitedListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />
            <ListLikedListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />
            { this.state.loginStatus == true &&
            <View>
              <View style={styles.hr} />
              <ListUserVisitedListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />
              <ListUserLikedListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />
              <ListUserPostedListings variables={{"countryCode":this.state.countryCode,"limit":this.state.limit,"page":this.state.page}} />
            </View>
            }
          </View>
        </Content>
        <Fab
         // active={this.state.active}
          direction="up"
          style={styles.fabStyle}
          position="bottomRight"
          onPress={() => this.checkAuthForCreate()}
        >
          <Icon name="ios-add" style={{ fontSize: Layout.moderateScale(20) }} />
        </Fab>
      </Container>
    );
  }
}
