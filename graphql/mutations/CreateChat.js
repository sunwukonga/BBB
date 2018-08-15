import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  CREATE_CHAT
} from '../../graphql/Mutations'
import { optimisticCreateChat } from '../../graphql/mutations/Optimistic.js'

export default CreateChat = graphql(CREATE_CHAT) (
  class extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      let {item, currentUser } = this.props
      let optimisticResponse = optimisticCreateChat( item, currentUser )

      return this.props.children( () => this.props.mutate({
          variables: { listingId: item.id }
        , optimisticResponse: optimisticResponse
        })
      )
    }
  }
)
