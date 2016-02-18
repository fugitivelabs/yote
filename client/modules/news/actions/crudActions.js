import fetch from 'isomorphic-fetch'


export const REQUEST_NEWS = "REQUEST_NEWS"
export const RECEIVE_NEWS = "RECEIVE_NEWS"
// export const SELECT_ITEM = "SELECT_ITEM"



function requestNews() {
  console.log('requesting news')
  return {
    type: REQUEST_NEWS
  }
}

function receiveNews(json) {
  return {
    type: RECEIVE_NEWS
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
