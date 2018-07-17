import React from 'react';
import {
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,ScrollView,Alert,TouchableWithoutFeedback,
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

import getChatMessages from './GetChatMessages';
import sendChatMessage from './SendMessage';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';
var chatIds=[];
var chatMessageList=[];
export default class ChatDetailScreen extends React.Component {
	constructor(props) {
		super(props);
		this.scroll = null;
		this.state = {
			newPost: '',
			btnDisabled:false,
			chatMessageList:[],
		};
		chatIds.push({chatId:"1"})
	}

	componentDidMount(){
		this.setState({
			progressVisible: true,

		});

		var variables={
			"chatIndexes":chatIds
		}

		getChatMessages(variables).then((res)=>{



				Object.keys(res.data.getChatMessages).forEach((key,index)=>{
						//chatMessageList.push(res.data.getChatMessages[0].chatMessages)
							chatMessageList=res.data.getChatMessages[0].chatMessages
				});

				this.setState({
					chatMessageList:chatMessageList,
					progressVisible: false,
					btnDisabled:false,
				})
				setTimeout(() => {
						this.scroll.scrollToEnd();
					}, 150);

		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,
				btnDisabled:false,
			});
		});

	}

	deleteSelectedMessage(msgId){
			Alert.alert("Delete:"+msgId)
	}

	sendChatMsg(){

		if(this.state.newPost.length===0){
			// this.setState({errorMsg:"Please Enter Title",showDialog:true,dialogTitle:"Error!"})
			Toast.show("Please Enter Message",Toast.SHORT)
				return false;
		}
		this.setState({
			progressVisible: false,
			btnDisabled:true,
		});
		var variables={
  									"chatId": "3",
  									"message": this.state.newPost,
  									"lastMessageId": "0"
									}
			sendChatMessage(variables).then((res)=>{
					console.log(res);
					chatMessageList=[]
					chatMessageList=res.data.sendChatMessage
					this.setState({
						chatMessageList:chatMessageList,
						progressVisible: false,
						newPost:'',
						btnDisabled:false,
					})
					setTimeout(() => {
							this.scroll.scrollToEnd();
						}, 150);

			})
			.catch(error =>{
				console.log("Error:" + error.message);
				this.setState({
					progressVisible: false,
					btnDisabled:false,
				});
			});



	}
	openMenu(id) {
    Alert.alert("Trest"+id)
  };

	render() {
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
				<ScrollView
					ref={(scroll) => {this.scroll = scroll;}}>

				<View style={styles.contentStyle}>

					{this.state.chatMessageList.map((item, index) => {
						return (
							<TouchableOpacity >
							<View
								key={index}
								style={{ marginHorizontal: Layout.moderateScale(10) }}>

								<View style={item.authorId == "1" ? styles.chat : styles.response}>
									{item.authorId == 1 ? (
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
									<Text style={styles.regularSmall}>{item.message}</Text>
									<Text style={styles.timeStyle}>Today</Text>
								</View>

							</View>
	</TouchableOpacity >
						);
					})}

				</View>
	</ScrollView>
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
							text={this.state.newPost}
							onChangeText={newPost => this.setState({ newPost })}
							underlineColorAndroid="transparent"
							placeholder="Send Message"
							placeholderTextColor="#7d7d7d"
						/>

						<TouchableOpacity
							onPress={() => this.sendChatMsg()}
							 disabled={this.state.btnDisabled}
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
				<ProgressDialog
						visible={this.state.progressVisible}
						 message="Please wait"
						activityIndicatorSize="large"
						activityIndicatorColor="blue"
											 />
			</Container>
		);
	}
}
