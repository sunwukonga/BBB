import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

import LoginStatus from '../HomeScreen/LoginStatus'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import GetProfile from '../../graphql/queries/GetProfile'
import ListUserPostedListings from '../../components/lists/ListUserPostedListings'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default class OwnListingsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      limit: 10
    , page: 1
    }
  }

  render() {
    var leftComponent = (
			<Button
				transparent
				onPress={() => this.props.navigation.goBack()}>
				<BBBIcon
					name="Menu"
					size={Layout.moderateScale(18)}
					color={Colors.white}
				/>
			</Button>
		);

    return (
      <LoginStatus>{ loginStatus => (
        <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
          <GetProfile loginStatus={loginStatus}>{ currentUser => (
            <Container style={styles.container}>
              <BBBHeader title="Your Listings" leftComponent={ leftComponent } />
              <Content>
                <View style={styles.getStartedContainer}>

                  <Text style={styles.getStartedText}>Your Listings</Text>
                  <ListUserPostedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} currentUser={currentUser} />

                </View>
              </Content>
            </Container>
          )}</GetProfile>
        )}</LastMessageIds>
      )}</LoginStatus>
    );
  }

}
