import React,{Component} from 'react';
import { Text, Animated, Easing, Platform} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Colors, Layout } from '../constants/';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import SupportScreen from '../screens/SupportScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import FilterScreen from '../screens/FilterScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import StrollersScreen from '../screens/StrollersScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CreateNewItemScreen from '../screens/CreateNewItemScreen';
import ProfileScreen from '../screens/ProfileScreen';


import DrawerContainer from '../screens/DrawerContainer/';


// drawer stack
const DrawerNavigator = createDrawerNavigator(
  {
    homeScreen: { screen: HomeScreen },
    favoriteScreen: { screen: FavoriteScreen },
    notificationScreen: { screen: NotificationScreen },
    settingScreen: { screen: SettingScreen },
    supportScreen: { screen: SupportScreen },
    categoryScreen: { screen: CategoryScreen },
    searchResultScreen: { screen: SearchResultScreen },
    filterScreen: { screen: FilterScreen },
    productDetailsScreen: { screen: ProductDetailsScreen },
    chatDetailScreen: { screen: ChatDetailScreen },
    strollersScreen: { screen: StrollersScreen },
    chatListScreen: { screen: ChatListScreen },
    createNewItemScreen: { screen: CreateNewItemScreen },
    profileScreen: { screen: ProfileScreen },
  },
  {
    gesturesEnabled: false,
    drawerWidth: Layout.WIDTH * 0.82,
    contentComponent: props => <DrawerContainer {...props} />,
  }
);

export default createStackNavigator(
  {
    drawerNavigator: { screen: DrawerNavigator },
  },
  {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
    }),
  }
);
