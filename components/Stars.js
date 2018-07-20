import React from 'react';
import { View } from 'react-native';
import BBBIcon from './BBBIcon';
var _key=0,iKey=0;
export default function Stars (props) {
  var stars = [];
  for (var i = 0; i < 5; i++) {
    if (i < props.repeats) {
      stars.push(
       // <View key={i}>
        <BBBIcon
          name="Star"
          size={props.size}
          style={props.styleOn}
        />
        //</View>
      );
    } else {
      stars.push(
        <BBBIcon
          name="Star"
          size={props.size}
          style={props.styleOff}
        />
      );
    }
  }

  return (<View style={{ flexDirection: 'row' }}>{stars.map(star => {
      _key=_key+1;
    return (<View key={_key} >{star}</View>)
  })}</View>);
}
