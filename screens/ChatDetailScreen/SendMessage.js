import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const SEND_MESSAGE = gql`mutation sendChatMessage($chatId: Int!, $message: String,$image:UploadedImage,$lastMessageId:Int) {
  sendChatMessage(chatId: $chatId, message: $message,image:$image,lastMessageId:$lastMessageId) {
    id
   message
    image {
      id
    }
    authorId
  }
}

`;

function sendChatMessage( _variables ) {
  return client.mutate({
    variables: _variables,
    mutation: SEND_MESSAGE,
  });
}
export default sendChatMessage;
