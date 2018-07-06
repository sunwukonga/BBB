import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_COUNTRY_LIST = gql`
query {
  allCountries {
    isoCode,
    name,
    tld,  
  }
}`;


function getCountryList() {
  return client.query({query: GET_COUNTRY_LIST});
}
export default getCountryList;
