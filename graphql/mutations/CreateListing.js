import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  CREATE_LISTING
} from '../../graphql/Mutations'

export default CreateListing = graphql(CREATE_LISTING) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return this.props.children( this.props.mutate )
    }
  }
)
