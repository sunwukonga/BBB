import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const DELETE_MESSAGE = gql`
mutation deleteChatMessage($id:Int!,$lastMessageId:Int){
  deleteChatMessage(id:$id,lastMessageId:$lastMessageId){
    id
    message
  }
}`;


function deleteMessage(_variables) {

  return client.mutate({
    variables:_variables,
    mutation: DELETE_MESSAGE,
  });
}

export default deleteMessage;
