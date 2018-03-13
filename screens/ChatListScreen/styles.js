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
    backgroundColor: 'white'
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
  }

  })
