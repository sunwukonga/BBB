import React from 'react'
import { View } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { graphql, compose } from "react-apollo";

// custom components
//import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

//import LoginStatus from '../HomeScreen/LoginStatus'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
//import GetProfile from '../../graphql/queries/GetProfile'
import ListUserLikedListings from '../../components/lists/ListUserLikedListings'
import { w, i18n } from '../../utils/helpers.js'
import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../graphql/Queries'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default FavoriteScreen = compose(
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
    let { loginStatus, i18n: {getCachedLocus: translations} } = this.props;
    const parentName = "FavoriteScreen"
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

      //<LoginStatus>{ loginStatus => (
          //<GetProfile loginStatus={loginStatus}>{ currentUser => (
                  //<Text style={styles.getStartedText}>Your Likes</Text>
    return (
        <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
          <Container style={styles.container}>
            <BBBHeader title={i18n(translations, parentName, "YourLikes", loginStatus.iso639_2, "Your Likes")} leftComponent={ leftComponent } />
            <Content>
              <View style={styles.getStartedContainer}>
                <ListUserLikedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes, translations={translations} } />
              </View>
            </Content>
          </Container>
        )}</LastMessageIds>
    );
  }

}
)
          //)}</GetProfile>
      //)}</LoginStatus>
