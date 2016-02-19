/*****

LIST ACTIONS GO HERE

*****/

import fetch from 'isomorphic-fetch'


export const REQUEST_POST_LIST = "REQUEST_POST_LIST"
export const RECEIVE_POST_LIST = "RECEIVE_POST_LIST"




function requestNews() {
  console.log('requesting news')
  return {
    type: REQUEST_POST_LIST
  }
}

function receiveNews(json) {
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
    console.log("debug")
    dispatch(requestNews())
    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveNews(json))
      )
  }
}
