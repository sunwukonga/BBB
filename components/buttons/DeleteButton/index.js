import React, { Component } from 'react';
import {
  View
, TouchableOpacity
, Text
, Alert
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../../constants/';
import BBBIcon from '../../BBBIcon';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation, NavigationActions } from 'react-navigation'
import { w } from '../../../utils/helpers.js'
import DeleteListing from '../../../graphql/mutations/DeleteListing'

class DeleteButton extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.loginStatus.loginStatus != nextProps.loginStatus.loginStatus) {
      return true
    }
    return false;
  }

  render() {
    const {item, loginStatus } = this.props

    if (loginStatus.myProfile.id != w(item, ['user', 'id'])) {
      // Button should not exist, you can only delete your own listings
      return null
    } else {
      return (
        <DeleteListing listingId={item.id} loginStatus={loginStatus}>{ mutateDeleteListing  => (
          <TouchableOpacity
            style={styles.chatIconSec}
            onPress={ () => {
              Alert.alert(
                'Deletion',
                'Are you sure you want to delete this listing?',
                [
                  {text: 'DELETE', onPress: () => {
                    mutateDeleteListing()
                    .then( () => this.props.navigation.goBack() )
                  }},
                  {text: 'CANCEL', onPress: () => {
                  }},
                ],
                { cancelable: true }
              )
            }}
          >
            <View >
              <Ionicons
                name="ios-trash-outline"
                size={Layout.moderateScale(18)}
                color={Colors.white}
                style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
              />
            </View>
          </TouchableOpacity>
        )}</DeleteListing>
      )
    }
  }
}

export default withNavigation(DeleteButton)
