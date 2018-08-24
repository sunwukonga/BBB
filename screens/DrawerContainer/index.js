import React,{Component} from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Text, Item } from 'native-base';

// custom components
import BBBIcon from '../../components/BBBIcon';
import { Ionicons } from '@expo/vector-icons';

// screen style
import styles from './styles';
import { Layout, Images, Colors, Urls } from '../../constants/';

//apollo client
import { graphql } from "react-apollo";
import {
  UNSET_AUTH_STATUS
} from '../../graphql/Mutations'
import LoginStatus from '../HomeScreen/LoginStatus'
//import MainDrawer from '../../navigation/MainDrawerNavigator'

//reset the appolo cache
export default LoggedinState = graphql(UNSET_AUTH_STATUS)(
  class extends Component {
    constructor(props) {
      super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return false
    }

    w = ( root, nested ) => {
      if (!root) return null
      return nested.reduce( (acc, cur) => {
        if (!acc) return null
        if (acc[cur]) return acc[cur]
        else return null
      }, root)
    }

    render() {
      const { navigation } = this.props;
      console.log("Render DRAWER")
      return (
        <LoginStatus>{ loginStatus => (
          <Container style={styles.container} >
            {loginStatus.loginStatus ?
              <View style={styles.usersDetailsSec}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('profileScreen')
                }}>
              {(this.w(loginStatus, ['myProfile', 'profileImageURL']))
              ? <Image style={styles.userImage} source={{uri: loginStatus.myProfile.profileImageURL}} />
              : <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
              }
              </TouchableOpacity>
              <View style={styles.usersDetails}>
                <Text style={styles.userName}>{(this.w(loginStatus, ['myProfile', 'profileName'])) ? loginStatus.myProfile.profileName : ""}</Text>
                {/*
                <Text style={styles.tokenText}>
                  BB Token Balance: <Text style={styles.tokenPrice}>$0.00</Text>
                </Text>
                */}
                </View>
              </View>
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
                style={styles.borderView}
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
                  navigation.navigate('settingScreen')
                }}>
                <BBBIcon
                  name="Settings"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.uglyDrawerItem}>Settings</Text>
              </Item>
              <Item
                style={styles.borderView}
                onPress={() => {
                  navigation.navigate('supportScreen')
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
      );
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
