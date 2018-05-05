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
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'roboto-reguler',
  },
})
