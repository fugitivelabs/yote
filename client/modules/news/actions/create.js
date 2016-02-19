/*****

CREATE ACTIONS GO HERE

i.e. non-CRUD actions like toggling tabs or filters

*****/


import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';


export const REQUEST_SETUP_NEW_POST = "REQUEST_SETUP_NEW_POST";
function requestSetupPost() {
  return {
    type: REQUEST_SETUP_NEW_POST
  }
}

export const SETUP_NEW_POST = "SETUP_NEW_POST";
export function setupNewPost() {
  return dispatch => {
    dispatch(requestSetupPost())
    return {
      type: SETUP_NEW_POST
    }
  }
}

export const REQUEST_CREATE_ITEM = "REQUEST_CREATE_ITEM";
function requestCreateItem(item) {
  return {
    type: REQUEST_CREATE_ITEM
    , item
  }
}


export const RECEIVE_CREATE_ITEM = "RECEIVE_CREATE_ITEM";
function receiveCreateItem(json) {
  return {
    type: RECEIVE_CREATE_ITEM
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export const CREATE_NEWS_ITEM_ERROR = "CREATE_NEWS_ITEM_ERROR";
function errorWithCreate(json) {
  return {
    type: CREATE_NEWS_ITEM_ERROR
    , error: json.message
  }
}

export function sendCreateItem(data) {
  console.log("sendCreatePost");
  console.log(data);
  return dispatch => {
    dispatch(requestCreateItem(data))
    return fetch('/api/posts', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreateItem(json)))
    .then((json) => {
      console.log("check redirect");
      console.log(json);
      if(json.success) {
        dispatch(routeActions.push(`/news/${json.item.slug}`))
      } else {
        dispatch(errorWithCreate(json))
      }
    })
  }
}
