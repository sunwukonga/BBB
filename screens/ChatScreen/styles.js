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
    paddingTop: 5,
    paddingBottom: 5,
  },
  body: {
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyTitle: {
    color: Colors.menuuserNameandTokenColor,
    fontSize: Layout.moderateScale(16),
    fontFamily: 'roboto-reguler',
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
  rowImage: {
    height: Layout.WIDTH * 0.48,
    width: Layout.WIDTH * 0.54,
    borderRadius: Layout.HEIGHT * 0.015,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nextarrow: {
    color: Colors.primaryColor,
    fontSize: Layout.moderateScale(18),
    alignSelf: 'center'
  },
  backarrow: {
    color: Colors.white,
  },
})
