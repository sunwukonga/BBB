
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

function w( root, nested ) {
  if (!root) return null
  return nested.reduce( (acc, cur) => {
    if (!acc) return null
    if (acc[cur]) return acc[cur]
    else return null
  }, root)
}

getElementByKey = (o, key) => {
  var path = []
  if (findByKey(o, key, path)) {
  	return w(o, path)
  } else return null
}
findByKey = ( o, key, path ) => {
  return Object.keys(w(o, path)).some( (e, i, arr) => {
    path.push(e)
    if (e !== key) {
      if (w(o, path) && typeof w(o, path) === 'object') {
        if (!Array.isArray(w(o, path))) {
          let result = findByKey(o, key, path)
          if (!result) {
            path.pop()
          }
          return result
        } else {
          // find objects in array and search them.
          let arrayResult = w(o, path).some( (e, i, a) => {
            path.push(i)
            if (typeof e === 'object') {
              if (!Array.isArray(e)) {
                let result = findByKey(o, key, path)
                if (!result) {
                  path.pop()
                }
                return result
              } else {
                // Don't bother checking nested arrays.
                path.pop()
                return false
              }
            } else {
              path.pop()
              return false
            }

          })
          if (!arrayResult) {
           	path.pop()
          }
          return arrayResult
        }
      }
      path.pop()
      return false
    } else {
      return true
    } 
  })
}

function getMethods(obj) {
  var result = []
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
      result.push(id)
      }
    } catch (err) {
      result.push(id + ": inaccessible")
    }
  }
  return result
}

export {
  updateChatMessages
, w
, getMethods
, getElementByKey
}
