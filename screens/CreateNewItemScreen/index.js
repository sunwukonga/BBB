import React from 'react';
import {
  Image
, Platform
, ScrollView
, StyleSheet
, TouchableOpacity
, View
, ListView
, FlatList
, TextInput
, Picker
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
import { MapView, Location, Permissions, Constants as eConstants } from 'expo';
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import RedioSelected from '../../components/RedioSelected';
import RedioUnselect from '../../components/RedioUnselect';
import Add from '../../components/Add';
import SearchBtn from '../../components/SearchBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
//import Dropdown from '../../components/Dropdown/dropdown';
import { create } from 'apisauce';
import getSignedUrl from './SignedUrl';
import createNewItemUrl from './CreateNewItem';
import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from 'react-native-check-box';
import { Layout, Colors, Images, Constants, defaultRegions } from '../../constants/';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';
import Toast, {DURATION} from 'react-native-easy-toast';
//import Toast from 'react-native-simple-toast';
import getCategoryList from './AllCategoryApi';
import getTemplateList from './SearchTemplateApi';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import LoginStatus from '../HomeScreen/LoginStatus'
import { w, getMethods } from '../../utils/helpers.js'
import { StackActions, NavigationActions } from 'react-navigation';

import { CreateListing } from '../../graphql/mutations/CreateListing'
import GetCachedCountry from '../../graphql/queries/GetCachedCountry'

import Collapsible from 'react-native-collapsible';
var dataObjectsCates = [];
var dataObjectsTags = [];
var tagsList = [];
var imageList=[];
var imageUploadList=[];
// Navigation Actions
const resetAction = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile' }),
    NavigationActions.navigate({ routeName: 'Settings' }),
  ],
});
//NavigationActions.navigate
const SA_CreateToProduct = (item, loginStatus) => StackActions.reset({
  index: 1
, actions: [
    StackActions.push({ routeName: 'homeDrawer' })
  , StackActions.push({
      routeName: 'productDetailsScreen'
    , params: {
        item: item
      , loginStatus: loginStatus
      }
    })
  ]
})

var defaultRegions2 = {
  AU: {
    latitude: -28
  , longitude: 133
  , latitudeDelta: 50.86
  , longitudeDelta: 41.8
  }
, BN: {
    latitude: 4.638
  , longitude: 114.736
  , latitudeDelta: 0.40
  , longitudeDelta: 0.20
  }
, CA: {
    latitude: 57
  , longitude: -103
  , latitudeDelta: 50
  , longitudeDelta: 42
  }
, CO: {
    latitude: 4.588
  , longitude: -73.421
  , latitudeDelta: 17.52
  , longitudeDelta: 12.87
  }
, GB: {
    latitude: 54.387
  , longitude: -2.6401
  , latitudeDelta: 8.7517
  , longitudeDelta: 11.013
  }
, HK: {
    latitude: 22.3979
  , longitude: 114.1232
  , latitudeDelta: 0.7406
  , longitudeDelta: 0.5961
  }
, ID: {
    latitude: -6.8639
  , longitude: 106.7067
  , latitudeDelta: 6.6091
  , longitudeDelta: 4.8574
  }
, KE: {
    latitude: 0.6815
  , longitude: 37.7088
  , latitudeDelta: 12.0345
  , longitudeDelta: 8.7933
  }
, MY: {
    latitude: 3.6412
  , longitude: 102.1357
  , latitudeDelta: 7.0831
  , longitudeDelta: 5.1832
  }
, NL: {
    latitude: 52.2921
  , longitude: 5.2091
  , latitudeDelta: 1.6988
  , longitudeDelta: 1.9105
  }
, NZ: {
    latitude: -40.6930
  , longitude: 172.5650
  , latitudeDelta: 6.7351
  , longitudeDelta: 6.5154
  }
, PH: {
    latitude: 11.6910
  , longitude: 121.7470
  , latitudeDelta: 8.0
  , longitudeDelta: 6.0
  }
, RW: {
    latitude: -1.8065
  , longitude: 29.7260
  , latitudeDelta: 3.4700
  , longitudeDelta: 2.5322
  }
, SG: {
    latitude: 1.352754
  , longitude: 103.822713
  , latitudeDelta: 0.16
  , longitudeDelta: 0.08
  }
, TZ: {
    latitude: -5.2947
  , longitude: 34.3738
  , latitudeDelta: 5.3953
  , longitudeDelta: 4.0498
  }
, US: {
    latitude: 37.5319
  , longitude: -99.3410
  , latitudeDelta: 49.8391
  , longitudeDelta: 49.4714
  }
}
/**
Catgeory List Details
*/
var allCategoryList = [];
var allCategoryValueList = [];
var currency = ''
var postCurrency = ''
export default class CreateNewItemScreen extends React.Component {
  constructor(props) {
    super(props);
    //let location = await Location.getCurrentPositionAsync({})
    //location.coords.latitude; location.coords.longitude
    // defaultLocation

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged });
    const dsCates = new ListView.DataSource({ rowHasChanged });
    const dsTags = new ListView.DataSource({ rowHasChanged });

    if (imageList.length == 0) {
      imageList.push({ id:'addImageButton', imageId:0,url: Images.trollie,inputFlag:true });
    }
/*
      coordinates: {
        latitudenull
                                coordinate={this.state.marker.latlng}
                                title={this.state.marker.title}
                                description={this.state.marker.description}
                                */
    /*
    , marker: {
        latlng: {
          latitude: 1.3688819
        , longitude: 103.8969434
        }
      , description: "Description"
      , title: "Title"
      }
      */
//TODO: add toast to display errors
    this.state = {
      visible: false
    , location: null
    , region: null
    , errorMessage: ''
    , selectedCateName: null
    , selectedCateId:null
    , selectedTemplateName: null
    , selectedTemplateId:null
    , templateVisible:false
    , selectedTagName: null
    , selectedTagId:null
    , tagVisible:false
    , allCategoryList:[]
    , allCategoryValueList:[]
    , searchTemplateList:[]
    , searchTemplateValueList:[]
    , allTagIdList:[]
    , allTagList:[]
    , progressVisible:false
      //dataSource: ds.cloneWithRows(dataObjects),
    , dataSourceCates: dsCates.cloneWithRows(dataObjectsCates)
    , dataSourceTags: dsTags.cloneWithRows(dataObjectsTags)
    , texts: ''
    , isCollapsedSale: false
    , isCollapsedBarter: true
    , isCollapsedDonate: true
    , isCollapsedDnS: true
    , progressMsg:"Please Wait..."
    , showDialog:false
    , errorMsg:''
    , dialogTitle:''

  //    _pickImage = this._pickImage

      // Data for mutation i.e. create item
    , mode: Constants.SALE
    , images: imageList
    , cost: 0.0
    , counterOffer: false
    , template: null
    , barterTemplates: [] // [ [{template, qty}, {template, qty}], [{template, qty}] ]
    , address: {
        name: ''
      , street: ''
      , city: ''
      , region: ''
      , postcode: ''
      , long: 0.0
      , lat: 0.0
      , directions: ''
      }
    , postCost: 0.0
    , shortDesc: null
    , longDesc: ''
    , category: ''
    , title:''
    , textd:''
      // End data for mutation
    }
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {}
    // this.saveToServer = this.saveToServer.bind(this);
  }

  focusNextField(id) {
    this.inputs[id].wrappedInstance.focus();
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
        this.toast.show("Oooops, not permission to access location", DURATION.LENGTH_LONG);
      } else {
        let maxDelayPromise = new Promise( (resolve, reject) => {
          setTimeout(() => reject('Took too long'), 5000)
        })
        await Promise.race([Location.getCurrentPositionAsync({enableHighAccuracy: false}), maxDelayPromise])
        .then( myLocation => {
          return this.setState({
            region: { ...this.state.region, longitude: myLocation.coords.longitude, latitude: myLocation.coords.latitude }
          })
        })
        .catch( value => {
          this.toast.show("GPS location fails if 'Device Only' mode is enabled on your android", 2000);
        })
        /*
        let myLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: false})
        console.log("Location: ", myLocation.coords)
        await this.setState({
          region: { ...this.state.region, longitude: myLocation.coords.longitude, latitude: myLocation.coords.latitude }
        })
        */
      }
    } catch (error) {
      console.log(error);
    }
  };

  _validateAllRequiredFileds() {
    imageList.pop()
    for (var i = 0, len = imageList.length, primarySet = false; i < len; i++) {
      if (primarySet) {
        imageList[i].primary = false
      } else {
        if (!imageList[i].deleted) {
          imageList[i].primary = true
          primarySet = true
        }
      }
    }

    imageUploadList = imageList.map( image => {
      return {
        imageId: image.imageId
      , imageKey: image.imageKey
      , primary: image.primary
      , deleted: image.deleted
      }
    })

    if (this.state.title.length===0){
        this.toast.show("Please Enter Title", DURATION.LENGTH_LONG);
        return false;
    }

    if(this.state.longDesc.length===0){
        this.toast.show("Please Enter Description", DURATION.LENGTH_LONG);
        return false;
    }
    if(this.state.category.length===0){
        this.toast.show("Please Select Category", DURATION.LENGTH_LONG);
        return false;
    }
    /*
    if(this.state.address.lineOne.length>=1 || this.state.address.lineTwo.length>=1 || this.state.address.postcode.length>=1){
      if(this.state.address.lineOne.length===0){
        this.toast.show("Please Enter Address Line 1", DURATION.LENGTH_LONG);
        return false;
      }
      if(this.state.address.lineTwo.length===0){
        this.toast.show("Please Enter Address Line 2", DURATION.LENGTH_LONG);
          return false;
      }
      if(this.state.address.postcode.length===0){
        this.toast.show("Please Enter Postcode", DURATION.LENGTH_LONG);
          return false;
      }
    }
    */


    if(postCurrency.length == 0 || (this.state.postCost && this.state.postCost == 0.0)){
      if (postCurrency.length===0){
        this.toast.show("Please Select Post Currency", DURATION.LENGTH_LONG);
          return false;
      }
      if(this.state.postCost.length===0){
        this.toast.show("Please Enter Post Cost", DURATION.LENGTH_LONG);
          return false;
      }
    }
    return true
  }

  // Not currently used
  _isImageExits(base64){
    if(imageList.length===0){
      return false;
    }
    for(var i=1;i<imageList.length;i++){
      if(imageList[i].base_64===base64){
        return true;
      }
    }
    return false;
  }

  _getTemplates(){

    var variables={
      "terms":[""],"limit":20,"page":1,"categoryId":[this.state.selectedCateId]
    }
    getTemplateList(variables).then((res)=>{
      var _data=res.data.searchTemplates;
      var tmpList=[];
      Object.keys(res.data.searchTemplates).forEach((key,index)=>{
            tmpList.push({label:res.data.searchTemplates[key].title,key:res.data.searchTemplates[key].id});
      });
      this.setState({
        searchTemplateList:_data,
        searchTemplateValueList:tmpList,
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

//"barterTemplates":[[{"templateId":"1","quantity":1,"tags":["1","2"]},{"templateId":"2","quantity":2,"tags":["1","2"]}]]
  collateVariables( countryCode ){

    if(!this._validateAllRequiredFileds()){
        return false;
    } else {
      // Reset images
      imageList = [{ id:'addImageButton', imageId:0,url: Images.trollie,inputFlag:true }]
    }

    var variables = "";
    var post_=null;
    var addr_ = {
      lineOne: this.state.address.name.concat(" ", this.state.address.street)
    , lineTwo: this.state.address.city.concat(" ", this.state.address.region)
    , postcode: this.state.address.postcode
    , long: this.state.address.long
    , lat: this.state.address.lat
    , directions: ''
    }
    if(postCurrency.length!=0){
      post_={"postCurrency":postCurrency,"postCost":this.state.postCost};
    }
    if(addr_.lineOne.length == 0 && this.state.address.lat == 0.0){
      addr_ = null
    }
    variables = { variables: {
      "mode":this.state.mode,
      "images":imageUploadList,
      "currency": currency,
      "cost":this.state.cost,
      "counterOffer":this.state.counterOffer,
    /*  "barterTemplates":this.state.barterTemplates,*/
      "address":addr_,
      "post":post_,
      "title":this.state.title,
      "description":this.state.longDesc,
      "category":this.state.category,
      "template":this.state.selectedTemplateId,
      "tags":tagsList,
      "countryCode": countryCode
    }}
    //variables.fetchPolicy = 'network-only'
    return variables

    /*
    console.log("Params",variables);
      this.setState({
        progressVisible: true,
        progressMsg:"Please Wait..."
      });

    createNewItemUrl(variables).then((res)=>{
      console.log("Response ",res)

        this.setState({
          progressVisible: false,
          errorMsg:"New Item Created Successfully",
          showDialog:true,
          dialogTitle:"Success"
        });
    })
    .catch(error => {
        console.log("Error:" + error.message);
        this.setState({
          progressVisible: false,
          errorMsg:error.message,
          showDialog:true,
          dialogTitle:"Error!"
        })
    });
    */

  }

  componentDidMount(){
    if (Platform.OS === 'android' && !eConstants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
      this.toast.show("Oooops, this will not work on Sketch", DURATION.LENGTH_LONG);
    } else {
      this._getLocationAsync();
    }
    this.setState({
      progressVisible: true,
    });
    getCategoryList().then((res)=>{
        Object.keys(res.data.allCategoriesFlat).forEach((key,index)=>{
              allCategoryList.push(res.data.allCategoriesFlat[key]);
              allCategoryValueList.push({label:res.data.allCategoriesFlat[key].name,key:res.data.allCategoriesFlat[key].id});
        });

        this.setState({
          allCategoryList:allCategoryList,
          allCategoryValueList:allCategoryValueList,
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


  onClick(data) {
    data.checked = !data.checked;
    let msg = data.checked ? 'you checked ' : 'you unchecked ';
  }

  static navigationOptions = {
    header: null,
  };

  _renderRow( {item} ) {

    if (item.deleted) {
     return (
       <View style={styles.imagesSubView}>
         <Image source={{uri: item.url}}style={styles.rowImage} />
         <TouchableOpacity style={styles.imageOverlay} onPress={()=>this.deleteImageDetails(item.imageId)}>
           <Text style={{textAlign: 'center', paddingTop: Layout.WIDTH * 0.05}}>DELETED</Text>
           <Icon name="ios-undo" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
       </View>
     );
   }
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
            <Image source={{uri: item.url}} style={styles.rowImage}  />
            {<Icon name="ios-close-circle" style={styles.rowFlagImage}  onPress={()=>this.deleteImageDetails(item.imageId)}/>}
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
    let maxPixels = 476
    // In future, we'll be able to avoid pickerResult compressing the jpg
    // https://github.com/expo/expo/commit/7548f07cf956d88e15176d3512dd98a83448da6c
    //
    //  quality: 0.95,
    let pickerResult = await Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: Expo.ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      exif: false,
      base64: false,
    })

    if ( ! pickerResult.cancelled ) {
      //console.log("EXIF: ", pickerResult.exif)
      this.setState({
        progressVisible: true,
        progressMsg:"Validating Image..."
      });
      // https://docs.expo.io/versions/latest/sdk/filesystem#expofilesystemgetinfoasyncfileuri-options
      /*let hashPromise = new Promise(function(resolve, reject) {
        let sha256 = new jsSHA('SHA-256', 'TEXT');
        sha256.update(pickerResult.base64);
        resolve(sha256.getHash("HEX"))
      });*/
      // base64hash should form the key of a previously uploaded image record.
      // should create a temporary link to the image (or add a field) to protect it from deletion
      // check if deleted
      //
      /*
      hashPromise.then( hash => {
        console.log("Hash: ", hash)
      })*/
      let fileinfo = await Expo.FileSystem.getInfoAsync(pickerResult.uri, { size: true, md5: true })
      //console.log(fileinfo.md5)
      //console.log("Hi")
      //console.log("Starting size: ", fileinfo.size)
      let tryResize = pickerResult
       // If filesize is below 150kb don't attempt to reduce it further.
      let compressionFactor = 0.95

      while ( fileinfo.size > 153600 ) {
        // #######################################
        // Resize any dimension greater than maxPixels
        // #######################################
        //console.log("fileinfo: ", fileinfo)
        //console.log("pickerResult: ", pickerResult)
        //console.log("size: ", fileinfo.size, " width: ", pickerResult.width, " height: ", pickerResult.height)
        //console.log("size: ", fileinfo.size)
        ////
        if ( pickerResult.height > maxPixels ) {
          if (pickerResult.width >= pickerResult.height) {
            // Width needs reduction to maxPixels
            tryResize = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {width: maxPixels}}], { format: 'jpeg', compress: compressionFactor})
          } else {
            // Height needs reduction to maxPixels
            tryResize = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {height: maxPixels}}], { format: 'jpeg', compress: compressionFactor})
          }
        } else if (pickerResult.width > maxPixels) {
          // Width needs reduction to maxPixels
          tryResize = await Expo.ImageManipulator.manipulate(pickerResult.uri, [{ resize: {width: maxPixels}}], { format: 'jpeg', compress: compressionFactor})
        } else {
          // No need for resize
          tryResize = await Expo.ImageManipulator.manipulate(pickerResult.uri, [], { format: 'jpeg', compress: compressionFactor})
          //console.log("Pixel size fine: ")
        }
        fileinfo = await Expo.FileSystem.getInfoAsync(tryResize.uri, {size: true})
        ////
        //console.log("Tried Size: ", fileinfo.size, " maxPixels: ", maxPixels)
        //console.log("compLevel: ", compressionFactor)
        compressionFactor -= 0.05
        if (compressionFactor < 0.1) {
          if (maxPixels > 256) {
            maxPixels = 256
            compressionFactor = 0.95
          } else if (maxPixels > 128) {
            maxPixels = 128
            compressionFactor = 0.95
          } else break;
        }
        // #######################################
        // End resizing
        // #######################################
        // #######################################
        // Apply compression
        // #######################################
        //compressed = await this._regressiveCompress(resized, resizedFileinfo)
      }
      /*
        let resizedFileinfo
        if (! resized ) {
          resizedFileinfo = fileinfo
          resized = pickerResult
        } {
          resizedFileinfo = await Expo.FileSystem.getInfoAsync(resized.uri, {size: true})
        }
        */

      // It is pickerResult.base64 that holds the necessary information, and this should be hashed.
      // This hash should be stored locally and persistently with the UploadedImage information.
      // Then compared with other attempted uploads. Instead of uploading... it should be associated.
      // If the image is already in list, it should be undeleted there.
      // ###############################
      // Deleting this incompetent shit for now
      // #######################################
      /*
      if(this._isImageExits(compressed.base64)){
        this.setState({
          progressVisible: false
        });
        Toast.show("This image already exists",Toast.SHORT)
        return;
      }
      */

      // https://docs.expo.io/versions/v26.0.0/sdk/imagemanipulator
      await this._uploadImageAsync(tryResize.uri,"");
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
    console.log("Q: ", Q)
    console.log("Necessary Compression Ratio: ", C)
    console.log("Resized File Size: ", resizedFileinfo.size)
    while ( C > 1.5 ) {
      if ( Q > 1 ) {
          console.log("Compression ratio >= 1.5 and Q > 1")
          compressed = await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: 0 })
      } else if ( Q < 0.1 ) {
        // It is possible that this restriction could result in image sizes greater than 200kb
        console.log("Q < 0.1")
        return await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: 0 })
        //return compressed
      } else {
        console.log("0.1 <= Q <= 1")
        compressed = await Expo.ImageManipulator.manipulate(compressed.uri, [], { compress: 0 })
      }

      imageInfo = await Expo.FileSystem.getInfoAsync(compressed.uri, {size: true})
      Q = Q - 0.1
      // Test for completeness on while
      C = imageInfo.size/102400
      console.log(cycles++, ": Q = ", Q,  " size-> ", imageInfo.size)
    }
    return compressed
  }

  // Not currently used.
  _handleImagePicked = async pickerResult => {
    if ( ! pickerResult.cancelled ) {
      await this._uploadImageAsync(pickerResult.uri,pickerResult.base64);
    }
  }

  // Copied from: https://github.com/expo/image-upload-example/blob/master/frontend/App.js
  _uploadImageAsync = async (uri,base64) => {
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
    this.setState({
      progressVisible: true,
      progressMsg:"Image Uploading..."
    });
    const api = create({
      baseURL: 'https://bbb-app-images.s3.amazonaws.com',
    })

    // create formdata
    //const instanceSignedUrl = new SignedUrl();
    //let signedUrl = getSignedUrl( 'image/jpeg' )
          //{({ data, fetchMore, networkStatus, refetch, error, variables}) => {
    getSignedUrl( 'image/jpeg' )
    .then( ({ data, refetch, error }) => {
      if (error) {
        console.log("Error: ", error)
        // Try again?
        return null
      }
      const formData = new FormData();
      this.storeImageDetails( data.getSignedUrl.key, data.getSignedUrl.id, uri, base64);
      formData.append('key', data.getSignedUrl.key);
      formData.append('bucket', data.getSignedUrl.bucket);
      formData.append('Policy', data.getSignedUrl.policy);
      formData.append('X-Amz-Algorithm', data.getSignedUrl.X_Amz_Algorithm);
      formData.append('X-Amz-Credential', data.getSignedUrl.X_Amz_Credential);
      formData.append('X-Amz-Date', data.getSignedUrl.X_Amz_Date);
      formData.append('X-Amz-Signature', data.getSignedUrl.X_Amz_Signature);
      formData.append('file', {uri: uri, type: 'multipart/form-data'} );

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
      if (data) {
        return api.post('', data, {
          onUploadProgress: (e) => {
            const progress = e.loaded / e.total;

          }
        })
      } return null
    })
    .then( (response) =>{
      if ( w(response, ['ok']) ) {
        //console.log("Response: ", response)
        //
      } else {
        //console.log("Response: ", response)
        // Some kind of error
//        response.data contains %EntityTooLarge%
//       response.ok == false
//       response.problem == "CLIENT_ERROR"
//       response.status == 400
      }
      
      this.setState({
        progressVisible: false,
        progressMsg:"Please Wait..."
      })
    })
  }

  storeImageDetails(imageKey,imgId,uri,base_64){
    let inputTile = imageList.pop()
    var _id=imageList.length+1;
    var isPrimary=_id===1;
    imageList.push({
      id: "_"+_id
    , imageId:imgId
    , url: uri
    , inputFlag:false
    , imageKey:imageKey
    , primary:isPrimary
    , deleted:false
    })
    imageList.push(inputTile)

  /*  realm.write(() => {

         var ID = realm.objects('Image_Info').length + 1;

          realm.create('Image_Info', {
            img_id: ID,
            img_key: imageKey,
            img_data:base_64
           });

       });*/

    this.setState({
      images:imageList

    })
  }

  deleteImageDetails(imgId) {
    imageList.forEach( image => {
      if(imgId===image.imageId){
        image.deleted = !image.deleted
      }
    })
    this.setState({
      images: imageList
    })
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
        mode: Constants.SALE,
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
        mode: Constants.BARTER,
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
        mode: Constants.DONATE,
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
        mode: Constants.SALEDONATE,
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
    dataObjectsCates=newarray;
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

    var isNew=true;
    let tmp_ = dataObjectsTags;
    for (var i = 0; i < tmp_.length; i++) {
      if(tmp_[i].tagId==this.state.selectedTagId){
        isNew=false;
        return;
      }
    }

    if(!isNew){
      return;
    }
    var idss = dataObjectsTags.length + 1;
    dataObjectsTags.push({ id: idss.toString(), text: this.state.selectedTagName,tagId:this.state.selectedTagId });
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  let tmp = dataObjectsTags;
    for (var i = 0; i < tmp.length; i++) {
      tagsList[i]=parseInt(tmp[i].tagId);
    }

    this.setState({ dataSourceTags: ds.cloneWithRows(dataObjectsTags),textd:"",selectedTagId:"",selectedTagName:"" });
  };

  _onSearchAddress = () => {
    Expo.Location.geocodeAsync(
      this.state.address.name.concat(" "
      , this.state.address.street, " "
      , this.state.address.city, " "
      , this.state.address.region, " "
      , this.state.address.postcode
      )
    )
    .then( coords => {
      let {latitude, longitude} = coords[0]
      this.setState({
        marker: { ...this.state.marker, latlng: {latitude: latitude, longitude: longitude}, title: 'pin', description: 'search result'}
      , region: { latitude: latitude, longitude: longitude, latitudeDelta: 0.009, longitudeDelta: 0.009*Math.cos(Math.PI*latitude/180)}
      , address: { ...this.state.address, lat: latitude, long: longitude}
      })
    })
  }

  _renderDeleteTag(index) {
    let tmp = dataObjectsTags;
    let newarray = [];
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].id != index) {
        newarray.push({ id: tmp[i].id, text: tmp[i].text,tagId:tmp[i].tagId });
      }
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({ dataSourceTags: ds.cloneWithRows(newarray) });
    tagsList=[];
    for (var i = 0; i < newarray.length; i++) {
      tagsList[i]=parseInt(newarray[i].tagId);
    }
    dataObjectsTags=newarray;
  }

  handleCurreny(value){
    postCurrency = value
  }

  longPressEvent(name) {
    return e => {
      if (e.persist) {
        e.persist();  // Avoids warnings relating to https://fb.me/react-event-pooling
      }
      console.log("LongPressEvent: ", e)
      /*
      this.setState(prevState => ({
        marker: { ...this.state.marker, [
          this.makeEvent(e, name),
          ...prevState.events.slice(0, 10),
        ],
      }))
      */
    };
  }
  pressEvent(name) {
    return e => {
      if (e.persist) {
        e.persist();  // Avoids warnings relating to https://fb.me/react-event-pooling
      }
      console.log("PressEvent: ", e)
      /*
      this.setState(prevState => ({
        marker: { ...this.state.marker, [
          this.makeEvent(e, name),
          ...prevState.events.slice(0, 10),
        ],
      }))
      */
    };
  }

  /*
                            provider={MapView.PROVIDER_GOOGLE}
                            tappable
                            onLongPress={this.longPressEvent('Map::onLongPress')}

                            { this.state.marker &&
                              <MapView.Marker
                                coordinate={this.state.marker.latlng}
                                title={this.state.marker.title}
                                description={this.state.marker.description}
                              />
                            }
                            */
  render() {

    var leftComponent = (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
      <Icon
      name="md-arrow-back"
      size={Layout.moderateScale(18)}
      style={{ color: '#ffffff' }}
      />
      </Button>
    );
    var rightComponent = (loginStatus) => (
      <CreateListing>{ mutateCreateListing => (
        <View>
          <Button transparent onPress={() => {
            let collatedVariables = this.collateVariables( loginStatus.countryCode )
            if (collatedVariables) {
              mutateCreateListing( collatedVariables )
              .then(({ data }) => {
                this.props.navigation.dispatch(SA_CreateToProduct(data.createListing, loginStatus))
              })
            }
          }}>
            <Ionicons
            name="md-checkmark"
            size={Layout.moderateScale(25)}
            style={{ color: '#ffffff' }}
            />
          </Button>
        </View>
      )}</CreateListing>
    )
    var _this = this;

    return (
      <LoginStatus>{ loginStatus => (
        <GetCachedCountry loginStatus={loginStatus}>{ country => {
          if (currency === '') {
            currency = country.currencies[0].iso4217
          }
          if (postCurrency === '') {
            postCurrency = country.currencies[0].iso4217
          }
          return (
          <View style={styles.container}>
            <BBBHeader
            title="Create A New Item"
            leftComponent={leftComponent}
            rightComponent={rightComponent(loginStatus)}
            />
            <Toast ref={component => this.toast = component}/>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.imagesMainView}>
                <FlatList
                  horizontal={true}
                  data={this.state.images}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.id }
                  renderItem={this._renderRow.bind(this)}
                  contentContainerStyle={styles.listContents}
                />
              </View>
              <View style={styles.Descrip}>
                <Text style={styles.txtTitle}>Title</Text>
                <Item style={styles.txtInput} regular>
                  <Input
                    blurOnSubmit={ false }
                    onSubmitEditing={() => { this.focusNextField("two") }}
                    returnKeyType={ "next" }
                    ref={ (el) => this.inputs['one'] = el }
                    onChangeText={(text) => {
                      this.setState({ title:text});
                    }}
                    maxLength={50}
                  />
                  <Text style={styles.txtcount}>{this.state.title.length}/50</Text>
                </Item>
              </View>

              <View style={styles.Descrip}>
                <Text style={styles.txtTitle}>Description</Text>
                <Item style={styles.txtInput} regular>
                  <Input
                    blurOnSubmit={ false }
                    multiline={true}
                    style={{
                      height: Layout.HEIGHT * 0.1,
                      marginBottom: Layout.HEIGHT * 0.015,
                    }}
                    returnKeyType={ "done" }
                    ref={ (el) => this.inputs['two'] = el }
                    onChangeText={text => { this.setState({ longDesc:text }); }}
                    maxLength={191}
                  />
                  <Text style={styles.txtcount}>{this.state.longDesc.length}/191</Text>
                </Item>
              </View>

                <View style={styles.dataFacetoFace}>
                  <Text style={styles.txtTitle}>Category</Text>
                  <View>
                    <View style={styles.categoryTxtView}>
                      <TouchableOpacity  onPress={this.onShow}  style={styles.txtCategoryInput}>
                      {this.state.selectedCateName === null
                      ? <Text regular>Select Category</Text>
                      : (
                        <Text regular>{this.state.selectedCateName}</Text>
                      )}
                      </TouchableOpacity>
                    </View>
                    <ModalFilterPicker
                      key={1}
                      visible={this.state.visible}
                      onSelect={this.onSelect}
                      onCancel={this.onCancel}
                      selectedOption={w(this, ['state', 'selectedCateId']) ? this.state.selectedCateId.toString() : ''}
                      options={this.state.allCategoryValueList}
                    />
                  </View>
                </View>

                  <View style={styles.exchangeMode}>
                    <Text style={styles.txtExch}>Exchange Mode</Text>
                    <View style={styles.saleview}>
                      <TouchableOpacity onPress={this.onPressHeadSale}>
                        <View style={styles.saleHeader}>
                          {this.state.isCollapsedSale
                          ? (
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
                          <RedioSelected width={Layout.moderateScale(30)} height={Layout.moderateScale(30)} />
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
                              <Picker
                                style={styles.dateDropDown}
                                onValueChange={(value, index, data) => { currency = value }}
                              >
                                {country.currencies.map((c, i) => {
                                  return <Picker.Item key={c.iso4217} label={c.iso4217} value={c.iso4217} />
                                })}
                              </Picker>
                            </View>
                            <View style={styles.dataFacetoFace}>
                              <Text style={styles.txtTitle}>Price</Text>
                              <Item style={styles.txtInput} regular>
                                <Input keyboardType="numeric"  onChangeText={(text) => this.setState({cost: text})} />
                              </Item>
                            </View>
                          </View>
                          <CheckBox
                            style={styles.chboxRemember}
                            onClick={() => this.setState({ counterOffer: !this.state.counterOffer })}
                            isChecked={this.state.counterOffer}
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
                              <Text style={styles.txtTitle}>Address</Text>
                              <Item style={styles.txtInput} regular>
                                <Input />
                              </Item>
                            </View>
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
                          { w(this.state, ['address', 'lat']) &&
                          <Item style={styles.txtInput} regular>
                            <Text>Latitude: {this.state.address.lat.toFixed(3)} Longitude: {this.state.address.long.toFixed(3)}</Text>
                          </Item>
                          }
                          <Item style={styles.txtInput} regular>
                            <TextInput
                              onChangeText={(text) => {
                                this.setState({ address: { ...this.state.address, name: text} });
                              }}
                              style={{  flex:1 }}
                              placeholder="24"
                              placeTextColor={Colors.lightGray}
                            />
                          </Item>
                          <Item style={styles.txtInput} regular>
                            <TextInput
                              onChangeText={(text) => {
                                this.setState({ address: { ...this.state.address, street: text} });
                              }}
                              style={{  flex:1 }}
                              placeholder="Smith St"
                              placeTextColor={Colors.lightGray}
                            />
                          </Item>
                          <Item style={styles.txtInput} regular>
                            <TextInput
                              onChangeText={(text) => {
                                this.setState({ address: { ...this.state.address, city: text} });
                              }}
                              style={{  flex:1 }}
                              placeholder={country.name}
                              placeTextColor={Colors.lightGray}
                            />
                          </Item>
                          <Item style={styles.txtInput} regular>
                            <TextInput
                              onChangeText={(text) => {
                                this.setState({ address: { ...this.state.address, region: text} });
                              }}
                              style={{  flex:1 }}
                              placeholder="Hougang"
                              placeTextColor={Colors.lightGray}
                            />
                          </Item>
                          <View>
                            <Item style={styles.txtInput} regular>
                              <TextInput
                                onChangeText={(text) => {
                                  this.setState({ address: { ...this.state.address, postcode: text} });
                                }}
                                style={{  flex:1 }}
                                placeholder="138325"
                                placeTextColor={Colors.lightGray}
                              />
                            </Item>
                            <TouchableOpacity onPress={this._onSearchAddress}>
                              <BBBIcon name="Search" style={styles.searchicon} />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.mapFacetoFace}>
                          <MapView
                            initialRegion={defaultRegions[country.isoCode]}
                            region={this.state.region}
                            style={{ flex: 1 }}
                            onLongPress={(e) => {
                              if (e.nativeEvent) {
                                this.setState({
                                  marker: { ...this.state.marker, latlng: e.nativeEvent.coordinate, title: 'title', descrpition: 'description' }
                                , address: { ...this.state.address, lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude }
                                })
                              } else { console.log("onLongPressEvente: ", e) }}}
                            showsUserLocation
                            showsMyLocationButton
                          >
                            { this.state.marker &&
                            <MapView.Marker
                              coordinate={this.state.marker.latlng}
                              title={this.state.marker.title}
                              description={this.state.marker.description}
                            />
                            }
                          </MapView>
                        </View>
                      </View>
                    </View>

                    <View style={styles.regPost}>
                      <Text style={styles.txtfacetoFace}>Registered Post</Text>
                      <View style={styles.bottomline} />
                      <View style={styles.subFacetoFace}>
                        <View style={styles.dataFacetoFace}>
                        <Text style={styles.txtTitle}>Currency</Text>
                        <Picker
                          style={styles.dateDropDown}
                          onValueChange={(value, index, data) => { postCurrency = value }}
                        >
                          {country.currencies.map((c, i) => {
                            return <Picker.Item key={c.iso4217} label={c.iso4217} value={c.iso4217} />
                          })}
                        </Picker>
                        </View>
                        <View style={styles.dataFacetoFace}>
                          <Text style={styles.txtTitle}>Postal Cost</Text>
                          <Item style={styles.txtInput} regular>
                            <Input keyboardType="numeric" onChangeText={(text) =>{ this.setState({postCost:text}) } }/>
                          </Item>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ padding: Layout.HEIGHT * 0.1}} />
            </ScrollView>

            <ProgressDialog
              visible={this.state.progressVisible}
              message={this.state.progressMsg}
              activityIndicatorColor='blue'
            />

           <Dialog
             visible={this.state.showDialog}
             title={this.state.dialogTitle}
             onTouchOutside={() => this.setState({showDialog:false})}
             contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
             animationType="fade"
           >
             <Text style={{ marginBottom: 10,	color: 'black' }}>{this.state.errorMsg}</Text>
             <TouchableOpacity
               style={{
                 marginRight:40,
                 marginLeft:40,
                 marginTop:10,
                 paddingTop:10,
                 paddingBottom:10,
                 backgroundColor:'#00A6A4',
                 borderRadius:10,
                 borderWidth: 1,
                 borderColor: '#fff'
               }}
               onPress={() => this.setState({showDialog:false})}
               underlayColor='#fff'
             >
               <Text style={{
                 color:'#fff',
                 textAlign:'center',
                 paddingLeft : 10,
                 paddingRight : 10
               }}>Ok</Text>
             </TouchableOpacity>
           </Dialog>
          </View>
        )}}</GetCachedCountry>
      )}</LoginStatus>
    )
  }
  onShow = () => {
    this.setState({ visible: true });
  }
  onShowTemplate = () => {
    if(this.state.searchTemplateValueList.length==0){
        this.toast.show("Please Select Category", DURATION.LENGTH_LONG);
        return;
    }
    this.setState({ templateVisible: true,visible:false });
  }
  onShowTags = () => {
    if(this.state.allTagList.length==0){
        this.toast.show("Please Select Template", DURATION.LENGTH_LONG);
        return;
    }
    this.setState({ templateVisible: false,visible:false,tagVisible:true });
  }

  onSelect = (picked) => {
    for(var i=0;i<this.state.allCategoryValueList.length;i++){
      if(this.state.allCategoryValueList[i].key==picked){
        this.setState({
          selectedCateName: this.state.allCategoryValueList[i].label,
          selectedCateId: picked,
          category:picked,
          selectedTemplateId:null,
          selectedTemplateName:null,
          visible: false
        })
        break;
      }
    }
    this.setState({
      visible: false
    })
    this._getTemplates();
  }

  onSelectTemplate = (picked) => {
    for(var i=0;i<this.state.searchTemplateValueList.length;i++){
      if(this.state.searchTemplateValueList[i].key==picked){
        var tagList=this.state.searchTemplateList[i].tags;
        var tmpList=[];
        for(var k=0;k<tagList.length;k++){
          tmpList.push({label:tagList[k].name,key:tagList[k].id});
        }
        this.setState({
          allTagList:tmpList,
          selectedTemplateName: this.state.searchTemplateValueList[i].label,
          selectedTemplateId: picked,
          templateVisible: false,
        });
        break;
      }
    }
  }
  onSelectTag = (picked) => {
    for(var i=0;i<this.state.allTagList.length;i++){
      if(this.state.allTagList[i].key==picked){
        this.setState({
          textd:picked,
          selectedTagName: this.state.allTagList[i].label,
          selectedTagId: picked,
          tagVisible: false
        });
      setTimeout(() => {
        this.onPressAddTag();
          },150);
        break;
      }
    }
    this.setState({
      tagVisible: false
      })
  }
  onCancel = () => {
    this.setState({
      visible: false,
      templateVisible:false,
      tagVisible:false,
    });
  }
}

/*
              <View style={styles.categoty}>
                <View style={styles.dataFacetoFace}>
                  <Text style={styles.txtTitles}>Templates</Text>
                  <View>
                    <View style={styles.categoryTxtView}>
                      <TouchableOpacity  onPress={this.onShowTemplate}   style={styles.selectionInput}>
                      {this.state.selectedTemplateName === null ?   <Text regular>Select Template</Text> : (
                        <Text regular>{this.state.selectedTemplateName}</Text>
                      )}
                      </TouchableOpacity>
                    </View>
                    {this.state.searchTemplateValueList.length === 0 ? null : (
                    <ModalFilterPicker
                      key={2}
                      visible={this.state.templateVisible}
                      onSelect={this.onSelectTemplate}
                      onCancel={this.onCancel}
                      selectedOption={this.state.selectedTemplateName}
                      options={this.state.searchTemplateValueList}
                    />
                    )}
                  </View>
                <View>
              </View>

              <Text style={styles.txtTitles}>Tags</Text>
              <View style={styles.categoryTxtView}>
                <TouchableOpacity  onPress={this.onShowTags}  style={styles.selectionInput}>
                  <Text regular>Select Tag</Text>
                </TouchableOpacity>
              </View>

              {this.state.allTagList.length === 0 ? null : (
              <ModalFilterPicker
                key={3}
                visible={this.state.tagVisible}
                onSelect={this.onSelectTag}
                onCancel={this.onCancel}
                options={this.state.allTagList}
              />
              )}
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
*/

/*
                        <Dropdown
                          data={country.currencies.map( currency => { value: currency.iso4217 } )}
                          labelHeight={0}
                          dropdownPosition={0}
                          baseColor="rgba(0, 0, 0, .00)"
                          containerStyle={styles.dateDropDown}
                          onChangeText={(value, index, data) =>{ this.setState({postCurrency:value}) } }
                        />
*/
