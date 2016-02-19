/*****

POPULATED POST ACTIONS GO HERE
getByIdAndPopulate

*****/


import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'


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

export const REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG = "REQUEST_SINGLE_POST_BY_SLUG";
function requestAndPopulateSinglePostBySlug(slug) {
  return {
    type: REQUEST_AND_POPULATE_SINGLE_POST_BY_SLUG
    , slug
  }
}

export const RECEIVE_POPULATED_SINGLE_POST_BY_SLUG = "RECEIVE_SINGLE_POST_BY_SLUG";
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
