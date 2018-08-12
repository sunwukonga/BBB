import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import {
  View
, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { Layout, Colors } from '../../constants/';
import BBBIcon from '../../components/BBBIcon';

import {
  CREATE_CHAT
} from '../../graphql/Mutations'


//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//---------------This is a planned implementation of CreateChat. The idea is to use the---------------------
//---------------update: to stop saving to the cache, AND opportunistic result to get the-------------------
//---------------result back fast, since the return value is already known. For now I'm---------------------
//---------------only going to concentrate on producing an opportunistic response---------------------------
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
class CreateChat2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let listing = this.props.item
    return (
      <Mutation
        mutation={CREATE_CHAT}
        update={(cache, { data: { createChat } }) => {}}
        optimisticResponse= {}
      >
        {(createChat, { data }) => (
          this.props.children(createChat)
        )}
      </Mutation>
    )
  }
}

export default CreateChat2
