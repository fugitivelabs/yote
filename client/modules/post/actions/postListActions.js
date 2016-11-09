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
  console.log("received post list?");
  return {
    type: RECEIVE_POST_LIST
    , list: json.posts
    , itemMap: json.itemMap
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
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchPublished() {
  return dispatch => {
    dispatch(requestPublishedPostList())
    return fetch('/api/posts/published')
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
      .then(json => dispatch(receivePublishedPostList(json)))
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
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchFeaturedList() {
  return dispatch => {
    dispatch(requestFeaturedPostList())
    return fetch('/api/posts/featured')
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
      .then(json => dispatch(receiveFeaturedPostList(json)))
  }
}


const shouldFetchList = (state, type) => {
  console.log("------- CHECK SHOULD FETCH LIST -----------");
  const postType = !type ? 'all' : type;
  console.log(postType);
  const items = state.post.list[postType];
  console.log(items);
  if(!items || items.length < 1) {
    console.log("YES FETCH LIST");
    return true
  }
  if(state.post.list.isFetching) {
    console.log("FETCHING ALREADY DON'T FETCH LIST");
    return false
  }
  return state.post.list.didInvalidate[postType]
}


export const fetchListIfNeeded = (postType) => (dispatch, getState) => {
  if (shouldFetchList(getState(), postType)) {
    if(postType === 'published') {
      return dispatch(fetchPublished())
    } else if(postType === 'featured') {
      return dispatch(fetchFeaturedList())
    } else {
      return dispatch(fetchList())
    }
  }
}


export const SET_POST_FILTER = "SET_POST_FILTER"
export function setFilter(filter) {
  return {
    type: SET_POST_FILTER
    , filter
  }
}

export const SET_POST_SORT = "SET_POST_SORT"
export function setSortBy(sortBy) {
  return {
    type: SET_POST_SORT
    , sortBy
  }
}

export const SET_POST_QUERY = "SET_POST_QUERY"
export function setQuery(query) {
  return {
    type: SET_POST_QUERY
    , query
  }
}

export const SET_POST_PAGINATION = "SET_POST_PAGINATION"
export function setPagination(pagination) {
  return {
    type: SET_POST_PAGINATION
    , pagination
  }
}

export const INVALIDATE_POST_LIST = "INVALIDATE_POST_LIST"
export function invalidateList(postType) {
  return {
    type: INVALIDATE_POST_LIST
    , postType
  }
}
