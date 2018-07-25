import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_NESTED_CATEGORY_LIST = gql`
query {
  allCategoriesNested {
    id
    name
    children {
      id
      name
    }
  }
}`;


function getNestedCategoryList() {
  return client.query({query: GET_NESTED_CATEGORY_LIST});
}

export default getNestedCategoryList;
