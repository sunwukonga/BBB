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

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.navigate('homeScreen')}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>
    return (

      <Container style={styles.container}>
        <BBBHeader title="Profile" leftComponent={ leftComponent } />
        <Content>
        
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>ProfileScreen</Text>
            <Text style={styles.getStartedText} onPress={this.onPressGetStatus}>  Change this text and your app will automatically reload.</Text>

          </View>
        </Content>
      </Container>
    );
  }

}
