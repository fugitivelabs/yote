/*****

CREATE ACTIONS GO HERE

i.e. non-CRUD actions like toggling tabs or filters

*****/


import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';


export const REQUEST_UPDATE_ITEM = "REQUEST_UPDATE_ITEM";
function requestUpdateItem(item) {
  return {
    type: REQUEST_UPDATE_ITEM
    , item
  }
}

export const RECEIVE_UPDATE_ITEM = "RECEIVE_UPDATE_ITEM";
function receiveUpdateItem(json) {
  return {
    type: RECEIVE_UPDATE_ITEM
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export const UPDATE_NEWS_ITEM_ERROR = "UPDATE_NEWS_ITEM_ERROR";
function errorWithUpdate(json) {
  return {
    type: UPDATE_NEWS_ITEM_ERROR
    , error: json.message
  }
}


export function sendUpdateItem(data) {
  return dispatch => {
    dispatch(requestUpdateItem(data))
    return fetch(`/api/posts/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdateItem(json)))
    .then((json) => {
      console.log("check redirect");
      console.log(json);
      if(json.success) {
        dispatch(routeActions.push(`/news/${json.item.slug}`))
      } else {
        dispatch(errorWithUpdate(json))
      }
    })
  }
}
