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
  dataFacetoFace: {
    flex: 1,
    margin: Layout.HEIGHT * 0.02,
  },
  txtTitle: {
    marginBottom: Layout.HEIGHT * 0.01,
    fontSize: Layout.moderateScale(17),
    fontFamily: 'roboto-reguler',
  },
  dateDropDown: {
    borderWidth: 0.8,
    borderColor: '#c8d5d5',
    paddingLeft: Layout.moderateScale(10),
    paddingRight: Layout.moderateScale(10),
    paddingTop: Layout.moderateScale(10),
    borderRadius: Layout.moderateScale(3),
    backgroundColor: Colors.white,
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
  changeCountryContainer: {
    paddingTop: Layout.WIDTH * 0.05
  , paddingRight: Layout.WIDTH * 0.10
  },
  changeCountry: {
    backgroundColor: 'transparent',
    width: Layout.WIDTH * 0.20,
    height: Layout.WIDTH * 0.20,
    position: 'absolute',
    top: 0,
    left: Layout.WIDTH * 0.10,
  },
  flagStyle: {
    height: Layout.WIDTH * 0.20,
    width: Layout.WIDTH * 0.20,
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
	swiperSec: {
		height: Layout.HEIGHT * 0.4,
	},
	rowImage: {
		height: Layout.HEIGHT * 0.4,
		width: Layout.WIDTH * 0.92,
		borderWidth: Layout.moderateScale(1),
		borderRadius: Layout.moderateScale(8),
		borderColor: Colors.postmain,
		resizeMode: 'cover',
		alignSelf: 'center',
  },
  hr: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '80%',
    margin: '10%',
  },
})
