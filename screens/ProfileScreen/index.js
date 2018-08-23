import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";

import LoginStatus from '../HomeScreen/LoginStatus'
import ChangeButton from '../../components/buttons/ChangeButton'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'



export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }

  }



render() {

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    var DisplayProfileImage = ({imageURL}) => {
      // rowImage, swiperSec, Baby
      if (!imageURL) {
        return (
          <View style={styles.swiperSec}>
            <Baby style={styles.rowImage} />
          </View>
        )
      } else {
        return (
          <View style={styles.swiperSec}>
            <Image source={{uri: imageURL}} style={styles.rowImage} />
          </View>
        )
      }
    }
    return (
      <LoginStatus>{ loginStatus => (
        <Container style={styles.container}>
          <BBBHeader title="Profile" leftComponent={ leftComponent } />
          <Content>

            <View>
              <Text>{console.log("Info: ", loginStatus.myProfile)}</Text>
              <DisplayProfileImage imageURL={loginStatus.myProfile.profileImageURL} />
              <View style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.0)',
                alignItems:'flex-end',
                justifyContent:'flex-start',
                flexDirection: 'column',
                width: Layout.WIDTH * 0.2,
                height:Layout.WIDTH * 0.4,
                position: 'absolute',
                top: Layout.WIDTH * 0.02,
                right: Layout.WIDTH * 0.02,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderRadius: Layout.moderateScale(8),
              }}>
                <ChangeButton />
              </View>

            </View>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>ProfileScreen</Text>
            </View>

          </Content>
        </Container>
      )}</LoginStatus>
    )
  }

}
                  // Floating CHANGE ICON
            // TODO: Current Profile image with CHANGE ICON + DELETE ICON
        // EDIT AUTH STATUS
        // ProfileName with CHANGE ICON iff nameChangeCount > 0
        // Your ROLES. Must return with GetProfile.
        // Future: Stats associated with ROLES
        //   i.e. BARGAINER, TRANSLATOR, CATALOGUER, ADMIN
