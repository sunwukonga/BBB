import React,{Component} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
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


// Get login status
var log_status = '';
const GET_LOGIN_STATUS = gql`
     query log @client{
           logged_in
           jwt_token
        }`;

const App = () => (
<Query query={GET_LOGIN_STATUS}>
  {({ loading, error, data }) => {
     if (loading) return <Text>{`Loading...`}</Text>;
     if (error) return <Text>{`Error: ${error}`}</Text>;
      console.log('get data');
      console.log('profile_query '+data.logged_in);
      console.log('profile_query '+data.jwt_token);

      log_status = data.logged_in;

    return (
      <View/>
    )
  }}
</Query>
)

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

       this.props.navigation.navigate('homeScreen');
       console.log('clicked on logout');
        this.onLoggedinState();

   };

   checkLoginProfile = () =>{
     console.log("Log Status: " + log_status);

     if( log_status == false )
     {
       this.props.navigation.navigate('loginScreen');
     }
     else{
       this.props.navigation.navigate('profileScreen')
     }
   }

   checkLoginChat = () =>{
     console.log("Log Status: " + log_status);

     if( log_status == false )
     {
       this.props.navigation.navigate('loginScreen');
     }
     else{
       this.props.navigation.navigate('chatListScreen')
     }
   }


    render() {
      const { navigation } = this.props;
      return (
        <Container style={styles.container} {...this.props}>
          <App/>
          <View style={styles.usersDetailsSec}>
            <TouchableOpacity onPress={() => this.checkLoginProfile()}>
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
              onPress={() => this.checkLoginChat()}>
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
