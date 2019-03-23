import React, { Component } from 'react';
import {
  Image
, TouchableOpacity
, View
, Text
} from 'react-native';
import {
  Item
, Icon
} from 'native-base';
import { withNavigation } from 'react-navigation'
import styles from './styles';
import { Layout, Colors, Urls} from '../../constants/';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';

import LikeButton from '../../components/buttons/LikeButton'
import ChatButton from '../../components/buttons/ChatButton'
import DeleteButton from '../../components/buttons/DeleteButton'
import CreateChat from '../../graphql/mutations/CreateChat'
import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'
import GetProfile from '../../graphql/queries/GetProfile'
import { w, i18n } from '../../utils/helpers.js'

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
    if (w(this.props, ['loginStatus', 'myProfile', 'id']) != w(nextProps, ['loginStatus', 'myProfile', 'id'])) {
      return true
    }
    return false;
  }

  render() {
    let {item, loginStatus, chatIndexes, createNew, resetTo, translations } = this.props
    const parentName = "HomeScreen"
    if ( item.emptyList ) {
      return (
        <TouchableOpacity onPress={ createNew } >
          <View style={styles.imagesSubView}>
            <Text style={{ textAlign: 'center' }}>{i18n(translations, parentName, "NoRecent", loginStatus.iso639_2, "No recent listings")}</Text>
            <Baby style={styles.babyIcon} />
            <Text style={{ textAlign: 'center' }}>{i18n(translations, parentName, "ClickToCreate", loginStatus.iso639_2, "Click on me to create a new listing")}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    if (item.deleted) {
      return null
    }

    function OtherImage( props ) {
      const {item} = props
      if ( w(item, ['user', 'profileImage', 'imageKey']) || w(item, ['user', 'profileImage', 'imageURL']) ) {
        if ( w(item, ['user', 'profileImage', 'imageKey']) ) {
          return <Image source={{ uri: Urls.s3ImagesURL + item.user.profileImage.imageKey }} style={styles.userProfile} />
        } else {
          return <Image source={{ uri: item.user.profileImage.imageURL }} style={styles.userProfile} />
        }
      } else {
        return <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
      }
    }

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
            { w(item, ['primaryImage', 'imageKey']) === null
              ? <Baby style={styles.rowImage} />
              : <Image source={{ uri: Urls.s3ImagesURL + item.primaryImage.imageKey }} style={styles.rowImage} />
            }
            <LikeButton item={item} loginStatus={loginStatus} />
            <ChatButton item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} />
            <DeleteButton item={item} loginStatus={loginStatus} resetTo={resetTo} />
          </View>

          <Item style={styles.userItemDetailsSec}>
            <View style={styles.userProfileSec}>
              <OtherImage item={item} />
              <View style={ w(item, ['user', 'online']) ? styles.userOnline : styles.userOffline} />
            </View>
            <View style={styles.userNameSec}>
              <Text style={styles.userName}>{ w(item, ['user', 'profileName']) }</Text>
            </View>
            <View style={styles.activeuserSec}>
              <IdentityVerification
                width={Layout.moderateScale(30)}
                height={Layout.moderateScale(30)}
                level={ w(item, ['user', 'idVerification']) }
              />
            </View>
          </Item>

          <View>
            <Text style={styles.postDesc} numberOfLines={2}>{item.title}</Text>
          </View>

          <View style={styles.productreviewSec}>
            <View style={styles.ratingSec}>
              <Stars
                size={Layout.moderateScale(14)}
                styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
                styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
                repeats={ w(item, ['user', 'sellerRating']) }
              />
              <Text style={styles.ratingmsgct}> ({ w(item, ['user', 'sellerRatingCount']) }) </Text>
            </View>
            <View style={styles.priceSec}>
              <Text style={styles.pricetext}>{w(item, ['saleMode', 'currency']) && w(item, ['saleMode', 'price']) ? item.saleMode.currency.currencySymbol : ""}{w(item, ['saleMode', 'price']) ? item.saleMode.price.toFixed(2) : ""}</Text>
              { w(item, ['saleMode', 'mode']) === 'DONATE' ?
              <Text>Donated</Text>
              : null }
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(PureListItem)
