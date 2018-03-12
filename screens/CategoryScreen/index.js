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

export default class CategoryScreen extends React.Component {


  _renderItem = ({ item }) =>  (
    <List style={styles.mainlist}>
      <ListItem avatar onPress={()=>alert(item.title)}>
        <Left style={styles.body}>
          <View style={styles.bebyview}>
            <Baby height={ Layout.HEIGHT * 0.05 } width= { Layout.HEIGHT * 0.05 } />
          </View>
        </Left>
        <Body style={styles.bodys} >
          <Text style={styles.bodyTitle}>{item.title}</Text>
        </Body>
        <Right style={styles.body}>
          <BBBIcon name='RightArrow' style={styles.nextarrow} size={Layout.moderateScale(14)}/>
        </Right>
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
        <BBBHeader title="Categories" leftComponent={ leftComponent } enableSearch />
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
