import React, {Component} from 'react';
import { create } from 'apisauce';
import { graphql } from 'react-apollo'
//import getSignedUrl from './SignedUrl';
import {
  GET_S3_SIGNED_URL
} from '../../graphql/Mutations'

export default SelectAndUploadImage = graphql(GET_S3_SIGNED_URL) (
  class extends Component {
    constructor(props) {
      super(props)
      this.id = -1
      this.key = ''
    }

    render() {
      console.log("selectAndUploadImage")
      return this.props.children( () =>
        this._pickImage()
        .then( () => {
          return {
            imageId: this.id
          , imageKey: this.key
          , deleted: false
          , primary: false
          }
        })
      )
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

        // https://docs.expo.io/versions/v26.0.0/sdk/imagemanipulator
        return await this._uploadImageAsync(compressed.uri,compressed.base64);
      }
      return null
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

    // Copied from: https://github.com/expo/image-upload-example/blob/master/frontend/App.js
    _uploadImageAsync = async (uri,base64) => {
      const api = create({
        // TODO: replace with external const Urls.baseURL ??
        baseURL: 'https://bbb-app-images.s3.amazonaws.com',
      })

      return this.props.mutate({
        variables: { imageType: 'image/jpeg' },
      })
      .then( ({ data }) => {
        console.log("Data Signed Url: ", data);
        this.key = data.getSignedUrl.key
        this.id = data.getSignedUrl.id

        const formData = new FormData();
        formData.append('key', data.getSignedUrl.key);
        formData.append('bucket', data.getSignedUrl.bucket);
        formData.append('Policy', data.getSignedUrl.policy);
        formData.append('X-Amz-Algorithm', data.getSignedUrl.X_Amz_Algorithm);
        formData.append('X-Amz-Credential', data.getSignedUrl.X_Amz_Credential);
        formData.append('X-Amz-Date', data.getSignedUrl.X_Amz_Date);
        formData.append('X-Amz-Signature', data.getSignedUrl.X_Amz_Signature);
        formData.append('file', {uri: uri, type: 'multipart/form-data'} );
        return api.post('', formData, {
          onUploadProgress: (e) => {
            const progress = e.loaded / e.total;
            console.log("Progress: ", progress)
          }
        })
      })
    }
  }
)
