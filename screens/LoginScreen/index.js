import React from 'react';
import { Image, View, ImageBackground } from 'react-native';
import { Container, Content, Left, Text, Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom components
import BebeBARGAINS from '../../components/BebeBARGAINS';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class LoginScreen extends React.Component {
	render() {
		var leftComponent = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate('mainScreen')}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);
		return (
			<Container style={styles.container}>
				<View style={styles.container}>
					<ImageBackground source={Images.bg} style={styles.mainimgbg}>
						<BBBHeader title="Login" leftComponent={leftComponent} />
						<View style={styles.welcomeContainer}>
							<BebeBARGAINS
								width={Layout.WIDTH * 0.4}
								height={Layout.WIDTH * 0.8}
							/>
							<Text style={styles.connectSec}>
								<Ionicons
									name="ios-remove-outline"
									style={[
										styles.lineStyle,
										{ marginRight: Layout.moderateScale(10) },
									]}
								/>{' '}
								CONNECT WITH{' '}
								<Ionicons
									name="ios-remove-outline"
									style={[
										styles.lineStyle,
										{ marginLeft: Layout.moderateScale(10) },
									]}
								/>
							</Text>
							<View style={styles.socialSec}>
								<View style={styles.facebookSec}>
									<FontAwesome
										name="facebook"
										size={Layout.moderateScale(25)}
										style={{
											color: Colors.fbbgicon,
										}}
									/>
								</View>
								<View style={styles.googleSec}>
									<FontAwesome
										name="google-plus"
										size={Layout.moderateScale(25)}
										style={{
											color: Colors.googlebgicon,
										}}
									/>
								</View>
							</View>
						</View>
					</ImageBackground>
				</View>
			</Container>
		);
	}
}
