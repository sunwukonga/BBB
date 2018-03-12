import React from 'react';
import { Image, StyleSheet, Platform, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Button, Icon, Input } from 'native-base';
import { Layout, Images, Colors } from '../../constants/';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screen style
import styles from './styles'

export default class ChatDetailScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newPost: '',
		};
	}

  static navigationOptions = {
    header: null,
  };

  render() {
		var data = [
			{
				id: 1,
				user_id: 1,
				text: "Hi !",
				time: 'Feb 27, 10:28 AM',
			},
			{
				id: 2,
				user_id: 2,
				text: "Hi !",
				time: 'Feb 27, 10:28 AM',
			},
			{
				id: 3,
				user_id: 1,
				text: "How are you?",
				time: 'Feb 27, 10:28 AM',
			},
		];

    return (
      <Container style={styles.container}>
				<Header style={styles.header}>

          {/* Take up the space */}
          <Left style={styles.left}>
						<Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" size={Layout.moderateScale(20)} style={{color: '#ffffff'}}/>
						</Button>
          </Left>

          {/* Title */}
          <Body style={styles.body}>
            <Image source={Images.tempUser} style={styles.profileImage}/>
            <Title style={styles.headerTitle}>
              Leza Klenk
            </Title>
          </Body>

          {/* Take up the space */}
          <Right style={styles.right}>
          </Right>

	      </Header>
        <View style={styles.notifyContainer}>
          <Image source={Images.trollie} style={styles.notifyImage}/>
          <Text style={styles.regularSmall}>Pre-loved stroller. Used twice and kept in storage.</Text>
        </View>
        <Content style={styles.contentStyle}>
					{
						data.map((item, index) => {
							return(
								<View style={(item.user_id == 1) ? styles.chat : styles.response} key={index}>
									<Text style={styles.regularSmall}>{item.text}</Text>
									<Text style={styles.timeStyle}>{item.time}</Text>
								</View>
							)
						})
					}
        </Content>

        <KeyboardAvoidingView behavior={(Platform.OS == 'ios')?'padding':null}>

          {/*Second Section START*/}
          <View style={styles.footerStyle}>
            <Input
              value={this.state.newPost}
              style={styles.newPostStyle}
              editable={true}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(newPost) => this.setState({newPost})}
              underlineColorAndroid='transparent'
              placeholder='Send Message'
              placeholderTextColor="#7d7d7d" />

            <TouchableOpacity onPress={() => alert('POST')} style={styles.postBtn}>
              <Ionicons name="md-send" size={Layout.moderateScale(30)} color='#fff' />
            </TouchableOpacity>
          </View>
          {/*Second Section END*/}

        </KeyboardAvoidingView>
      </Container>
    );
  }
}
