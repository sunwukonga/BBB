import React from 'react';
import { Image, TouchableOpacity, View, ListView ,FlatList,ActivityIndicator} from 'react-native';
import {
	Container,
	Content,
	Left,
	Text,
	Icon,
	Button,
	Item,
} from 'native-base';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';
//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import IdentityVerification2 from '../../components/IdentityVerification2';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';
// style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

import LoginStatus from '../HomeScreen/LoginStatus'
import LastMessageIds from '../ChatListScreen/LastMessageIds'
import GetProfile from '../../graphql/queries/GetProfile'
import Listing from '../../components/display/Listing'


class ProductDetailsScreen extends React.Component {

	constructor(props) {
		super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.navigation.state.params.item.liked !== nextProps.navigation.state.params.item.liked) {
      return true;
    }
    return false;
  }

  render() {
    let {item, loginStatus} = this.props.navigation.state.params

		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);

    return (
      <LastMessageIds loginStatus={loginStatus}>{ chatIndexes => (
          <GetProfile loginStatus={loginStatus}>{ currentUser => (
            <Container style={styles.container}>
              <BBBHeader
                title={item.title}
                leftComponent={leftComponent}
              />
              <Content style={styles.contentStyle}>
                <Listing item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} currentUser={currentUser} />
              </Content>
            </Container>
          )}</GetProfile>
      )}</LastMessageIds>
    )
  }
}

export default ProductDetailsScreen
/*
// Get login status
var log_status = '';
const GET_LOGIN_STATUS = gql`
     query log @client{
           authorized
           jwt_token
        }`;

const drawerStatus = 'locked-closed';

const App = () => (
<Query query={GET_LOGIN_STATUS}>
  {({ loading, error, data }) => {
     if (loading) return <Text>{`Loading...`}</Text>;
     if (error) return <Text>{`Error: ${error}`}</Text>;
      console.log('get data');
      console.log('home_query '+data.authorized);
      console.log('home_query '+data.jwt_token);

      log_status = data.authorized;

      if(log_status==true){
        drawerStatus = 'unlocked';
      // navigation.setParams({ labels: { first: "locked-closed" }})
      // console.log(navigation.state.params.labels.first);

    }
    else{
      drawerStatus = 'locked-closed';
      // navigation.setParams({ labels: { first: "unlocked" }})
      // console.log(navigation.state.params.labels.first);

    }
    return (
      <View/>
    )
  }}
</Query>
)
const NA_HomeToLoginToDrawer = NavigationActions.navigate({
  routeName: 'loginScreen'
, params: { source: 'productDetailsScreen'
          , dest: 'productDetailsScreen'}
})
var itemDetails;

export default class ProductDetailsScreen extends React.Component {

	static navigationOptions = () => ({
	  drawerLockMode: drawerStatus,
	});

	constructor(props) {
		super(props);

	//	console.log(this.props.navigation.state.params.item);
		itemDetails=this.props.navigation.state.params.item;
		const rowHasChanged = (r1, r2) => r1 !== r2;
		const dataObjects = [
			{ id: 'aimg0001', source: Images.trollie, flag: false },
			{ id: 'aimg0002', source: Images.trollie, flag: false },
			{ id: 'aimg0003', source: Images.trollie, flag: false },
		];
		// DataSource configured
		const ds = new ListView.DataSource({ rowHasChanged });

		this.state = {
			dataSource: ds.cloneWithRows(dataObjects),
			active: false,
			itemData:itemDetails,
			progressVisible:false,
			swipeImageList:[],
			dataLoaded:false,
			isLiked:false,
		};
	}

	componentDidMount(){
		this.setState({
			progressVisible:true,
		})
		setTimeout(() => {
			this.getItemDetails();
		}, 250);
	}


	getItemDetails(){
		var variables={"id": itemDetails.id}
		getProductDetails(variables).then((res)=>{

				var data=res.data.getListing;
				console.log("Response");
				console.log(data);
				this.setState({
						itemData:data,
						progressVisible:false,
						dataLoaded:true,
				})
			setTimeout(() => {
					this.populateData();
				}, 150);
		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,
			});
		});
	}

	sendLikeRequest(item){
		this.setState({

				progressVisible:true,

		})
		var variables={"listingId": item.id,"like": !this.state.isLiked}

		likeProductApi(variables).then((res)=>{

				var like=!this.state.isLiked;
				//res.data.likeListing;

				this.setState({
						isLiked:like,
				})

				this.setState({
							progressVisible:false,
					})
		})
		.catch(error => {
			console.log("Error:" + error.message);
			Toast.show(error.message,Toast.SHORT);
			this.setState({
				progressVisible: false,
			});
		});
	}

	populateData(){
		var tmpImgList=[];
		if(this.state.itemData.primaryImage!=null){ // && this.state.itemData.primaryImage.imageKey!=null
			tmpImgList.push({id:this.state.itemData.primaryImage.id,post:this.state.itemData.primaryImage.imageKey});
		}
		if(this.state.itemData.secondaryImages!=null){
				for(var i=0;i<this.state.itemData.secondaryImages.length;i++){
					tmpImgList.push({id:this.state.itemData.secondaryImages[i].id,post:this.state.itemData.secondaryImages[i].imageKey});
				}
		}
		console.log("Image length",tmpImgList.length);
		if(tmpImgList.length==0){
				tmpImgList.push({id:1,post:null});
		}
		var like=this.state.itemData.liked;
		this.setState({
			swipeImageList:tmpImgList,
			isLiked:like,
		})
	}


	checkLoginChat = (item, login_status) => {
    console.log("Log Status: " + log_status);
    if( log_status == false ) {
      this.props.navigation.dispatch(NA_HomeToLoginToDrawer);
    } else {
      var recUserId_=item.user.id;
      var listingId_=item.id;
      var chatId_=item.chatId;
      var chatExists=chatId_!=null;
      this.props.navigation.navigate('chatDetailScreen', {
              recUserId: recUserId_,
              listingId: listingId_,
              isChatExists:chatExists,
              chatId:chatId_,
            });

    }
  }


	_handleMenu(menuName) {
		this.props.navigation.navigate(menuName);
	}
	navigatess = () => {
		this.props.navigation.navigate('productDetailsScreen')
	}

	_renderItem = ({ item }) => (
				<TouchableOpacity
					onPress={ ()=>this.navigatess()}>
			<View style={styles.imagesSubView}>
				<View>
					<Image source={Images.trollie} style={styles.rowImageProd} />
					<View style={styles.favoriteIconSec}>
						<BBBIcon
							name="Favorite"
							size={Layout.moderateScale(18)}
							color={Colors.white}
							style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
						/>
					</View>
            
					  <TouchableOpacity style={styles.chatIconSec} onPress={() => this.checkLoginChat(item, loginStatus.loginStatus)}>
					<View >
						<BBBIcon
							name="Chat"
							size={Layout.moderateScale(18)}
							color={Colors.white}
							style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
						/>
					</View>
					</TouchableOpacity>
				</View>

				<Item style={styles.userItemDetailsSec}>
					<View style={styles.userProfileSec}>
						<Image source={Images.tempUser} style={styles.userProfile} />
						<View style={styles.userOnlineOffline} />
					</View>
					<View style={styles.userNameSec}>
						<Text style={styles.userName}>Best Buys</Text>
					</View>
					<View style={styles.activeuserSec}>
						<IdentityVerification2
							width={Layout.moderateScale(30)}
							height={Layout.moderateScale(30)}
						/>
					</View>
				</Item>

				<View>
					<Text style={styles.postDesc}>
						Pre-loved stroller. Used twice and kept in stoage.
					</Text>
				</View>

				<View style={styles.productreviewSec}>
					<View style={styles.ratingSec}>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={styles.starstyle}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={styles.starstyle}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={styles.starstyle}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={styles.starstyle}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={styles.starstyle}
						/>
						<Text style={styles.ratingmsgct}> (52) </Text>
					</View>
					<View style={styles.priceSec}>
						<Text style={styles.pricetext}>$250</Text>
					</View>
				</View>
			</View>
			</TouchableOpacity>
);


	render() {

		var imageData = this.state.swipeImageList;
		var productData=this.state.itemData;
		console.log(imageData);
		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);

		var rightComponent = (
			<Button transparent onPress={() => this._handleMenu('categoryScreen')}>
				<BBBIcon
					name="CategoryIcon"
					size={Layout.moderateScale(18)}
					style={{ color: '#ffffff' }}
				/>
			</Button>
		);
		if (!this.state.dataLoaded) {
		return (
			<Container style={styles.container}>

				<BBBHeader
					title={this.state.itemData.title}
					leftComponent={leftComponent}
				/>

				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator
						size="large"
						style={styles.activityIndicator} />
				</View>
			</Container>
		);
		}

		return (
      <LoginStatus>{ loginStatus => (
			<Container style={styles.container}>
			  <App />

				<BBBHeader
					title={this.state.itemData.title}
					leftComponent={leftComponent}
				/>


				<Content style={styles.contentStyle}>
					<Content style={styles.contentSwiper}>
						<Swiper
							style={styles.swiperSec}
							dot={<View style={styles.dotStyle} />}
							activeDot={<View style={styles.activeDotStyle} />}>

							{imageData.map((item, index) => {
								return (
									<View key={index} style={styles.slide}>

                    {item.post===null ?   <Image  source={Images.trollie}  style={styles.rowImage} /> :
											<Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.post+""}} style={styles.rowImage} />
                    }

                    <LikeButton item={item} loginStatus={loginStatus} />

										<View>
											<BBBIcon
												name="Chat"
												size={Layout.moderateScale(18)}
												color={productData.chatId!=null ? Colors.tintColor : Colors.white}
												style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
											/>
										</View>
									</View>
								);
							})}

						</Swiper>
					</Content>
					<View style={styles.profileContainer}>
						<View style={styles.alignment}>
							<View style={styles.ImageContainer}>


								{productData.user.profileImage===null || productData.user.profileImage.imageKey===null ?   <Image  source={Images.tempUser} style={styles.userProfile} /> :
										<Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+productData.user.primaryImage.imageKey+""}} style={styles.userProfile} />
								}
								  <View style={productData.user.online ? styles.activeDot : styles.userOffline} />
							</View>
							<Text style={styles.mediumFont}>{productData.user.profileName}</Text>
						</View>
						<View style={styles.progressStyle}>

							<IdentityVerification
								width={Layout.moderateScale(30)}
								height={Layout.moderateScale(30)}
								level={productData.user.idVerification}
							/>
						</View>
					</View>

					<View style={styles.deviderStyle} />

					<Text style={styles.regularSmall}>
						{productData.description}
					</Text>
					<View style={styles.profileContainer}>
						<View style={styles.alignment}>

							<Stars
	              size={Layout.moderateScale(14)}
	              styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
	              styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
	              repeats={productData.user.sellerRating}
	            />
							<Text style={styles.rateCount}>({productData.user.sellerRatingCount})</Text>
						</View>
						<Text style={styles.skyFontBold}>
							{productData.saleMode.currency!==null ? productData.saleMode.currency.currencySymbol : ""}{productData.saleMode.price!==null ? productData.saleMode.price : ""}
						</Text>
					</View>

					<View style={styles.alignmentButton}>
						{productData.saleMode.mode=="BARTER" ? (
						<TouchableOpacity
							style={styles.barterButton}
							onPress={() => alert('BARTER')}>
							<Text style={styles.regularSmall}>BARTER</Text>
						</TouchableOpacity>
							) : null}
							{productData.saleMode.mode=="COUNTER" ? (
						<TouchableOpacity
							style={styles.offerButton}
							onPress={() => alert('COUNTER OFFER')}>
							<Text style={styles.regularSmall}>COUNTER OFFER</Text>
						</TouchableOpacity>
							) : null}
							{productData.saleMode.mode=="SALE" ? (
							<TouchableOpacity
								style={styles.offerButton}
								onPress={() => alert('SALE')}>
								<Text style={styles.regularSmall}>SALE</Text>
							</TouchableOpacity>
								) : null}
					</View>

					<View>
						<Text style={styles.regularLarge}>Category</Text>
						<Text style={[styles.regularSmall, styles.tagContainer]}>

							{productData.category.name}
						</Text>

						{productData.template==null? null :(
							<View>
								<Text style={styles.regularLarge}>Template</Text>
								<View style={styles.tagContainer}>
								  <View style={styles.alignmentTag}>
										<Text style={styles.regularSmall}>{productData.template.title}</Text>
										<Icon
											name="close"
											size={Layout.moderateScale(10)}
											style={styles.closeIcon}
											onPress={() => alert(productData.template.description)}
										/>
								</View>
							</View>
							</View>
					)}
						<Text style={styles.regularLarge}>Tags</Text>
						<View style={styles.tagContainer}>
						{productData.tags.map((item, index) => {
							return (
								<View style={styles.alignmentTag}>
									<Text style={styles.regularSmall}>{item.name}</Text>
									<Icon
										name="close"
										size={Layout.moderateScale(10)}
										style={styles.closeIcon}
										onPress={() => alert(item.name)}
									/>
								</View>
							)
						})}

						</View>
					</View>

					<View style={styles.deviderStyle} />

					{productData.saleMode.exchangeModes==null || productData.saleMode.exchangeModes.length==0? null : (

					<View>
						<Text style={styles.boldFont}>Delivery Options</Text>

						{productData.saleMode.exchangeModes.map((item, index) => {
							return (

								<View style={styles.profileContainer}>
									<View>
										<Text style={styles.skyFontMedium}>{item.mode=='FACE'?'Face to Face':'Registered Post'}</Text>
										<Text
											style={styles.regularSmall}>
											{item.mode=='POST' ?
												'Additional Cost '+item.currency.currencySymbol+" : "+item.price
											 :
												item.location.lineOne+", "+item.location.lineTwo+', '+item.location.postcode
											}
										</Text>
									</View>
									{item.mode=='FACE'?(
									<Ionicons
										name="md-locate"
										size={Layout.moderateScale(20)}
										color="#1fa6a4"
									/>
								):null}

								</View>
							)
						})}

							<View style={styles.deviderStyle} />
							</View>

					)}

				</Content>
				<ProgressDialog
						visible={this.state.progressVisible}
						 message="Please Wait..."
						activityIndicatorSize="large"
											 />
			</Container>
      )}</LoginStatus>
		);
	}
}
*/

/*
											<TouchableOpacity style={styles.favoriteIconSec} onPress={() => this.sendLikeRequest(productData)}>
										<View >
											<BBBIcon
												name="Favorite"
												size={Layout.moderateScale(18)}
												color={this.state.isLiked ? Colors.tintColor : Colors.white}
												style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
											/>
										</View>
											</TouchableOpacity>
										<TouchableOpacity style={styles.chatIconSec} onPress={() => this.checkLoginChat(productData)}>
*/
						/*
						<View style={styles.deviderStyle} />
					<View style={styles.imagesMainView}>
						<View style={styles.populerSec}>
							<Text style={styles.populerText}>Related Products</Text>
						</View>
						<FlatList
							horizontal={true}
							data={listItemData}
							keyExtractor={listItemData => listItemData.id}
							renderItem={this._renderItem}
							contentContainerStyle={styles.listContent}
						/>
							</View>*/
