import { withApollo, mutation } from 'react-apollo';
import gql from "graphql-tag";
import { Component } from 'react';
import client from '../../config/Client';

const GET_S3_SIGNEDURL = gql`
  mutation getSignedUrl($imageType: String!) {
    getSignedUrl(imageType: $imageType) {
      id,
      key,
      bucket,
      X_Amz_Date,
      X_Amz_Algorithm,
      X_Amz_Signature,
      X_Amz_Credential,
      policy
    }
  }
`;

function getSignedUrl( filetype ) {
  return client.mutate({
    variables: { imageType: filetype },
    mutation: GET_S3_SIGNEDURL,
  });
}
export default getSignedUrl;
/*
class SignedUrl extends Component {

  getSignedUrl( filetype ) {

    const GET_S3_SIGNEDURL = gql`
      mutation getSignedUrl($type: String!) {
        getSignedUrl(imageType: $type)
      }
    `;

    console.log(filetype);
    return this.props.client.mutate({
      variables: { type: filetype },
      mutation: GET_S3_SIGNEDURL,
    });
  }
}

//  .then(result => { console.log(result) })
//  .catch(error => { console.log(error) });

export default withApollo(SignedUrl);
*/
