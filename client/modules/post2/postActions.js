import fetch from 'isomorphic-fetch'
//POST ACTIONS
//list
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
//single
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export function requestSinglePost(id) {
  return {
    type: REQUEST_SINGLE_POST
    , id: id
  }
}
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export function receiveSinglePost(id, json) {
  return {
    type: RECEIVE_SINGLE_POST
    , id: id
    , post: json.post
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
export function fetchSinglePost(id) {
  console.log("id: " + id);
  return function(dispatch) {
    dispatch(requestSinglePost())
    return fetch('/api/posts/' + id)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveSinglePost(id, json))
      )
  }
}
