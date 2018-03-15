import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	usersDetailsSec: {
		paddingVertical: Layout.WIDTH * 0.08,
		paddingHorizontal: Layout.WIDTH * 0.025,
		backgroundColor: Colors.selectedRow,
		height: Layout.WIDTH * 0.51,
	},
	userImage: {
		width: Layout.WIDTH * 0.28,
		height: Layout.WIDTH * 0.28,
		borderRadius: Layout.WIDTH * 0.14,
		borderWidth: 1,
		borderColor: Colors.white,
	},
	usersDetails: {
		flexDirection: 'row',
		marginTop: Layout.moderateScale(10),
	},
	userName: {
		width: Layout.WIDTH * 0.28,
		textAlign: 'center',
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-medium',
	},
	tokenText: {
		alignSelf: 'flex-end',
		textAlign: 'right',
		paddingHorizontal: Layout.moderateScale(5),
		width: Layout.WIDTH * 0.51,
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(13),
		fontFamily: 'roboto-reguler',
	},
	tokenPrice: {
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(14),
		fontFamily: 'roboto-bold',
	},
	content: {
		paddingLeft: Layout.moderateScale(10),
		paddingRight: Layout.moderateScale(15),
	},
	borderView: {
		borderBottomColor: Colors.menuitemborder,
		marginLeft: 0,
	},
	menuIcon: {
		marginRight: Layout.moderateScale(8),
	},
	uglyDrawerItem: {
		fontFamily: 'roboto-reguler',
		fontSize: Layout.moderateScale(20),
		color: Colors.secondaryColor,
		paddingTop: Layout.moderateScale(15),
		paddingBottom: Layout.moderateScale(15),
		backgroundColor: Colors.white,
		overflow: 'hidden',
	},
});
