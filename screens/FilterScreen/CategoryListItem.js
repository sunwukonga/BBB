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
import CheckBox from '../../components/CheckBox';
import CheckboxBlank from '../../components/CheckboxBlank';
import CheckboxChecked from '../../components/CheckboxChecked';
class CategoryListItem extends Component {

  constructor(props) {
    super(props);
  }

  
  onClickCategory(data) {

    	this.props.onClickCategory(data);
  }

  render() {
    let item = this.props.item
    let selectedCateId=this.props.selectedItem

    return (
      <View style={styles.offersListItem} key={'categories_' + item.id}>
        <CheckBox
          style={styles.chboxRemember}
          isChecked={item.id == selectedCateId ? true : false}
          onClick={() => this.onClickCategory(item)}
          checkBoxColor={'#fff'}
          rightText={item.name}
          rightTextStyle={{
            color: Colors.secondaryColor,
            fontSize: Layout.moderateScale(18),
            marginLeft: Layout.moderateScale(10),
            fontFamily: 'roboto-reguler',
          }}
          unCheckedImage={
            <CheckboxBlank
              width={Layout.moderateScale(20)}
              height={Layout.moderateScale(20)}
            />
          }
          checkedImage={
            <CheckboxChecked
              width={Layout.moderateScale(20)}
              height={Layout.moderateScale(20)}
            />
          }
        />
      </View>
      )
  }
}

export default withNavigation(CategoryListItem)
