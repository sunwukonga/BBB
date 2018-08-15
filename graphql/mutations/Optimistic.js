
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
      id: -1,
      userId: w(user, ['id']),
      chatMessages: [],
      initUser: {
        __typename: "User",
        id: w(user, ['id']),
        firstName: w(user, ['firstName']),
        lastName: w(user, ['lastName']),
        profileName: w(user, ['profileName']),
        profileImage: {
          __typename: "Image",
          id: w(user, ['profileImage', 'id']),
          imageKey: w(user, ['profileImage', 'imageKey']),
          imageURL: w(user, ['profileImage', 'imageURL']),
        },
        sellerRating: w(user, ['sellerRating']),
        sellerRatingCount: w(user, ['sellerRatingCount']),
        online: w(user, ['online']),
        idVerification: w(user, ['idVerification']),
      },
      listing: {
        __typename: "Listing",
        id: w(listing, ['id']),
        title: w(listing, ['title']),
        description: w(listing, ['description']),
        category: {
          __typename: "Category",
          id: w(listing, ['category', 'id']),
          name: w(listing, ['category', 'name']),
        },
        primaryImage: {
          __typename: "Image",
          id: w(listing, ['primaryImage', 'id']),
          imageKey: w(listing, ['primaryImage', 'imageKey']),
        },
        saleMode: {
          __typename: "SaleMode",
          id: w(listing, ['saleMode', 'id']),
          price: w(listing, ['saleMode', 'price']),
          counterOffer: w(listing, ['saleMode', 'counterOffer']),
          currency: {
            __typename: "Currency",
            id: w(listing, ['currency', 'iso4217']),
            iso4217: w(listing, ['currency', 'iso4217']),
            currencyName: w(listing, ['currency', 'currencyName']),
            currencySymbol: w(listing, ['currency', 'currencySymbol']),
          },
          mode: w(listing, ['saleMode', 'mode']),
        },
        template: {
          __typename: "Template",
          id: w(listing, ['template', 'id']),
          title: w(listing, ['template', 'title']),
          description: w(listing, ['template', 'description']),
          primaryImage: {
            __typename: "Image",
            id: w(listing, ['template', 'primaryImage', 'id']),
            imageKey: w(listing, ['template', 'primaryImage', 'imageKey']),
          },
        },
        viewers:  w(listing, ['viewers']),
        likes:  w(listing, ['likes']),
        liked:  w(listing, ['liked']),
        chatId:  w(listing, ['chatId']),
        user: {
          __typename: "User",
          id: w(listing, ['user', 'id']),
          firstName: w(listing, ['user', 'firstName']),
          lastName: w(listing, ['user', 'lastName']),
          profileName: w(listing, ['user', 'profileName']),
          profileImage: {
            __typename: "Image",
            id: w(listing, ['user', 'profileImage', 'id']),
            imageKey: w(listing, ['user', 'profileImage', 'imageKey']),
            imageURL: w(listing, ['user', 'profileImage', 'imageURL']),
          },
          sellerRating: w(listing, ['user', 'sellerRating']),
          sellerRatingCount: w(listing, ['user', 'sellerRatingCount']),
          online: w(listing, ['user', 'online']),
          idVerification: w(listing, ['user', 'idVerification']),
        }
      },
    }
  }
}

export {
  optimisticCreateChat
}
