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
import ListUserLikedListings from '../../components/lists/ListUserLikedListings'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default class FavoriteScreen extends React.Component {

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
					name="BackArrow"
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
              <BBBHeader title="Your Likes" leftComponent={ leftComponent } />
              <Content>
                <View style={styles.getStartedContainer}>

                  <Text style={styles.getStartedText}>Your Likes</Text>
                  <ListUserLikedListings loginStatus={loginStatus} variables={{"limit":this.state.limit,"page":this.state.page}} chatIndexes={chatIndexes} currentUser={currentUser} />

                </View>
              </Content>
            </Container>
          )}</GetProfile>
        )}</LastMessageIds>
      )}</LoginStatus>
    );
  }

}
