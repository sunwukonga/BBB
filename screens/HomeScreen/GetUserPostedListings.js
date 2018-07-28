import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_USER_POSTED_LIST = gql`
query getUserPostedListings($countryCode:String!,$limit:Int,$page:Int){
  getUserPostedListings(countryCode:$countryCode,limit:$limit,page:$page){

    id
    title
    description
    primaryImage {
      id
      imageURL
      imageKey
    }
    secondaryImages {
      id
      imageURL
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        price
      }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageURL
        imageKey
      }
      secondaryImages {
        imageURL
        imageKey
      }
      tags{
        name
      }
    }
  
    tags{
      name
    }

    viewers
    likes
    liked
    chatExists
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageURL
        imageKey
      }
      chats {
        id
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`;


function getUserPostedList(_variables) {

  return client.query({
    variables:_variables,
    query: GET_USER_POSTED_LIST,

  });
}

export default getUserPostedList;
