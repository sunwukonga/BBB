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

export default class SearchResultScreen extends React.Component {

  render() {
    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    var rightComponent =  <Button transparent onPress={()=>this.props.navigation.navigate('filterScreen')}>
                            <BBBIcon name="CategoryIcon" size={Layout.moderateScale(18)} style={{color: '#ffffff'}} />
                          </Button>

    return (
      <Container style={styles.container}>
        <BBBHeader title="Strollers" leftComponent={ leftComponent } rightComponent={ rightComponent }/>
        <Content>
          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>SearchResultScreen</Text>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }

}
