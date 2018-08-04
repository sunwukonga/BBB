import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_QUICK_MOST_RECENT_LIST = gql`
query getMostRecentLists($countryCode:String!,$limit:Int,$page:Int){
  getMostRecentListings(countryCode:$countryCode,limit:$limit,page:$page){

    id
    title
    description
    primaryImage {
      imageKey
    }
    saleMode {
      price
      currency {
        currencySymbol
      }
    }
    likes
    liked
    chatId
    user {
      id
      profileName
      profileImage {
        imageURL
        imageKey
      }
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`;


function getQuickMostRecentList(_variables) {

  return client.query({
    variables:_variables,
    query: GET_QUICK_MOST_RECENT_LIST,

  });
}

export default getQuickMostRecentList;
