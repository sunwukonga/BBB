import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default class SupportScreen extends React.Component {

  render() {
    var leftComponent = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate('DrawerOpen')}>
				<BBBIcon
					name="Menu"
					size={Layout.moderateScale(18)}
					color={Colors.white}
				/>
			</Button>
		);

    return (
      <Container style={styles.container}>
        <BBBHeader title="Support" leftComponent={ leftComponent } />
        <Content>
          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>SupportScreen</Text>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }

}
