import React from 'react'
import { View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Container, Header, Content, Button, Text, Item, Icon } from 'native-base'
import BBBIcon from '../../components/BBBIcon'

import { Layout, Images, Colors } from '../../constants/'
import styles from './styles'

export default class DrawerContainer extends React.Component {

  logout = () => {
    alert('logout')
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    // const actionToDispatch = NavigationActions.reset({
    //   index: 0,
    //   key: null,  // black magic
    //   actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    // })
    // this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    const { navigation } = this.props
    return (
      <Container style={styles.container}>
        <View style={styles.usersDetailsSec}>
          <View>
            <Image style={styles.userImage} source={Images.tempUser}/>
          </View>
          <View style={styles.usersDetails}>
            <Text style={styles.userName}>Leza Klenk</Text>
            <Text style={styles.tokenText}>
              BB Token Balance: <Text style={styles.tokenPrice}>$0.00</Text>
            </Text>
          </View>
        </View>
        <Content style={styles.content}>
          <Item style={styles.borderView} onPress={() => navigation.navigate('homeScreen')}>
            <BBBIcon name="Home" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Home</Text>
          </Item>
          <Item style={styles.borderView} onPress={() => navigation.navigate('chatScreen')}>
            <BBBIcon name="Chat" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Chat</Text>
          </Item>
          <Item style={styles.borderView} onPress={() => navigation.navigate('notificationScreen')}>
            <BBBIcon name="Notification" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Notifications</Text>
          </Item>
          <Item style={styles.borderView} onPress={() => navigation.navigate('favoriteScreen')}>
            <BBBIcon name="Favorite" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Favorites</Text>
          </Item>
          <Item style={styles.borderView} onPress={() => navigation.navigate('settingScreen')}>
            <BBBIcon name="Settings" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Settings</Text>
          </Item>
          <Item style={styles.borderView} onPress={() => navigation.navigate('supportScreen')}>
            <BBBIcon name="Support" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Support</Text>
          </Item>
          <Item style={[styles.borderView,{borderBottomWidth: 0, borderBottomColor: Colors.menuitemborder}]} onPress={this.logout}>
            <BBBIcon name="Logout" size={Layout.moderateScale(20)} color="#272727" style={styles.menuIcon}/>
            <Text style={styles.uglyDrawerItem}>Log Out</Text>
          </Item>
        </Content>
      </Container>
    )
  }
}
