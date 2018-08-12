
//iw(2wr,a ['2wr'a, '2wi'])
//iw(2wr,a ['2wr'a, '2wr'a, '2wi'])
//iw(2wr,a ['2wr'a, '2wr'a, '2wr'a, '2wi'])
function optimisticCreateChat(listing, user) {

  // Utility function to safely get nested property of Object.
  let w = ( root, nested ) => {
    if (!root) return null
    return nested.reduce( (acc, cur) => {
      if (!acc) return null
      if (acc[cur]) return acc[cur]
      else return null
    }, root)
  }

  return {
    __typename: "Mutation",
    createChat: {
      __typename: "Chat",
      chatMessages: [],
      initUser: {
        __typename: "User",
        profileImage: {
          __typename: "Image",
          imageKey: w(user, ['imageKey']),
          imageURL: w(user, ['imageURL']),
        },
        profileName: w(user, ['profileName']),
      },
      listing: {
        __typename: "Listing",
        description: w(listing, ['description']),
        primaryImage: {
          __typename: "Image",
          imageKey: w(listing, ['primaryImage', 'imageKey']),
        },
        template: {
          __typename: "Template",
          description: w(listing, ['template', 'description']),
          primaryImage: {
            __typename: "Image",
            imageKey: w(listing, ['template', 'primaryImage', 'imageKey']),
          },
          title: w(listing, ['template', 'title']),
        },
        title: w(listing, ['title']),
        user: {
          __typename: "User",
          profileImage: {
            __typename: "Image",
            imageKey: w(listing, ['user', 'profileImage', 'imageKey']),
            imageURL: w(listing, ['user', 'profileImage', 'imageURL']),
          },
          profileName: w(listing, ['user', 'profileName']),
        }
      },
      userId: w(user, ['id']),
    }
  }
}

export {
  optimisticCreateChat
}
