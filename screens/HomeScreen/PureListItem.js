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

import LikeButton from './LikeButton'
import CreateChat from '../../graphql/mutations/CreateChat'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'
import GetProfile from '../../graphql/queries/GetProfile'

class PureListItem extends Component {

  constructor(props) {
    super(props);
  }

  // comparisons of important changes here
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item.liked !== nextProps.liked) {
      return true;
    }
    return false;
  }

  render() {
    let {item, loginStatus} = this.props
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
              : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.primaryImage.imageKey+""}} style={styles.rowImage} />
            }
            <LikeButton item={item} loginStatus={loginStatus} />
            { loginStatus.loginStatus &&
              <LastMessageIds>{ chatIndexes => (
                <CreateChat>{ mutateCreateChat  => (
                  <GetProfile>{ currentUser => (
                    <TouchableOpacity
                      style={styles.chatIconSec}
                      onPress={() => {
                        if ( item.chatId ) {
                          this.props.navigation.navigate('chatDetailScreen', {
                            chatId: item.chatId
                          , chatIndexes: chatIndexes
                          })
                        } else {
                          let optimisticResponse = optimisticCreateChat(item, currentUser )
                          mutateCreateChat({
                            variables: { listingId: item.id }
                          , optimisticResponse: optimisticResponse
                          })
                          .then( ({ data: { createChat }}) => {
                            this.props.navigation.navigate('chatDetailScreen', {
                              chatId: createChat.id
                            , chatIndexes: chatIndexes
                            })
                          })
                        }
                      }}
                    >
                      <View >
                        <BBBIcon
                          name="Chat"
                          size={Layout.moderateScale(18)}
                          color={item.chatId!==null ? Colors.tintColor : Colors.white}
                          style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}</GetProfile>
                )}</CreateChat>
              )}</LastMessageIds>
            }
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
