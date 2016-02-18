/*****

LIST ACTIONS GO HERE

*****/

import fetch from 'isomorphic-fetch'


export const REQUEST_NEWS_LIST = "REQUEST_NEWS_LIST"
export const RECEIVE_NEWS_LIST = "RECEIVE_NEWS_LIST"




function requestNews() {
  console.log('requesting news')
  return {
    type: REQUEST_NEWS_LIST
  }
}

function receiveNews(json) {
  return {
    type: RECEIVE_NEWS_LIST
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
