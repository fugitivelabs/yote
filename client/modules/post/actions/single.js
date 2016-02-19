/*****

SINGLE POST CRUD ACTIONS GO HERE
getById, getByIdAndPopulate, getBySlug example (for posts), create, update

*****/


import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'


export const REQUEST_SINGLE_POST = "REQUEST_SINGLE_POST";
function requestSinglePost(id) {
  return {
    type: REQUEST_SINGLE_POST
    , id

  }
}

export const RECEIVE_SINGLE_POST = "RECEIVE_SINGLE_POST";
function receiveSinglePost(json) {
  console.log("received", json.post._id);
  return {
    type: RECEIVE_SINGLE_POST
    , id: json.post._id
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePostById(postId) {
  return dispatch => {
    dispatch(requestSinglePost(postId))
    return fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSinglePost(json)))
  }
}

/***************

POPULATE POINTERS FROM SERVER

***************/

export const REQUEST_AND_POPULATE_SINGLE_POST = "REQUEST_AND_POPULATE_SINGLE_POST";
function requestAndPopulateSinglePost(id) {
  return {
    type: REQUEST_AND_POPULATE_SINGLE_POST
    , id
  }
}

export const RECEIVE_POPULATED_SINGLE_POST = "RECEIVE_POPULATED_SINGLE_POST";
function receivePopulatedSinglePost(json) {
  console.log("received", json.post._id);
  return {
    type: RECEIVE_POPULATED_SINGLE_POST
    , id: json.post._id
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function fetchAndPopulateSinglePostById(postId) {
  return dispatch => {
    dispatch(requestAndPopulateSinglePost(postId))
    return fetch(`/api/posts/${postId}/populate`)
      .then(response => response.json())
      .then(json => dispatch(receivePopulatedSinglePost(json)))
  }
}


/***************

GET BY SLUG EXAMPLE

***************/

export const REQUEST_SINGLE_POST_BY_SLUG = "REQUEST_SINGLE_POST_BY_SLUG";
function requestSinglePostBySlug(slug) {
  return {
    type: REQUEST_SINGLE_POST_BY_SLUG
    , slug
  }
}

export const RECEIVE_SINGLE_POST_BY_SLUG = "RECEIVE_SINGLE_POST_BY_SLUG";
function receiveSinglePostBySlug(json) {
  console.log("received", json.post._id);
  return {
    type: RECEIVE_SINGLE_POST_BY_SLUG
    , id: json.post._id
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePostBySlug(slug) {
  return dispatch => {
    dispatch(requestSinglePostBySlug(slug))
    return fetch(`/api/posts/bySlug/${slug}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSinglePostBySlug(json)))
  }
}



/***************

CREATE ACTIONS

***************/

export const REQUEST_SETUP_NEW_POST = "REQUEST_SETUP_NEW_POST";
function requestSetupNewPost() {
  return {
    type: REQUEST_SETUP_NEW_POST
  }
}

export const SETUP_NEW_POST = "SETUP_NEW_POST";
export function setupNewPost() {
  return {
    type: SETUP_NEW_POST
  }
  // return dispatch => {
  //   dispatch(requestSetupNewPost())
  //   return {
  //     type: SETUP_NEW_POST
  //   }
  // }
}

export const REQUEST_CREATE_POST = "REQUEST_CREATE_POST";
function requestCreatePost(post) {
  return {
    type: REQUEST_CREATE_POST
    , post
  }
}


export const RECEIVE_CREATE_POST = "RECEIVE_CREATE_POST";
function receiveCreatePost(json) {
  return {
    type: RECEIVE_CREATE_POST
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function sendCreatePost(data) {
  return dispatch => {
    dispatch(requestCreatePost(data))
    return fetch('/api/posts', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreatePost(json)))
    .then((json) => {
      console.log("chck rediredt");
      console.log(json);
      if(json.success) {
        //redirect to slug route
        dispatch(routeActions.push(`/posts/${json.post.slug}`))
        // //redirect to byId route
        // dispatch(routeActions.push(`/news/byId/${json.post._id}`))
      }
    })
  }
}


/***************

UPDATE ACTIONS

***************/


export const REQUEST_UPDATE_POST = "REQUEST_UPDATE_POST";
function requestUpdatePost(post) {
  return {
    type: REQUEST_UPDATE_POST
    , post
  }
}

export const RECEIVE_UPDATE_POST = "RECEIVE_UPDATE_POST";
function receiveUpdatePost(json) {
  return {
    type: RECEIVE_UPDATE_POST
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}



export function sendUpdatePost(data) {
  return dispatch => {
    dispatch(requestUpdatePost(data))
    return fetch(`/api/posts/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdatePost(json)))
    .then((json) => {
      if(json.success) {
        //redirect to slug route
        dispatch(routeActions.push(`/posts/${json.post.slug}`))
        // //redirect to byId route
        // dispatch(routeActions.push(`/news/byId/${json.post._id}`))
      }
    })
  }
}
