import React from 'react';
import { Image, View, ImageBackground } from 'react-native';
//import { Mutation } from 'react-apollo';
//import gql from 'graphql-tag';
import { Container, Content, Left, Text, Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom components
import BebeBARGAINS from '../../components/BebeBARGAINS';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

import FacebookLogin from './Facebook';
/*
const FACEBOOK_LOGIN = gql`
  mutation loginFacebook($token: String!) {
    loginFacebook(token: $token)
  }
`; */

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      token: '',
      ArriverFrom: '',
    }
  }

  componentDidMount = async () => {

    let jwtt = '';
    jwtt = await Expo.SecureStore.getItemAsync('JWTToken').then();
    console.log("Chat Log : " + jwtt);

    if(jwtt == '' || jwtt == null || jwtt.length == 0)
    {
      let arriveFrom = '';
      arriveFrom = await Expo.SecureStore.getItemAsync('ArrivedFrom').then();
      this.setState({ArriverFrom: arriveFrom})
      console.log("Chat Log : " + this.state.ArriverFrom);

      if(this.state.ArriverFrom == 'ChatListScreen')
      {
        this.props.navigation.navigate('ChatListScreen');
      }
      if(this.state.ArriverFrom == 'ProfileScreen')
      {
        this.props.navigation.navigate('ProfileScreen');
      }
      if(this.state.ArriverFrom == 'CreateNewItemScreen')
      {
        this.props.navigation.navigate('CreateNewItemScreen');
      }
    }


    // let arriveFrom = '';
    // arriveFrom = await Expo.SecureStore.getItemAsync('ArrivedFrom').then();
    // this.setState({ArriverFrom: arriveFrom})
    // console.log("Chat Log : " + this.state.ArriverFrom);
    //
    // if(this.state.ArriverFrom == 'ChatListScreen')
    // {
    //   this.props.navigation.navigate('ChatListScreen');
    // }
    // if(this.state.ArriverFrom == 'ProfileScreen')
    // {
    //   this.props.navigation.navigate('ProfileScreen');
    // }
    // if(this.state.ArriverFrom == 'CreateNewItemScreen')
    // {
    //   this.props.navigation.navigate('CreateNewItemScreen');
    // }

  }

  componentWillMount() {
     var that = this;
 };

  render() {
    var leftComponent = (
      <Button
        transparent
        onPress={() => this.props.navigation.navigate('homeScreen')}>
        <BBBIcon
          name="BackArrow"
          size={Layout.moderateScale(18)}
          style={styles.backarrow}
        />
      </Button>
    );
    return (
      <Container style={styles.container}>
        <View style={styles.container}>
          <ImageBackground source={Images.bg} style={styles.mainimgbg}>
            <BBBHeader title="Login" leftComponent={leftComponent} />
            <View style={styles.welcomeContainer}>
              <BebeBARGAINS
                width={Layout.WIDTH * 0.4}
                height={Layout.WIDTH * 0.8}
              />
              <Text style={styles.connectSec}>
                <Ionicons
                  name="ios-remove-outline"
                  style={[
                    styles.lineStyle,
                    { marginRight: Layout.moderateScale(10) },
                  ]}
                />{' '}
                CONNECT WITH{' '}
                <Ionicons
                  name="ios-remove-outline"
                  style={[
                    styles.lineStyle,
                    { marginLeft: Layout.moderateScale(10) },
                  ]}
                />
              </Text>
              <View style={styles.socialSec}>
                <View style={styles.facebookSec}>
                  <FacebookLogin />
                </View>
                {/*
                <View style={styles.googleSec} >
                  <FontAwesome
                    name="google-plus"
                    size={Layout.moderateScale(25)}
                    style={{
                      color: Colors.googlebgicon,
                    }}
                    onPress={() => this.props.navigation.navigate('createNewItemScreen')}
                  />
                </View>
                */}
              </View>
            </View>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}

      /*
                  <Mutation mutation={FACEBOOK_LOGIN}>
                    {(loginFacebook, { data }) => (
                      <FontAwesome
                        name="facebook"
                        size={Layout.moderateScale(25)}
                        style={{
                          color: Colors.fbbgicon,
                        }}
                        onPress={async () => {
                          const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('279793089219775', {
                            permissions: ['public_profile', 'email'],
                          });
                          if (type === 'success') {
                            console.log(token);
                            const data = await loginFacebook({
                              variables: { token: token },
                            })
                            console.log(data);
                          }
                        }}
                      />
                    )}
                  </Mutation>
                  */
