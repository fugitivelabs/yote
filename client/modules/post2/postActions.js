import fetch from 'isomorphic-fetch'

//post actions
export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS'
export function requestAllPosts() {
  return {
    type: REQUEST_ALL_POSTS
  }
}
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export function receiveAllPosts(json) {
  return {
    type: RECEIVE_ALL_POSTS
    , posts: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

//post api actions
export function fetchAllPosts() {
  return function(dispatch) {
    dispatch(requestAllPosts())

    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAllPosts(json))
        //error handling here too?
      )
  }
}
