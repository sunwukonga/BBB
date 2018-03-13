import { Platform, StyleSheet } from 'react-native'
import { Layout, Colors } from '../../constants/'

export default StyleSheet.create({

  mainlist:{
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.categorylistBorder,
    marginLeft: 0,
    marginRight: 0,

  },
  mainlists:{
    backgroundColor: Colors.menuHeader,
    borderBottomWidth: 1,
    borderBottomColor: Colors.categorylistBorder,
    marginLeft: 0,
    marginRight: 0,
  },
  left:{
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  bodys:{
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    marginRight:Layout.WIDTH*0.05,
  },
  container:{
    backgroundColor: 'red',
    height: Layout.HEIGHT,
    width: Layout.HEIGHT,
  },
  bebyview:{
    borderRadius:Layout.HEIGHT*0.035,
    height: Layout.HEIGHT*0.07,
    width: Layout.HEIGHT*0.07,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextarrow:{
    color:'#1fa6a4',
    fontSize: Layout.moderateScale(20),
    alignSelf: 'center'
  },
  title:{
    fontSize: Layout.moderateScale(13),
    flexWrap: 'wrap'
  },
  bottomline:{
    height: 1,
    backgroundColor: Colors.linegray,
    marginBottom: Layout.HEIGHT*0.007,
    marginTop: Layout.HEIGHT*0.007,
  },
  titleview:{
    flexDirection: 'row',
    width: Layout.WIDTH*0.68,

  },
  namecount:{
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  name:{
    fontSize: Layout.moderateScale(15),
  },
  count:{
    fontSize: Layout.moderateScale(13),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
    width: Layout.moderateScale(18),
    height: Layout.moderateScale(18),
    borderRadius: Layout.moderateScale(18/2),
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.white
  },
  rowImage:{
    height: Layout.HEIGHT*0.05,
    width: Layout.HEIGHT*0.05,
    resizeMode: 'contain',
    borderWidth: 0.5,
    backgroundColor: Colors.white,
    borderColor: Colors.categorylistBorder,
    marginRight: Layout.HEIGHT*0.007,
  },
  container: {
    backgroundColor: Colors.menuHeader
  },
  searchSec: {
    marginTop: Layout.moderateScale(12),
    marginBottom: Layout.moderateScale(15),
    width: Layout.WIDTH * 0.90,
    alignSelf: 'center'
  },
  searchItem: {
    backgroundColor: Colors.white,
  },
  mainSearch: {
    marginVertical: Layout.moderateScale(2),
    backgroundColor: Colors.white,
    width: Layout.WIDTH * 0.94,
    alignSelf: 'center'
  },
  searchicon: {
    backgroundColor: Colors.white,
    color: '#7c7c7c',
    fontSize: Layout.moderateScale(16),
    marginRight: Layout.moderateScale(10),
  },
  populerSec: {
    width: Layout.WIDTH * 0.90,
    marginVertical: Layout.WIDTH * 0.02,
    marginHorizontal: Layout.WIDTH * 0.05,
  },
  populerText: {
    color: Colors.menuuserNameandTokenColor,
    fontSize: Layout.moderateScale(18),
    fontFamily: 'roboto-bold',
  },
  imagesMainView: {
    height: Layout.WIDTH * 0.89,
    width: Layout.WIDTH,
    backgroundColor: Colors.white,
  },
  listContent: {
    margin: Layout.HEIGHT * 0.03,
    marginTop: 0,
  },
  imagesSubView: {
    width: Layout.WIDTH * 0.92,
    backgroundColor: Colors.white,
    borderRadius: Layout.HEIGHT * 0.015,
    borderColor: '#cfcfcf',
    borderWidth: 0.5,
    overflow: 'hidden',
    flexDirection: 'row',
    marginVertical: Layout.HEIGHT * 0.01,
    padding: Layout.moderateScale(5),
  },
  rowImage: {
    height: Layout.WIDTH * 0.35,
    width: Layout.WIDTH * 0.35,
    borderRadius: Layout.HEIGHT * 0.015,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  favoriteIconSec: {
    position: 'absolute',
    top: Layout.moderateScale(10),
    right: Layout.moderateScale(10),
    width: Layout.moderateScale(26),
    height: Layout.moderateScale(26),
    borderRadius: Layout.moderateScale(13),
    backgroundColor: '#7f7f7f',
    borderWidth: 1,
    borderColor: '#7f7f7f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatIconSec: {
    position: 'absolute',
    top: Layout.moderateScale(40),
    right: Layout.moderateScale(10),
    width: Layout.moderateScale(26),
    height: Layout.moderateScale(26),
    borderRadius: Layout.moderateScale(13),
    backgroundColor: '#7f7f7f',
    borderWidth: 1,
    borderColor: '#7f7f7f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userItemDetailsSec: {
    flexDirection: 'row',
    marginTop: Layout.moderateScale(2),
    paddingBottom: Layout.moderateScale(7),
    marginTop: Layout.HEIGHT*0.01,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cfcfcf',
    width: Layout.WIDTH * 0.52,
  },
  userProfileSec: {
    width: Layout.WIDTH * 0.08,
  },
  userProfile: {
    width: Layout.moderateScale(25),
    height: Layout.moderateScale(25),
    borderRadius: Layout.moderateScale(12.5)
  },
  userOnlineOffline: {
    backgroundColor: 'green',
    width: Layout.moderateScale(8),
    height: Layout.moderateScale(8),
    borderRadius: Layout.moderateScale(4),
    position: 'absolute',
    bottom: 0,
    right: Layout.moderateScale(8)
  },
  userNameSec: {
    width: Layout.WIDTH * 0.26,
  },
  userName: {
    color: Colors.menuuserNameandTokenColor,
    fontSize: Layout.moderateScale(12),
    fontFamily: 'roboto-medium',
    left: 0,
    top: 0
  },
  activeuserSec: {
    width: Layout.WIDTH * 0.15,
    flexDirection: 'row',
  },
  activeuser: {
    width: Layout.WIDTH * 0.12,
    height: Layout.moderateScale(20),
    paddingRight: Layout.moderateScale(5)
  },
  postDesc: {
    fontSize: Layout.moderateScale(12),
    color: Colors.menuuserNameandTokenColor,
    fontFamily: 'roboto-reguler',
    width: Layout.WIDTH * 0.52,
  },
  productreviewSec: {
    flexDirection: 'row',
    marginTop: Layout.moderateScale(5)
  },
  ratingSec: {
    width: Layout.WIDTH * 0.32,
    flexDirection: 'row',
  },
  ratingstyle: {
    width: Layout.WIDTH * 0.22,
    height: Layout.moderateScale(20),
    paddingRight: Layout.moderateScale(5),
  },
  ratingmsgct: {
    color: '#7c7c7c',
    fontSize: Layout.moderateScale(14),
    fontFamily: 'roboto-reguler'
  },
  priceSec: {
    width: Layout.WIDTH * 0.22,
  },
  pricetext: {
    textAlign: 'right',
    paddingRight: Layout.moderateScale(10),
    color: Colors.primaryColor,
    fontSize: Layout.moderateScale(14),
    fontFamily: 'roboto-bold'
  },
  adSec: {
    backgroundColor: Colors.primaryColor,
    width: Layout.WIDTH,
    paddingVertical: Layout.moderateScale(20),
    paddingHorizontal: Layout.moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainadText: {
    marginBottom: Layout.moderateScale(5),
    color: Colors.white,
    fontSize: Layout.moderateScale(16),
    fontFamily: 'roboto-bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Layout.moderateScale(14),
    fontFamily: 'roboto-reguler',
    alignSelf: 'center'
  },
  offerTypeSec:{
    width: Layout.WIDTH * 0.52,
    marginTop: Layout.HEIGHT*0.01,
    flexDirection: 'row'
  },
  bartedSec:{
    backgroundColor: '#f48fb1',
    marginRight: Layout.moderateScale(5),
    borderRadius: 5
  },
  counterSec:{
    backgroundColor: '#81d4fa',
    marginRight: Layout.moderateScale(5),
    borderRadius: 5
  },
  saleSec:{
    backgroundColor: '#ff8a65',
    marginRight: Layout.moderateScale(5),
    borderRadius: 5
  },
  bartedTxt:{
    fontSize: Layout.moderateScale(10),
    textAlign: 'center',
    margin: Layout.moderateScale(5),
  },
  counterTxt:{
    fontSize: Layout.moderateScale(10),
    textAlign: 'center',
    margin: Layout.moderateScale(5),
  },
  saleTxt:{
    fontSize: Layout.moderateScale(10),
    textAlign: 'center',
    margin: Layout.moderateScale(5),
  },
  liststyle:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }

  })
