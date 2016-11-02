/*****

SINGLE POST CRUD ACTIONS GO HERE
getById, getByIdAndPopulate, getBySlug example (for posts), create, update

*****/


import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';



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

GET BY SLUG AND POPULATE EXAMPLE

***************/

export const REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG = "REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG";
function requestAndPopulateSinglePostBySlug(slug) {
  return {
    type: REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG
    , slug
  }
}

export const RECEIVE_POPULATED_SINGLE_POST_BY_SLUG = "RECEIVE_POPULATED_SINGLE_POST_BY_SLUG";
function receivePopulatedSinglePostBySlug(json) {
  console.log("received", json.post._id);
  return {
    type: RECEIVE_POPULATED_SINGLE_POST_BY_SLUG
    , id: json.post._id
    , post: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchAndPopulateSinglePostBySlug(slug) {
  return dispatch => {
    dispatch(requestAndPopulateSinglePostBySlug(slug))
    return fetch(`/api/posts/bySlug/${slug}/populate`)
      .then(response => response.json())
      .then(json => dispatch(receivePopulatedSinglePostBySlug(json)))
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
      , credentials: 'same-origin'
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreatePost(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   console.log("chck rediredt");
    //   console.log(json);
    //   if(json.success) {
    //     //redirect to slug route
    //     browserHistory.push(`/posts/${json.post.slug}`)
    //     // //redirect to byId route
    //     // browserHistory.push(`/news/byId/${json.post._id}`)
    //   }
    // })
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
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   if(json.success) {
    //     //redirect to slug route
    //     browserHistory.push(`/posts/${json.post.slug}`)
    //     // //redirect to byId route
    //     // browserHistory.push(`/news/byId/${json.post._id}`)
    //   }
    // })
  }
}



/***************

DELETE ACTIONS

***************/

export const REQUEST_DELETE_POST = "REQUEST_DELETE_POST";
function requestDeletePost(postId) {
  return {
    type: REQUEST_DELETE_POST
    , postId
  }
}

export const RECEIVE_DELETE_POST = "RECEIVE_DELETE_POST";
function receiveDeletePost(json) {
  return {
    type: RECEIVE_DELETE_POST
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeletePost(id))
    return fetch(`/api/posts/${id}`, {
      method: 'DELETE'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(json => dispatch(receiveDeletePost(json)))
    .then((json) => {
      if(json.success) {
        browserHistory.push(`/posts`)
      } else {
        alert("ERROR");
      }
    })
  }
}
