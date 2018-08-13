import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
	},
	mainContent: {
		flexDirection: 'row',
		width: Layout.WIDTH,
		height:
			Platform.OS === 'ios' ? Layout.HEIGHT * 0.91 : Layout.HEIGHT * 0.875,
	},
	contents: {
		width: Layout.WIDTH * 0.15,
		height: Layout.HEIGHT,
		backgroundColor: Colors.secondaryColor,
		borderWidth: 0,
		borderColor: Colors.white,
	},
	rightComponentStyle: {
		flexDirection: 'row',
		marginRight: Layout.moderateScale(10),
	},
	headerText: {
		color: Colors.white,
		fontSize: Layout.moderateScale(15),
		fontFamily: 'roboto-reguler',
	},
	filterContentSec: {
		flexDirection: 'column',
		borderRightWidth: 0.3,
		borderRightColor: Colors.white,
	},
	backarrow: {
		color: Colors.white,
	},
	chboxRemember: {
		backgroundColor: 'transparent',
		margin: Layout.HEIGHT * 0.02,
	},
	cancle: {
		marginRight: Layout.WIDTH * 0.015,
	},
	filterTitle: {
		width: Layout.WIDTH * 0.15,
		padding: Layout.moderateScale(15),
		backgroundColor: Colors.secondaryColor,
		borderBottomWidth: 0.4,
		borderBottomColor: '#5f5f5f',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fileterSec: {
		width: Layout.WIDTH * 0.85,
	},
	fltrTitleText: {
		padding: Layout.moderateScale(10),
	},
	filterDetailsTitle: {
		color: '#272727',
		fontFamily: 'roboto-bold',
		fontSize: Layout.moderateScale(16),
	},
	offersListItem: {
		marginLeft: 0,
		// width: Layout.WIDTH,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.mainBottomBorderColor,
	},
	minMaxPrice: {
		paddingLeft: Layout.moderateScale(15),
		paddingRight: Layout.moderateScale(15),
		paddingTop: Layout.moderateScale(15),
		borderRadius: Layout.moderateScale(3),
	},
	offersListItem1: {
		marginHorizontal: Layout.moderateScale(10),
		marginVertical: Layout.moderateScale(10),
	},
	checkInputText: {
		color: Colors.menuuserNameandTokenColor,
		fontSize: Layout.moderateScale(13),
		marginLeft: Layout.moderateScale(-5),
		fontFamily: 'roboto-reguler',
	},
	fltrbtwn: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	dateTimeSec: {
		paddingHorizontal: Layout.moderateScale(10),
	},
	dropLayputSec: {
		marginBottom: Layout.moderateScale(5),
	},
	ratingstarRight: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: Layout.WIDTH * 0.2,
	},
	dateDropDown: {
		borderWidth: 0.8,
		borderColor: '#c8d5d5',
		paddingLeft: Layout.moderateScale(10),
		paddingRight: Layout.moderateScale(10),
		paddingTop: Layout.moderateScale(10),
		borderRadius: Layout.moderateScale(3),
	},
	imageDropDownStyle: {
		position: 'absolute',
		top: Layout.moderateScale(20),
		right: Layout.moderateScale(20),
	},
	daysText: {
		color: '#272727',
		fontFamily: 'roboto-reguler',
		fontSize: Layout.moderateScale(16),
		marginBottom: Layout.moderateScale(3),
	},
	row: {
		flexDirection: 'row',
	},
	identityDescTitle: {
		color: '#272727',
		fontFamily: 'roboto-bold',
		fontSize: Layout.moderateScale(14),
	},
	identityDescText: {
		color: '#272727',
		fontFamily: 'roboto-reguler',
		fontSize: Layout.moderateScale(11.5),
	},

	thumbImageStyle: {
		width: Layout.moderateScale(50),
		height: Layout.moderateScale(50),
		// position: 'absolute',
		// top: Layout.moderateScale(-28),
		// left: Layout.moderateScale(-5),
	},
	distanceSlider: {
		paddingHorizontal: Layout.moderateScale(20),
		paddingVertical: Layout.moderateScale(30),
	},
	thumb: {
		width: 2,
		height: 2,
	},
	bulletText: {
		marginTop: Layout.moderateScale(3),
	},
});
