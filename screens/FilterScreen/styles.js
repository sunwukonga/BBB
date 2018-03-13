import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
	},
	backarrow: {
		color: Colors.white,
	},
	filterTitle: {
		width: Layout.WIDTH * 0.15,
		padding: Layout.moderateScale(15),
		backgroundColor: '#272727',
		borderBottomWidth: 0.4,
		borderBottomColor: '#5f5f5f',
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
		paddingTop: Layout.moderateScale(5),
		paddingBottom: Layout.moderateScale(5),
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingLeft: Layout.moderateScale(10),
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
		alignItems: 'flex-end',
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
});
