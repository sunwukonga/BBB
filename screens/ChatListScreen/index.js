import React, { Component } from 'react';
import {
  Container
, Content
, Button
} from 'native-base';

//custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import ListChats from './ListChats'
import LastMessageIds from './LastMessageIds'

//style
import styles from './styles';
import { Layout, Colors } from '../../constants/';

class ChatListScreen extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    var leftComponent = (
      <Button
        transparent
        onPress={() => this.props.navigation.goBack()}>
        <BBBIcon
          name="BackArrow"
          size={Layout.moderateScale(18)}
          color={Colors.white}
        />
      </Button>
    );
    return (
      <Container style={styles.container}>
        <BBBHeader title="Chats" leftComponent={leftComponent} />
        <Content>
          <LastMessageIds loginStatus={{loginStatus: true}}>{ chatIndexes  => (
            <ListChats chatIndexes={chatIndexes} />
          )}</LastMessageIds>
        </Content>
      </Container>
    );
  }
}

export default ChatListScreen
