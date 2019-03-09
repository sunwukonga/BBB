import {
  AsyncStorage
} from 'react-native'

function i18nTransformCategories(rawData, loginStatus, translations) {
  let data = []
  Object.keys(rawData).forEach( (key, index) => {
    data.push({
      id: rawData[key].id
    , name: i18n(translations, rawData[key].locus.parentName, rawData[key].locus.name, loginStatus.iso639_2, rawData[key].name)
    , data: rawData[key].children.map( child => ({
        id: child.id
      , childName: i18n(translations, child.locus.parentName, child.locus.name, loginStatus.iso639_2, child.name)
      }))
    })
  })
  return data
}

function i18n(translations, parentName, name, iso639_2, inSituDefault = "No default content defined") {
  let locus = null
  let content = null
  let translation = inSituDefault
  if (findLocus(translations.children) !== undefined) {
    let loci = locus.content.filter( content => {
      if (content.translations.find( translationObject => translationObject.iso639_2 == iso639_2) !== undefined) {
        return true
      } else return false
    })
    if (loci.length > 1) {
      // Multiple appropriate translations found, with one specific to selected country
      content = loci.find( content => content.countryCode != null )
    } else {
      // Possible single generic translation (non-country specific)
      content = loci.find( content => content.countryCode == null )
    }
    if (content) {
      // Got a translation
      translation = content.translations.find( translationObject => translationObject.iso639_2 == iso639_2).text
    } else {
      // No appropriate translation.
      if (locus.content.length > 1) {
        // Country specific generic content
        content = locus.content.find( content => content.countryCode != null )
      } else {
        // Non-country specific generic content
        content = locus.content.find( content => content.countryCode == null )
      }
      if (content) {
        translation = content.meaning
      } else {
        console.log("i18n: [", parentName, "][", name, "] content not defined")
      }
    }
  } else console.log("i18n: [", parentName, "][", name, "] locus not found")

  return translation

  function findLocus(children) {
    return children.find( placeholder => {
      if (placeholder.name == name && placeholder.parentName == parentName) {
        locus = placeholder
        return true
      } else if (placeholder.children !== undefined) {
        if (findLocus(placeholder.children) === undefined) {
          return false
        } else return true
      }
      return false
    })
  }
}

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

function getElementByKey(o, key) {
  var path = []
  if (findByKey(o, key, path)) {
    return w(o, path)
  } else return null
}

function findByKey( o, key, path ) {
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

async function fetchLastReadMessages() {
  try {
    let item = await AsyncStorage.getItem('lastReadMessages')
    if (item !== null) {
      let parsedItem = JSON.parse(item)
      //console.log("Item: ", item)
      //console.log("Stringify state: ", JSON.stringify(this.state.lastReadMessageIds))
      if (JSON.stringify(this.state.lastReadMessageIds) !== item) {
        //console.log("Stored value different")
        this.setState({
          lastReadMessageIds: parsedItem
        , toggle: !this.state.toggle
        })
        //console.log("State: ", this.state.lastReadMessageIds)
      }// else console.log("Stored value NOT different")
    }
  } catch (error) {
    //console.log("Nothing inside lastReadMessages: ", error)
  }
}

export {
  updateChatMessages
, w
, i18n
, i18nTransformCategories
, getMethods
, getElementByKey
, fetchLastReadMessages
}
