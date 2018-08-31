import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

export default StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
	},
	mainlist: {
		backgroundColor: Colors.white,
		borderBottomWidth: 0.5,
		borderBottomColor: Colors.mainBottomBorderColor,
		marginLeft: 0,
		marginRight: 0,
	},
	body: {
		borderBottomWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bodyTitle: {
		color: Colors.secondaryColor,
		fontSize: Layout.moderateScale(16),
		fontFamily: 'roboto-reguler',
	},
	bodys: {
		borderBottomWidth: 0,
	},
	bebyview: {
		margin: Layout.HEIGHT * 0.01,
		borderRadius: Layout.HEIGHT * 0.035,
		height: Layout.HEIGHT * 0.07,
		width: Layout.HEIGHT * 0.07,
		borderWidth: 1,
		borderColor: Colors.avtarBorder,
		alignItems: 'center',
		justifyContent: 'center',
	},
	nextarrow: {
		color: Colors.primaryColor,
		fontSize: Layout.moderateScale(18),
		alignSelf: 'center',
	},
	SectionListItemStyle:{

    fontSize : Layout.moderateScale(16),
    padding: 5,
    color: '#000',
  backgroundColor : '#F5F5F5'

  },
	SectionHeaderStyle:{
    fontSize :Layout.moderateScale(20),
    padding: 10,
    color: '#000',
  },


	backarrow: {
		color: Colors.white,
	},
});
