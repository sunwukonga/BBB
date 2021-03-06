import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  SET_PROFILE_IMAGE
} from '../../graphql/Mutations'
import {
  GET_LOGIN_STATUS
} from '../Queries'

import { Urls } from '../../constants/';

export const SetProfileImage = graphql(SET_PROFILE_IMAGE) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    render() {

      return this.props.children( ( imageUpload ) => {
        console.log("imageUpload: ", imageUpload)
        return this.props.mutate({
          variables: { image: imageUpload },
          update: (cache, { data: { setProfileImage } }) => {
            // ------------------- READING -------------------
            const getLoginStatus = cache.readQuery({ query: GET_LOGIN_STATUS })
            console.log("GetLoginStatus: ", getLoginStatus)
            // ------------------- MUTATING ------------------
            let copyGetLoginStatus = JSON.parse(JSON.stringify( getLoginStatus ))
            copyGetLoginStatus.myProfile.profileImageURL = Urls.s3ImagesURL + setProfileImage.imageKey
            // ------------------- WRITING -------------------
            cache.writeQuery({
              query: GET_LOGIN_STATUS
            , data: copyGetLoginStatus
            })
          }
        })
      })
    }
  }
)
