import React, { Component } from 'react';
import {
  Image
, TouchableOpacity
, View
, Text
} from 'react-native';
import {
  Item
} from 'native-base';
import { withNavigation } from 'react-navigation'
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';

import LikeButton from '../../components/buttons/LikeButton'
import ChatButton from '../../components/buttons/ChatButton'
import CreateChat from '../../graphql/mutations/CreateChat'
import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'
import GetProfile from '../../graphql/queries/GetProfile'
import { w } from '../../utils/helpers.js'

class PureListItem extends Component {

  constructor(props) {
    super(props);
  }

  // comparisons of important changes here
  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['item', 'liked']) !== w(nextProps, ['item', 'liked']) ) {
      return true
    }
    if ( w(this.props, ['item', 'chatId']) !== w(nextProps, ['item', 'chatId']) ) {
      return true
    }
    return false;
  }

  render() {
    let {item, loginStatus, chatIndexes, currentUser } = this.props
    return (
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate({
            routeName: 'productDetailsScreen'
          , params: {
              previous_screen: 'homeScreen'
            , item: item
            , loginStatus: loginStatus
            }
          })}
        >
        <View style={styles.imagesSubView}>
          <View>
            { item.primaryImage===null || item.primaryImage.imageKey===null
              ? <Baby style={styles.rowImage} />
              : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.primaryImage.imageKey}} style={styles.rowImage} />
            }
            <Text>{ console.log("Pure: ", item.id, ", ", item.chatId) }</Text>
            <LikeButton item={item} loginStatus={loginStatus} />
            <ChatButton item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} currentUser={currentUser} />
          </View>

          <Item style={styles.userItemDetailsSec}>
            <View style={styles.userProfileSec}>


              {item.user.profileImage===null || item.user.profileImage.imageKey===null
                ? <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
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
