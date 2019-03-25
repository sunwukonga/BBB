import { Notifications } from 'expo'
import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { BackHandler } from 'react-native'

//import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

// screens
import mainStackNavigator, { DrawerNavigator } from './MainDrawerNavigator';

import LoginScreen from '../screens/LoginScreen';
import CounrtyScreen from '../screens/CountryScreen';
    //initialRouteKey: 'root',
const RootStackNavigator = createStackNavigator(
  {
    mainScreen: { screen: mainStackNavigator },
    loginScreen: { screen: LoginScreen },
    countryScreen: { screen: CounrtyScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'countryScreen',
    gesturesEnabled: false,
  }
);

export default class RootNavigator extends React.Component {

  constructor() {
    super(props)
    //console.log("RootNav:constructor")
    this.homeBackExitHandler = null
//    this.dummyHandler = null
  }

  handleBackExit() {
    BackHandler.exitApp()
    return true
  }
  /*
  handleDummy() {
    console.log('this.props:', this.props);
    return false
  }
  */
  componentDidMount() {
    //this.dummyHandler = BackHandler.addEventListener('hardwareBackPress', this.handleDummy.bind(this));
    //console.log("RootNav:componentDidMount")
    //this._notificationSubscription = this._registerForPushNotifications();
    const defaultGetStateForAction = DrawerNavigator.router.getStateForAction
    DrawerNavigator.router.getStateForAction = (action, state) => {
      //console.log("State: ", state)
      //console.log("Action: ", action)

      //***********************************************
      // Hardware back button handling for home screen
      /*
      if (state && state.routeName === "homeDrawer" && action && action.type === "Navigation/COMPLETE_TRANSITION") {
        if (!state.isDrawerOpen) {
          if (!this.homeBackExitHandler) {
            // Add BackHandler for Exit
            this.homeBackExitHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackExit);
          }
        }
      }
      if (action && action.type === "Navigation/NAVIGATE" ) {
        if (action && action.routeName === "homeDrawer") {
          if (!this.homeBackExitHandler) {
            // Add BackHandler for Exit
            this.homeBackExitHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackExit);
          }
        } else {
          // Remove BackHandler for Exit
          if (this.homeBackExitHandler) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackExit);
            this.homeBackExitHandler = null
          }
        }
      }
      if (state && state.routeName === "homeDrawer") {
        if (action.type === "Navigation/DRAWER_CLOSED") {
          // Add BackHandler for Exit
          if (!this.homeBackExitHandler) {
            this.homeBackExitHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackExit);
          }
        } else if (action && action.type === "Navigation/OPEN_DRAWER") {
          // Remove BackHandler for Exit
          if (this.homeBackExitHandler) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackExit);
            this.homeBackExitHandler = null
          }
        }
      }
      */
      //***********************************************
      /*
      if (this.homeBackExitHandler) {
        console.log("Watching for backpress on home screen")
      } else {
        console.log("Not monitoring backpress on home screen")
      }
      */
      /*
[06:42:36] Action:  Object {
[06:42:36]   "routeName": "homeDrawer",
[06:42:36]   "type": "Navigation/NAVIGATE",
[06:42:36] }

[06:20:31] State:  Object {
[06:20:31]   "closeId": 0,
[06:20:31]   "index": 0,
[06:20:31]   "isDrawerOpen": false,
[06:20:31]   "isTransitioning": false,
[06:20:31]   "key": "id-1538373834923-5",
[06:20:31]   "openId": 0,
[06:20:31]   "routeName": "homeDrawer",
[06:20:31]   "routes": Array [
[06:20:31]     Object {
[06:20:31]       "key": "homeScreen",
[06:20:31]       "params": undefined,
[06:20:31]       "routeName": "homeScreen",
[06:20:31]     },
[06:20:31]   ],
[06:20:31]   "toggleId": 0,
[06:20:31] }

[06:42:41] Action:  Object {
[06:42:41]   "key": "id-1538376152437-1",
[06:42:41]   "type": "Navigation/OPEN_DRAWER",
[06:42:41] }
[06:42:41] State:  Object {
[06:42:41]   "closeId": 0,
[06:42:41]   "index": 0,
[06:42:41]   "isDrawerOpen": false,
[06:42:41]   "isTransitioning": false,
[06:42:41]   "key": "id-1538376152437-1",
[06:42:41]   "openId": 1,
[06:42:41]   "routeName": "homeDrawer",
[06:42:41]   "routes": Array [
[06:42:41]     Object {
[06:42:41]       "key": "homeScreen",
[06:42:41]       "params": undefined,
[06:42:41]       "routeName": "homeScreen",
[06:42:41]     },
[06:42:41]   ],
[06:42:41]   "toggleId": 0,
[06:42:41] }
[06:42:41] Action:  Object {
[06:42:41]   "key": "id-1538376152437-1",
[06:42:41]   "type": "Navigation/DRAWER_OPENED",
[06:42:41] }
      */
      
      //console.log("Component: ", DrawerNavigator.router.getComponentForRouteName('))
      /*
      if (state && state.routes[state.index].routeName == 'homeDrawer' && action.type === 'Navigation/DRAWER_OPENED') {
        //this.drawerOpen = true
        console.log("hardwareBackPress eventListener added")
        this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", DrawerNavigator.router.getActionCreators(state.routes[state.index], state.key).closeDrawer())
      }
      if (state && action.type === 'Navigation/DRAWER_CLOSED') {
        //this.drawerOpen = false
        console.log("DrawerClosed: ", this.drawerBackHandler)
        if (this.drawerBackHandler) {
          this.drawerBackHandler.remove()
          this.drawerBackHandler = null
        }
      }
      */
      return defaultGetStateForAction(action, state);
    };
  }

//console.log("DrawerNavigator: ", DrawerNavigator.router.getActionCreators)

/*
    this.drawerBackHandler = null
    const defaultGetStateForAction = MainDrawer.router.getStateForAction;
    MainDrawer.router.getStateForAction = (action, state) => {
      console.log("State: ", state)
      console.log("Action: ", action)
      if (state && action.type === 'Navigation/OPEN_DRAWER') {
        this.drawerOpen = true
        this.drawerBackHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this))
      }
      if (state && action.type === 'Navigation/DRAWER_CLOSED') {
        this.drawerOpen = false
        this.drawerBackHandler.remove()
        this.drawerBackHandler = null
      }
      return defaultGetStateForAction(action, state);
    };
*/
  componentWillUnmount() {
    //console.log("RootNav:componentWillUnmount")
 //   this._notificationSubscription && this._notificationSubscription.remove();
    //this.dummyHandler && this.dummyHandler.remove()
  }

  render() {
    //console.log("HUH: ", this.props)
    //return <RootStackNavigator screenProps={{ rootNavigation: this.props.navigation }} />;
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

export {
  RootStackNavigator
}
