import React,{Component} from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Text, Item } from 'native-base';

// custom components
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Images, Colors } from '../../constants/';


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
  mutation logout {
    logout @client
  }
`)(
  class extends Component {
    constructor(props) {
      super(props)
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
        'didFocus',
        payload => {
      console.log("Drawer BackHandler added")
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
      console.log("Drawer BackHandler added")
      BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
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

    render() {
      const { navigation } = this.props;
      return (
        <Container style={styles.container} {...this.props}>
            <View style={styles.usersDetailsSec}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
              <Image style={styles.userImage}
                   source={Images.tempUser} />
            </TouchableOpacity>
            <View style={styles.usersDetails}>
              <Text style={styles.userName}>Leza Klenk</Text>
              <Text style={styles.tokenText}>
                BB Token Balance: <Text style={styles.tokenPrice}>$0.00</Text>
              </Text>
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
