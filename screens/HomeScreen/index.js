import React from 'react';
import { Image, TouchableOpacity, View,  FlatList,ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Fab,
} from 'native-base';
//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import IdentityVerification from '../../components/IdentityVerification';
import BBBIcon from '../../components/BBBIcon';
import Stars from '../../components/Stars';
import getMostRecentList from './GetMostRecentListings';
import getMostVisitedList from './GetMostVisitedListings';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';

// style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';


//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";


// Get login status
var log_status = '';
var mostRecentList=[];
const GET_LOGIN_STATUS = gql`
     query log @client{
           logged_in
           jwt_token
        }`;

const drawerStatus = 'locked-closed';

const App = () => (
<Query query={GET_LOGIN_STATUS}>
  {({ loading, error, data }) => {
     if (loading) return <Text>{`Loading...`}</Text>;
     if (error) return <Text>{`Error: ${error}`}</Text>;

      log_status = data.logged_in;
	//	drawerStatus = 'unlocked';
      if(log_status==true){
        drawerStatus = 'unlocked';
      }
      else{
      drawerStatus = 'locked-closed';
      }
    return (
      <View/>
    )
  }}
</Query>
)

export default class HomeScreen extends React.Component {

static navigationOptions = () => ({
  drawerLockMode: drawerStatus,
});

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.visitedOnEndReachedCalledDuringMomentum = true;

    this.state = {
      mostRecentList:[],
      mostVisitedList:[],
      LoggedinState:'locked-closed',
      active: false,
      progressVisible:false,
      limit:10,
      page:1,
      isLoadingMore:false,
      visitedLoadingMore:false,
      loadMoreCompleted:false,
      visitedLoadMoreCompleted:false,
      visitedLimit:10,
      visitedPage:1,
    };
  }

  _fetchMostRecentListing() {

      if(this.state.loadMoreCompleted){
        console.log("popular Completed");
        return;
      }
      var variables={
        "countryCode":"US","limit":this.state.limit,"page":this.state.page
      }
      console.log("popular "+variables);
      getMostRecentList(variables).then((res)=>{
          if(res.data.getMostRecentListings.length==0){
            this.setState({
              progressVisible: false,
              isLoadingMore:false,
              loadMoreCompleted:true,

            })
          } else {

          const data = this.state.mostRecentList.concat(res.data.getMostRecentListings);
          let _page=this.state.page+1;
          this.setState({
            progressVisible: false,
            mostRecentList:data,
            isLoadingMore:false,
            page:_page,
          });

          }
          console.log("popular Array length: "+this.state.mostRecentList.length);

      })
      .catch(error => {
        console.log("Error:" + error.message);
        this.setState({
          progressVisible: false,
          isLoadingMore:false,
        });
      });
  }

  _fetchMostVisitedListing() {

      if(this.state.visitedLoadMoreCompleted){
        console.log("Visited Completed");
        return;
      }
      var variables={
        "countryCode":"US","limit":this.state.visitedLimit,"page":this.state.visitedPage
      }
      console.log("visited: "+variables);
      getMostVisitedList(variables).then((res)=>{
          if(res.data.getMostVisitedListings.length==0){
            this.setState({
              visitedLoadingMore:false,
              visitedLoadMoreCompleted:true,

            })
          } else {

          const data = this.state.mostVisitedList.concat(res.data.getMostVisitedListings);
          let _page=this.state.visitedPage+1;
          this.setState({
            mostVisitedList:data,
            visitedLoadingMore:false,
            visitedLoadMoreCompleted:false,
            visitedPage:_page,
          })
          }
          console.log("visited Array length: "+this.state.mostVisitedList.length);

      })
      .catch(error => {
        console.log("Error:" + error.message);
        this.setState({
          visitedLoadingMore:false,
        });
      });
  }

  componentDidMount(){
    this.setState({
      progressVisible: true,
      page:1,
      visitedPage:1,
    });
    this._fetchMostRecentListing();
    this._fetchMostVisitedListing();
  }


  checkLogin = () =>{
    console.log("Log Status: " + log_status);

    if( log_status == false )
    {
      this.props.navigation.navigate('loginScreen');
    }
    else{
      this.props.navigation.navigate('createNewItemScreen')
    }
  }
  checkLoginChat = () =>{
    console.log("Log Status: " + log_status);

    if( log_status == false )
    {
      this.props.navigation.navigate('loginScreen');
    }
    else{
      this.props.navigation.navigate('chatListScreen')
    }
  }
  checkLoginMenu=() =>{
    if(log_status==true){
      this._handleMenu('DrawerOpen');
    }
    else{
      this.props.navigation.navigate('loginScreen');

    }
  }
  _handleMenu(menuitem) {
    this.props.navigation.navigate(menuitem);
  }

  navigatess = () => {
    this.props.navigation.navigate('productDetailsScreen')
  }
//  item.user.profileImage.imageURL
  _renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={ ()=>this.navigatess()}>
      <View style={styles.imagesSubView}>

        <View>

        {item.primaryImage.imageURL===null ?   <Image  source={Images.trollie} style={styles.rowImage} /> :

          <Image source={{
                      uri: item.primaryImage.imageURL,
                    }} style={styles.rowImage} />
          }

          <TouchableOpacity style={styles.favoriteIconSec} onPress={() => alert('Favorite Clicked')}>
          <View >
            <BBBIcon
              name="Favorite"
              size={Layout.moderateScale(18)}
              //color={Colors.tintColor}
              color={item.liked ? Colors.tintColor : Colors.white}
              style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
            />
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatIconSec} onPress={() => this.checkLoginChat()}>
          <View >
            <BBBIcon
              name="Chat"
              size={Layout.moderateScale(18)}
              color={item.chatExists ? Colors.tintColor : Colors.white}
              style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: Layout.moderateScale(3) }}
          />
          </View>
          </TouchableOpacity>
        </View>

        <Item style={styles.userItemDetailsSec}>
          <View style={styles.userProfileSec}>

            <Image source={{uri:item.user.profileImage.imageURL}} style={styles.userProfile} />
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
          <Text style={styles.postDesc}>{item.description}</Text>
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
            <Text style={styles.pricetext}>{item.saleMode.currency.currencySymbol}{item.saleMode.price}</Text>
          </View>
        </View>

      </View>
              </TouchableOpacity>
    );

  render() {
    var leftComponent = (
      <Button transparent onPress={() => this.checkLoginMenu() }>
        <BBBIcon
          name="Menu"
          size={Layout.moderateScale(18)}
          color={Colors.white}
          style={{ color: Colors.white }}
        />
      </Button>
    );

    var rightComponent = (
      <Button transparent onPress={() => this._handleMenu('categoryScreen')}>
        <BBBIcon
          name="CategoryIcon"
          size={Layout.moderateScale(18)}
          style={{ color: Colors.white }}
        />
      </Button>
    );
    //console.log(this.state.data);
    //console.log(listItemData);
    return (
      <Container>
      <App />
        <BBBHeader
          title="Bebe Bargains"
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
        <Content style={styles.container}>
          <View>
            <View style={styles.searchSec}>
              <Item regular style={styles.searchItem}>
                <Input
                  placeholder="What are you looking for?"
                  style={styles.mainSearch}
                  keyboardType="default"
                  returnKeyType="search"
                  onSubmitEditing={() =>
                    this.props.navigation.navigate('strollersScreen')
                  }
                />
                <BBBIcon name="Search" style={styles.searchicon} />
              </Item>
            </View>

            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>Most Popular Items</Text>
              </View>
              <FlatList
                horizontal={true}
                data={this.state.mostRecentList}
              	renderItem={this._renderItem}
                contentContainerStyle={styles.listContent}
                onEndReached={this.onEndReached.bind(this)}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={this.renderFooter.bind(this)}
              />
            </View>
            <View style={styles.adSec}>
              <Text style={styles.mainadText}>
                Do you have something to sell or give away?
              </Text>
              <Text style={styles.subtitle}>
                Post it with us and well give you an audience.
              </Text>
            </View>
            <View style={styles.imagesMainView}>
              <View style={styles.populerSec}>
                <Text style={styles.populerText}>
                  Your Recently Visited Items
                </Text>
              </View>
              {this.state.mostVisitedList.length == 0 ?
                <Text style={styles.noDataText}>
                  No Data Found
                </Text>
                :
              <FlatList
                horizontal={true}
                data={this.state.mostVisitedList}
                renderItem={this._renderItem}
                contentContainerStyle={styles.listContent}
                onEndReached={this.visited_onEndReached.bind(this)}
                onMomentumScrollBegin={() => { this.visitedOnEndReachedCalledDuringMomentum = false; }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={this.visited_renderFooter.bind(this)}
              />
              }
            </View>
          </View>
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          style={styles.fabStyle}
          position="bottomRight"
          onPress={() => this.checkLogin()}
        /*onPress={() => this.props.navigation.navigate('createNewItemScreen')}*/
          >
          <Icon name="ios-add" style={{ fontSize: Layout.moderateScale(20) }} />
        </Fab>
        <ProgressDialog
            visible={this.state.progressVisible}
             message="Please Wait..."
            activityIndicatorSize="large"
                       />
      </Container>
    );
  }

  /* START POPULAR LISTING*/
  renderFooter () {
        return this.state.isLoadingMore && !this.state.loadMoreCompleted ?   <View style={{ flex: 1,  flexDirection: 'row', padding: 10 }}>
            <ActivityIndicator size="small" />
            </View>  : null
    }
    onEndReached = ({ distanceFromEnd }) => {
      console.log("Popular"+distanceFromEnd);
      console.log(this.onEndReachedCalledDuringMomentum);
      if(!this.onEndReachedCalledDuringMomentum && !this.state.isLoadingMore){
          this.setState({ isLoadingMore: true });
          this._fetchMostRecentListing();
          this.onEndReachedCalledDuringMomentum = true;
      }
  }
/* END POPULAR LISTING*/

/* START VISITED LISTING*/
visited_renderFooter () {
      return this.state.visitedLoadingMore && !this.state.visitedLoadMoreCompleted ?   <View style={{ flex: 1,  flexDirection: 'row', padding: 10 }}>
          <ActivityIndicator size="small" />
          </View>  : null
  }
  visited_onEndReached = ({ distanceFromEnd }) => {
    console.log("Visited"+ distanceFromEnd);
    console.log(this.visitedOnEndReachedCalledDuringMomentum);
    if(!this.visitedOnEndReachedCalledDuringMomentum && !this.state.visitedLoadingMore){
        this.setState({ visitedLoadingMore: true });
        this._fetchMostVisitedListing();
        this.visitedOnEndReachedCalledDuringMomentum = true;
    }
}
/* END VISITED LISTING*/

}
