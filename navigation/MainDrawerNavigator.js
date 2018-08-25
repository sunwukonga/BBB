import React,{Component} from 'react';
import { Text, Animated, Easing, Platform} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Colors, Layout } from '../constants/';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OwnListingsScreen from '../screens/OwnListingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import SupportScreen from '../screens/SupportScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import FilterScreen from '../screens/FilterScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
// TODO: I'll change the direction eventually
import ChatScreen from '../screens/ChatDetailScreen';
import StrollersScreen from '../screens/StrollersScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CreateNewItemScreen from '../screens/CreateNewItemScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutUsScreen from '../screens/AboutUsScreen';


import DrawerContainer from '../screens/DrawerContainer/';


// drawer stack
const DrawerNavigator = createDrawerNavigator(
  {
    homeScreen: { screen: HomeScreen },
  },
  {
    gesturesEnabled: false,
    drawerWidth: Layout.WIDTH * 0.82,
    contentComponent: props => <DrawerContainer {...props} />,
  }
);
// TODO: Change name of chatDetailScreen ...
export default createStackNavigator(
  {
    homeDrawer: { screen: DrawerNavigator },
    favoriteScreen: { screen: FavoriteScreen },
    ownListingsScreen: { screen: OwnListingsScreen },
    notificationScreen: { screen: NotificationScreen },
    settingScreen: { screen: SettingScreen },
    supportScreen: { screen: SupportScreen },
    categoryScreen: { screen: CategoryScreen },
    searchResultScreen: { screen: SearchResultScreen },
    filterScreen: { screen: FilterScreen },
    productDetailsScreen: { screen: ProductDetailsScreen },
    chatDetailScreen: { screen: ChatScreen },
    strollersScreen: { screen: StrollersScreen },
    chatListScreen: { screen: ChatListScreen },
    createNewItemScreen: { screen: CreateNewItemScreen },
    profileScreen: { screen: ProfileScreen },
    aboutUsScreen: { screen: AboutUsScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'homeDrawer',
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
    }),
  }
);
