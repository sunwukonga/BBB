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
import createChat from './CreateChat';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';
var chatIds=[];
var chatMessageList=[];
var listingId;
var recUserId;
var chatId_;
var chatExists;
var itemDetails;
var user_Name:"",productTitle:"",productImg:"",userImg:"";
var chatDetail;
var isFromChat=false;
export default class ChatDetailScreen extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.navigation.state.params);
		console.log(this.props.navigation.state.params.listingId);
		console.log(this.props.navigation.state.params.recUserId);
		console.log(this.props.navigation.state.params.isChatExists);
		console.log(this.props.navigation.state.params.chatId);
		listingId=this.props.navigation.state.params.listingId;
		recUserId=this.props.navigation.state.params.recUserId;
		chatId_=this.props.navigation.state.params.chatId;
		chatExists=this.props.navigation.state.params.isChatExists;
		if(this.props.navigation.state.params.itemDetails != 'undefined' && this.props.navigation.state.params.itemDetails != undefined){
			itemDetails=this.props.navigation.state.params.itemDetails;
		}
		if(this.props.navigation.state.params.chatDetail != 'undefined' && this.props.navigation.state.params.chatDetail != undefined){
			isFromChat=true;
			chatDetail=this.props.navigation.state.params.chatDetail;
		}
		this.setHeaderDetails();
		this.scroll = null;
		this.state = {
			newPost: '',
			btnDisabled:false,
			chatMessageList:[],
		};
	}

	componentDidMount(){
		this.setState({
			progressVisible: true,
		});
		chatIds=[];
		if(!chatExists){
		var createChat_={"recUserId":recUserId,"listingId":listingId};
		createChat(createChat_).then((res)=>{
			chatId_=res.data.createChat.id;
				chatIds.push({chatId:chatId_});
				console.log(chatIds);
				this.setState({
					progressVisible: false,
					btnDisabled:false,
				});
				//this.getChatMsg();
				this.updateChatList();
		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,
				btnDisabled:false,
			});
		});
	} else {
			console.log("Chat Exists");
			chatIds.push({chatId:chatId_});
			this.updateChatList();
 	}
	this.setHeaderDetails();
}

  updateChatList(){
			this.getChatMsg();
	/*	this.setInterval( () => {
				if(chatId_==null){
					this.getChatMsg();
				}
    }, 1500);*/
	}


	getChatMsg(){
		var variables={
			"chatIndexes":chatIds
		}
		getChatMessages(variables).then((res)=>{

				Object.keys(res.data.getChatMessages).forEach((key,index)=>{
						if(res.data.getChatMessages[key].id==chatId_){
							chatMessageList=res.data.getChatMessages[key].chatMessages;
						}
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
  									"chatId": chatId_,
  									"message": this.state.newPost,
  									"lastMessageId": 0
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

	setHeaderDetails(){
		if(itemDetails!=null){
				var _pImg="";
				var _uImg="";
				if(itemDetails.user.profileImage===null || itemDetails.user.profileImage.imageKey===null){

				} else {
					_uImg=itemDetails.user.profileImage.imageKey;
				}

				if(itemDetails.primaryImage===null || itemDetails.primaryImage.imageKey===null){

				} else {
					_pImg=itemDetails.primaryImage.imageKey;
				}
				user_Name=itemDetails.user.profileName;
				productTitle=itemDetails.title;
				productImg=_pImg;
				userImg=_uImg;
			}
			else if(chatDetail!=null) {
				var _pImg="";
				var _uImg="";
				if(chatDetail.recUser.profileImage===null || chatDetail.recUser.profileImage.imageKey===null){

				} else {
					_uImg=chatDetail.recUser.profileImage.imageKey;
				}

				if(chatDetail.listing.primaryImage===null || chatDetail.listing.imageKey===null){

				} else {
					_pImg=chatDetail.listing.primaryImage.imageKey;
				}
				user_Name=chatDetail.recUser.profileName;
				productTitle=chatDetail.listing.title;
				productImg=_pImg;
				userImg=_uImg;
		}
	}
	openMenu(id) {
    Alert.alert("Trest"+id)
  };

	deleteItem(item){
		var msgId=item.id;
		 Alert.alert("Delete "+msgId);
	}

	onBack(){
			if(isFromChat){
				this.props.navigation.push('ChatListScreen')
			} else {
				this.props.navigation.push('homeScreen')
			}
	}

	render() {
		var titleComponent = (
			<View style={styles.body}>
			{ userImg==="" ||  userImg===null
				? <Image  source={Images.tempUser} style={styles.profileImage} />
				: <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+userImg+""}} style={styles.profileImage} />
			}
				<Title style={styles.headerTitle}>{user_Name}</Title>
			</View>
		);
		var leftComponent = (
			<Button transparent onPress={() => this.onBack()}>
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

				{ productImg==="" || productImg===null
					? <Image  source={Images.trollie} style={styles.notifyImage} />
					: <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+productImg+""}} style={styles.notifyImage} />
				}


					<Text style={styles.regularSmall}>
					{productTitle}
					</Text>
				</View>
				<ScrollView
					ref={(scroll) => {this.scroll = scroll;}}>

				<View style={styles.contentStyle}>

					{this.state.chatMessageList.map((item, index) => {
						return (
							<TouchableOpacity 	key={index} onLongPress={()=> this.deleteItem(item)}>
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
