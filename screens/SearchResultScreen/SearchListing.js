import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const SEARCH_LIST = gql`
query searchListing($terms:[String],$limit:Int,$page:Int,$filter:Filters!){
  searchListings(terms:$terms,limit:$limit,page:$page,filters:$filter){
    id
    title
    description
    secondaryImages {
      id
      imageKey
    }
    primaryImage {
      id
      imageKey
    }
    saleMode {
      price
      counterOffer
      currency {
        symbolPrepend
        disabled
        currencySymbol
        currencyName
      }
      mode
     exchangeModes {
       price
       currency {
         symbolPrepend
         disabled
       }
       mode
     }
    }
    template {
      id
      title
      description
      primaryImage {
        id
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags {
        id
        name
      }
    }
    categoryId
    tags {
      id
    }
    liked
    likes
    chatId
    user {
      id
      firstName
      lastName
      profileName
      profileImage {
        id
        imageKey
      }
      sellerRatingCount
      sellerRating
      idVerification
      online
      country {
        isoCode
        name
        tld
      }

    }
    viewers

  }
}`;


function getSearchProductList(_variables) {
  return client.query({variables:_variables,query: SEARCH_LIST});
}
export default getSearchProductList;
