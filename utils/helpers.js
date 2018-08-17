
function updateChatMessages(oldChatList, newChatList) {
  let newChats = newChatList.filter( chat => chat.chatMessages.length > 0 )
                  .map( chat => {
                  oldChat = oldChatList.find( oldChat => chat.id == oldChat.id )
                  chat.newMessageCount = (chat.chatMessages.length + (oldChat.newMessageCount ? oldChat.newMessageCount : 0))
                  let combinedChatMessages = chat.chatMessages.concat(oldChat.chatMessages)
                                             .sort((a, b) => Math.sign(a.id - b.id))
                                             .filter( (item, index, items) => {
                                               return !index || item.id != items[index - 1].id
                                             })
                  return chat.chatMessages = combinedChatMessages
                })
}

function  w( root, nested ) {
  if (!root) return null
  return nested.reduce( (acc, cur) => {
    if (!acc) return null
    if (acc[cur]) return acc[cur]
    else return null
  }, root)
}

export {
  updateChatMessages
, w
}
