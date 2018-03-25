import React from 'react';
import IdentityVerification1 from './IdentityVerification1';
import IdentityVerification2 from './IdentityVerification2';
import IdentityVerification3 from './IdentityVerification3';
import IdentityVerification4 from './IdentityVerification4';
import IdentityVerification5 from './IdentityVerification5';

export default function IdentityVerification(props) {
  switch (props.level) {
    case 5:
      return (
          <IdentityVerification5
            width={props.width}
            height={props.height}
          />
        );
    case 4:
      return (
          <IdentityVerification4
            width={props.width}
            height={props.height}
          />
        );
    case 3:
      return (
          <IdentityVerification3
            width={props.width}
            height={props.height}
          />
        );
    case 2:
      return (
          <IdentityVerification2
            width={props.width}
            height={props.height}
          />
        );
    default:
      return (
          <IdentityVerification1
            width={props.width}
            height={props.height}
          />
        );
  }
}
