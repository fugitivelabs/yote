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
//create
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST'
export function requestCreatePost() {
  return {
    type: REQUEST_CREATE_POST
  }
}
export const RECEIVE_CREATE_POST = 'RECEIVE_CREATE_POST'
export function receiveCreatePost(json) {
  console.log(json);
  return {
    type: RECEIVE_CREATE_POST
    , id: json.post._id
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
  // console.log("id: " + id);
  return function(dispatch) {
    dispatch(requestSinglePost())
    return fetch('/api/posts/' + id)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveSinglePost(id, json))
      )
  }
}
export function sendCreatePost(post) {
  console.log("send create post");
  // console.log(post);
  // console.log(JSON.stringify({post: post}));
  // console.log(JSON.stringify({post: post}).length);
  return function(dispatch) {
    dispatch(requestCreatePost())
    return fetch('/api/posts', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(post)
    }).then(response => response.json())
    .then(json => dispatch(receiveCreatePost(json)))
  }
}
