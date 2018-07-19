import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_CATEGORY_LIST = gql`
query {
  allCategoriesFlat {
    id
    name
  }
}`;


function getCategoryList() {
  return client.query({query: GET_CATEGORY_LIST});
}

export default getCategoryList;
