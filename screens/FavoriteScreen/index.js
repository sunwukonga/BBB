import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';

// custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Colors } from '../../constants/';

export default class FavoriteScreen extends React.Component {
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
				<BBBHeader title="Favorites" leftComponent={leftComponent} />
				<Content>
					<View style={styles.getStartedContainer}>
						<Text style={styles.getStartedText}>FavoriteScreen</Text>

						<Text style={styles.getStartedText}>
							Change this text and your app will automatically reload.
						</Text>
					</View>
				</Content>
			</Container>
		);
	}
}
