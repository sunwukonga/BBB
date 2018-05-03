import React,{Component} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Text, Item } from 'native-base';

// custom components
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Images, Colors } from '../../constants/';
import { ApolloProvider, graphql,Mutation } from "react-apollo";

import { ApolloClient } from "apollo-client";
import { withClientState,resolvers,defaults } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import client from '../../config/Client';


//reset the appolo cache


export default LoggedinState = graphql(gql`
  mutation logout {
    logout @client
  }
`)(
  class extends Component {

    onLoggedinState = () => {
      this.props.mutate({});
      console.log('onLoggedinState done');

    };

    logout = async () => {

        await Expo.SecureStore.setItemAsync('JWTToken', '');

       this.props.navigation.navigate('homeScreen');
       console.log('clicked on logout');
        this.onLoggedinState();

   };
    render() {
      const { navigation } = this.props;
      return (
        <Container style={styles.container} {...this.props}>
          <View style={styles.usersDetailsSec}>
            <TouchableOpacity onPress={() => navigation.navigate('profileScreen')}>
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
              onPress={() => navigation.navigate('homeScreen')}>
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
              onPress={() => navigation.navigate('chatListScreen')}>
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
