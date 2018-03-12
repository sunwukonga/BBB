import { Platform, StyleSheet } from 'react-native'
import { Layout, Colors } from '../../constants/'

export default StyleSheet.create({

  container: {
    height: Layout.HEIGHT,
    width: Layout.WIDTH,
    backgroundColor: '#fff',
  },

  contentStyle: {
    flex: 1,
    paddingTop: Layout.HEIGHT * 0.01,
    paddingHorizontal: Layout.WIDTH * 0.04,
  },

  header: {
    backgroundColor: Colors.mainheaderbg,
    height: (Layout.HEIGHT * 0.09),
    borderBottomWidth: 0,
    paddingTop: (Layout.HEIGHT * 0.015),
    ...Platform.select({
      ios: {
      },
      android: {}
    }),
  },

  left: {
    flex: 1,
    paddingLeft: Layout.moderateScale(5),
  },

  body: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },

  right: {
    flex: 1,
    paddingTop: Layout.HEIGHT * 0.015,
    paddingRight: Layout.moderateScale(5),
  },

  headerTitle: {
    color: Colors.white,
    paddingTop: Layout.HEIGHT * 0.015,
    fontFamily: 'roboto-reguler',
    fontSize : Layout.moderateScale(16),
    letterSpacing: 0.7
  },

  profileImage: {
    height: Layout.HEIGHT * 0.06,
    width: Layout.HEIGHT * 0.06,
    borderRadius: Layout.HEIGHT * 0.03,
    marginRight: Layout.WIDTH * 0.02,
    resizeMode: 'cover',
  },

  notifyContainer: {
    paddingVertical: Layout.HEIGHT * 0.01,
    paddingHorizontal: Layout.WIDTH * 0.05,
    borderBottomWidth: Layout.moderateScale(1),
    backgroundColor: '#e8f2f2',
    borderColor: '#c8d5d5',
    flexDirection: 'row',
  },

  notifyImage: {
    height: Layout.HEIGHT * 0.065,
    width: Layout.HEIGHT * 0.065,
    marginRight: Layout.WIDTH * 0.03,
    borderRadius: Layout.moderateScale(3),
    borderWidth: Layout.moderateScale(0.5),
    borderColor: '#c8d5d5',
    resizeMode: 'cover',
  },

  regularSmall: {
    color:'#272727',
    fontSize: Layout.moderateScale(12),
    fontFamily: 'roboto-reguler',
  },

  chat: {
    marginVertical: Layout.HEIGHT * 0.01,
    padding: Layout.HEIGHT * 0.01,
    backgroundColor: '#e0eaea',
    alignSelf: 'flex-end',
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: Layout.HEIGHT * 0.002,
      width: 0,
    },
    elevation: Layout.moderateScale(5),
  },

  response: {
    marginVertical: Layout.HEIGHT * 0.01,
    padding: Layout.HEIGHT * 0.01,
    backgroundColor: '#fefefe',
    alignSelf: 'flex-start',
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: Layout.HEIGHT * 0.002,
      width: 0,
    },
    elevation: Layout.moderateScale(5),
  },

  timeStyle: {
    color:'#a7a7a7',
    fontSize: Layout.moderateScale(8),
    fontFamily: 'roboto-reguler',
    textAlign: 'right',
  },

	footerStyle: {
		width: Layout.WIDTH,
		height: Layout.HEIGHT * 0.08,
    borderTopWidth: Layout.moderateScale(1),
    borderColor: '#d7d7d7',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

	newPostStyle: {
    color:'#272727',
    fontSize: Layout.moderateScale(12),
    fontFamily: 'roboto-reguler',
		marginHorizontal: Layout.WIDTH * 0.03
	},

	postBtn: {
		height: Layout.HEIGHT * 0.08,
		width: Layout.HEIGHT * 0.08,
		backgroundColor: Colors.mainheaderbg,
		alignItems: 'center',
		justifyContent: 'center'
	},
})
