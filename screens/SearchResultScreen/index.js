import React from 'react'
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	FlatList,
	AsyncStorage,
	ActivityIndicator,
} from 'react-native';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Left,
	Body,
	Right,
	Thumbnail,
	Text,
	Button,
	Icon,
	Item,
	Title,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressDialog } from 'react-native-simple-dialogs';
// custom components
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader';
import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import { Layout, Colors, Images } from '../../constants/';
import IdentityVerification from '../../components/IdentityVerification';
import Stars from '../../components/Stars';
import getSearchProductList from './SearchListing';

var mode="SALE",searchTerms="",rating=null,verification=null,priceMax=null,priceMin=null,categories=[],templates=[],tags=[],counterOffer=null,distance=null;

export default class SearchResultScreen extends React.Component {

  constructor(props) {
    super(props);
    searchTerms=this.props.navigation.state.params.searchTerms;
	  this.state = {
      searchList:[],
      progressVisible: false,
      showSearchBox:false,
			countryCode:'',
			page:1,
			limit:10,
			isLoadingMore:false,
			loadMoreCompleted:false,
			data:props.navigation.state.params
    }
  }

  componentDidMount(){
		this._retrieveCountry();
    this.setState({
			searchList:[],
      progressVisible: true,
    });
		setTimeout(() => {
    this.searchProductList();
		  }, 350);
  }

	componentWillReceiveProps(nextProps) {
		this._retrieveCountry();
		this.setState({
			searchList:[],
			progressVisible: true,
			loadMoreCompleted:false,
			isLoadingMore:false,
			page:1,
		});
		categories=[];
		tags=[];
		templates=[];

		//console.log(nextProps.navigation.state.params);
		this.setState({ data: nextProps.navigation.state.params });
		mode=nextProps.navigation.state.params.mode;
	  rating=nextProps.navigation.state.params.rating;
		verification=nextProps.navigation.state.params.idVerify;
		counterOffer=nextProps.navigation.state.params.counterOffer;
		priceMax=nextProps.navigation.state.params.maxPrice;
		priceMin=nextProps.navigation.state.params.minPrice;
		var category=nextProps.navigation.state.params.categoryId;
		var templateId=nextProps.navigation.state.params.templateId;
		var tagId=nextProps.navigation.state.params.tagId;
		if(templateId!=null){
			templates.push(templateId);
		}
		if(tagId!=null){
			tags.push(tagId);
		}
		if(category!=null){
			categories.push(category);
		}
		setTimeout(() => {
		this.searchProductList();
		}, 350);
	}
	_retrieveCountry = async () => {
	      try {
	          const value = await AsyncStorage.getItem('countryCode');
	          if (value !== null) {
	            console.log(value);
	            this.setState({
	              countryCode: value
	            });
	          }
	       } catch (error) {
	         console.log(error);
	       }
	    }
  searchProductList(){

		if(this.state.loadMoreCompleted){
			console.log("API Completed");
			return;
		}
    var variables={
  							"terms": [searchTerms],
							  "limit": this.state.limit,
							  "page": this.state.page,
							  "filter": {"mode": mode,"countryCode": this.state.countryCode,"rating": rating,
							    "verification": verification,"priceMax": priceMax,"priceMin": priceMin,"categories":categories,
							    "templates": templates,"tags": tags,"counterOffer": counterOffer,"distance": distance}
								}
      console.log(variables);
      getSearchProductList(variables).then((res)=>{
        console.log("search Array length-0: "+res.data.searchListings.length);
          if(res.data.searchListings.length==0){
            this.setState({
              progressVisible: false,
              isLoadingMore:false,
              loadMoreCompleted:true,
            });
          } else {

          const data = this.state.searchList.concat(res.data.searchListings);
          let _page=this.state.page+1;
          this.setState({
            progressVisible: false,
            searchList:data,
            isLoadingMore:false,
            page:_page,
          });

          }
          console.log("search Array length: "+this.state.searchList.length);

      })
      .catch(error => {
        console.log("Error:" + error.message);
        this.setState({
          progressVisible: false,
          isLoadingMore:false,
        });
      });

  }

  goChat = (item) => {
      var recUserId_=item.user.id;
      var listingId_=item.id;
      var chatId_=item.chatId;
      var chatExists=chatId_!=null;
      var itemDetails_ = item;
      this.props.navigation.navigate('chatDetailScreen', {
              recUserId: recUserId_,
              listingId: listingId_,
              isChatExists:chatExists,
              chatId:chatId_,
              itemDetails:itemDetails_,
            });

  }


  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.imagesSubView}
      onPress={() =>   this.props.navigation.navigate({
		        routeName: 'productDetailsScreen',
		        params: { previous_screen: 'searchResultScreen',item:item}
		    })}>
      <View>
      { item.primaryImage===null || item.primaryImage.imageKey===null
        ? <Image  source={Images.trollie} style={styles.rowImage} />
        : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.primaryImage.imageKey+""}} style={styles.rowImage} />
      }
      <TouchableOpacity style={styles.favoriteIconSec} onPress={() => alert('Favorite Clicked')}>
        <View >
          <BBBIcon
            name="Favorite"
            size={Layout.moderateScale(13)}
            color={item.liked ? Colors.tintColor : Colors.white}
            style={styles.icons}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatIconSec} onPress={() => this.goChat(item)}>
        <View >
          <BBBIcon
            name="Chat"
            size={Layout.moderateScale(13)}
            color={item.chatId!==null ? Colors.tintColor : Colors.white}
            style={styles.icons}
          />
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.userdetailSec}>
      <Item style={styles.userItemDetailsSec}>
        <View style={styles.userProfileSec}>

          {item.user.profileImage===null || item.user.profileImage.imageKey===null ?   <Image  source={Images.tempUser} style={styles.userProfile} /> :
              <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.user.primaryImage.imageKey+""}} style={styles.userProfile} />
          }

            <View style={item.user.online ? styles.userOnline : styles.userOffline} />
        </View>
        <View style={styles.userNameSec}>
          <Text style={styles.userName}>{item.user.profileName}</Text>
        </View>
        <View style={styles.activeuserSec}>
        <IdentityVerification
                    width={Layout.moderateScale(30)}
                    height={Layout.moderateScale(30)}
                    level={item.user.idVerification}
                  />
        </View>
      </Item>

      <View>
        <Text style={styles.postDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      <View style={styles.productreviewSec}>
        <View style={styles.ratingSec}>
        <Stars
                  size={Layout.moderateScale(14)}
                  styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
                  styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
                  repeats={item.user.sellerRating}
                />
          <Text style={styles.ratingmsgct}> ({item.user.sellerRatingCount}) </Text>
        </View>
        <View style={styles.priceSec}>
        <Text style={styles.pricetext}>{item.saleMode.currency!==null ? item.saleMode.currency.currencySymbol : ""}{item.saleMode.price ? item.saleMode.price : ""}</Text>
        </View>
      </View>

      <View style={styles.offerTypeSec}>
          {item.saleMode.mode=="BARTER" ? (
            <View style={styles.bartedSec}>
              <Text style={styles.bartedTxt}>BARTER</Text>
            </View>
          ) : null}
          {item.saleMode.mode=="COUNTER" ? (
            <View style={styles.counterSec}>
              <Text style={styles.counterTxt}>COUNTER OFFER</Text>
            </View>
          ) : null}
          {item.saleMode.mode=="SALE" ? (
            <View style={styles.saleSec}>
              <Text style={styles.saleTxt}>SALE</Text>
            </View>
          ) : null}
        </View>
    	  </View>
    </TouchableOpacity>
  );

  	render() {

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
  			<View style={styles.rightComponentStyle}>
  				<Button transparent onPress={() => alert('Search Clicked')}>
  					<BBBIcon
  						name="Search"
  						size={Layout.moderateScale(18)}
  						style={{ color: Colors.white }}
  					/>
  				</Button>
  				<Button
  					transparent
  					onPress={() => this.props.navigation.navigate('filterScreen')}>
  					<BBBIcon
  						name="StrollerFilterSvg"
  						size={Layout.moderateScale(18)}
  						style={{ color: Colors.white }}
  					/>
  				</Button>
  			</View>
  		);
			if(this.state.searchList.length==0 && !this.state.progressVisible){
				return(
					<Container style={styles.container}>
						<BBBHeader
							title="Search Result"
							leftComponent={leftComponent}
							rightComponent={rightComponent}
						/>
					<View style={{flex:1, flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text>No Result Found.</Text></View>
					</Container>
				);
			}
  		return (
  			<Container style={styles.container}>
  				<BBBHeader
  					title="Search Result"
  					leftComponent={leftComponent}
  					rightComponent={rightComponent}
  				/>
          <Content>

  					<View style={styles.liststyle}>
            {this.state.searchList.length==0?(
								null
						):
            <FlatList
    							data={this.state.searchList}
    							keyExtractor={listItemData => ''+listItemData.id}
    							renderItem={this._renderItem}
									contentContainerStyle={styles.listContent}
	                onEndReached={this.onEndReached.bind(this)}
	                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
	                ListFooterComponent={this.renderFooter.bind(this)}
    						/>
            }
  					</View>
  				</Content>
          <ProgressDialog
              visible={this.state.progressVisible}
               message="Please Wait..."
              activityIndicatorSize="large"
                         />
  			</Container>
  		);
  	}

		/* START LOAD MORE LISTING*/
	  renderFooter () {
	        return this.state.isLoadingMore && !this.state.loadMoreCompleted ?   <View style={{ flex: 1,  flexDirection: 'column', padding: 10 }}>
	            <ActivityIndicator size="small" />
	            </View>  : null
	    }
	    onEndReached = ({ distanceFromEnd }) => {

	      if(!this.state.isLoadingMore && !this.state.loadMoreCompleted){
	          this.setState({ isLoadingMore: true });
	          this.searchProductList();
	        }
	  }
	/* END LOAD MORE LISTING*/
}
