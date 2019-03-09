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
import LoginStatus from '../HomeScreen/LoginStatus'
import LastMessageIds from './LastMessageIds'
import { graphql, compose } from "react-apollo";
import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../graphql/Queries'
import { w, i18n } from '../../utils/helpers.js'

//style
import styles from './styles';
import { Layout, Colors } from '../../constants/';

export default ChatListScreen = compose(
  graphql(GET_LOGIN_STATUS, {name: "loginStatus"})
, graphql(GET_CACHED_TRANSLATIONS, {
    name: "i18n"
  , skip: ({ loginStatus }) => !loginStatus
  , options: ({loginStatus}) => ({
      variables: {
        locusId: 1
      , countryCode: loginStatus.countryCode
      }
    , fetchPolicy: 'cache-only'
    })
  })
)(
class extends Component {

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
    if ( !w(this.props, ['i18n', 'getCachedLocus']) ) {
      return null
    }
    let { loginStatus, i18n: {getCachedLocus: translations} } = this.props;
    const parentName = "ChatListScreen"
    return (
      <Container style={styles.container}>
        <BBBHeader title={i18n(translations, parentName, "Chats", loginStatus.iso639_2, "Chats")} leftComponent={leftComponent} />
        <Content>
          <LastMessageIds loginStatus={loginStatus}>{ chatIndexes  => (
            <ListChats chatIndexes={chatIndexes} loginStatus={loginStatus} />
          )}</LastMessageIds>
        </Content>
      </Container>
    )
  }
}
)
