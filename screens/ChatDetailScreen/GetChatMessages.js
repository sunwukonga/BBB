import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_CHAT_MESSAGES_LIST = gql`
query getChatMessages($chatIndexes:[ChatIndex]){
  getChatMessages(chatIndexes:$chatIndexes){
    id
    listing {
      id
    }
    initUserAddress
    recUserAddress
    initUser {
      id
      online
      firstName
      profileName
      lastName
    },
    recUser {
      id
      online
      firstName
      profileName
      lastName

    }
    chatMessages{
      id
      message
      image {
        id
        imageURL
      }
      authorId
    }
  }
}`;


function getChatMessages(chatId) {
  
  return client.query({
    variables:chatId,
    query: GET_CHAT_MESSAGES_LIST,

  });
}

export default getChatMessages;
