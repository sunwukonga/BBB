import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_MOST_VISITED_LIST = gql`
query getMostVisitedListings($countryCode:String!,$limit:Int,$page:Int){
  getMostVisitedListings(countryCode:$countryCode,limit:$limit,page:$page){

    id
    title
    description
    primaryImage {
      id
      imageURL
    }
    secondaryImages {
      id
      imageURL
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
      }
      secondaryImages {
        id
      }
      tags{
        name
      }
    }
    category {
      id
      name
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


function getMostVisitedList(_variables) {

  return client.query({
    variables:_variables,
    query: GET_MOST_VISITED_LIST,

  });
}

export default getMostVisitedList;
