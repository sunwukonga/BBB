import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  CREATE_CHAT
} from '../../graphql/Mutations'

export default CreateChat = graphql(CREATE_CHAT) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return this.props.children( this.props.mutate )
    }
  }
)
