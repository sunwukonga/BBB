import React from 'react';
import {
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
} from 'react-native';
import {
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
	Title,
	Button,
	Icon,
	Input,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

//custom components
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Images, Colors } from '../../constants/';

export default class ChatDetailScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newPost: '',
		};
	}

	render() {
		var data = [
			{
				id: 1,
				user_id: 1,
				text: 'Hi !',
				time: 'Feb 27, 10:28 AM',
			},
			{
				id: 2,
				user_id: 2,
				text: 'Hi !',
				time: 'Feb 27, 10:28 AM',
			},
			{
				id: 3,
				user_id: 1,
				text: 'How are you?',
				time: 'Feb 27, 10:28 AM',
			},
		];
		var titleComponent = (
			<View style={styles.body}>
				<Image source={Images.tempUser} style={styles.profileImage} />
				<Title style={styles.headerTitle}>Leza Klenk</Title>
			</View>
		);
		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.navigate('chatListScreen')}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);
		return (
			<Container style={styles.container}>
				<BBBHeader
					titleComponent={titleComponent}
					leftComponent={leftComponent}
				/>
				<View style={styles.notifyContainer}>
					<Image source={Images.trollie} style={styles.notifyImage} />
					<Text style={styles.regularSmall}>
						Pre-loved stroller. Used twice and kept in storage.
					</Text>
				</View>
				<Content style={styles.contentStyle}>
					{data.map((item, index) => {
						return (
							<View
								key={index}
								style={{ marginHorizontal: Layout.moderateScale(10) }}>
								<View style={item.user_id == 1 ? styles.chat : styles.response}>
									{item.user_id == 1 ? (
										<BBBIcon
											name="MsgRightSvg"
											color={Colors.avtarBorder}
											size={Layout.moderateScale(15)}
											style={{
												position: 'absolute',
												right: Layout.moderateScale(-10),
											}}
										/>
									) : (
										<BBBIcon
											name="MsgLeftSvg"
											color="#f5f5f5"
											size={Layout.moderateScale(15)}
											style={{
												position: 'absolute',
												left: Layout.moderateScale(-12.5),
											}}
										/>
									)}
									<Text style={styles.regularSmall}>{item.text}</Text>
									<Text style={styles.timeStyle}>{item.time}</Text>
								</View>
							</View>
						);
					})}
				</Content>

				<KeyboardAvoidingView behavior="padding">
					{/*Second Section START*/}
					<View style={styles.footerStyle}>
						<Input
							value={this.state.newPost}
							style={styles.newPostStyle}
							editable={true}
							keyboardType="default"
							returnKeyType="done"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={newPost => this.setState({ newPost })}
							underlineColorAndroid="transparent"
							placeholder="Send Message"
							placeholderTextColor="#7d7d7d"
						/>

						<TouchableOpacity
							onPress={() => alert('POST')}
							style={styles.postBtn}>
							<Ionicons
								name="md-send"
								size={Layout.moderateScale(30)}
								color={Colors.white}
							/>
						</TouchableOpacity>
					</View>
					{/*Second Section END*/}
				</KeyboardAvoidingView>
			</Container>
		);
	}
}
