import { Platform, StyleSheet } from 'react-native';
import { Layout, Colors } from '../../constants/';

let babyIcon = {
  height: Layout.HEIGHT * 0.05,
  width: Layout.HEIGHT * 0.05,
  borderRadius: Layout.HEIGHT * 0.025,
  marginTop: Layout.WIDTH * 0.02,
  marginRight: Layout.WIDTH * 0.02,
  alignSelf: 'center',
}

export default StyleSheet.create({
  container: {
    height: Layout.HEIGHT,
    backgroundColor: Colors.white,
    flex: 1,
  },
  contentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  backarrow: {
    color: Colors.white,
  },
  header: {
    backgroundColor: Colors.primaryColor,
    height: Layout.HEIGHT * 0.09,
    borderBottomWidth: 0,
    paddingTop: Layout.HEIGHT * 0.015,
  },
  refetch: {
    backgroundColor: 'transparent',
    width: Layout.WIDTH * 0.19,
    height: Layout.WIDTH * 0.28,
  },
  left: {
    flex: 1,
    paddingLeft: Layout.moderateScale(5),
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: Layout.moderateScale(16),
    letterSpacing: 0.7,
  },
  profileImage: Object.assign({resizeMode: 'cover'}, babyIcon),
  babyIcon: babyIcon,
  notifyContainer: {
    paddingVertical: Layout.HEIGHT * 0.01,
    paddingHorizontal: Layout.WIDTH * 0.05,
    borderBottomWidth: Layout.moderateScale(1),
    backgroundColor: Colors.selectedRow,
    borderColor: Colors.mainBottomBorderColor,
  },
  notifyImage: {
    height: Layout.HEIGHT * 0.065,
    width: Layout.HEIGHT * 0.065,
    marginRight: Layout.WIDTH * 0.03,
    borderRadius: Layout.moderateScale(3),
    borderWidth: Layout.moderateScale(0.5),
    borderColor: Colors.mainBottomBorderColor,
    resizeMode: 'cover',
  },
  regularSmall: {
    color: Colors.secondaryColor,
    fontSize: Layout.moderateScale(12),
    fontFamily: 'roboto-reguler',
  },
  chat: {
    marginVertical: Layout.HEIGHT * 0.01,
    padding: Layout.HEIGHT * 0.01,
    backgroundColor: '#e0eaea',
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
    backgroundColor: Colors.sendinputbg,
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
    color: Colors.subtitlebg,
    fontSize: Layout.moderateScale(8),
    fontFamily: 'roboto-reguler',
    textAlign: 'right',
  },
  footerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Layout.HEIGHT * 0.08,
    borderTopWidth: Layout.moderateScale(1),
    borderColor: Colors.sendinputborder,
  },
  newPostStyle: {
    height: Layout.HEIGHT * 0.08,
    minWidth: Layout.WIDTH * 0.85,
    color: Colors.secondaryColor,
    fontSize: Layout.moderateScale(12),
    fontFamily: 'roboto-reguler',
  },
  postBtn: {
    height: Layout.HEIGHT * 0.08,
    width: Layout.WIDTH * 0.15,
    backgroundColor: Colors.mainheaderbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
