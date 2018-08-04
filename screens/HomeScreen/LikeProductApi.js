import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const LIKE_PRODUCT = gql`
mutation likeListing($listingId:Int!,$like:Boolean){

  likeListing(listingId:$listingId,like:$like)

}`;


function likeProductApi(_variables) {
  return client.mutate({
    variables:_variables,
    mutation: LIKE_PRODUCT,
  });
}
export default likeProductApi;
