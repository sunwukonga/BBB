import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_TEMPLATE_LIST = gql`
query searchTemplates($terms: [String],$limit: Int,$page: Int,$categoryId: [Int]!) {

  searchTemplates(terms:$terms,categoryIds:$categoryId,limit:$limit,page:$page) {
    id
    title
    description
    primaryImage {
      id
      imageKey
      imageURL
    }
    secondaryImages {
      id
      imageKey
      imageURL
    }
    tags {
      id
      name
    }
  }

}
`;


function getTemplateList(_arg) {
  return client.query({variables:_arg,query: GET_TEMPLATE_LIST});
}

export default getTemplateList;
