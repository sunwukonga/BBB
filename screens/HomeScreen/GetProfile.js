//import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_PROFILE = gql`
query getProfile @client {
  myProfile {
    id
    profileName
    profileImageURL
  }
}`;

function getProfile() {

  return client.query({
    query: GET_PROFILE,
  });
}

export default getProfile;
