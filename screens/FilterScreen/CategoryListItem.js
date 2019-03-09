import React, { Component } from 'react';
import {
  View
} from 'react-native';
//import { withNavigation } from 'react-navigation'
import styles from './styles';
import { Layout, Colors } from '../../constants/';
//import Baby from '../../components/Baby';
//import IdentityVerification from '../../components/IdentityVerification';
//import BBBIcon from '../../components/BBBIcon';
//import Stars from '../../components/Stars';
import CheckBox from '../../components/CheckBox';
import CheckboxBlank from '../../components/CheckboxBlank';
import CheckboxChecked from '../../components/CheckboxChecked';

class CategoryListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {item, categoryIds} = this.props

    return (
      <View style={styles.offersListItem} key={'categories_' + item.id}>
        <CheckBox
          style={styles.chboxRemember}
          isChecked={categoryIds.includes(item.id)}
          onClick={() => this.props.onClickCategory({id: item.id, selected: !categoryIds.includes(item.id)})}
          checkBoxColor={'#fff'}
          rightText={item.childName}
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

export default CategoryListItem
