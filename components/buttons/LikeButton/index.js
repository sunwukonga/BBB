import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../../constants/';
import BBBIcon from '../../BBBIcon';
import { withNavigation, NavigationActions } from 'react-navigation'

import {
  LIKE_LISTING
} from '../../../graphql/Mutations'
import {
  GET_USER_LIKED_LIST
} from '../../../graphql/Queries'
import { w } from '../../../utils/helpers.js'
import { ToggleLike } from '../../../graphql/mutations/ToggleLike'

const NA_LikeToLoginToHome = ( item, mutateToggleLike ) => NavigationActions.navigate({
  routeName: 'loginScreen'
, params: { dest: 'homeScreen'
          , listingId: item.id
          , ownerId: w(item, ['user', 'id'])
          , mutateToggleLike: mutateToggleLike
          }
})

class LikeButton extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['item', 'liked']) !== w(nextProps, ['item', 'liked']) ) {
      return true
    }
    return false;
  }


  navOrToggle( mutateToggleLike, item, loginStatus ) {
    console.log("navOrToggle called")
    if ( loginStatus.authorized ) {
      // Toggle the like
      console.log("LikeButton Pressed.")
      mutateToggleLike({ listingId: item.id, like: !item.liked })
      .then( ({ data: { likeListing }}) => {
        // Signal that like has changed...
        /*item.liked = true
        this.setState({
          toggle: !this.state.toggle
        }) */
      })
    } else {
      this.props.navigation.dispatch(NA_LikeToLoginToHome( item, mutateToggleLike ))
    }
  }

  render() {
    const {item, loginStatus} = this.props

    if (loginStatus.myProfile.id == w(item, ['user', 'id'])) {
      // Cannot like your own listing. Button should not exist.
      return null
    } else {
      return (
        <ToggleLike item={item} loginStatus={loginStatus}>{ mutateToggleLike  => (
          <TouchableOpacity style={styles.favoriteIconSec} onPress={() => this.navOrToggle( mutateToggleLike, item, loginStatus ) }>
            <View >
              <BBBIcon
                name="Favorite"
                size={Layout.moderateScale(18)}
                color={w(item, ['liked']) ? Colors.tintColor : Colors.white}
                style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
              />
            </View>
          </TouchableOpacity>
        )}</ToggleLike>
      )
    }
  }
}

export default withNavigation(LikeButton)
