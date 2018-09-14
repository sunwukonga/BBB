import React from 'react'
import {
  View
} from 'react-native';
import {
  Container,
  Content,
  Button,
} from 'native-base';
// custom components
import BBBHeader from '../../components/BBBHeader';
import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import { Layout, Colors } from '../../constants/';
import LoginStatus from '../HomeScreen/LoginStatus'
import { w } from '../../utils/helpers.js'
import ListSearchResults from '../../components/lists/ListSearchResults'

export default class SearchResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page:1
    , limit:10
    }
    this.filter = {}
    this.terms = []
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props.navigation.state.params, ['loginStatus', 'countryCode']) !== w(nextProps.navigation.state.params, ['loginStatus', 'countryCode']) ) {
      if (!w(this.props.navigation.state.params, ['loginStatus'])) {
        return true
      }
    }
    if ( w(this.props.navigation.state.params, ['terms']) !== w(nextProps.navigation.state.params, ['terms']) ) {
      if (!w(this.props.navigation.state.params, ['terms'])) {
        return true
      }
    }
    if ( JSON.stringify(w(this.props.navigation.state.params, ['filter'])) !== JSON.stringify(w(nextProps.navigation.state.params, ['filter']) )) {
      if (w(this.props.navigation.state.params, ['filter'])) {
        return true
      }
    }
    return false;
  }

  componentDidMount(){
/*    this.setState({
      searchList:[]
    , progressVisible: true
    })
    setTimeout(() => {
      this.searchProductList();
    }, 50);
    */
  }

	componentWillReceiveProps(nextProps) {
		//this._retrieveCountry();
    /*
		this.setState({
			searchList:[],
			progressVisible: true,
			loadMoreCompleted:false,
			isLoadingMore:false,
			page:1,
		});
    */
/*
    Object.assign(
      filter
    , filterDefaults
    , { countryCode: this.props.navigation.state.params.loginStatus.countryCode }
    , this.props.navigation.state.params.filter
    )

		this.setState({ data: nextProps.navigation.state.params });
		setTimeout(() => {
      this.searchProductList();
		}, 50);
    */
	}

  /*
  searchProductList() {
		if(this.state.loadMoreCompleted){
			console.log("API Completed");
			return;
		}
    var variables={
      "terms": [searchTerms]
    , "limit": this.state.limit
    , "page": this.state.page
    , "filter": filter
    }
    //  console.log(variables);
      getSearchProductList(variables).then((res)=>{
     //   console.log("search Array length-0: "+res.data.searchListings.length);
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
      //    console.log("search Array length: "+this.state.searchList.length);

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


  _renderItem = ({ item }, loginStatus) => (
    <TouchableOpacity
      style={styles.imagesSubView}
      onPress={() =>   this.props.navigation.navigate({
		        routeName: 'productDetailsScreen',
		        params: {
              previous_screen: 'searchResultScreen'
            , item: item
            , loginStatus: loginStatus
            }
		    })}>
      <View>
      { w(item, ['primaryImage', 'imageKey'])
        ? <Image source={{ uri: Urls.s3ImagesURL + item.primaryImage.imageKey }} style={styles.rowImage} />
        : <Baby style={styles.rowImage} />
      }
    </View>
    <View style={styles.userdetailSec}>
      <Item style={styles.userItemDetailsSec}>
        <View style={styles.userProfileSec}>
          { w(item, ['user', 'primaryImage', 'imageKey'])
           ? <Image source={{ uri: Urls.s3ImagesURL + item.user.primaryImage.imageKey }} style={styles.userProfile} />
           : <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
          }
          <View style={w(item, ['user', 'online']) ? styles.userOnline : styles.userOffline} />
        </View>
        <View style={styles.userNameSec}>
          <Text style={styles.userName}>{w(item, ['user', 'profileName'])}</Text>
        </View>
        <View style={styles.activeuserSec}>
          <IdentityVerification
            width={Layout.moderateScale(30)}
            height={Layout.moderateScale(30)}
            level={w(item, ['user', 'idVerification'])}
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
  */

  	render() {
      let {terms, filter, loginStatus} = this.props.navigation.state.params
      if (terms) {
        this.terms = terms
      } else terms = this.terms
      if (filter) {
        this.filter = filter
      } else filter = this.filter
      if (loginStatus) {
        this.loginStatus = loginStatus
      } else loginStatus = this.loginStatus

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
  					onPress={() => this.props.navigation.navigate({
                routeName: 'filterScreen'
              , params: {filter: filter}
              })
            }>
  					<BBBIcon
  						name="StrollerFilterSvg"
  						size={Layout.moderateScale(18)}
  						style={{ color: Colors.white }}
  					/>
  				</Button>
  			</View>
  		);

    return (
      <LoginStatus>{ loginStatus => (
        <Container style={styles.container}>
          <BBBHeader
            title="Search Result"
            leftComponent={leftComponent}
            rightComponent={rightComponent}
          />
          <Content>
            <ListSearchResults terms={terms} loginStatus={loginStatus} filter={filter} />
          </Content>
        </Container>
      )}</LoginStatus>
    )}

		/* START LOAD MORE LISTING*/
  /*
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
    */
	/* END LOAD MORE LISTING*/
}
