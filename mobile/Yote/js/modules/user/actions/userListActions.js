
import env from '../../../env';

let rootUrl = env.url;

export const REQUEST_USER_LIST = "REQUEST_USER_LIST";
function requestUserList() {
  return {
    type: REQUEST_USER_LIST
  }
}

export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST"
function receiveUserList(json) {
  // console.log("received user list");
  return {
    type: RECEIVE_USER_LIST
    , list: json.users
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  return dispatch => {
    dispatch(requestUserList())
    return fetch(`${rootUrl}/api/users`, {
      method: 'GET'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.current.apiToken
      }
    })
    .then(response => response.json())
    .then(json => {
      var itemMap = {};
      for(var i = 0; i < json.users.length; i++) {
        itemMap[json.users[i]._id] = json.users[i];
      }
      json.itemMap = itemMap;
      return json;
    })
    .then(json =>
      dispatch(receiveUserList(json))
    )
  }
}

export const REQUEST_USER_LIST_BY_SQUAD = "REQUEST_USER_LIST_BY_SQUAD";
function requestUserListBySquad(squadId) {
  return {
    type: REQUEST_USER_LIST_BY_SQUAD
  }
}

export const RECEIVE_USER_LIST_BY_SQUAD = "RECEIVE_USER_LIST_BY_SQUAD"
function receiveUserListBySquad(json) {
  // console.log("received user list by squad");
  return {
    type: RECEIVE_USER_LIST_BY_SQUAD
    , list: json.users
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchListBySquad(squadId) {
  return dispatch => {
    dispatch(requestUserListBySquad(squadId))
    return fetch(`${rootUrl}/api/users/bysquad/` + squadId, {
      method: 'GET'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.current.apiToken
      }
    })
    .then(response => response.json())
    .then(json => {
      var itemMap = {};
      for(var i = 0; i < json.users.length; i++) {
        itemMap[json.users[i]._id] = json.users[i];
      }
      json.itemMap = itemMap;
      return json;
    })
    .then(json => dispatch(receiveUserListBySquad(json)))
  }
}



export const SET_USER_FILTER = "SET_USER_FILTER"
export function setFilter(filter) {
  return {
    type: SET_USER_FILTER
    , filter
  }
}

export const SET_USER_SORT = "SET_USER_SORT"
export function setSortBy(sortBy) {
  return {
    type: SET_USER_SORT
    , sortBy
  }
}

export const SET_USER_QUERY = "SET_USER_QUERY"
export function setQuery(query) {
  return {
    type: SET_USER_QUERY
    , query
  }
}

export const SET_USER_PAGINATION = "SET_USER_PAGINATION"
export function setPagination(pagination) {
  return {
    type: SET_USER_PAGINATION
    , pagination
  }
}
