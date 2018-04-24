import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ListView,
  FlatList,
  TextInput,
} from 'react-native';
import {
  ActionSheet,
  Container,
  Text,
  Button,
  Icon,
  Item,
  Input,
} from 'native-base';
import { MapView } from 'expo';
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import RedioSelected from '../../components/RedioSelected';
import RedioUnselect from '../../components/RedioUnselect';
import Add from '../../components/Add';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Dropdown from '../../components/Dropdown/dropdown';
import { create } from 'apisauce';
import getSignedUrl from './SignedUrl';

import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from 'react-native-check-box';
import { Layout, Colors, Images } from '../../constants/';
// import { Dropdown } from 'react-native-material-dropdown';

import Collapsible from 'react-native-collapsible';
const dataObjectsCates = [{ id: '1', text: 'jkhf' }];
const dataObjectsTags = [{ id: '1', text: 'jsadfkhf' }];
export default class CreateNewItemScreen extends React.Component {
  constructor(props) {
    super(props);
    const rowHasChanged = (r1, r2) => r1 !== r2;
    const dataObjects = [
      { id: 'aimg0001', source: Images.logo, inputFlag: false },
      { id: 'aimg0001', source: Images.logo, inputFlag: false },
      { id: 'aimg0001', source: Images.logo, inputFlag: false },
      { id: 'aimg0001', inputFlag: true },
    ];

    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged });
    const dsCates = new ListView.DataSource({ rowHasChanged });
    const dsTags = new ListView.DataSource({ rowHasChanged });

    const SALE = 'SALE';
    const BARTER = 'BARTER';
    const DONATE = 'DONATE';
    const SALEDONATE = 'SALEDONATE';

    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      dataSourceCates: dsCates.cloneWithRows(dataObjectsCates),
      dataSourceTags: dsTags.cloneWithRows(dataObjectsTags),
      texts: '',
      isCollapsedSale: false,
      isCollapsedBarter: true,
      isCollapsedDonate: true,
      isCollapsedDnS: true,

  //    _pickImage = this._pickImage

      // Data for mutation i.e. create item
      mode: SALE,
      images: [ { id: 'addImageButton', source: Images.trollie, inputFlag: true, deleted: false }],
      currency: '',
      cost: 0.0,
      counterOffer: false,
      template: '',
      barterTemplates: [], // [ [{template, qty}, {template, qty}], [{template, qty}] ]
      address: { lineOne: ''
               , lineTwo: ''
               , postcode: ''
               , longitude: ''
               , latitude: ''
               , directions: ''
      },
      postCost: 0.0,
      postCurrency: '',
      shortDesc: '',
      longDesc: '',
      category: ''
      // End data for mutation
    };
  }

  // Check weather user is login or not
  componentWillMount = async () => {
     console.log('start')

     let jwtt = '';
     jwtt = await Expo.SecureStore.getItemAsync('JWTToken').then();
     console.log("Chat Log : " + jwtt);

     if(jwtt == '' || jwtt == null || jwtt.length == 0)
     {
       this.props.navigation.navigate('loginscreen');
       Expo.SecureStore.setItemAsync('ArrivedFrom', 'CreateNewItemScreen');
     }

 };

  onClick(data) {
    data.checked = !data.checked;
    let msg = data.checked ? 'you checked ' : 'you unchecked ';
  }
  static navigationOptions = {
    header: null,
  };

//      <ListView
//      horizontal={true}
//      contentContainerStyle={styles.listContents}
//      dataSource={this.state.dataSource}
//      renderRow={this._renderRow.bind(this)}
  //      enableEmptySections
  //      pageSize={parseInt(this.state.pageSize)}
  //      />
  _renderRow( {item} ) {
    console.log(item);
    return (
      <View style={styles.imagesSubView}>
        {item.inputFlag ? (
          <View>
            <ActionSheet
              ref={c => {
                ActionSheet.actionsheetInstance = c;
              }}
            />
            <TouchableOpacity onPress={() => this._pickImage()}>
              <View style={styles.addIcon}>
                <Add width={Layout.HEIGHT * 0.03} height={Layout.HEIGHT * 0.03} />
                <Text style={styles.addimage}>Add Image</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image source={item.source} style={styles.rowImage} />
            {/*<Icon name="ios-close-circle" style={styles.rowFlagImage} onPress={()=>this._handleRemoveImage(rowData.id)}/>*/}
          </View>
        )}
      </View>
    );
  }

  _pickImage = async () => {
    // At some point I'd like to Hash an image before sending a request for a signed url to upload it.
    // getBase64ForTag(uri, success, failure) will get the Base64 representation of a uri, where the uri comes
    // from a call to imageEditor.cropImage . I presume success is a callback that takes the Base64 info.
    // According to https://stackoverflow.com/questions/44687594/what-uri-format-does-imagestore-getbase64fortag-expect?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    // this is not very efficient, but I cannot find a better way.
    // Hash could be done with https://github.com/pierrec/js-xxhash
    // I have posted a stackexchange question related to this at: https://stackoverflow.com/questions/49725746/how-to-hash-image-data-in-react-native-expo
                // On select, hard code s3 signed url form data here.
                // the following returns { cancelled: false, uri, width, height, type }
    // This gives a URI, this should be used to
    //  - Send graphql mutation to get upload signed url
//https://stackoverflow.com/questions/49725746/how-to-hash-image-data-in-react-native-expo
    let pickerResult = await Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      //quality: 0.2,
      exif: false,
      base64: false,
    })

    if ( ! pickerResult.cancelled ) {
      // https://docs.expo.io/versions/latest/sdk/filesystem#expofilesystemgetinfoasyncfileuri-options
      let fileinfo = await Expo.FileSystem.getInfoAsync(pickerResult.uri, {size: true})
      let resized
      let compressed = pickerResult
      // If filesize is below 150kb don't attempt to reduce it further.
      console.log("Filesize: ", fileinfo.size)
      if ( fileinfo.size > 153600 ) {
        // #######################################
        // Resize any dimension greater than 1024
        // #######################################
        if ( fileinfo.height > 1024 ) {
          if (fileinfo.width >= pickerResult.height) {
            // Width needs reduction to 1024
            console.log("resize width")
            resized = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {width: 1024}}])
          } else {
            // Height needs reduction to 1024
            console.log("resize height")
            resized = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {height: 1024}}])
          }
        } else if (fileinfo.width > 1024) {
            // Width needs reduction to 1024
            console.log("resize width")
            resized = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {width: 1024}}])
        } // No need for resize
        // #######################################
        // End resizing
        // #######################################
        let resizedFileinfo
        if (! resized ) {
          resizedFileinfo = fileinfo
          resized = pickerResult
        } {
          resizedFileinfo = await Expo.FileSystem.getInfoAsync(pickerResult.uri, {size: true})
        }
        // #######################################
        // Apply compression
        // #######################################
        compressed = await this._regressiveCompress(resized, resizedFileinfo)
      }
      // https://docs.expo.io/versions/v26.0.0/sdk/imagemanipulator
      await this._uploadImageAsync(compressed.uri);
    }
  }

  _regressiveCompress = async (resized, resizedFileinfo) => {

    // What compression ratio is needed to get to 100kb
    let C = resizedFileinfo.size/102400
    let compressed = resized
    let imageInfo = resizedFileinfo
    let cycles = 0
    // Formula only interpolates between a quality of 55 to 100, but I'm willing to trust it down to 20.
    // A Quality of 20 would need a compression ratio of 65, which seems unlikely given the preceding resize step.
    let Q = Math.floor((C - 80.8777778)/(-0.75777778))/100
    console.log(Q)
    console.log(C)
    console.log(resizedFileinfo.size)
    while ( C > 1.5 ) {
      if ( Q > 1 ) {
          console.log("Compression ratio >= 1.5 and Q > 1")
          compressed = await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: 1 })
      } else if ( Q < 0.1 ) {
        // It is possible that this restriction could result in image sizes greater than 200kb
        console.log("Q < 0.1")
        return await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: 0.1 })
        //return compressed
      } else {
        console.log("0.1 <= Q <= 1")
        compressed = await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: Q })
      }

      imageInfo = await Expo.FileSystem.getInfoAsync(compressed.uri, {size: true})
      // Decremental change for the next run
      Q = Q - 0.1
      // Test for completeness on while
      C = imageInfo.size/102400
      console.log(cycles++, ": Q = ", Q,  " size-> ", imageInfo.size)
    }
    return compressed
  }

  // Not currently used.
  _handleImagePicked = async pickerResult => {
    console.log('PickerResult: ');
    console.log(pickerResult);
    if ( ! pickerResult.cancelled ) {
      await this._uploadImageAsync(pickerResult.uri);
    }
  }

  // Copied from: https://github.com/expo/image-upload-example/blob/master/frontend/App.js
  _uploadImageAsync = async (uri) => {
    /*
    let apiUrl = 'https://s3-ap-southeast-1.amazonaws.com/bbb-app-images';

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options);
    */
    const api = create({
      baseURL: 'https://bbb-app-images.s3.amazonaws.com',
    })


    // create formdata
    //const instanceSignedUrl = new SignedUrl();
    //let signedUrl = getSignedUrl( 'image/jpeg' )
    getSignedUrl( 'image/jpeg' )
      .then( ({ data }) => {
        console.log("Signed Url from server: ", getSignedUrl);
        const formData = new FormData();
        formData.append('key', data.getSignedUrl.key);
        formData.append('bucket', data.getSignedUrl.bucket);
        formData.append('Policy', data.getSignedUrl.policy);
        formData.append('X-Amz-Algorithm', data.getSignedUrl.X_Amz_Algorithm);
        formData.append('X-Amz-Credential', data.getSignedUrl.X_Amz_Credential);
        formData.append('X-Amz-Date', data.getSignedUrl.X_Amz_Date);
        formData.append('X-Amz-Signature', data.getSignedUrl.X_Amz_Signature);
        formData.append('file', {uri: uri, type: 'multipart/form-data'} );
        console.log("Data Signed Url: ", data.getSignedUrl);
        return formData
//    data.append('key', 'somerandomlygeneratedalphanumeric');
//    data.append('bucket', 'bbb-app-images');
//    data.append('Policy', 'eyJleHBpcmF0aW9uIjoiMjAxOC0wNC0xMVQwNzoyMzoxN1oiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MjQyODhdLHsia2V5Ijoic29tZXJhbmRvbWx5Z2VuZXJhdGVkYWxwaGFudW1lcmljIn0seyJidWNrZXQiOiJiYmItYXBwLWltYWdlcyJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUFKRUpDT01MQjZGSTVFVkVRLzIwMTgwNDExL2FwLXNvdXRoZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMTgwNDExVDA2MjMxN1oifV19');
//    data.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
//    data.append('X-Amz-Credential', 'AKIAJEJCOMLB6FI5EVEQ/20180411/ap-southeast-1/s3/aws4_request');
//    data.append('X-Amz-Date', '20180411T062317Z');
//    data.append('X-Amz-Signature', '961d824489016a261bab234bb227fdc20de12c67a1724d819ffcba19e69de44c');
    //data.append('Content-Type', 'image/jpeg');
    //{uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data'}
      })
      .then( (data) => {
        // post your data.
        return api.post('', data, {
              onUploadProgress: (e) => {
                console.log(e)
                const progress = e.loaded / e.total;
                console.log(progress);
                this.setState({
                  progress: progress
                });
              }
            })
      })
      .then((res) => console.log("Response: ", res))
  }

  _renderRowCategory(rowData) {
    return (
      <View style={styles.mainRowView}>
        <Text style={styles.txttemp}>{rowData.text}</Text>
        <TouchableOpacity onPress={() => this._renderDeleteItem(rowData.id)}>
          <Ionicons
            name="md-close"
            size={Layout.moderateScale(15)}
            color="black"
            style={styles.cancle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onPressAdd = () => {
    // console.log(this.state.texts);
    var idss = dataObjectsCates.length + 1;
    dataObjectsCates.push({ id: idss.toString(), text: this.state.text });
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({ dataSourceCates: ds.cloneWithRows(dataObjectsCates) });
  };

  onPressHeadSale = () => {
    if (this.state.isCollapsedSale) {
      this.setState({
        isCollapsedSale: false,
        isCollapsedBarter: true,
        isCollapsedDonate: true,
        isCollapsedDnS: true,
      });
    } else {
      this.setState({ isCollapsedSale: true });
    }
  };
  onPressHeadBarter = () => {
    if (this.state.isCollapsedBarter) {
      this.setState({
        isCollapsedSale: true,
        isCollapsedBarter: false,
        isCollapsedDonate: true,
        isCollapsedDnS: true,
      });
    } else {
      this.setState({ isCollapsedBarter: true });
    }
  };
  onPressHeadDonate = () => {
    if (this.state.isCollapsedDonate) {
      this.setState({
        isCollapsedSale: true,
        isCollapsedBarter: true,
        isCollapsedDonate: false,
        isCollapsedDnS: true,
      });
    } else {
      this.setState({ isCollapsedDonate: true });
    }
  };
  onPressHeadDnS = () => {
    if (this.state.isCollapsedDnS) {
      this.setState({
        isCollapsedSale: true,
        isCollapsedBarter: true,
        isCollapsedDonate: true,
        isCollapsedDnS: false,
      });
    } else {
      this.setState({ isCollapsedDnS: true });
    }
  };

  _renderDeleteItem(index) {
    let tmp = dataObjectsCates;
    let newarray = [];
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].id != index) {
        newarray.push({ id: tmp[i].id, text: tmp[i].text });
      }
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({ dataSourceCates: ds.cloneWithRows(newarray) });
  }

  _renderRowTags(rowData) {
    return (
      <View style={styles.mainRowView}>
        <Text style={styles.txttemp}>{rowData.text}</Text>
        <TouchableOpacity onPress={() => this._renderDeleteTag(rowData.id)}>
          <Ionicons
            name="md-close"
            size={Layout.moderateScale(15)}
            color="black"
            style={styles.cancle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onPressAddTag = () => {
    var idss = dataObjectsTags.length + 1;
    dataObjectsTags.push({ id: idss.toString(), text: this.state.textd });
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({ dataSourceTags: ds.cloneWithRows(dataObjectsTags) });
  };

  _renderDeleteTag(index) {
    let tmp = dataObjectsTags;
    let newarray = [];
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].id != index) {
        newarray.push({ id: tmp[i].id, text: tmp[i].text });
      }
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({ dataSourceTags: ds.cloneWithRows(newarray) });
  }

  render() {
    let data = [
      {
        value: 'Banana',
      },
      {
        value: 'Mango',
      },
      {
        value: 'Pear',
      },
    ];
    let dataCurrency = [
      {
        value: 'USD',
      },
      {
        value: 'INR',
      },
      {
        value: 'EUR',
      },
    ];
    let dataTime = [
      {
        value: 'AM',
      },
      {
        value: 'PM',
      },
    ];
    let dataCate = [
      {
        value: 'Baby A',
      },
      {
        value: 'Baby B',
      },
      {
        value: 'Baby C',
      },
    ];
    var temp = [
      {
        path: 'Android',
        name: 'Android',
        checked: true,
      },
    ];
    var leftComponent = (
      <Button transparent onPress={() => this.props.navigation.navigate('homeScreen')}>
      <Icon
      name="md-arrow-back"
      size={Layout.moderateScale(18)}
      style={{ color: '#ffffff' }}
      />
      </Button>
    );
    var rightComponent = (
      <Button transparent onPress={() => this.props.navigation.navigate('homeScreen')}>
      <Ionicons
      name="md-checkmark"
      size={Layout.moderateScale(25)}
      style={{ color: '#ffffff' }}
      />
      </Button>
    );
    var _this = this;
    return (
      <View style={styles.container}>
      <BBBHeader
      title="Create A New Item"
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      />
      <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.imagesMainView}>
              <FlatList
                horizontal={true}
                data={this.state.images}
                //extraData={this.state}
                keyExtractor={(item, index) => item.id }
                renderItem={this._renderRow.bind(this)}
                contentContainerStyle={styles.listContents}
              />
      </View>
      <View style={styles.exchangeMode}>
      <Text style={styles.txtExch}>Exchange Mode</Text>
      <View style={styles.saleview}>
      <TouchableOpacity onPress={this.onPressHeadSale}>
      <View style={styles.saleHeader}>
      {this.state.isCollapsedSale ? (
        <Feather
        name="circle"
        style={{
          width: Layout.moderateScale(30),
            height: Layout.moderateScale(30),
            fontSize: Layout.moderateScale(30),
            color: '#c8c8c8',
        }}
        />
      ) : (
        <RedioSelected
        width={Layout.moderateScale(30)}
        height={Layout.moderateScale(30)}
        />
      )}
      <Text style={styles.txtfacetoFace}>Sale</Text>
      </View>
      </TouchableOpacity>
      {this.state.isCollapsedSale ? null : (
        <View style={styles.bottomline} />
      )}
      <Collapsible collapsed={this.state.isCollapsedSale}>
      <View style={styles.saleChild}>
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Currency</Text>
      <Dropdown
      data={dataCurrency}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      </View>
      <CheckBox
      style={styles.chboxRemember}
      onClick={() => _this.onClick(temp)}
      isChecked={true}
      checkBoxColor={'#fff'}
      rightText={'Allow counter offer'}
      rightTextStyle={{
        color: 'black',
          fontSize: 20,
          marginLeft: 20,
          fontFamily: 'roboto-reguler',
      }}
      unCheckedImage={
        <Ionicons
        name="ios-square-outline"
        size={Layout.moderateScale(20)}
        color="black"
        style={styles.cancle}
        />
      }
      checkedImage={
        <Ionicons
        name="ios-checkbox-outline"
        size={Layout.moderateScale(20)}
        color="black"
        style={styles.cancle}
        />
      }
      />
      </View>
      </Collapsible>
      </View>
      <View style={styles.saleview}>
      <TouchableOpacity onPress={this.onPressHeadBarter}>
      <View style={styles.saleHeader}>
      {this.state.isCollapsedBarter ? (
        <Feather
        name="circle"
        style={{
          width: Layout.moderateScale(30),
            height: Layout.moderateScale(30),
            fontSize: Layout.moderateScale(30),
            color: '#c8c8c8',
        }}
        />
      ) : (
        <RedioSelected
        width={Layout.moderateScale(30)}
        height={Layout.moderateScale(30)}
        />
      )}
      <Text style={styles.txtfacetoFace}>Barter</Text>
      </View>
      </TouchableOpacity>
      {this.state.isCollapsedBarter ? null : (
        <View style={styles.bottomline} />
      )}
      <Collapsible collapsed={this.state.isCollapsedBarter}>
      <View style={styles.saleChild}>
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Price</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Time</Text>
      <Dropdown
      data={dataTime}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      </View>
      </View>
      </Collapsible>
      </View>
      <View style={styles.saleview}>
      <TouchableOpacity onPress={this.onPressHeadDonate}>
      <View style={styles.saleHeader}>
      {this.state.isCollapsedDonate ? (
        <Feather
        name="circle"
        style={{
          width: Layout.moderateScale(30),
            height: Layout.moderateScale(30),
            fontSize: Layout.moderateScale(30),
            color: '#c8c8c8',
        }}
        />
      ) : (
        <RedioSelected
        width={Layout.moderateScale(30)}
        height={Layout.moderateScale(30)}
        />
      )}
      <Text style={styles.txtfacetoFace}>Donate</Text>
      </View>
      </TouchableOpacity>
      {this.state.isCollapsedDonate ? null : (
        <View style={styles.bottomline} />
      )}
      <Collapsible collapsed={this.state.isCollapsedDonate}>
      <View style={styles.saleChild}>
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>
      71 Pilgrim Avenue Chevy Chase, MD 20815
      </Text>
      </View>
      </View>
      </View>
      </Collapsible>
      </View>
      <View style={styles.saleview}>
      <TouchableOpacity onPress={this.onPressHeadDnS}>
      <View style={styles.saleHeader}>
      {this.state.isCollapsedDnS ? (
        <Feather
        name="circle"
        style={{
          width: Layout.moderateScale(30),
            height: Layout.moderateScale(30),
            fontSize: Layout.moderateScale(30),
            color: '#c8c8c8',
        }}
        />
      ) : (
        <RedioSelected
        width={Layout.moderateScale(30)}
        height={Layout.moderateScale(30)}
        />
      )}
      <Text style={styles.txtfacetoFace}>Sale & Barter</Text>
      </View>
      </TouchableOpacity>
      {this.state.isCollapsedDnS ? null : (
        <View style={styles.bottomline} />
      )}
      <Collapsible collapsed={this.state.isCollapsedDnS}>
      <View style={styles.saleChild}>
      <Text style={styles.txtsubtxt}>Sale</Text>
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Currency</Text>
      <Dropdown
      data={dataCurrency}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      </View>
      <CheckBox
      style={styles.chboxRemember}
      onClick={() => _this.onClick(temp)}
      isChecked={true}
      checkBoxColor={'#fff'}
      rightText={'Allow counter offer'}
      rightTextStyle={{
        color: 'black',
          fontSize: 20,
          marginLeft: 20,
      }}
      unCheckedImage={
        <Ionicons
        name="ios-square-outline"
        size={Layout.moderateScale(20)}
        color="black"
        style={styles.cancle}
        />
      }
      checkedImage={
        <Ionicons
        name="ios-checkbox-outline"
        size={Layout.moderateScale(20)}
        color="black"
        style={styles.cancle}
        />
      }
      />
      </View>
      <View style={styles.bottomlineShort} />
      <Text style={styles.txtsubtxt}>Barter</Text>
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Price</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Time</Text>
      <Dropdown
      data={dataTime}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      </View>
      </Collapsible>
      </View>
      </View>
      <View style={styles.deliveryOption}>
      <Text style={styles.txtDelOpt}>Delivery Options</Text>
      <View style={styles.faceToFace}>
      <Text style={styles.txtfacetoFace}>Face to Face</Text>
      <View style={styles.bottomline} />
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Line 1</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      <Text style={styles.txtTitle}>Line 2</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      <Text style={styles.txtTitle}>Postcode</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      <View style={styles.mapFacetoFace}>
      <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}
      />
      </View>
      </View>
      </View>
      <View style={styles.regPost}>
      <Text style={styles.txtfacetoFace}>Registered Post</Text>
      <View style={styles.bottomline} />
      <View style={styles.subFacetoFace}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Currency</Text>
      <Dropdown
      data={dataCurrency}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
      </View>
      </View>
      </View>
      <View style={styles.addmore}>
      <View style={styles.subAddmore}>
      <Add
      width={Layout.HEIGHT * 0.05}
      height={Layout.HEIGHT * 0.05}
      />
      <Text style={styles.txtTitleAdd}>Add More</Text>
      </View>
      </View>
      </View>
      <View style={styles.Descrip}>
      <Text style={styles.txtTitle}>Short Description</Text>
      <Item style={styles.txtInput} regular>
      <Input />
      <Text style={styles.txtcount}>0/64</Text>
      </Item>
      <Text style={styles.txtTitle}>Long Description</Text>
      <Item style={styles.txtInput} regular>
      <Input
      multiline={true}
      style={{
        height: Layout.HEIGHT * 0.1,
          marginBottom: Layout.HEIGHT * 0.015,
      }}
      />
      <Text style={styles.txtcount}>0/1024</Text>
      </Item>
      </View>
      <View style={styles.categoty}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Category</Text>
      <View>
      <Dropdown
      data={dataCate}
      labelHeight={0}
      dropdownPosition={0}
      baseColor="rgba(0, 0, 0, .00)"
      containerStyle={styles.dateDropDown}
      />
      </View>
      <Text style={styles.txtTitles}>Templates</Text>
      <View style={styles.templateSec}>
        <Item style={styles.txtInputsmall} regular>
          <Input onChangeText={text => { this.setState({ text }); }} />
        </Item>
        <TouchableOpacity style={styles.addButton} onPress={this.onPressAdd}>
          <View style={styles.addButton}>
            <Add width={Layout.WIDTH * 0.08} height={Layout.WIDTH * 0.08} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
      <ListView
      horizontal={true}
      contentContainerStyle={styles.listContent}
      dataSource={this.state.dataSourceCates}
      renderRow={this._renderRowCategory.bind(this)}
      enableEmptySections
      pageSize={parseInt(this.state.pageSize)}
      />
      </View>
      <Text style={styles.txtTitles}>Tags</Text>
      <View style={styles.templateSec}>
      <Item style={styles.txtInputsmall} regular>
      <Input
      onChangeText={text => {
        this.setState({ textd: text });
      }}
      />
      </Item>
      <TouchableOpacity
      style={styles.addButton}
      onPress={this.onPressAddTag}>
                  <View style={styles.addButton}>
                    <Add
                      width={Layout.WIDTH * 0.08}
                      height={Layout.WIDTH * 0.08}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <ListView
                  horizontal={true}
                  contentContainerStyle={styles.listContent}
                  dataSource={this.state.dataSourceTags}
                  renderRow={this._renderRowTags.bind(this)}
                  enableEmptySections
                  pageSize={parseInt(this.state.pageSize)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
