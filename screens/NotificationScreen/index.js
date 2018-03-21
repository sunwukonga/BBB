import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default class NotificationScreen extends React.Component {

  render() {
    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    return (
      <Container style={styles.container}>
        <BBBHeader title="Notifications" leftComponent={ leftComponent } />
        <Content>
          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>NotificationScreen</Text>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }

}
