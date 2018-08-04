import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_PRODUCT_DETAILS = gql`
query getListing($id:Int!){
  getListing(id:$id){

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
       mode
       currency {
         symbolPrepend
         disabled
         currencyName
         currencySymbol
       }
       location {
         lineOne
         lineTwo
         postcode
         long
         lat
         directions
       }
     }
    }
    template {
      id
      title
      description
      primaryImage {
        id
      }
      secondaryImages {
        id
      }
      tags{
        name
      }
    }

    tags{
      name
      id
    }

    viewers
    likes
    liked
    categoryId
    chatId
    category {
      id
      name

    }
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


function getProductDetails(_variables) {
  return client.query({variables:_variables,query: GET_PRODUCT_DETAILS});
}
export default getProductDetails;
