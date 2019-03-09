import React from 'react'
import {
  View
} from 'react-native';
import {
  Container,
  Content,
  Button,
} from 'native-base';
import { graphql, compose } from "react-apollo";
// custom components
import BBBHeader from '../../components/BBBHeader';
import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import { Layout, Colors } from '../../constants/';
//import LoginStatus from '../HomeScreen/LoginStatus'
import { w, i18n } from '../../utils/helpers.js'
import ListSearchResults from '../../components/lists/ListSearchResults'
import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../graphql/Queries'

export default SearchResultScreen = compose(
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
    super(props);
    this.state = {
      page:1
    , limit:10
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props.navigation.state.params, ['loginStatus', 'countryCode']) !== w(nextProps.navigation.state.params, ['loginStatus', 'countryCode']) ) {
      if (!w(this.props.navigation.state.params, ['loginStatus'])) {
        return true
      }
    }
    if ( w(this.props.navigation.state.params, ['terms']) !== w(nextProps.navigation.state.params, ['terms']) ) {
      if (!w(this.props.navigation.state.params, ['terms'])) {
        return true
      }
    }
    if ( JSON.stringify(w(this.props.navigation.state.params, ['filter'])) !== JSON.stringify(w(nextProps.navigation.state.params, ['filter']) )) {
      if (w(this.props.navigation.state.params, ['filter'])) {
        return true
      }
    }
    return false;
  }

  componentDidMount(){
/*    this.setState({
      searchList:[]
    , progressVisible: true
    })
    setTimeout(() => {
      this.searchProductList();
    }, 50);
    */
  }


  render() {
    let {terms, filter } = this.props.navigation.state.params
    if ( !w(this.props, ['i18n', 'getCachedLocus']) ) {
      return null
    }
    const { loginStatus, i18n: {getCachedLocus: translations} } = this.props;
    const parentName = "SearchResultScreen"
    /*
    if (terms) {
      this.terms = terms
    } else terms = this.terms
    if (filter) {
      this.filter = filter
    } else filter = this.filter
    if (loginStatus) {
      this.loginStatus = loginStatus
    } else loginStatus = this.loginStatus
    */

    var leftComponent = (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <BBBIcon
          name="BackArrow"
          size={Layout.moderateScale(18)}
          style={styles.backarrow}
        />
      </Button>
    )

    var rightComponent = (
      <View style={styles.rightComponentStyle}>
        <Button transparent onPress={() => alert('Search Clicked')}>
          <BBBIcon
            name="Search"
            size={Layout.moderateScale(18)}
            style={{ color: Colors.white }}
          />
        </Button>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate({
              routeName: 'filterScreen'
            , params: {filter: filter}
            })
          }>
          <BBBIcon
            name="StrollerFilterSvg"
            size={Layout.moderateScale(18)}
            style={{ color: Colors.white }}
          />
        </Button>
      </View>
    )

  return (
    <Container style={styles.container}>
      <BBBHeader
        title={i18n(translations, parentName, "SearchResults", loginStatus.iso639_2, "Search Results")}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      <Content>
        <ListSearchResults terms={terms} loginStatus={loginStatus} translations={translations} filter={filter} />
      </Content>
    </Container>
  )}
}
)
