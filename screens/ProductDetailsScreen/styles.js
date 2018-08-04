import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		height: Layout.HEIGHT,
		width: Layout.WIDTH,
		backgroundColor: Colors.white,
	},
	contentStyle: {
		flex: 1,
		paddingHorizontal: Layout.WIDTH * 0.04,
	},
	contentSwiper: {
		position: 'relative',
		height: Layout.HEIGHT * 0.4,
		marginTop: Layout.HEIGHT * 0.02,
		marginBottom: Layout.HEIGHT * 0.02,
	},
	swiperSec: {
		height: Layout.HEIGHT * 0.4,
	},
	backarrow: {
		color: Colors.white,
	},
	slide: {
		borderRadius: Layout.moderateScale(8),
		justifyContent: 'center',
	},
	dotStyle: {
		backgroundColor: 'rgba(0,0,0,.2)',
		width: Layout.moderateScale(6),
		height: Layout.moderateScale(6),
		borderRadius: Layout.moderateScale(3),
		marginHorizontal: Layout.moderateScale(3),
	},
	activeDotStyle: {
		backgroundColor: Colors.primaryColor,
		width: Layout.moderateScale(6),
		height: Layout.moderateScale(6),
		borderRadius: Layout.moderateScale(3),
		marginHorizontal: Layout.moderateScale(3),
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
	favoriteIconSec: {
		position: 'absolute',
		top: Layout.moderateScale(10),
		right: Layout.moderateScale(10),
		width: Layout.moderateScale(30),
		height: Layout.moderateScale(30),
		borderRadius: Layout.moderateScale(15),
		backgroundColor: Colors.iconsec,
		borderWidth: 1,
		borderColor: Colors.iconsec,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chatIconSec: {
		position: 'absolute',
		top: Layout.moderateScale(50),
		right: Layout.moderateScale(10),
		width: Layout.moderateScale(30),
		height: Layout.moderateScale(30),
		borderRadius: Layout.moderateScale(15),
		backgroundColor: '#7f7f7f',
		borderWidth: 1,
		borderColor: '#7f7f7f',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	alignment: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	ImageContainer: {
		height: Layout.HEIGHT * 0.06,
		width: Layout.HEIGHT * 0.06,
		marginRight: Layout.WIDTH * 0.02,
	},
	profileImage: {
		height: Layout.HEIGHT * 0.06,
		width: Layout.HEIGHT * 0.06,
		borderRadius: Layout.HEIGHT * 0.03,
		resizeMode: 'cover',
	},
	activeDot: {
		position: 'absolute',
		backgroundColor: '#3eb722',
		borderColor: Colors.white,
		bottom: 0,
		right: 0,
		width: Layout.moderateScale(10),
		height: Layout.moderateScale(10),
		borderRadius: Layout.moderateScale(5),
		borderWidth: Layout.moderateScale(1.5),
	},
	mediumFont: {
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-medium',
	},
	progressStyle: {
		height: Layout.HEIGHT * 0.04,
		width: Layout.WIDTH * 0.15,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	deviderStyle: {
		height: Layout.moderateScale(1),
		marginVertical: Layout.HEIGHT * 0.01,
		backgroundColor: Colors.divider,
	},
	regularSmall: {
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(12),
		fontFamily: 'roboto-reguler',
	},
	rateCount: {
		color: Colors.ratingmsgct,
		fontSize: Layout.moderateScale(12),
		fontFamily: 'roboto-reguler',
	},
	skyFontBold: {
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-bold',
	},
	alignmentButton: {
		marginVertical: Layout.HEIGHT * 0.005,
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	barterButton: {
		paddingVertical: Layout.HEIGHT * 0.005,
		paddingHorizontal: Layout.WIDTH * 0.02,
		marginRight: Layout.WIDTH * 0.015,
		borderRadius: Layout.moderateScale(4),
		backgroundColor: Colors.barterButton,
	},
	offerButton: {
		paddingVertical: Layout.HEIGHT * 0.005,
		paddingHorizontal: Layout.WIDTH * 0.02,
		borderRadius: Layout.moderateScale(4),
		backgroundColor: Colors.offerButton,
	},
	regularLarge: {
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-reguler',
	},
	tagContainer: {
		marginVertical: Layout.HEIGHT * 0.01,
		flexDirection: 'row',
	},
	alignmentTag: {
		marginRight: Layout.WIDTH * 0.02,
		height: Layout.HEIGHT * 0.04,
		paddingHorizontal: Layout.WIDTH * 0.02,
		borderRadius: Layout.moderateScale(4),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.lightGray,
	},
	closeIcon: {
		textAlign: 'center',
		color: Colors.secondaryColor,
		marginLeft: Layout.WIDTH * 0.015,
	},
	boldFont: {
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-bold',
	},
	skyFontMedium: {
		marginVertical: Layout.HEIGHT * 0.005,
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-medium',
	},

	imagesMainView: {
		width: Layout.WIDTH,
		backgroundColor: Colors.white,
	},
	populerSec: {
		width: Layout.WIDTH * 0.9,
		marginTop: Layout.WIDTH * 0.02,
		marginBottom: Layout.WIDTH * 0.03,
	},
	populerText: {
		color: Colors.menuuserNameandTokenColor,
		fontSize: Layout.moderateScale(18),
		fontFamily: 'roboto-bold',
	},
	listContent: {
		marginBottom: Layout.HEIGHT * 0.02,
		paddingRight: Layout.WIDTH * 0.06,
		marginTop: 0,
	},
	imagesSubView: {
		width: Layout.WIDTH * 0.54,
		marginRight: Layout.WIDTH * 0.02,
		backgroundColor: Colors.white,
		borderRadius: Layout.HEIGHT * 0.015,
		borderColor: Colors.postmain,
		borderWidth: 0.5,
		overflow: 'hidden',
	},
	rowImageProd: {
		height: Layout.WIDTH * 0.48,
		width: Layout.WIDTH * 0.54,
		borderRadius: Layout.HEIGHT * 0.015,
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	userItemDetailsSec: {
		flexDirection: 'row',
		paddingHorizontal: Layout.moderateScale(8),
		paddingBottom: Layout.moderateScale(8),
	},
	userProfileSec: {
		width: Layout.WIDTH * 0.1,
	},
	userProfile: {
		width: Layout.moderateScale(30),
		height: Layout.moderateScale(30),
		borderRadius: Layout.moderateScale(15),
	},
	userOnlineOffline: {
		backgroundColor: 'green',
		width: Layout.moderateScale(8),
		height: Layout.moderateScale(8),
		borderRadius: Layout.moderateScale(4),
		position: 'absolute',
		bottom: 0,
		left: Layout.moderateScale(20),
	},
	userNameSec: {
		width: Layout.WIDTH * 0.27,
	},
	userName: {
		color: Colors.menuuserNameandTokenColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-medium',
	},
	activeuserSec: {
		width: Layout.WIDTH * 0.1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	activeuser: {
		width: Layout.WIDTH * 0.12,
		height: Layout.moderateScale(20),
		paddingRight: Layout.moderateScale(5),
	},
	postDesc: {
		marginLeft: Layout.moderateScale(10),
		marginRight: Layout.moderateScale(10),
		fontSize: Layout.moderateScale(12),
		color: Colors.menuuserNameandTokenColor,
		fontFamily: 'roboto-reguler',
	},
	productreviewSec: {
		flexDirection: 'row',
		marginTop: Layout.moderateScale(5),
		marginBottom: Layout.moderateScale(5),
		paddingHorizontal: Layout.moderateScale(8),
	},
	ratingSec: {
		width: Layout.WIDTH * 0.32,
		flexDirection: 'row',
	},
	starstyle: {
		color: Colors.starcolor,
		marginTop: Layout.moderateScale(2),
	},
	ratingstyle: {
		width: Layout.WIDTH * 0.22,
		height: Layout.moderateScale(20),
		paddingRight: Layout.moderateScale(5),
	},
	ratingmsgct: {
		color: Colors.ratingmsgct,
		fontSize: Layout.moderateScale(14),
		fontFamily: 'roboto-reguler',
	},
	priceSec: {
		width: Layout.WIDTH * 0.2,
	},
	pricetext: {
		textAlign: 'right',
		paddingRight: Layout.moderateScale(10),
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(14),
		fontFamily: 'roboto-bold',
	},
	activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
});
