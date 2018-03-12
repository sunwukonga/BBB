import React from 'react';
import { Text, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
	TabNavigator,
	TabBarBottom,
	StackNavigator,
	DrawerNavigator,
} from 'react-navigation';

import { Colors, Layout } from '../constants/';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import SupportScreen from '../screens/SupportScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import FilterScreen from '../screens/FilterScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import CreateNewItemScreen from '../screens/CreateNewItemScreen';

import DrawerContainer from '../screens/DrawerContainer/';

// const noTransitionConfig = () => ({
//   transitionSpec: {
//     duration: 0,
//     timing: Animated.timing,
//     easing: Easing.step0
//   }
// })

// drawer stack
const DrawerStack = DrawerNavigator(
	{
		homeScreen: { screen: HomeScreen },
		chatScreen: { screen: ChatScreen },
		favoriteScreen: { screen: FavoriteScreen },
		notificationScreen: { screen: NotificationScreen },
		settingScreen: { screen: SettingScreen },
		supportScreen: { screen: SupportScreen },
		categoryScreen: { screen: CategoryScreen },
		searchResultScreen: { screen: SearchResultScreen },
		filterScreen: { screen: FilterScreen },
		productDetailsScreen: { screen: ProductDetailsScreen },
		chatDetailScreen: { screen: ChatDetailScreen },
		CreateNewItemScreen: { screen: CreateNewItemScreen },
	},
	{
		gesturesEnabled: false,
		drawerWidth: Layout.WIDTH * 0.82,
		contentComponent: props => <DrawerContainer {...props} />,
	}
);

export default StackNavigator(
	{
		DrawerStack: { screen: DrawerStack },
	},
	{
		headerMode: 'none',
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false,
		}),
	}
);

// // login stack
// const LoginStack = StackNavigator({
//   loginScreen: { screen: LoginScreen },
// }, {
//   headerMode: 'float',
//   navigationOptions: {
//     headerStyle: {backgroundColor: 'red'},
//     title: 'You are not logged in'
//   }
// })

// Manifest of possible screens
// const PrimaryNav = StackNavigator({
//   loginStack: { screen: LoginStack },
//   drawerStack: { screen: DrawerNavigation }
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   title: 'Main',
//   initialRouteName: 'loginStack',
//   transitionConfig: noTransitionConfig
// })
