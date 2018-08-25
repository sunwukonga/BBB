import React from 'react'
import {
  FlatList
, Image
, TouchableOpacity
, View
, Linking
} from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'
import { Ionicons } from '@expo/vector-icons';

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'



export default class AboutUsScreen extends React.Component {

  constructor(props) {
    super(props)
  }



render() {

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    return (
        <Container style={styles.container}>
          <BBBHeader title="About Us" leftComponent={ leftComponent } />
          <Content>
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.linkPadding}
                onPress={() => {
                  Linking.openURL( "http://www.bebebargains.com/privacy-policy/" )
                }}>
                <Ionicons
                  name="ios-link-outline"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.link}>Terms of Use -- BebeBargains</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL( "http://www.bebebargains.com/terms-of-use/" )
                }}>
                <Ionicons
                  name="ios-link-outline"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.link}>Privacy Policy -- BebeBargains</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.getStartedContainer}>
              <View style={styles.hr} />
            </View>

          </Content>
        </Container>
    )
  }
}
