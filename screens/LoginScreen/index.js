import React from 'react'
import { Image, TouchableOpacity, View , ImageBackground } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Title, Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

// screen style
import styles from './styles'
import { Layout, Colors, Images } from '../../constants/'

export default class LoginScreen extends React.Component {

  render() {
    var leftComponent = <Button transparent onPress={()=>this.props.navigation.navigate('mainScreen')}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>
    return (
      <Container style={styles.container}>
        <View style={styles.container}>
        <ImageBackground source={Images.bg} style={styles.mainimgbg}>
          <BBBHeader title="Login" leftComponent={ leftComponent } />
          <View style={styles.welcomeContainer}>
            <Image source={Images.logo} style={styles.mainlogo}/>
            <Text style={styles.connectSec}>
              <Ionicons name="ios-remove-outline" style={[styles.lineStyle,{marginRight: Layout.moderateScale(10)}]} /> CONNECT WITH <Ionicons name="ios-remove-outline" style={[styles.lineStyle,{marginLeft: Layout.moderateScale(10)}]}/>
            </Text>
            <View style={styles.socialSec}>
              <View style={styles.facebookSec}>
                <FontAwesome name="facebook" style={{color: '#6485ca', fontSize: Layout.moderateScale(20)}}/>
              </View>
              <View style={styles.googleSec}>
                <FontAwesome name="google-plus" style={{color: '#fb5f3b', fontSize: Layout.moderateScale(20)}}/>
              </View>
            </View>
          </View>
        </ImageBackground>
       </View>
      </Container>
    );
  }

}
