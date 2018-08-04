import React from 'react';
import { Image, View, FlatList } from 'react-native';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Left,
	Body,
	Text,
	Button,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import BBBIcon from '../../components/BBBIcon';

//style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';
import { ProgressDialog } from 'react-native-simple-dialogs';
import getChatMessages from './GetChatMessages';

export default class ChatListScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
			chatMessageList:[],
		}
	}

	componentDidMount(){
		this.setState({
			progressVisible: true,
		});
		this.getChatMsg();
	}
	getChatMsg(){
		var variables={
			"chatIndexes":[]
		}
		getChatMessages(variables).then((res)=>{
				chatMessageList=res.data.getChatMessages;

				this.setState({
					chatMessageList:chatMessageList,
					progressVisible: false,
				})

		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,
			});
		});
	}

	openChatDetailScreen = (item) => {
      var recUserId_=item.recUser.id;
      var listingId_=item.listing.id;
      var chatId_=item.id;
      var chatExists=chatId_!=null;
      var chatDetail_ = item;
      this.props.navigation.navigate('chatDetailScreen', {
              recUserId: recUserId_,
              listingId: listingId_,
              isChatExists:chatExists,
              chatId:chatId_,
              chatDetail:chatDetail_,
            });
  }

// 	style={item.counts == '0' ? styles.mainlist : styles.mainlists}
	_renderItem = ({ item }) => (
		<List
			style={styles.mainlist}
			key={item.id}>
			<ListItem
				avatar
				onPress={() => this.openChatDetailScreen(item)}>
				<Left style={styles.left}>
					<View style={styles.bebyview}>

						{ item.recUser.profileImage===null ||  item.recUser.profileImage.imageKey===null
							? <Image  source={Images.tempUser} style={styles.userImage} />
							: <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.recUser.profileImage.imageKey+""}} style={styles.userImage} />
						}

					</View>
				</Left>
				<Body style={styles.bodys}>
					<View style={styles.titleview}>

					{ item.listing.primaryImage===null ||  item.listing.primaryImage.imageKey===null
						? <Image  source={Images.trollie} style={styles.rowImage} />
						: <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.listing.primaryImage.imageKey+""}} style={styles.rowImage} />
					}

						<Text style={styles.title}>{item.listing.title}</Text>
					</View>
					<View style={styles.bottomline} />
					<View style={styles.namecount}>
						<Text style={styles.name}>{item.recUser.profileName}</Text>
							{item.chatMessages.length==0?null:(
								<Text style={styles.count}>{item.chatMessages.length}</Text>
							)}
					</View>
				</Body>
			</ListItem>
		</List>
	);

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
			<Container style={styles.container}>
				<BBBHeader title="Chats" leftComponent={leftComponent} />
				<Content>

					<FlatList
						data={this.state.chatMessageList}
						keyExtractor={listItemData => listItemData.id}
						renderItem={this._renderItem}
					/>
				</Content>
				<ProgressDialog
            visible={this.state.progressVisible}
             message="Please Wait..."
            activityIndicatorSize="large"
                       />
			</Container>
		);
	}
}
