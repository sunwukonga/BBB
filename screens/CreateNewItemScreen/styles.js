import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	imagesMainView: {
		height: Layout.HEIGHT * 0.28,
		width: Layout.WIDTH,
		backgroundColor: Colors.menuHeader,
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
	imagesSubView: {
		height: Layout.HEIGHT * 0.22,
		width: Layout.HEIGHT * 0.22,
		backgroundColor: Colors.white,
		marginRight: Layout.HEIGHT * 0.02,
		borderRadius: Layout.HEIGHT * 0.015,
	},
	rowImage: {
		height: Layout.HEIGHT * 0.22,
		width: Layout.HEIGHT * 0.22,
		position: 'absolute',
		borderRadius: Layout.HEIGHT * 0.015,
		resizeMode: 'contain',

	},
	imageOverlay:{
		position: 'absolute',
		backgroundColor:'#fff',
		opacity:0.5,
		height: Layout.HEIGHT * 0.22,
		width: Layout.HEIGHT * 0.22,

	},
	imageDeleteContainer:{

    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

	},
	imageReselect:{
		flexGrow:1,
	 height:null,
	 width:null,
	 margin:Layout.HEIGHT * 0.04,
	 padding:Layout.moderateScale(10),
		alignItems:'center',
		justifyContent:'center',

	},
	rowDeletedImage: {
		height: Layout.HEIGHT * 0.22,
		width: Layout.HEIGHT * 0.22,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',


	},
	listContents: {
		marginBottom: Layout.HEIGHT * 0.03,
		marginTop: Layout.HEIGHT * 0.03,
		paddingLeft: Layout.HEIGHT * 0.02,
	},
	addIcon: {
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		height: Layout.HEIGHT * 0.22,
	},
	exchangeMode: {
		// height: Layout.HEIGHT,
		backgroundColor: 'transparent',
	},
	deliveryOption: {
		backgroundColor: Colors.menuHeader,
		// padding: Layout.HEIGHT*0.03,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		marginTop: Layout.HEIGHT * 0.02,
		borderColor: Colors.categorylistBorder,
	},
	txtDelOpt: {
		color: 'black',
		fontSize: Layout.moderateScale(17),
		marginTop: Layout.HEIGHT * 0.03,
		marginLeft: Layout.HEIGHT * 0.03,
		fontFamily: 'roboto-bold',
	},
	faceToFace: {
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.categorylistBorder,
		margin: Layout.HEIGHT * 0.02,
	},
	txtfacetoFace: {
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(17),
		margin: Layout.HEIGHT * 0.02,
		fontFamily: 'roboto-medium',
	},
	bottomline: {
		height: 1,
		backgroundColor: Colors.categorylistBorder,
	},
	subFacetoFace: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
	},
	dataFacetoFace: {
		flex: 1,
		margin: Layout.HEIGHT * 0.02,
	},
	mapFacetoFace: {
		flex: 1,
		margin: Layout.HEIGHT * 0.02,
		backgroundColor: 'yellow',
	},
	txtTitle: {
		marginBottom: Layout.HEIGHT * 0.01,
		fontSize: Layout.moderateScale(17),
		fontFamily: 'roboto-reguler',
	},
	txtInput: {
		marginBottom: Layout.HEIGHT * 0.015,
	},
	regPost: {
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.categorylistBorder,
		marginTop: Layout.HEIGHT * 0.02,
		marginRight: Layout.HEIGHT * 0.02,
		marginLeft: Layout.HEIGHT * 0.02,
		marginBottom: Layout.HEIGHT * 0.02,
	},
	dropcontainer: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		height: Layout.HEIGHT * 0.02,
		borderColor: Colors.categorylistBorder,
	},
	addmore: {
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.categorylistBorder,
		margin: Layout.HEIGHT * 0.02,
		alignItems: 'center',
		justifyContent: 'center',
	},
	subAddmore: {
		height: Layout.HEIGHT * 0.1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Layout.HEIGHT * 0.04,
		marginBottom: Layout.HEIGHT * 0.04,
	},
	txtTitleAdd: {
		marginTop: Layout.HEIGHT * 0.01,
		fontSize: Layout.moderateScale(17),
	},
	Descrip: {
		backgroundColor: Colors.white,
		marginBottom: Layout.HEIGHT * 0.02,
		paddingTop: Layout.HEIGHT * 0.01,
		paddingBottom: Layout.HEIGHT * 0.01,
		paddingLeft: Layout.HEIGHT * 0.03,
		paddingRight: Layout.HEIGHT * 0.03,
	},
	txtcount: {
		margin: Layout.HEIGHT * 0.01,
		fontSize: Layout.moderateScale(12),
		color: Colors.txtHint,
		position: 'absolute',
		bottom: 0,
		right: 0,
		fontFamily: 'roboto-reguler',
		color: Colors.txtcount,
	},
	categoty: {
		// height: Layout.HEIGHT*0.5,
		backgroundColor: Colors.menuHeader,
		marginBottom: Layout.HEIGHT * 0.1,
		paddingTop: Layout.HEIGHT * 0.01,
		paddingBottom: Layout.HEIGHT * 0.01,
		paddingLeft: Layout.HEIGHT * 0.02,
		paddingRight: Layout.HEIGHT * 0.02,
	},
	txtInputsmall: {
		backgroundColor: Colors.white,
		marginRight: Layout.WIDTH * 0.16,
		height: Layout.WIDTH * 0.14,
	},
	addButton: {
		height: Layout.WIDTH * 0.14,
		width: Layout.WIDTH * 0.14,
		backgroundColor: Colors.primaryColor,
		marginLeft: Layout.WIDTH * 0.07,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Layout.WIDTH * 0.01,
		position: 'absolute',
		right: 0,
	},
	mainRowView: {
		backgroundColor: Colors.lightGray,
		marginRight: Layout.WIDTH * 0.05,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Layout.WIDTH * 0.01,
		marginTop: Layout.HEIGHT * 0.01,
	},
	listContent: {},
	cancle: {
		marginRight: Layout.WIDTH * 0.015,
	},
	txttemp: {
		marginLeft: Layout.WIDTH * 0.015,
		margin: Layout.WIDTH * 0.015,
		fontFamily: 'roboto-reguler',
	},
	saleview: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: Colors.categorylistBorder,
		marginTop: Layout.HEIGHT * 0.02,
		marginRight: Layout.HEIGHT * 0.02,
		marginLeft: Layout.HEIGHT * 0.02,
	},
	saleHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: Layout.moderateScale(10),
	},
	redioDot: {
		marginRight: Layout.HEIGHT * 0.02,
		marginLeft: Layout.HEIGHT * 0.02,
		fontSize: Layout.moderateScale(25),
	},
	chboxRemember: {
		backgroundColor: 'transparent',
		margin: Layout.HEIGHT * 0.02,
	},
	saleChild: {
		backgroundColor: 'transparent',
	},
	bottomlineShort: {
		height: 1,
		backgroundColor: Colors.categorylistBorder,
		marginLeft: Layout.HEIGHT * 0.02,
		marginRight: Layout.HEIGHT * 0.02,
	},
	txtsubtxt: {
		marginLeft: Layout.HEIGHT * 0.02,
		marginTop: Layout.HEIGHT * 0.03,
		fontFamily: 'roboto-bold',
	},
	txtExch: {
		color: 'black',
		fontSize: Layout.moderateScale(17),
		marginLeft: Layout.HEIGHT * 0.02,
		marginTop: Layout.HEIGHT * 0.02,
		fontFamily: 'roboto-bold',
	},
	templateSec: {
		backgroundColor: 'transparent',
	},
	txtTitles: {
		marginBottom: Layout.HEIGHT * 0.01,
		marginTop: Layout.HEIGHT * 0.02,
		fontSize: Layout.moderateScale(17),
		fontFamily: 'roboto-reguler',
	},
	addimage: {
		fontFamily: 'roboto-medium',
	},
});
