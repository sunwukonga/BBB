import React, { Component } from 'react';
import {
  Image
, TouchableOpacity
, View
, FlatList
} from 'react-native';
import {
  Text
, Item
, Fab
} from 'native-base';
import { graphql, compose } from "react-apollo";
import { withNavigation } from 'react-navigation'
import { MapView } from 'expo';
import styles from './styles';
import { Layout, Colors, Urls, defaultRegions } from '../../../constants/';
import Baby from '../../Baby';
import IdentityVerification from '../../IdentityVerification';
import BBBIcon from '../../BBBIcon';
import Stars from '../../Stars';

import LikeButton from '../../buttons/LikeButton'
import ChatButton from '../../buttons/ChatButton'
import DeleteButton from '../../buttons/DeleteButton'
import CreateChat from '../../../graphql/mutations/CreateChat'
import LastMessageIds from '../../../screens/ChatListScreen/LastMessageIds'
import { optimisticCreateChat } from '../../../graphql/mutations/Optimistic.js'
import GetProfile from '../../../graphql/queries/GetProfile'
import { w, i18n } from '../../../utils/helpers.js'
import {
  GET_CACHED_TRANSLATIONS
, GET_LOGIN_STATUS
} from '../../../graphql/Queries'

const Listing = compose(
  graphql(GET_LOGIN_STATUS, {name: "loginStatus"})
, graphql(GET_CACHED_TRANSLATIONS, {
    name: "i18n"
  , skip: ({ loginStatus }) => !loginStatus
  , options: ({loginStatus}) => ({
      variables: {
        locusId: 1
      , countryCode: loginStatus.countryCode
      }
    , fetchPolicy: 'cache-only'
    })
  })
)(
class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapLoaded: false
    }
  }

  // comparisons of important changes here
  shouldComponentUpdate(nextProps, nextState) {
    if (w(this.props, ['liked']) !== w(nextProps.item, ['liked'])) {
      return true;
    }
    if (this.state.mapLoaded == false && nextState.mapLoaded == true) {
      return true;
    }
    return false;
  }
    //, cache: 'reload'
  //key={ item.imageKey }
  /*
  componentDidMount() {
    this.setState({ mapLoaded: true })
  }
  */

  renderItem( item ) {
    if (!w(item, ['imageKey'])) {
      return (
        <View key={item.id} style={styles.swiperSec}>
          <Baby style={styles.babyIcon} />
        </View>
      )
    } else {
      return (
        <View key={item.id} style={styles.swiperSec}>
          <Image source={{ uri: Urls.s3ImagesURL + item.imageKey }} style={styles.rowImage} />
        </View>
      )
    }
  }

  collateImages( item ) {
    if ( w(item, ['primaryImage', 'imageKey'] ) ) {
      // primary image exists
      if (w(item, ['secondaryImages', 'length'] ) > 0 ) {
        // secondary images may exist
        let secImages = item.secondaryImages.filter( image => image.imageKey )
        if ( secImages.length > 0 ) {
          let newSecondaryImages = item.secondaryImages.slice()
          newSecondaryImages.unshift( item.primaryImage )
          return newSecondaryImages
        } else {
          return [item.primaryImage]
        }
      } else {
        return [item.primaryImage]
      }
    } else {
      // primary image does not exist
      if (w(item, ['secondaryImages', 'length'] ) > 0 ) {
        let secImages = item.secondaryImages.filter( image => image.imageKey )
        if ( secImages.length > 0 ) {
          return item.secondaryImages
        }
      } else return [{dummy: true}]
    }
  }

  render() {
    if ( !w(this.props, ['i18n', 'getCachedLocus']) ) {
      return null
    }
    let {item, loginStatus, chatIndexes, i18n: {getCachedLocus: translations}, resetTo = 'homeScreen' } = this.props
    const parentName = "ProductDetailsScreen"

    let exchangeMode = null

    if ( w(item, ['saleMode', 'exchangeModes', 'length']) > 0) {
      exchangeMode = item.saleMode.exchangeModes.find(function(element) {
        return element.mode == 'FACE'
      })
    }

    function OtherImage( props ) {
      const {item} = props
      if ( w(item, ['user', 'profileImage', 'imageKey']) || w(item, ['user', 'profileImage', 'imageURL']) ) {
        if ( w(item, ['user', 'profileImage', 'imageKey']) ) {
          return <Image source={{ uri: Urls.s3ImagesURL + item.user.profileImage.imageKey }} style={styles.userProfile} />
        } else {
          return <Image source={{ uri: item.user.profileImage.imageURL }} style={styles.userProfile} />
        }
      } else {
        return <BBBIcon name="IdentitySvg" size={Layout.moderateScale(18)} />
      }
    }

    return (
      <View>
        <FlatList
          horizontal = {true}
          contentContainerStyle={styles.contentSwiper}
          keyExtractor={(item, index) => index.toString()}
          data = { this.collateImages(item) }
          renderItem={({ item }) => this.renderItem( item ) }
        />
        <View style={{
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.0)',
          alignItems:'flex-end',
          justifyContent:'flex-start',
          flexDirection: 'column',
          width: Layout.WIDTH * 0.2,
          height:Layout.WIDTH * 0.4,
          position: 'absolute',
          top: Layout.WIDTH * 0.02,
          right: Layout.WIDTH * 0.02,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderRadius: Layout.moderateScale(8),
          }}
        >
          <LikeButton item={item} loginStatus={loginStatus} />
          <ChatButton item={item} loginStatus={loginStatus} chatIndexes={chatIndexes} />
          <DeleteButton item={item} loginStatus={loginStatus} resetTo={resetTo} />
        </View>
        <Item style={styles.userItemDetailsSec}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.userProfileSec}>
              <OtherImage item={item} />
              <View style={w(item, ['user', 'online']) ? styles.userOnline : styles.userOffline} />
            </View>
            <View style={styles.userNameSec}>
              <Text style={styles.userName}>{w(item, ['user', 'profileName'])}</Text>
            </View>
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
          <Text style={styles.postTitle} numberOfLines={3}>{w(item, ['title'])}</Text>
        </View>

        <View style={styles.productreviewSec}>
          <View style={styles.ratingSec}>
            <Stars
              size={Layout.moderateScale(14)}
              styleOn={{ color: Colors.starcolor, marginTop: Layout.moderateScale(2) }}
              styleOff={{ color: Colors.lightGray, marginTop: Layout.moderateScale(2) }}
              repeats={w(item, ['user', 'sellerRating'])}
            />
            <Text style={styles.ratingmsgct}> ({w(item, ['user', 'sellerRatingCount'])}) </Text>
          </View>
          <View style={styles.priceSec}>
            <Text style={styles.pricetext}>{(w(item, ['saleMode', 'currency']) && w(item, ['saleMode', 'price'])) ? item.saleMode.currency.currencySymbol : ""}{w(item, ['saleMode', 'price']) ? item.saleMode.price.toFixed(2) : ""}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.regularLarge}>{i18n(translations, parentName, "Category", loginStatus.iso639_2, "Category")}</Text>
            <Text style={[styles.regularSmall, styles.tagContainer]}>
              {i18n(translations, parentName, w(item, ['category', 'locus', 'name']), loginStatus.iso639_2, w(item, ['category', 'name']))}
            </Text>
          </View>
          <View>
            <View style={styles.alignmentButton}>
              <View style={styles.saleButton}>
                <Text style={styles.regularSmall}>{i18n(translations, parentName, w(item, ['saleMode', 'mode']), loginStatus.iso639_2, w(item, ['saleMode', 'mode']))}</Text>
              </View>
            </View>
            { w(item, ['saleMode', 'counterOffer']) ?
            <View style={styles.alignmentButton}>
              <View style={styles.offerButton}>
                <Text style={styles.regularSmall}>{i18n(translations, parentName, "OfferWelcome", loginStatus.iso639_2, "Counter Offers Welcome")}</Text>
              </View>
            </View>
            : null }
          </View>
        </View>
        <View>
          <Text style={styles.postDesc} >{w(item, ['description'])}</Text>
        </View>
        { w(exchangeMode, ['location', 'latitude']) &&
        <View style={{ paddingTop: Layout.WIDTH * 0.05, paddingBottom: Layout.WIDTH * 0.05 }}>
          <MapView
            initialRegion={{
              latitude: exchangeMode.location.latitude
            , longitude: exchangeMode.location.longitude
            , latitudeDelta: 0.009
            , longitudeDelta: 0.009*Math.cos(Math.PI*exchangeMode.location.latitude/180)
            }}
            style={{ width: Layout.WIDTH * 0.9, height: Layout.WIDTH * 0.9 }}
            onLayout={() => { this.setState({ mapLoaded: true })}}
            showsUserLocation
            showsMyLocationButton
          >
            { this.state.mapLoaded &&
            <MapView.Marker
              coordinate={{latitude: exchangeMode.location.latitude, longitude: exchangeMode.location.longitude }}
            />
            }
          </MapView>
          <View>
            <Text style={styles.postDesc} >{exchangeMode.location.lineOne}{`\n`}{exchangeMode.location.lineTwo}, {exchangeMode.location.postcode}</Text>
          </View>
        </View>
        }
      </View>
    )
  }
}
)

export default withNavigation(Listing)

/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************************************************************************/

/*

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

//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";

import getProductDetails from './GetProductDetails';
import likeProductApi from './LikeProductApi';

import LoginStatus from '../HomeScreen/LoginStatus'
import LikeButton from '../HomeScreen/LikeButton'

	_renderItem = ({ item }) => (
        <View style={[styles.imagesSubView, {flex: 1}]}>
          <View>
            { item===null || item.imageKey===null
              ? <Baby style={styles.rowImage} />
              : <Image source={{ uri: "https://s3-ap-southeast-1.amazonaws.com/bbb-app-images/"+item.imageKey}} style={styles.rowImage} />
            }
              <LikeButton item={item} loginStatus={loginStatus} />
              <LastMessageIds>{ chatIndexes => (
                <CreateChat>{ mutateCreateChat  => (
                  <GetProfile>{ currentUser => (
                    <TouchableOpacity
                      style={styles.chatIconSec}
                      onPress={() => {
                        if ( item.chatId ) {
                          this.props.navigation.navigate('chatDetailScreen', {
                            chatId: item.chatId
                          , chatIndexes: chatIndexes
                          })
                        } else {
                          let optimisticResponse = optimisticCreateChat(item, currentUser )
                          mutateCreateChat({
                            variables: { listingId: item.id }
                          , optimisticResponse: optimisticResponse
                          })
                          .then( ({ data: { createChat }}) => {
                            this.props.navigation.navigate('chatDetailScreen', {
                              chatId: createChat.id
                            , chatIndexes: chatIndexes
                            })
                          })
                        }
                      }}
                    >
                      <View >
                        <BBBIcon
                          name="Chat"
                          size={Layout.moderateScale(18)}
                          color={item.chatId!==null ? Colors.tintColor : Colors.white}
                          style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}</GetProfile>
                )}</CreateChat>
              )}</LastMessageIds>
            </View>
          </View>
        </View>


          <View>
            <Text style={styles.postDesc} numberOfLines={3}>{item.description}</Text>
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

          <View style={styles.priceSec}>
            <Text style={styles.pricetext}>{item.saleMode.currency!==null ? item.saleMode.currency.currencySymbol : ""}{item.saleMode.price ? item.saleMode.price : ""}</Text>
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
