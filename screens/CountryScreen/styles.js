import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  mainlist: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.mainBottomBorderColor,
    marginLeft: 0,
    marginRight: 0,
  },
  left: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  body: {
    flex: 9,
    borderBottomWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
  },
  backarrow: {
    color: Colors.white,
  },
  countryList: {
    marginLeft: 0,
    paddingLeft: Layout.moderateScale(10),
  },
  flagStyle: {
    height: Layout.HEIGHT * 0.05,
    width: Layout.HEIGHT * 0.05,
  },
  countryNameTxt: {
    color: Colors.secondaryColor,
    fontSize: Layout.moderateScale(16),
    fontFamily: 'roboto-medium',
    alignSelf: 'center'
  },
});
