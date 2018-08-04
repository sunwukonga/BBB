import React,{Component} from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Text, Item } from 'native-base';

// custom components
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Images, Colors, Urls } from '../../constants/';


//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";

//import MainDrawer from '../../navigation/MainDrawerNavigator'

//reset the appolo cache
export default LoggedinState = graphql(gql`
  mutation unsetAuthStatus {
    unsetAuthStatuslogout @client
  }
`)(
  class extends Component {
    constructor(props) {
      super(props)
      /*
      this.props.navigation.addListener(
        'willFocus',
        payload => {
          console.log("BBBBBBBBBBBBBBBBBBBBBBBB")
          getProfile()
          .then( res => {
            console.log("AAAAAAAAAAAAA: ", res)
              if (res.data.getProfile.profileName == 0) {
                this.setState({
                  profileName: res.data.getProfile.profileName,
                })
              }
              if (res.data.getProfile.profileImage) {
                this.setState({
                  profileImageURL:  Urls.s3ImagesUrl + res.data.getProfile.profileImage.imageKey,
                })
              }
          })
        }
      )
*/
      /*
      this.state({
        profileName: ""
      , profileImage: null
      })
      */
/*
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
*/
      /*
      this.props.navigation.addListener(
        'willFocus',
        payload => {
          BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
      )
      this.props.navigation.addListener(
        'willBlur',
        payload => {
      console.log("Drawer BackHandler removed")
          BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
      )
      */
    }
    /*
    componentDidMount() {
      console.log("BBBBBBBBBBBBBBBBBBBBBBBB")
      getProfile()
      .then( res => {
        console.log("AAAAAAAAAAAAA: ", res)
          if (res.data.getProfile.profileName == 0) {
            this.setState({
              profileName: res.data.getProfile.profileName,
            })
          }
          if (res.data.getProfile.profileImage) {
            this.setState({
              profileImageURL:  Urls.s3ImagesUrl + res.data.getProfile.profileImage.imageKey,
            })
          }
      })
    }
*/
    /*
    componentWillUnmount() {
      console.log("Drawer BackHandler removed")
      BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    */
    /*
    onBackPress = () => {
      console.log("onBackPress called to close drawer")
      this.props.navigation.closeDrawer()
      return true
    }
    */

    onLoggedinState = () => {
      this.props.mutate({});
      console.log('onLoggedinState done');
    }

    logout = async () => {
      this.props.navigation.closeDrawer()
      console.log('clicked on logout');
      this.onLoggedinState();
    }

    doesProfileExist = ( name ) => {
      if (this.props.navigation.state.routes && this.props.navigation.state.routes.length > 0) {
        if (this.props.navigation.state.routes[0].params && this.props.navigation.state.routes[0].params.data && this.props.navigation.state.routes[0].params.data.myProfile ) {
          if (this.props.navigation.state.routes[0].params.data.myProfile[name]) {
            return true
          }
        }
      }
      return false
    }

    render() {
      const { navigation } = this.props;
      return (
        <Container style={styles.container} {...this.props}>
            <View style={styles.usersDetailsSec}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('profileScreen')}>
              <Image style={styles.userImage}
                   source={this.doesProfileExist('profileImageURL') ? {uri: navigation.state.routes[0].params.data.myProfile.profileImageURL} : Images.tempUser} />
            </TouchableOpacity>
            <View style={styles.usersDetails}>
              <Text style={styles.userName}>{this.doesProfileExist('profileName') ? navigation.state.routes[0].params.data.myProfile.profileName : ""}</Text>
              {/*
              <Text style={styles.tokenText}>
                BB Token Balance: <Text style={styles.tokenPrice}>$0.00</Text>
              </Text>
              */}
            </View>
          </View>
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
              onPress={() => this.props.navigation.navigate('chatListScreen')}>
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
              onPress={() => navigation.navigate('notificationScreen')}>
              <BBBIcon
                name="Notification"
                size={Layout.moderateScale(20)}
                color={Colors.secondaryColor}
                style={styles.menuIcon}
              />
              <Text style={styles.uglyDrawerItem}>Notifications</Text>
            </Item>
            <Item
              style={styles.borderView}
              onPress={() => navigation.navigate('favoriteScreen')}>
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
              onPress={() => navigation.navigate('settingScreen')}>
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
              onPress={() => navigation.navigate('supportScreen')}>
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
              onPress={this.logout}>
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
      );
    }
  }
);
