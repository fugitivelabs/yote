/*****

LIST ACTIONS GO HERE

*****/

import fetch from 'isomorphic-fetch'

export const REQUEST_POST_LIST = "REQUEST_POST_LIST"
function requestPostList() {
  console.log('requesting posts list')
  return {
    type: REQUEST_POST_LIST
  }
}

export const RECEIVE_POST_LIST = "RECEIVE_POST_LIST"
function receivePostList(json) {
  return {
    type: RECEIVE_POST_LIST
    , list: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  return dispatch => {
    dispatch(requestPostList())
    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receivePostList(json))
      )
  }
}

export const REQUEST_PUBLISHED_POST_LIST = "REQUEST_PUBLISHED_POST_LIST"
function requestPublishedPostList() {
  console.log('requesting posts list')
  return {
    type: REQUEST_PUBLISHED_POST_LIST
  }
}

export const RECEIVE_PUBLISHED_POST_LIST = "RECEIVE_PUBLISHED_POST_LIST"
function receivePublishedPostList(json) {
  return {
    type: RECEIVE_PUBLISHED_POST_LIST
    , list: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchPublished() {
  return dispatch => {
    dispatch(requestPublishedPostList())
    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receivePublishedPostList(json))
      )
  }
}

export const REQUEST_FEATURED_POST_LIST = "REQUEST_FEATURED_POST_LIST"
function requestFeaturedPostList() {
  console.log('requesting featured posts list')
  return {
    type: REQUEST_FEATURED_POST_LIST
  }
}

export const RECEIVE_FEATURED_POST_LIST = "RECEIVE_FEATURED_POST_LIST"
function receiveFeaturedPostList(json) {
  return {
    type: RECEIVE_FEATURED_POST_LIST
    , list: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchFeaturedList() {
  return dispatch => {
    dispatch(requestFeaturedPostList())
    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveFeaturedPostList(json))
      )
  }
}
