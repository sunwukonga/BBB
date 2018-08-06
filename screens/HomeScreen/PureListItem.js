import React, { Component } from 'react';
import {
  Image
, TouchableOpacity
, View
} from 'react-native';
import {
  Text
, Item
} from 'native-base';
import { withNavigation } from 'react-navigation'
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';

class PureListItem extends Component {

  constructor(props) {
    super(props);
  }

  // comparisons of important changes here
  shouldComponentUpdate(nextProps, nextState) {
    /*if (this.props.color !== nextProps.color) {
      return true;
    }*/
    return false;
  }

  render() {
    let item = this.props.item
    return (
  //  _renderItem = ({ item }) => (

        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate({
          routeName: 'productDetailsScreen',
          params: { previous_screen: 'homeScreen',item:_item}
      }) }>
        <View style={styles.imagesSubView}>

          <View>
          { item.primaryImage===null || item.primaryImage.imageKey===null
           // ? <Image  source={Images.trollie} style={styles.rowImage} />
            ? <Baby style={styles.rowImage} />
            : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.primaryImage.imageKey+""}} style={styles.rowImage} />
          }
  <Text>{
  /*
            TODO: Pressing favorite should make a call to:
              likeListing(
                listingId: Int!
                like: Boolean = true
              ): Boolean
              ----------------> listingId = item.id
  */
  }</Text>
            <TouchableOpacity style={styles.favoriteIconSec} onPress={() => this.sendLikeRequest(item)}>
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
            <TouchableOpacity style={styles.chatIconSec} onPress={() => this.checkLoginChat(item)/* TODO: No checking, use a NavigationAction or StackAction. Auth checking should be done in ChatScreen and ChatListScreen */}>
            <View >
              <BBBIcon
                name="Chat"
                size={Layout.moderateScale(18)}
                color={item.chatId!==null ? Colors.tintColor : Colors.white}
                style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
            />
            </View>
            </TouchableOpacity>
          </View>

          <Item style={styles.userItemDetailsSec}>
            <View style={styles.userProfileSec}>


              {item.user.profileImage===null || item.user.profileImage.imageKey===null ?
                  //<Image  source={Images.tempUser} style={styles.userProfile} /> 
                  <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
                : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.user.primaryImage.imageKey+""}} style={styles.userProfile} />
              }

              <View style={item.user.online ? styles.userOnline : styles.userOffline} />
            </View>
            <View style={styles.userNameSec}>
              <Text style={styles.userName}>{item.user.profileName}</Text>
            </View>
            <View style={styles.activeuserSec}>
              <IdentityVerification
                width={Layout.moderateScale(30)}
                height={Layout.moderateScale(30)}
                level={item.user.idVerification}
              />
            </View>
          </Item>

          <View>
            <Text style={styles.postDesc} numberOfLines={3}>{item.description}</Text>
          </View>

          <View style={styles.productreviewSec}>
            <View style={styles.ratingSec}>
              <Stars
                size={Layout.moderateScale(14)}
                styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
                styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
                repeats={item.user.sellerRating}
              />
              <Text style={styles.ratingmsgct}> ({item.user.sellerRatingCount}) </Text>
            </View>
            <View style={styles.priceSec}>
              <Text style={styles.pricetext}>{item.saleMode.currency!==null ? item.saleMode.currency.currencySymbol : ""}{item.saleMode.price ? item.saleMode.price : ""}</Text>
            </View>
          </View>

        </View>
                </TouchableOpacity>
      )
  }
}

export default withNavigation(PureListItem)
