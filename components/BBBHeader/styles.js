
import { StyleSheet, Platform } from 'react-native';
import { Layout, Colors } from '../../constants/'


const styles = StyleSheet.create({

  header: {
    backgroundColor: Colors.mainheaderbg,
    height: (Layout.HEIGHT * 0.09),
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {}
    }),
  },

  left: {
    flex: 1,
    paddingTop: (Layout.HEIGHT * 0.02),
    paddingLeft: Layout.moderateScale(5),
  },

  body: {
    flex: 3,
    alignItems: 'flex-start',
  },

  right: {
    flex: 1,
    paddingTop: (Layout.HEIGHT * 0.02),
  },

  headerTitle: {
    color: Colors.white,
    paddingTop: (Layout.HEIGHT * 0.015),
    fontFamily: 'roboto-reguler',
    fontSize : Layout.moderateScale(18),
    letterSpacing: 0.7
  },

});

export default styles;
