import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const CREATE_CHAT = gql`
mutation createChat($recUserId: Int!, $listingId: Int!) {
  createChat(recUserId: $recUserId, listingId: $listingId) {
    id
    recUser {
      id
    }
    initUser {
      id
    }
    chatMessages {
      id
      message
    }
  }
}`;


function createChat(_variables) {

  return client.mutate({
    variables:_variables,
    mutation: CREATE_CHAT,
  });
}

export default createChat;
