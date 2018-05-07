/**
 * All Post CRUD actions
 *
 * Actions are payloads of information that send data from the application
 * (i.e. Yote server) to the store. They are the _only_ source of information
 * for the store.
 *
 * NOTE: In Yote, we try to keep actions and reducers dealing with CRUD payloads
 * in terms of 'item' or 'items'. This keeps the action payloads consistent and
 * aides various scoping issues with list management in the reducers.
 */

// import api utility
import callAPI from '../../global/utils/api'

const shouldFetchSingle = (state, id) => {
  /**
   * This is helper method to determine whether we should fetch a new single
   * user object from the server, or if a valid one already exists in the store
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetch single");
  const { byId, selected } = state.post;
  if(selected.id !== id) {
    // the "selected" id changed, so we _should_ fetch
    // console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(selected.isFetching) {
    // "selected" is already fetching, don't do anything
    // console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(!byId[id] && !selected.error) {
    // the id is not in the map, fetch from server
    // however, if the api returned an error, then it SHOULDN'T be in the map
    // so re-fetching it will result in an infinite loop
    // console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    // it's been longer than 5 minutes since the last fetch, get a new one
    // console.log("Y shouldFetch - true: older than 5 minutes");
    // also, don't automatically invalidate on server error. if server throws an error,
    // that won't change on subsequent requests and we will have an infinite loop
    return true;
  } else {
    // if "selected" is invalidated, fetch a new one, otherwise don't
    // console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_POST = "INVALIDATE_SELECTED_POST"
export function invalidateSelected() {
  return {
    type: INVALIDATE_SELECTED_POST
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    return dispatch(fetchSinglePostById(id))
  } else {
    return dispatch(returnSinglePostPromise(id)); // return promise that contains post
  }
}

export const returnSinglePostPromise = (id) => (dispatch, getState) => {
  /**
   * This returns the object from the map so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. this is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_SINGLE_POST_WITHOUT_FETCHING"
      , id: id
      , item: getState().post.byId[id]
      , success: true
    })
  });
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
  return {
    type: RECEIVE_SINGLE_POST
    , id: json.post ? json.post._id : null
    , item: json.post
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSinglePostById(postId) {
  return dispatch => {
    dispatch(requestSinglePost(postId))
    return callAPI(`/api/posts/${postId}`)
      .then(json => dispatch(receiveSinglePost(json)))
  }
}

export const ADD_SINGLE_POST_TO_MAP = "ADD_SINGLE_POST_TO_MAP";
export function addSinglePostToMap(item) {
  return {
    type: ADD_SINGLE_POST_TO_MAP
    , item
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
  return dispatch => {
    dispatch(requestCreatePost(data))
    return callAPI('/api/posts', 'POST', data)
      .then(json => dispatch(receiveCreatePost(json)))
  }
}

export const REQUEST_UPDATE_POST = "REQUEST_UPDATE_POST";
function requestUpdatePost(post) {
  return {
    id: post ? post._id : null
    , post
    , type: REQUEST_UPDATE_POST
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
    return callAPI(`/api/posts/${data._id}`, 'PUT', data)
      .then(json => dispatch(receiveUpdatePost(json)))
  }
}

export const REQUEST_DELETE_POST = "REQUEST_DELETE_POST";
function requestDeletePost(id) {
  return {
    type: REQUEST_DELETE_POST
    , id
  }
}

export const RECEIVE_DELETE_POST = "RECEIVE_DELETE_POST";
function receiveDeletePost(id, json) {
  return {
    id
    , error: json.message
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_DELETE_POST
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeletePost(id))
    return callAPI(`/api/posts/${id}`, 'DELETE')
      .then(json => dispatch(receiveDeletePost(id, json)))
  }
}


/**
 * POST LIST ACTIONS
 */

const findListFromArgs = (state, listArgs) => {
  /**
   * Helper method to find appropriate list from listArgs.
   *
   * Because we nest postLists to arbitrary locations/depths,
   * finding the correct list becomes a little bit harder
   */
  // let list = Object.assign({}, state.post.lists, {});
  let list = { ...state.post.lists }
  for(let i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  /**
   * Helper method to determine whether to fetch the list or not from arbitrary
   * listArgs
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetchList with these args ", listArgs, "?");
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST in question: ", list);
  if(!list || !list.items) {
    // yes, the list we're looking for wasn't found
    // console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.isFetching) {
    // no, this list is already fetching
    // console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    // yes, it's been longer than 5 minutes since the last fetch
    // console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    // maybe, depends on if the list was invalidated
    // console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}

export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  if(listArgs.length === 0) {
    // If no arguments passed, make the list we want "all"
    listArgs = ["all"];
  }
  if(shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(returnPostListPromise(...listArgs));
  }
}

export const returnPostListPromise = (...listArgs) => (dispatch, getState) => {
  /**
   * This returns the list object from the reducer so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. This is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */

  // return the array of objects just like the regular fetch
  const state = getState();
  const listItemIds = findListFromArgs(state, listArgs).items
  const listItems = listItemIds.map(id => state.post.byId[id]);

  return new Promise((resolve) => {
    resolve({
      list: listItems
      , listArgs: listArgs
      , success: true
      , type: "RETURN_POST_LIST_WITHOUT_FETCHING"
    })
  });
}

export const REQUEST_POST_LIST = "REQUEST_POST_LIST"
function requestPostList(listArgs) {
  return {
    type: REQUEST_POST_LIST
    , listArgs
  }
}

export const RECEIVE_POST_LIST = "RECEIVE_POST_LIST"
function receivePostList(json, listArgs) {
  return {
    type: RECEIVE_POST_LIST
    , listArgs
    , list: json.posts
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export const ADD_POST_TO_LIST = "ADD_POST_TO_LIST";
export function addPostToList(id, ...listArgs) {
  // console.log("Add post to list", id);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: ADD_POST_TO_LIST
    , id
    , listArgs
  }
}

export const REMOVE_POST_FROM_LIST = "REMOVE_POST_FROM_LIST"
export function removePostFromList(id, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ['all'];
  }
  return {
    type: REMOVE_POST_FROM_LIST
    , id
    , listArgs
  }
}

export function fetchList(...listArgs) {
  return dispatch => {
    if(listArgs.length === 0) {
      // default to "all" list if we don't pass any listArgs
      listArgs = ["all"];
    }
    dispatch(requestPostList(listArgs))
    /**
     * determine what api route we want to hit
     *
     * NOTE: use listArgs to determine what api call to make.
     * if listArgs[0] == null or "all", return list
     *
     * if listArgs has 1 arg, return "/api/posts/by-[ARG]"
     *
     * if 2 args, additional checks required.
     *  if 2nd arg is a string, return "/api/posts/by-[ARG1]/[ARG2]".
     *    ex: /api/posts/by-category/:category
     *  if 2nd arg is an array, though, return "/api/posts/by-[ARG1]-list" with additional query string
     *
     * TODO:  make this accept arbitrary number of args. Right now if more
     * than 2, it requires custom checks on server
     */
    let apiTarget = "/api/posts";
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2 && Array.isArray(listArgs[1])) {
      // length == 2 has it's own check, specifically if the second param is an array
      // if so, then we need to call the "listByValues" api method instead of the regular "listByRef" call
      // this can be used for querying for a list of posts given an array of post id's, among other things
      apiTarget += `/by-${listArgs[0]}-list?`;
      // build query string
      for(let i = 0; i < listArgs[1].length; i++) {
        apiTarget += `${listArgs[0]}=${listArgs[1][i]}&`
      }
    } else if(listArgs.length == 2) {
      // ex: ("author","12345")
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return callAPI(apiTarget).then(
      json => dispatch(receivePostList(json, listArgs))
    )
  }
}

/**
 * LIST UTIL METHODS
 */
export const SET_POST_FILTER = "SET_POST_FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_POST_FILTER
    , filter
    , listArgs
  }
}

export const SET_POST_PAGINATION = "SET_POST_PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_POST_PAGINATION
    , pagination
    , listArgs
  }
}

export const INVALIDATE_POST_LIST = "INVALIDATE_POST_LIST"
export function invalidateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: INVALIDATE_POST_LIST
    , listArgs
  }
}
