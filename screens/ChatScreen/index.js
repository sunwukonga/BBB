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

export default class ChatScreen extends React.Component {


 componentDidMount() {

   console.log('my log');
   var jwtt = '';
   jwtt = await Expo.SecureStore.getItemAsync('JWTToken')
   console.log("Chat Log : " + jwtt);

 }

  _renderItem = ({ item }) =>  (
    <List style={styles.mainlist}>
      <ListItem avatar onPress={() => this.props.navigation.navigate('ChatDetailScreen')}>
        <Left style={styles.body}>
          <View style={styles.bebyview}>
            <Baby height={ Layout.HEIGHT * 0.07 } width= { Layout.HEIGHT * 0.07 } />
          </View>
        </Left>
        <Body style={styles.bodys}>
          <ListItem style={{marginLeft: 0}}>
            <Baby height={ Layout.HEIGHT * 0.04 } width= { Layout.HEIGHT * 0.04 } />
            <Text style={{fontSize: 10}}>Pre-loved stroller. Used twice and kept in stoage.</Text>
          </ListItem>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12}}>Leza Klenk</Text>
            <Text style={{fontSize: 10}}>4</Text>
          </View>
        </Body>
      </ListItem>
    </List>
	)

  render() {
    var listItemData = [
      {
        id: 1,
        title: 'Baby Strollers'
      },
      {
        id: 2,
        title: 'Baby Food'
      },
      {
        id: 3,
        title: 'Baby Clothes'
      },
      {
        id: 4,
        title: 'Baby Skincare'
      },
      {
        id: 5,
        title: 'Baby Toys'
      },
      {
        id: 6,
        title: 'Baby Books'
      },
      {
        id: 7,
        title: 'Baby Strollers'
      },
      {
        id: 8,
        title: 'Baby Food'
      },
      {
        id: 9,
        title: 'Baby Clothes'
      },
      {
        id: 10,
        title: 'Baby Skincare'
      },
      {
        id: 11,
        title: 'Baby Toys'
      },
    ];
    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    return (
      <Container style={styles.container}>
        <BBBHeader title="Chats" leftComponent={ leftComponent } />
        <Content>
          <FlatList
            data={listItemData}
            keyExtractor={listItemData => listItemData.id}
            renderItem={this._renderItem}
          />
        </Content>
      </Container>
    );
  }

}
