import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	mainimgbg: {
		width: Layout.WIDTH,
		height: Layout.HEIGHT,
	},
	connectSec: {
		marginVertical: Layout.moderateScale(10),
		fontSize: Layout.moderateScale(18),
		fontFamily: 'roboto-bold',
		color: Colors.connectwithcolor,
	},
	lineStyle: {
		color: Colors.white,
		fontSize: Layout.moderateScale(20),
	},
	welcomeContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	socialSec: {
		flexDirection: 'row',
	},
	facebookSec: {
		width: Layout.WIDTH * 0.14,
		height: Layout.WIDTH * 0.14,
		marginVertical: Layout.moderateScale(20),
		backgroundColor: Colors.socialbg,
		borderWidth: 1,
		borderColor: Colors.socialbg,
		borderRadius: Layout.WIDTH * 0.07,
		justifyContent: 'center',
		alignItems: 'center',
	},
	googleSec: {
		width: Layout.WIDTH * 0.14,
		height: Layout.WIDTH * 0.14,
		marginVertical: Layout.moderateScale(20),
		backgroundColor: Colors.socialbg,
		borderWidth: 1,
		borderColor: Colors.socialbg,
		borderRadius: Layout.WIDTH * 0.07,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Layout.moderateScale(10),
	},
	backarrow: {
		color: Colors.white,
	},
});
