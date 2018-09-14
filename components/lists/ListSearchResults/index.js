import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, Image
, View
, Text
, TouchableOpacity
, ActivityIndicator
} from 'react-native';
import {
  Item
} from 'native-base';
import BBBIcon from '../../../components/BBBIcon';
import styles from './styles';
import { withNavigation } from 'react-navigation'
import {
  SEARCH_LISTINGS
} from '../../../graphql/Queries'
//import PureListItem from '../../../screens/HomeScreen/PureListItem'
import { Colors, Layout, Urls, Constants } from '../../../constants/';
import IdentityVerification from '../../../components/IdentityVerification';
import Stars from '../../../components/Stars';
import Baby from '../../../components/Baby';
import { w } from '../../../utils/helpers.js'
import { Locations } from "../../../constants/"

var filterDefaults = {
  "mode": Constants.SALE
, "countryCode": 'SG'
, "seconds": null
, "rating": null
, "verification": null
, "distance": null
, "priceMax": null
, "priceMin": null
, "categories": []
, "templates": []
, "tags": []
, "counterOffer": null
}
// Incoming props
// filter, terms, loginStatus
class ListSearchResults extends Component {
  constructor(props) {
    super(props);
    this.lastFetchedPage = 1
    this.state = {
      page:1
    , limit:10
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( w(this.props, ['loginStatus', 'countryCode']) !== w(nextProps, ['loginStatus', 'countryCode']) ) {
      return true
    }
    if ( w(this.props, ['terms']) !== w(nextProps, ['terms']) ) {
      return true
    }
    if ( JSON.stringify(w(this.props, ['filter'])) !== JSON.stringify(w(nextProps, ['filter']) )) {
      return true
    }
    return false;
  }

  _renderItem = ({ item }, loginStatus) => {

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
      <TouchableOpacity
        style={styles.imagesSubView}
        onPress={() => this.props.navigation.navigate({
          routeName: 'productDetailsScreen'
        , params: {
            previous_screen: 'searchResultScreen'
          , item: item
          , loginStatus: loginStatus
          }
        })}
      >
        <View>
        { w(item, ['primaryImage', 'imageKey'])
          ? <Image source={{ uri: Urls.s3ImagesURL + item.primaryImage.imageKey }} style={styles.rowImage} />
          : <Baby style={styles.rowImage} />
        }
        </View>
        <View style={styles.userdetailSec}>
          <Item style={styles.userItemDetailsSec}>
            <View style={styles.userProfileSec}>
              <OtherImage item={item} />
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
              {item.title}
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
              <Text style={styles.pricetext}>{(w(item, ['saleMode', 'currency']) && w(item, ['saleMode', 'price'])) ? item.saleMode.currency.currencySymbol : ""}{w(item, ['saleMode', 'price']) ? item.saleMode.price.toFixed(2) : ""}</Text>
            </View>
          </View>

          <View style={styles.offerTypeSec}>
          {item.saleMode.mode==Constants.BARTER ? (
            <View style={styles.bartedSec}>
              <Text style={styles.bartedTxt}>BARTER</Text>
            </View>
          ) : null}
          {item.saleMode.mode==Constants.DONATE ? (
            <View style={styles.bartedSec}>
              <Text style={styles.bartedTxt}>DONATE</Text>
            </View>
          ) : null}
          {item.counterOffer ? (
            <View style={styles.counterSec}>
              <Text style={styles.counterTxt}>COUNTER OFFER</Text>
            </View>
          ) : null}
          {item.saleMode.mode==Constants.SALE ? (
            <View style={styles.saleSec}>
              <Text style={styles.saleTxt}>SALE</Text>
            </View>
          ) : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let { loginStatus, terms, filter } = this.props
    let variables = {
      limit: this.state.limit
    , page: this.state.page
    , filter: Object.assign(
        {}
      , filterDefaults
      , { countryCode: this.props.loginStatus.countryCode }
      , filter
      )
    }
    if (terms.length > 0) {
      variables.terms = terms
    }
    return (
      <Query
        query = {SEARCH_LISTINGS}
        variables= {variables}
        fetchPolicy="network-only"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {
          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            // TODO: don't print errors. Offer mechanism to reload.
            return <Text>Error: {error.message}</Text>;
          }
          if (!w(data, ['searchListings']) || w(data, ['searchListings', 'length']) == 0) {
            return <Text>No results</Text>
          }
          return (
            <View style={styles.liststyle}>
              <FlatList
                data={data.searchListings || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => this._renderItem(item, loginStatus)}
                contentContainerStyle={styles.listContent}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                onEndReachedThreshold={0.5}
                refreshing={networkStatus === 4 || networkStatus === 3}
                onEndReached={() => {
                  if ( data.searchListings.length % variables.limit == 0 ) {
                    let nextPage = (data.searchListings.length / variables.limit >> 0) + 1
                    if ( this.lastFetchedPage < nextPage ) {
                      return fetchMore({
                        variables: Object.assign({}, variables, { page: nextPage }),
                        updateQuery: (prev, { fetchMoreResult }) => {
                          this.lastFetchedPage++
                          if (!fetchMoreResult) return prev
                          if (!prev) {
                            prev = {}
                          }
                          if (!prev.searchListings) {
                            prev.searchListings = []
                          }
                          return {
                            searchListings:
                              fetchMoreResult.searchListings.reduce( (acc, cur) => {
                                if ( listing = acc.find( listing => cur.id == listing.id ) ) {
                                  listing.chatId = cur.chatId
                                  listing.likes = cur.likes
                                  listing.liked = cur.liked
                                  return acc
                                } else {
                                  acc.push(cur)
                                  return acc
                                }
                              }, JSON.parse(JSON.stringify(prev.searchListings)))
                          }
                        }
                      })
                    }
                  }
                }}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListSearchResults)
