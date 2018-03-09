import React, { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
const {
    View
  , Text
  , TouchableHighlight
} = ReactNative

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View>
      <Text style={{marginTop: 20}}>
        I am AppContainer! Recipe count: {this.props.listingCount}
      </Text>
      <TouchableHighlight onPress={() => {this.props.addListing() }}>
        <Text>Add Recipe</Text>
      </TouchableHighlight>
    </View>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect((state) => {
  return {
    listingCount: state.listingCount
  }
}, mapDispatchToProps)(AppContainer);
