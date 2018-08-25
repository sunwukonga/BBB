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
  linkPadding: {
    paddingTop: Layout.HEIGHT * 0.02,
    paddingBottom: Layout.HEIGHT * 0.02,
  },
	link: {
		height: Layout.HEIGHT * 0.1,
		width: Layout.WIDTH * 0.90,
		borderWidth: Layout.moderateScale(1),
		borderRadius: Layout.moderateScale(8),
		borderColor: Colors.postmain,
		alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: "center",
  },
  hr: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '80%',
    margin: '10%',
  },
})
