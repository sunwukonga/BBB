import React from 'react'
import {
  TouchableOpacity
, View
, Linking
} from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { graphql, compose } from "react-apollo";

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'
import { Ionicons } from '@expo/vector-icons';
import {
  GET_LOGIN_STATUS
, GET_CACHED_TRANSLATIONS
} from '../../graphql/Queries'
import { w, i18n } from '../../utils/helpers.js'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default AboutUsScreen = compose(
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
  }



render() {

    if ( !w(this.props, ['i18n', 'getCachedLocus']) ) {
      return null
    }
    const { loginStatus, i18n: {getCachedLocus: translations} } = this.props;
    const parentName = "AboutUsScreen"

    var leftComponent = (
      <Button transparent onPress={()=>this.props.navigation.goBack()}>
        <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
      </Button>
    )

    return (
        <Container style={styles.container}>
          <BBBHeader title={i18n(translations, parentName, "AboutUs", loginStatus.iso639_2, "About Us")} leftComponent={ leftComponent } />
          <Content>
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.linkPadding}
                onPress={() => {
                  Linking.openURL( "http://www.bebebargains.com/privacy-policy/" )
                }}>
                <Ionicons
                  name="ios-link"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.link}>{i18n(translations, parentName, "PrivacyPolicy", loginStatus.iso639_2, "Privacy Policy")} -- BebeBargains</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL( "http://www.bebebargains.com/terms-of-use/" )
                }}>
                <Ionicons
                  name="ios-link"
                  size={Layout.moderateScale(20)}
                  color={Colors.secondaryColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.link}>{i18n(translations, parentName, "TermsOfUse", loginStatus.iso639_2, "Terms of Use")} -- BebeBargains</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.getStartedContainer}>
              <View style={styles.hr} />
            </View>

          </Content>
        </Container>
    )
  }
}
)
