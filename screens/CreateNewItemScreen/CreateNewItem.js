import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';


const ADD_NEW_ITEM = gql`
  mutation createListing($mode: String!, $images: [UploadedImage], $currency: String!, $cost: Float, $counterOffer: Boolean,$countryCode:String!, $barterTemplates: [[TemplateQty]], $address: Address, $post: Postage, $title: String, $description: String, $category: String, $template: String, $tags: [String]) {
  createListing(mode: $mode, images: $images, currency: $currency, cost: $cost, counterOffer: $counterOffer,countryCode:$countryCode, barterTemplates: $barterTemplates, address: $address, post: $post, title: $title, description: $description, category: $category, template: $template, tags: $tags) {
    id
    title
    description
    tags {
      name
    }
    primaryImage {
      imageURL
    }
    secondaryImages {
      imageURL
    }
    saleMode {
      mode
      price
      currency {
        currencyName
      }
      exchangeModes {
        mode
      }
      barterOptions {
        template {
          title
        }
        quantity
        tags {
          name
        }
      }
    }
    template {
      title
      description
      primaryImage {
        imageURL
      }
      secondaryImages {
        imageURL
      }
      tags {
        name
      }
    }
  
    user {
      id
    }
  }
}`;
// address {"lat":7,"lineOne":"328 Hougang Ave 5","lineTwo":"#03-206","directions":"Meet at the playground.","postcode":"530328"}
function createNewItemUrl(_variables) {

  return client.mutate({
    variables:_variables,
    mutation: ADD_NEW_ITEM,
  });
}
export default createNewItemUrl;
