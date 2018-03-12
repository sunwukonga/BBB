import { Platform, StyleSheet } from 'react-native'
import { Layout, Colors } from '../../constants/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white
  },
  mainlist: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.categorylistBorder,
    marginLeft: 0,
    marginRight: 0,
  },
  body: {
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodys: {
    borderBottomWidth: 0
  },
  bebyview: {
    margin: Layout.HEIGHT * 0.01,
    borderRadius: Layout.HEIGHT * 0.035,
    height: Layout.HEIGHT * 0.07,
    width: Layout.HEIGHT * 0.07,
    borderWidth: 1,
    borderColor: Colors.categoryAvtarBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextarrow: {
    color: Colors.primaryColor,
    fontSize: Layout.moderateScale(20),
    alignSelf: 'center'
  },
  backarrow: {
    color: Colors.white,
  },
  countryList: {
    marginLeft: 0,
    paddingLeft: Layout.moderateScale(10)
  },
  flagStyle: {
    height: Layout.HEIGHT * 0.05,
    width: Layout.HEIGHT * 0.05
  },
  selectCountryCheck: {
    paddingTop: (Platform.OS === 'ios' ? null : Layout.moderateScale(3)), 
    marginRight: Layout.moderateScale(10),
    width: Layout.moderateScale(20),
    height: Layout.moderateScale(20),
    borderRadius: Layout.moderateScale(10)
  },
})
