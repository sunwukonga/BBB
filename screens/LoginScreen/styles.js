import { Platform, StyleSheet } from 'react-native'
import { Layout, Colors } from '../../constants/'

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainimgbg: {
    width: Layout.WIDTH,
    height: Layout.HEIGHT
  },
  whitecontent: {
    color: Colors.white
  },
  mainlogo: {
    width: Layout.WIDTH * 0.38,
    height: Layout.WIDTH * 0.62,
    resizeMode: 'cover'
  },
  left: {
    flex: 1,
    // paddingTop: (theme.HEIGHT * 0.025),
  },
  body: {
    flex: 3,
    alignItems:'flex-start',
  },
  right: {
    flex: 1,
    // paddingTop: (theme.HEIGHT * 0.025),
  },
  connectSec: {
    marginVertical: Layout.moderateScale(10),
    fontSize: Layout.moderateScale(18),
    fontFamily: 'roboto-bold',
    color: '#d2eded'
  },
  lineStyle: {
    color: '#ffffff',
    fontSize: Layout.moderateScale(20),
  },
  usersDetails: {
    flexDirection: 'row',
    marginTop: Layout.moderateScale(10),
  },
  userName: {
    width: Layout.WIDTH * 0.30,
    textAlign: 'center',
    color: Colors.menuuserNameandTokenColor,
    fontSize: Layout.moderateScale(18),
    fontFamily: 'roboto-medium',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialSec: {
    flexDirection: 'row'
  },
  facebookSec: {
    width: Layout.WIDTH * 0.14,
    height: Layout.WIDTH * 0.14,
    marginVertical: Layout.moderateScale(20),
    backgroundColor: '#e9f6f6',
    borderWidth: 1,
    borderColor: '#e9f6f6',
    borderRadius: Layout.WIDTH * 0.07,
    justifyContent: 'center',
    alignItems: 'center'
  },
  googleSec: {
    width: Layout.WIDTH * 0.14,
    height: Layout.WIDTH * 0.14,
    marginVertical: Layout.moderateScale(20),
    backgroundColor: '#e9f6f6',
    borderWidth: 1,
    borderColor: '#e9f6f6',
    borderRadius: Layout.WIDTH * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.moderateScale(10)
  },
  backarrow: {
    color: Colors.white,
  },
})
