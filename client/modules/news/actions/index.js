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

// function shouldFetchList(state) {
//   const news = state.news;
//   if(!state.news) {
//     return true;
//   }
//   if(state.news.isFetching) {
//     return false;
//   }
//   return false;
// }

// export function fetchListIfNeeded() {
//   console.log("checking weather to fetch list");
//   return dispatch(fetchList());
//   // return (dispatch, getState) => {
//     // if(shouldFetchList(getState()) ) {
//     //   console.log(getState());
//     // }
//   // }
// }


//post actions
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

//post api actions
export function fetchAllPosts() {
  return function(dispatch) {
    console.log("getting all posts")
    dispatch(requestAllPosts())

    return fetch('/api/posts')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveAllPosts(json))
        //error handling here too?
      )
  }
}
