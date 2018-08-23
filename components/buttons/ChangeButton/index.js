import React, { Component } from 'react';
import {
  View
, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../../constants/';
import { Ionicons } from '@expo/vector-icons';

import SetProfileImage from '../../../graphql/mutations/SetProfileImage'
import SelectAndUploadImage from '../../../graphql/mutations/SelectAndUploadImage'

class ChangeButton extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <SelectAndUploadImage>{ selectAndUploadImage => (
        <SetProfileImage>{ mutateProfileImage => (
          <TouchableOpacity style={styles.favoriteIconSec} onPress={() => {
            console.log("THIS IS WHERE I PRESS")
            selectAndUploadImage()
            .then( uploadedImage => mutateProfileImage( uploadedImage ) )
          }}>
            <View >
              <Ionicons
                name="md-create"
                size={Layout.moderateScale(18)}
                color={Colors.white}
                style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
              />
            </View>
          </TouchableOpacity>
        )}</SetProfileImage>
      )}</SelectAndUploadImage>
    )
  }
}

export default ChangeButton
