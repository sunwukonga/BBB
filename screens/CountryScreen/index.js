import React from 'react';
import { FlatList, Image, View,Platform,AsyncStorage   } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Text,
  Button,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom components
import BBBHeader from '../../components/BBBHeader/';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';
import Flag from 'react-native-round-flags';
import getCountryList from './CountryApi';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';

var listItemData = [];
export default class CountryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: '',
      listItemData:[],
      progressVisible:false,
        progressMsg:"Please Wait...",
    };

  }

  componentDidMount(){
    this.setState({
      progressVisible: true,

    });
    getCountryList().then((res)=>{
        Object.keys(res.data.allCountries).forEach((key,index)=>{
              listItemData.push({ id: key+1,countryName:res.data.allCountries[key].name, isoCode:res.data.allCountries[key].isoCode });
        });
        this.setState({
          listItemData:listItemData,
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

  _renderItem = ({ item }) =>
    this.state.countryName == item.countryName
      ? this._handleItem(item, true)
      : this._handleItem(item, false);

  _handleItem(item, ischecked) {
    return (
      <List
        style={[
          styles.mainlist,
          { backgroundColor: ischecked ? Colors.selectedRow : Colors.white },
        ]}>
        <ListItem
          onPress={() => this.selectCountry(item.countryName,item.isoCode)}
          style={styles.countryList}>
          <Left style={styles.left}>

           <Flag code={item.isoCode} style={styles.flagStyle} />

          </Left>
          <Body style={styles.body}>
            <Text style={styles.countryNameTxt}>{item.countryName}</Text>
          </Body>
          <Right style={styles.right}>
            {this.state.countryName == item.countryName ? (
              <Ionicons
                name="ios-checkmark-circle"
                size={Layout.moderateScale(20)}
                color={Colors.primaryColor}
              />
            ) : null}
          </Right>
        </ListItem>
      </List>
    );

  }

/**
 * store selected country to local cache
 */
  _storeCountry = async (countryName,isoCode) => {
    try {
        console.log("Stored Country",countryName+","+isoCode);
        await AsyncStorage.setItem('selectedCountry', countryName);
        await AsyncStorage.setItem('countryCode', isoCode);
    } catch (error) {
      // Error saving data
       console.log(error);
    }

  }
  selectCountry(countryName,isoCode) {
    this.setState({
      countryName: countryName,
    });
    setTimeout(() => {
        this._storeCountry(countryName,isoCode);
      }, 250);

    setTimeout(() => {
      this.props.navigation.navigate('homeScreen');
      console.log("country clicked");
    }, 300);
  }

  render() {

    var leftComponent = (
      <Button
        transparent
        onPress={() => this.props.navigation.navigate('mainScreen')}>
        <BBBIcon
          name="BackArrow"
          size={Layout.moderateScale(18)}
          style={styles.backarrow}
        />
      </Button>
    );

    return (
      <Container style={styles.container}>
        <BBBHeader title="Select Country" enableSearch />
        <Content>
          <FlatList
            data={this.state.listItemData}
            keyExtractor={listItemData => listItemData.id}
            renderItem={this._renderItem}
          />
        </Content>
        <ProgressDialog
            visible={this.state.progressVisible}
             message={this.state.progressMsg}
            activityIndicatorSize="large"
            activityIndicatorColor="blue"
                       />
      </Container>
    );
  }
}
