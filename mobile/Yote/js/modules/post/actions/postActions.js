/*****
SINGLE POST CRUD ACTIONS GO HERE
getById, getBySlug example (for posts), create, update
*****/

import env from '../../../env';

let rootUrl =env.url;
//SINGLE POST ACTIONS

const shouldFetchSingle = (state, id) => {
  // console.log("shouldFetch");
  const { map, selected } = state.post;
  if(selected.id !== id) {
    //TODO: we need more granularity here. we also don't want to fetch if the object is already in the map
    // console.log("shouldFetch debug 0");
    return true;
  } else if(!map[id]) {
    // console.log("shouldFetch debug 1");
    return true;
  } else if(selected.isFetching) {
    // console.log("shouldFetch debug 2");
    return false;
  } else {
    // console.log("shouldFetch debug 3");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_POST = "INVALIDATE_SELECTED_POST"
export function invaldiateSelected() {
  return {
    type: INVALIDATE_SELECTED_POST
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    // console.log("SHOULD FETCH!");
    return dispatch(fetchSinglePostById(id))
  } else {
    // console.log("DON'T NEED TO FETCH");
  }
}

export const REQUEST_SINGLE_POST = "REQUEST_SINGLE_POST";
function requestSinglePost(id) {
  return {
    type: REQUEST_SINGLE_POST
    , id
  }
}

export const RECEIVE_SINGLE_POST = "RECEIVE_SINGLE_POST";
function receiveSinglePost(json) {
  // console.log("received", json.post._id);
  return {
    type: RECEIVE_SINGLE_POST
    , id: json.post._id
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePostById(postId) {
  // console.log("fetching");
  return dispatch => {
    dispatch(requestSinglePost(postId))
    return fetch(`${rootUrl}/api/posts/${postId}`)
      .then(json => dispatch(receiveSinglePost(json)))
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
  // console.log("RECEIVE_CREATE_POST");
  // console.log(json);
  return {
    type: RECEIVE_CREATE_POST
    , id: json.post ? json.post._id : null
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreatePost(data) {
  // console.log("sendCreatePost")
  // console.log(data);
  return dispatch => {
    dispatch(requestCreatePost(data))
    return fetch(`${rootUrl}/api/posts`, {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.current.apiToken
      }
      , body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => dispatch(receiveCreatePost(json)))
    .then((json) => {
      return json;
    })
  }
}

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
    , id: json.post ? json.post._id : null
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdatePost(data) {
  return dispatch => {
    dispatch(requestUpdatePost(data))
    return fetch(`${rootUrl}/api/posts/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdatePost(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   if(json.success) {
    //     browserHistory.push(`/posts/${json.post._id}`)
    //   } else {
    //     alert("ERROR");
    //   }
    // })
  }
}

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
    return fetch(`${rootUrl}/api/posts/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeletePost(json)))
    /*** ACTION-BASED REDIRECT ***/
    // - use this for Delete by default
    .then((json) => {
      if(json.success) {
        browserHistory.push(`/posts`)
      } else {
        alert("ERROR");
      }
    })
  }
}

//POST LIST ACTIONS

const shouldFetchList = (state, type) => {
  // console.log("shouldFetchList");
  //types: "all", "published", etc
  const list = state.post.lists[type];
  if(!list || !list.items) {
    // console.log("ERROR: CANNOT FIND LIST TYPE: " + type);
  } else if(list.items.length < 1) {
    // console.log("shouldFetch debug 0");
    return true
  } else if(list.isFetching) {
    // console.log("shouldFetch debug 1");
    return false
  } else {
    // console.log("shouldFetch debug 2");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (type, id) => (dispatch, getState) => {
  if (shouldFetchList(getState(), type)) {
    if(type === "all") {
      return dispatch(fetchList());
    } else if(type === "squad") {
      return dispatch(fetchListBySquad(id));
    // } else if(type === "test") {
    //   //example with an additional byId argument
    //   return dispatch(fetchListByTest(id));
    } else {
      // console.log("NO MATCHING LIST TYPE SPECIFIED");
      return false; //what to return here?
    }
  }
}

export const REQUEST_POST_LIST = "REQUEST_POST_LIST"
function requestPostList() {
  // console.log('requesting posts list')
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
  // console.log("FETCH POST LIST");
  return dispatch => {
    dispatch(requestPostList())
    return fetch(`${rootUrl}/api/posts`, {
      method: 'GET'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.apiToken
      }
    })
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.posts.length; i++) {
            itemMap[json.posts[i]._id] = json.posts[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receivePostList(json)))
  }
}

export const REQUEST_POST_LIST_BY_SQUAD = "REQUEST_POST_LIST_BY_SQUAD"
function requestPostListBySquad(squadId) {
  // console.log('requesting posts list')
  return {
    type: REQUEST_POST_LIST_BY_SQUAD
    , squadId
  }
}

export const RECEIVE_POST_LIST_BY_SQUAD = "RECEIVE_POST_LIST_BY_SQUAD"
function receivePostListBySquad(json) {
  return {
    type: RECEIVE_POST_LIST_BY_SQUAD
    , list: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchListBySquad(squadId) {
  // console.log("FETCH POST LIST BY SQUAD");
  return dispatch => {
    dispatch(requestPostListBySquad(squadId))
    return fetch(`${rootUrl}/api/posts/bysquad/` + squadId, {
      method: 'GET'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.current.apiToken
      }
    })
    .then(response => response.json()) //THIS LINE
    .then(json => dispatch(receivePostListBySquad(json)))
    .then((json) => {
      // console.log('done');
      return json;
    })
  }
}

//MORE LIST TYPES HERE


//LIST UTIL METHODS
export const SET_POST_FILTER = "SET_POST_FILTER"
export function setFilter(listType, filter) {
  return {
    type: SET_POST_FILTER
    , filter
    , listType
  }
}

export const SET_POST_SORT = "SET_POST_SORT"
export function setSortBy(listType, sortBy) {
  return {
    type: SET_POST_SORT
    , sortBy
    , listType
  }
}

export const SET_POST_QUERY = "SET_POST_QUERY"
export function setQuery(listType, query) {
  return {
    type: SET_POST_QUERY
    , query
    , listType
  }
}

export const SET_POST_PAGINATION = "SET_POST_PAGINATION"
export function setPagination(listType, pagination) {
  return {
    type: SET_POST_PAGINATION
    , pagination
    , listType
  }
}

export const INVALIDATE_POST_LIST = "INVALIDATE_POST_LIST"
export function invaldiateList(listType) {
  return {
    type: INVALIDATE_POST_LIST
    , listType
  }
}