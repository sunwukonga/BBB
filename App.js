import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation, { RootStackNavigator } from './navigation/RootNavigation';
import { ApolloProvider } from 'react-apollo';
import { createAppContainer } from 'react-navigation'
import client from './config/Client';

console.disableYellowBox = true;


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      let RootContainer = createAppContainer( RootStackNavigator )
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
          <ApolloProvider client={client}>
            <RootContainer />
          </ApolloProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'roboto-reguler': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        icomoon: require('./assets/fonts/icomoon.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1fa6a4',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(31,166,164,0.2)',
  },
});
