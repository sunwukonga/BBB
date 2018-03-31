import React from 'react';
import { Image, TouchableOpacity, View, ListView, FlatList } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Fab,
} from 'native-base';
//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';

// style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const dataObjects = [
      {
          id: 'aimg0001'
        , source: Images.trollie
        , flag: false
        , liked: true
        , chatting: true
        , profile_pic: Images.tempUser
        , profile_name: 'Best Buyz'
        , description: 'Pre-loved stroller. Used twice and kept in stoage.'
        , online: false
        , id_level: 2
        , rating: 4
        , num_ratings: 32
        , currency_symbol: '$'
        , sale_price: 250
      },
      {
          id: 'aimg0002'
        , source: Images.trollie
        , flag: false
        , liked: false
        , chatting: false
        , profile_pic: Images.tempUser
        , profile_name: 'Best Buyz'
        , description: 'Pre-loved stroller. Used twice and kept in stoage.'
        , online: true
        , id_level: 4
        , rating: 5
        , num_ratings: 52
        , currency_symbol: '$'
        , sale_price: 250
      },
    ];

    this.state = {
      data: dataObjects,
      active: false,
    };
  }

  _handleMenu(menuitem) {
    this.props.navigation.navigate(menuitem);
  }

  navigatess = () => {
    this.props.navigation.navigate('productDetailsScreen')
  } 
_renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={ ()=>this.navigatess()}>
      <View style={styles.imagesSubView}>

        <View>
          <Image source={item.source} style={styles.rowImage} />
          <TouchableOpacity style={styles.favoriteIconSec} onPress={() => alert('Favorite Clicked')}>
          <View >
            <BBBIcon
              name="Favorite"
              size={Layout.moderateScale(18)}
              //color={Colors.tintColor}
              color={item.liked ? Colors.tintColor : Colors.white}
              style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
            />
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatIconSec} onPress={() => alert('Favorite Clicked')}>
          <View >
            <BBBIcon
              name="Chat"
              size={Layout.moderateScale(18)}
              color={item.chatting ? Colors.tintColor : Colors.white}
              style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
          />
          </View>
          </TouchableOpacity>
        </View>

        <Item style={styles.userItemDetailsSec}>
          <View style={styles.userProfileSec}>
            <Image source={item.profile_pic} style={styles.userProfile} />
            <View style={item.online ? styles.userOnline : styles.userOffline} />
          </View>
          <View style={styles.userNameSec}>
            <Text style={styles.userName}>{item.profile_name}</Text>
          </View>
          <View style={styles.activeuserSec}>
            <IdentityVerification
              width={Layout.moderateScale(30)}
              height={Layout.moderateScale(30)}
              level={item.id_level}
            />
          </View>
        </Item>

        <View>
          <Text style={styles.postDesc}>{item.description}</Text>
        </View>

        <View style={styles.productreviewSec}>
          <View style={styles.ratingSec}>
            <Stars
              size={Layout.moderateScale(14)}
              styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
              styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
              repeats={item.rating}
            />
            <Text style={styles.ratingmsgct}> ({item.num_ratings}) </Text>
          </View>
          <View style={styles.priceSec}>
            <Text style={styles.pricetext}>{item.currency_symbol}{item.sale_price}</Text>
          </View>
        </View>

      </View>
              </TouchableOpacity>
    );

  render() {
    var leftComponent = (
      <Button transparent onPress={() => this._handleMenu('DrawerOpen')}>
        <BBBIcon
          name="Menu"
          size={Layout.moderateScale(18)}
          color={Colors.white}
          style={{ color: Colors.white }}
        />
      </Button>
    );

    var rightComponent = (
      <Button transparent onPress={() => this._handleMenu('categoryScreen')}>
        <BBBIcon
          name="CategoryIcon"
          size={Layout.moderateScale(18)}
          style={{ color: Colors.white }}
        />
      </Button>
    );
    //console.log(this.state.data);
    //console.log(listItemData);
    return (
      <Container>
        <BBBHeader
          title="Bebe Bargains"
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
        <Content style={styles.container}>
          <View>
            <View style={styles.searchSec}>
              <Item regular style={styles.searchItem}>
                <Input
                  placeholder="What are you looking for?"
                  style={styles.mainSearch}
                  keyboardType="default"
                  returnKeyType="search"
                  onSubmitEditing={() =>
                    this.props.navigation.navigate('strollersScreen')
                  }
                />
                <BBBIcon name="Search" style={styles.searchicon} />
              </Item>
            </View>

            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>Most Popular Items</Text>
              </View>
              <FlatList
                horizontal={true}
                data={this.state.data}
                keyExtractor={data => data.id}
                renderItem={this._renderItem}
                contentContainerStyle={styles.listContent}
              />
            </View>

            <View style={styles.adSec}>
              <Text style={styles.mainadText}>
                Do you have something to sell or give away?
              </Text>
              <Text style={styles.subtitle}>
                Post it with us and well give you an audience.
              </Text>
            </View>

            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>
                  Your Recently Visited Items
                </Text>
              </View>
              <FlatList
                horizontal={true}
                data={this.state.data}
                keyExtractor={data => data.id}
                renderItem={this._renderItem}
                contentContainerStyle={styles.listContent}
              />
            </View>
          </View>
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          style={styles.fabStyle}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('loginScreen')}>
          <Icon name="ios-add" style={{ fontSize: Layout.moderateScale(20) }} />
        </Fab>
      </Container>
    );
  }
}
