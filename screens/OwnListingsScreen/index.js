import React from 'react'
import { View } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { graphql, compose } from "react-apollo";

// custom components
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

import LastMessageIds from '../ChatListScreen/LastMessageIds'
import ListUserPostedListings from '../../components/lists/ListUserPostedListings'
import {
  GET_LOGIN_STATUS
, GET_CACHED_TRANSLATIONS
} from '../../graphql/Queries'
import { w, i18n } from '../../utils/helpers.js'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default OwnListingsScreen = compose(
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
class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      limit: 10
    , page: 1
    }
  }

  render() {
    if ( !w(this.props, ['i18n', 'getCachedLocus']) ) {
      return null
    }
    const { loginStatus, i18n: {getCachedLocus: translations} } = this.props;
    const parentName = "OwnListingsScreen"

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
    )

    return (
        <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
          <Container style={styles.container}>
            <BBBHeader title={i18n(translations, parentName, "YourListings", loginStatus.iso639_2, "Your Listings")} leftComponent={ leftComponent } />
            <Content>
              <View style={styles.getStartedContainer}>
                <ListUserPostedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} translations={translations} />
              </View>
            </Content>
          </Container>
        )}</LastMessageIds>
    );
  }

}
)
