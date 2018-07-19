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
  TextInput,AsyncStorage
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
import SearchBtn from '../../components/SearchBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Dropdown from '../../components/Dropdown/dropdown';
import { create } from 'apisauce';
import getSignedUrl from './SignedUrl';
import createNewItemUrl from './CreateNewItem';
import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from 'react-native-check-box';
import { Layout, Colors, Images } from '../../constants/';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';
import getCategoryList from './AllCategoryApi';
import ModalFilterPicker from 'react-native-modal-filter-picker';

//var Realm = require('realm');
// import { Dropdown } from 'react-native-material-dropdown';

import Collapsible from 'react-native-collapsible';
const dataObjectsCates = [];
const dataObjectsTags = [];
var tagsList = [];
var imageList=[];
var imgList=[];
/**
Catgeory List Details
*/
var allCategoryList = [];
var allCategoryValueList = [];
export default class CreateNewItemScreen extends React.Component {
  constructor(props) {
    super(props);

    setTimeout(() => {
          this._retrieveCountry();
      }, 250);
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

    imageList.push({ id:'addImageButton', imageId:0,url: Images.trollie,inputFlag:true });

    this.state = {
      visible: false,
     selectedCateName: null,
     selectedCateId:null,
      allCategoryList:[],
      allCategoryValueList:[],
      progressVisible:false,
      dataSource: ds.cloneWithRows(dataObjects),
      dataSourceCates: dsCates.cloneWithRows(dataObjectsCates),
      dataSourceTags: dsTags.cloneWithRows(dataObjectsTags),
      texts: '',
      isCollapsedSale: false,
      isCollapsedBarter: true,
      isCollapsedDonate: true,
      isCollapsedDnS: true,
      progressMsg:"Please Wait...",
      showDialog:false,
      errorMsg:'',
      dialogTitle:'',
      countryCode: '',
  //    _pickImage = this._pickImage

      // Data for mutation i.e. create item
      mode: SALE,

      imgList: [],
      images: imageList,
      currency: '',
      cost: 0.0,
      counterOffer: false,
      template: '',
      barterTemplates: [], // [ [{template, qty}, {template, qty}], [{template, qty}] ]
      address: { lineOne: ''
               , lineTwo: ''
               , postcode: ''
                , long:0.0
               , lat: 0.0
               , directions: ''
      },
      postCost: 0.0,
      postCurrency: '',
      shortDesc: '',
      longDesc: '',
      category: '',
      title:'',
      textd:''
      // End data for mutation
    };

    // this.saveToServer = this.saveToServer.bind(this);
  }

  _validateAllRequiredFileds(){
    imgList=[];
    for(var i=1;i<imageList.length;i++){
      imgList.push({imageId:imageList[i].imageId,
        imageKey:imageList[i].imageKey,
        primary:imageList[i].primary,deleted:imageList[i].deleted})
    }

    if(imgList.length===0){
      // this.setState({errorMsg:"Please Upload Atleast One Image",showDialog:true,dialogTitle:"Error!"})
        Toast.show("Please Upload Atleast One Image",Toast.SHORT)
      return false;
    }
    if(this.state.title.length===0){
      // this.setState({errorMsg:"Please Enter Title",showDialog:true,dialogTitle:"Error!"})
      Toast.show("Please Enter Title",Toast.SHORT)
        return false;
    }
    if(this.state.mode==="SALE"){
      if(this.state.currency.length===0){
        // this.setState({errorMsg:"Please Select Currency",showDialog:true,dialogTitle:"Error!"})
        Toast.show("Please Select Currency",Toast.SHORT)

          return false;
      }
      if(this.state.cost.length===0){
        //this.setState({errorMsg:"Please Enter Additional Cost",showDialog:true,dialogTitle:"Error!"})
        Toast.show("Please Enter Additional Cost",Toast.SHORT)
        return false;
      }
    }
    if(this.state.address.lineOne.length>=1 || this.state.address.lineTwo.length>=1 || this.state.address.postcode.length>=1){
      if(this.state.address.lineOne.length===0){
        // this.setState({errorMsg:"Please Enter Address Line 1",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Enter Address Line 1",Toast.SHORT)
        return false;
      }
      if(this.state.address.lineTwo.length===0){
        // this.setState({errorMsg:"Please Enter Address Line 2",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Enter Address Line 2",Toast.SHORT)
          return false;
      }
      if(this.state.address.postcode.length===0){
        // this.setState({errorMsg:"Please Enter Postcode",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Enter Postcode",Toast.SHORT)
          return false;
      }
    } else if(this.state.postCurrency.length>=1 || this.state.postCost.length>=1 ){

      if(this.state.postCurrency.length===0){
        // this.setState({errorMsg:"Please Select Post Currency",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Select Post Currency",Toast.SHORT)
          return false;
      }
      if(this.state.postCost.length===0){
        // this.setState({errorMsg:"Please Enter Post Cost",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Enter Post Cost",Toast.SHORT)
          return false;
      }

    } else {
        // this.setState({errorMsg:"Please Enter Address or Registered Post",showDialog:true,dialogTitle:"Error!"})
          Toast.show("Please Enter Address or Registered Post",Toast.SHORT)
        return false;
    }


    if(tagsList.length===0){
      // this.setState({errorMsg:"Please Enter Atleast One Tag",showDialog:true,dialogTitle:"Error!"})
        Toast.show("Please Enter Atleast One Tag",Toast.SHORT)
        return false;
    }
    return true;
  }


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

//"barterTemplates":[[{"templateId":"1","quantity":1,"tags":["1","2"]},{"templateId":"2","quantity":2,"tags":["1","2"]}]]
  saveToServer(){

    if(!this._validateAllRequiredFileds()){
        return;
    }

    console.log("Country Code",this.state.countryCode);
    var variables = { "mode":this.state.mode
    ,"images":imgList,
    "currency":this.state.currency,
    "cost":this.state.cost,
    "counterOffer":this.state.counterOffer,
  /*  "barterTemplates":this.state.barterTemplates,*/
    "address":this.state.address,
    "post":{"postCurrency":this.state.postCurrency,"postCost":this.state.postCost},
    "title":this.state.title,
    "description":this.state.longDesc,
    "category":this.state.category,
    "template":"1",
    "tags":tagsList,
    "countryCode":"US" /*this.state.countryCode*/
   }

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

  }

  componentDidMount(){
    this.setState({
      progressVisible: true,

    });
    getCategoryList().then((res)=>{
        Object.keys(res.data.allCategoriesFlat).forEach((key,index)=>{
              allCategoryList.push(res.data.allCategoriesFlat[key]);
              allCategoryValueList.push({label:res.data.allCategoriesFlat[key].name,key:res.data.allCategoriesFlat[key].id});
        });
        console.log("Array:" , allCategoryValueList);
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
    console.log("Checked", data.checked);
  }
  static navigationOptions = {
    header: null,
  };

  _renderRow( {item} ) {

    if (item.deleted) {
     return (
      <View style={styles.imagesSubView}>
       <View >
       <Image source={{uri: item.url}}style={styles.rowImage} />
          <TouchableOpacity style={styles.imageOverlay} onPress={()=>this.deleteImageDetails(item.imageId)}>
            <Image source={Images.imgDeleted} style={styles.imageReselect} />
          </TouchableOpacity>
       </View>
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

  _retrieveCountry = async () => {
      try {
          const value = await AsyncStorage.getItem('countryCode');
          if (value !== null) {
            // We have data!!
            console.log(value);
            this.setState({
              countryCode: value
            });
          }
       } catch (error) {
         // Error retrieving data
         console.log(error);
       }
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
      base64: true,
    })

    if ( ! pickerResult.cancelled ) {
      this.setState({
        progressVisible: true,
        progressMsg:"Validating Image..."
      });
      // https://docs.expo.io/versions/latest/sdk/filesystem#expofilesystemgetinfoasyncfileuri-options
      let fileinfo = await Expo.FileSystem.getInfoAsync(pickerResult.uri, {size: true})
      let resized
      let compressed = pickerResult
       // If filesize is below 150kb don't attempt to reduce it further.

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

      if(this._isImageExits(compressed.base64)){
        this.setState({
          progressVisible: false
        });
        Toast.show("This image already exists",Toast.SHORT)
        retrun;
      }

      // https://docs.expo.io/versions/v26.0.0/sdk/imagemanipulator
      await this._uploadImageAsync(compressed.uri,compressed.base64);
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
      console.log("Uri",pickerResult.uri);
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
    getSignedUrl( 'image/jpeg' )
      .then( ({ data }) => {
        console.log("Data Signed Url: ", data);
      //  console.log("Signed Url from server: ", getSignedUrl);
        const formData = new FormData();
        this.storeImageDetails(data.getSignedUrl.key,data.getSignedUrl.id,uri,base64);
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
         console.log("Response: ", data)
        // post your data.
        return api.post('', data, {
              onUploadProgress: (e) => {
                //console.log(e)
                const progress = e.loaded / e.total;

              }
            })
      })
      .then((res) =>{
    //     console.log("Response: ", res)

      this.setState({
        progressVisible: false,
        progressMsg:"Please Wait..."
      });
    })
  }

  storeImageDetails(imageKey,imgId,uri,base_64){
    var _id=imageList.length+1;
    var isPrimary=_id===2;
      console.log("Key",imageKey);
    imageList.push({ id: "_"+_id,imageId:imgId,url: uri,inputFlag:false,imageKey:imageKey,primary:isPrimary,deleted:false,base_64:base_64 });

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

  deleteImageDetails(imgId){

    for(var i=0;i<imageList.length;i++){
      if(imgId===imageList[i].imageId){
        if(imageList[i].deleted){
          imageList[i].deleted=false;
         console.log("Image UnDeleted",i);
        } else{
         imageList[i].deleted=true;
        console.log("Image Deleted",i);
      }
        break;
      }
    }
    this.setState({
      images:imageList
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
        Mode:"SALE",
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

    if(this.state.textd.length===0){
      // this.setState({errorMsg:"Please Enter Tag",showDialog:true,dialogTitle:"Error!"})
      Toast.show("Please Enter Tag",Toast.SHORT)
      return;
    }
    var idss = dataObjectsTags.length + 1;
    dataObjectsTags.push({ id: idss.toString(), text: this.state.textd });

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
  let tmp = dataObjectsTags;
    for (var i = 0; i < tmp.length; i++) {
      tagsList[i]=tmp[i].text;
    }

    this.setState({ dataSourceTags: ds.cloneWithRows(dataObjectsTags),textd:"" });

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
    tagsList=[];
    for (var i = 0; i < newarray.length; i++) {
      tagsList[i]=newarray[i].text;
    }
    dataObjectsTags=newarray;
  }

  handleCurreny(value){
    this.setState({currency:value})

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
        value: 'SGD',
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
    let dataCate = [ ];
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
      <Button transparent onPress={() => this.saveToServer()}>
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
                extraData={this.state}
                keyExtractor={(item, index) => item.id }
                renderItem={this._renderRow.bind(this)}
                contentContainerStyle={styles.listContents}
              />
      </View>

      <View style={styles.Descrip}>
      <Text style={styles.txtTitle}>Title</Text>
      <Item style={styles.txtInput} regular>
      <Input  onChangeText={(text) => {
          console.log("Title",text);
          this.setState({ title:text});
      }} />
      </Item>
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
        onChangeText={(value, index, data) => this.handleCurreny(value)}

      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input keyboardType="numeric"  onChangeText={(text) => this.setState({cost: text})} />
      </Item>
      </View>
      </View>
      <CheckBox
      style={styles.chboxRemember}
      onClick={() => _this.onClick(temp)}
      onValueChange={() => this.setState({ counterOffer: !this.state.counterOffer })}
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
      <Input keyboardType="numeric" />
      </Item>
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
      Address
      </Text>
      <Item style={styles.txtInput} regular>
      <Input />
      </Item>
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
        onChangeText={(value, index, data) => this.setState({postCurrency: text})}
      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input keyboardType="numeric" onChangeText={(text) => this.setState({postCost: text})}  />
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
      <Input  keyboardType="numeric"/>
      </Item>
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
      <Input  onChangeText={(text) => {
        this.setState({ address: { ...this.state.address, lineOne: text} });
      }}   />
      </Item>
      <Text style={styles.txtTitle}>Line 2</Text>
      <Item style={styles.txtInput} regular>
      <Input onChangeText={(text) => {
              this.setState({ address: { ...this.state.address, lineTwo: text} });
      }} />
      </Item>
      <Text style={styles.txtTitle}>Postcode</Text>
      <Item style={styles.txtInput} regular>
      <Input onChangeText={(text) => {
        this.setState({ address: { ...this.state.address, postcode: text} });
      }} />
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
        onChangeText={(value, index, data) =>{ this.setState({postCurrency:value}) } }
      />
      </View>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Additional Cost</Text>
      <Item style={styles.txtInput} regular>
      <Input keyboardType="numeric" onChangeText={(text) =>{ this.setState({postCost:text}) } }/>
      </Item>
      </View>
      </View>
      </View>
      </View>

      <View style={styles.Descrip}>
      <Text style={styles.txtTitle}>Short Description</Text>
      <Item style={styles.txtInput} regular>
      <Input  onChangeText={text => { this.setState({ shortDesc:text }); }} maxLength={64} />
      <Text style={styles.txtcount}>{this.state.shortDesc.length}/64</Text>
      </Item>
      <Text style={styles.txtTitle}>Long Description</Text>
      <Item style={styles.txtInput} regular>
      <Input
      multiline={true}
      style={{
        height: Layout.HEIGHT * 0.1,
          marginBottom: Layout.HEIGHT * 0.015,
      }}
      onChangeText={text => { this.setState({ longDesc:text }); }}
       maxLength={1024}
      />
      <Text style={styles.txtcount}>{this.state.longDesc.length}/1024</Text>
      </Item>
      </View>


      <View style={styles.categoty}>
      <View style={styles.dataFacetoFace}>
      <Text style={styles.txtTitle}>Category</Text>
      <View>
<View style={styles.categoryTxtView}>

      <TouchableOpacity  onPress={this.onShow}>
      {this.state.selectedCateName === null ?   <Text regular>Select Category</Text> : (
        <Text regular>{this.state.selectedCateName}</Text>
      )}

        </TouchableOpacity>
        </View>
      <ModalFilterPicker
          visible={this.state.visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={this.state.allCategoryValueList}
        />
      </View>


      <Text style={styles.txtTitles}>Templates</Text>
      <View style={styles.templateSec}>
        <Item style={styles.txtInputsmall} regular>
          <Input onChangeText={text => { this.setState({ text }); }} />
        </Item>
        <TouchableOpacity style={styles.addButton} onPress={this.onPressAdd}>
          <View style={styles.addButton}>
            <SearchBtn width={Layout.WIDTH * 0.10} height={Layout.WIDTH * 0.10} />
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
        value={this.state.textd}
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

        <ProgressDialog
            visible={this.state.progressVisible}
             message={this.state.progressMsg}
            activityIndicatorSize="large"
            activityIndicatorColor="blue"
                       />

       <Dialog
           visible={this.state.showDialog}
           title={this.state.dialogTitle}
           onTouchOutside={() => this.setState({showDialog:false})}
           contentStyle={{ justifyContent: 'center', alignItems: 'center' }}
           animationType="fade">
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
                     underlayColor='#fff'>
                     <Text style={{
                          color:'#fff',
                          textAlign:'center',
                          paddingLeft : 10,
                          paddingRight : 10
                        }}>Ok</Text>
            </TouchableOpacity>
       </Dialog>
      </View>
    );
  }
  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {

    for(var i=1;i<this.state.allCategoryValueList.length;i++){
      if(this.state.allCategoryValueList[i].key==picked){
        this.setState({
          selectedCateName: this.state.allCategoryValueList[i].label,
          selectedCateId: picked,
          category:picked,
          visible: false
        })
        break;
      }
    }
    this.setState({

      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }
}
