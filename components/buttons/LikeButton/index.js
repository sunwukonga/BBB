import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../../constants/';
import BBBIcon from '../../BBBIcon';

import {
  LIKE_LISTING
} from '../../../graphql/Mutations'
import {
  GET_USER_LIKED_LIST
} from '../../../graphql/Queries'


class LikeButton extends Component {
  constructor(props) {
    super(props);
  }

  updateUserLikedListings = (prevArray, newItem) => {
    if (newItem.liked) {
      return prevArray.filter( item => item.id != newItem.id )
    } else {
      let item = Object.assign({}, newItem)
      item.liked = true
      item.likes = item.likes + 1
      console.log("NEW_ITEM: ", item)
      console.log("1ST_OF_ARRAY: ", prevArray[0])
      return prevArray.filter( item => item.id != newItem.id ).unshift( item )
    }
  }

  render() {
    const {item, loginStatus} = this.props

    if ( loginStatus.loginStatus && (loginStatus.userId != item.user.id) ) {
      return (
        <Mutation
          mutation={LIKE_LISTING}
          update={(cache, { data: { likeListing } }) => {
            const { getUserLikedListings } = cache.readQuery({
              query: GET_USER_LIKED_LIST
            , variables: {"countryCode":'SG',"limit":10,"page":1}
            })
            const newUserLikedListings = this.updateUserLikedListings( getUserLikedListings, item )
            cache.writeQuery({
              query: GET_USER_LIKED_LIST,
              data: { getUserLikedListings : newUserLikedListings }
            })
          }}
        >
          {(likeListing, { data }) => (
            <TouchableOpacity style={styles.favoriteIconSec} onPress={() => likeListing({ variables: { listingId: item.id, like: !item.liked } }) }>
              <View >
                <BBBIcon
                  name="Favorite"
                  size={Layout.moderateScale(18)}
                  color={item.liked ? Colors.tintColor : Colors.white}
                  style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
                />
              </View>
            </TouchableOpacity>
          )}
        </Mutation>
      )
    } else {
      return null
    }
  }
}

export default LikeButton
