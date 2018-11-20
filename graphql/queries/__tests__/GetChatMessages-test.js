import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MockStorage from '../__mocks__/MockStorage';
import { MockedProvider } from 'react-apollo/test-utils';
import { GetChatMessages } from '../GetChatMessages';
import {
  GET_CHAT_MESSAGES
} from '../../Queries'

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)

const mocks = [
  {
    request: {
      query: GET_CHAT_MESSAGES,
      variables: {
        chatIndexes: [],
      },
    },
    result: {
      data: {
        getChatMessages: [
          {
            "chatMessages": [
              {
                "authorId": 2,
                "id": 1,
                "image": null,
                "message": "Hi",
                "time": 1537424418000
              }
            ],
            "id": 1,
            "initUser": {
              "id": 2,
              "profileImage": {
                "imageKey": null
              },
              "profileName": "PaulDesmondParker"
            },
            "listing": {
              "__typename": "Listing",
              "description": "Baby Shower Portable Air Cushion Bed Infant Bath Pad Non-Slip Bathtub Mat Safety Bathing Seat Support\nFeatures:\n1. Floating particle filler is food grade products. It's American nova imported",
              "id": 13,
              "primaryImage": {
                "__typename": "Image",
                "imageKey": "534e749614740a08"
              },
              "template": null,
              "title": "Baby Shower Portable Air Cushion - Pink Elephant",
              "user": {
                "id": 5,
                "profileImage": {
                  "__typename": "Image",
                  "imageKey": "5f9be59a87af3238"
                },
                "profileName": "MusrikaYorozuya"
              }
            },
            "userId": 2
          }
        ]
      },
    },
  },
];

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GetChatMessages chatIndexes={[]} pollInterval={10000}>
    </MockedProvider>
  );
});
