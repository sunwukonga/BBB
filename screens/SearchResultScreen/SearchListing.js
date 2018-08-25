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
    category {
      id
      name
    }
    primaryImage {
      id
      imageKey
    }
    secondaryImages {
      id
      imageKey
    }
    saleMode {
      id
      price
      counterOffer
      currency {
        iso4217
        currencyName
        currencySymbol
      }
      mode
      exchangeModes {
        id
        mode
        price
        currency {
          iso4217
          currencyName
          currencySymbol
        }
        location {
          id
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
        imageKey
      }
      secondaryImages {
        id
        imageKey
      }
      tags{
        id
        name
      }
    }
    tags{
      id
      name
    }
    viewers
    likes
    liked
    chatId
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
      sellerRating
      sellerRatingCount
      online
      idVerification
    }
  }
}`;


function getSearchProductList(_variables) {
  return client.query({
    variables: _variables
  , query: SEARCH_LIST
  , fetchPolicy: "no-cache"
  })
}
export default getSearchProductList;
