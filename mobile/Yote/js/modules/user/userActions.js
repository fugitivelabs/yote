/*****
SINGLE USER CRUD ACTIONS GO HERE
getById, getBySlug example (for users), create, update
*****/

import callAPI from '../../global/api'
//LOGGED IN USER ACTIONS
export const REQUEST_LOGIN = "REQUEST_LOGIN"
function requestLogin(username) {
  return {
    type: REQUEST_LOGIN
    , username: username
  }
}

export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
function receiveLogin(json) {
  console.log("RECEIVE!", json)
  return {
    type: RECEIVE_LOGIN
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
    , apiToken: json.token
  }
}

export function sendLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username))
    return callAPI('/api/users/token', 'POST', { username, password })
    .then(json => dispatch(receiveLogin(json)))
  }
}

export const REQUEST_REGISTER = "REQUEST_REGISTER"
function requestRegister(userData) {
  return {
    type: REQUEST_REGISTER
    , userData: userData
  }
}

export const RECEIVE_REGISTER = "RECEIVE_REGISTER"
function receiveRegister(json) {
  return {
    type: RECEIVE_REGISTER
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
    , apiToken: json.token
  }
}

export function sendRegister(userData) {
  return dispatch => {
    dispatch(requestRegister(userData))
    return callAPI('/api/users/register', 'POST', userData)
    .then(json => dispatch(receiveRegister(json)))
  }
}

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT"
function receiveLogout(json) {
  return {
    type: RECEIVE_LOGOUT
    , success: json.success
    , error: json.message
  }
}

export function sendLogout() {
  console.log("Send logout!!!!"); 
  return dispatch => {
    dispatch(requestLogout())
    return callAPI('/api/users/logout', 'POST')
    .then(json => dispatch(receiveLogout(json)))
  }
}

export const REQUEST_FORGOT_PASSWORD = "REQUEST_FORGOT_PASSWORD"
function requestForgotPassword(username) {
  return {
    type: REQUEST_FORGOT_PASSWORD
    , username: username
  }
}

export const RECEIVE_FORGOT_PASSWORD = "RECEIVE_FORGOT_PASSWORD"
function receiveForgotPassword(json) {
  return {
    type: RECEIVE_FORGOT_PASSWORD
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendForgotPassword(username) {
  return dispatch => {
    dispatch(requestForgotPassword(username))
    return callAPI('/api/users/requestpasswordreset', 'POST', { email: username })
    .then(json => dispatch(receiveForgotPassword(json)))
  }
}


export const REQUEST_CHECK_RESET_HEX = "REQUEST_CHECK_RESET_HEX"
function requestCheckResetHex(hex) {
  return {
    type: REQUEST_CHECK_RESET_HEX
    , hex: hex
  }
}

export const RECEIVE_CHECK_RESET_HEX = "RECEIVE_CHECK_RESET_HEX"
function receiveCheckResetHex(json) {
  return {
    type: RECEIVE_CHECK_RESET_HEX
    , userId: json.userId
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCheckResetHex(hex) {
  return dispatch => {
    dispatch(requestCheckResetHex(hex))
    return callAPI('/api/users/checkresetrequest/' + hex)
    .then(json => dispatch(receiveCheckResetHex(json)))
  }
}



export const REQUEST_RESET_PASSWORD = "REQUEST_RESET_PASSWORD"
function requestResetPassword() {
  return {
    type: REQUEST_RESET_PASSWORD
  }
}

export const RECEIVE_RESET_PASSWORD = "RECEIVE_RESET_PASSWORD"
function receiveResetPassword(json) {
  return {
    type: RECEIVE_RESET_PASSWORD
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendResetPassword(resetHex, password) {
  return dispatch => {
    dispatch(requestResetPassword())
    return callAPI('/api/users/resetpassword', 'POST', { resetHex, newPass: password })
    .then(json => dispatch(receiveResetPassword(json)))
  }
}


//SINGLE USER ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch single");
  const { byId, selected } = state.user;
  if(selected.id !== id) {
    console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(!byId[id]) {
    console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(selected.isFetching) {
    console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    console.log("Y shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_USER = "INVALIDATE_SELECTED_USER"
export function invaldiateSelected() {
  return {
    type: INVALIDATE_SELECTED_USER
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    return dispatch(fetchSingleUserById(id))
  } else {
    return dispatch(returnSingleUserPromise(id)); //return promise that contains user
  }
}

export const returnSingleUserPromise = (id) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object 
  // EVEN IF we don't need to fetch it. this is because if we have any 
  // .then()'s in the components, they will fail when we don't need to fetch.
  // This returns the object from the map so that we can do things with it in the component.
  console.log("return single without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_SINGLE_USER_WITHOUT_FETCHING"
      , id: id
      , item: getState().user.byId[id]
      , success: true
    })
  });
}

export const REQUEST_SINGLE_USER = "REQUEST_SINGLE_USER";
function requestSingleUser(id) {
  return {
    type: REQUEST_SINGLE_USER
    , id
  }
}

export const RECEIVE_SINGLE_USER = "RECEIVE_SINGLE_USER";
function receiveSingleUser(json) {
  return {
    type: RECEIVE_SINGLE_USER
    , id: json.user._id
    , item: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleUserById(userId) {
  return dispatch => {
    dispatch(requestSingleUser(userId))
    return callAPI(`/api/users/${userId}`)
      .then(json => dispatch(receiveSingleUser(json)))
  }
}

export const ADD_SINGLE_USER_TO_MAP = "ADD_SINGLE_USER_TO_MAP";
export function addSingleUserToMap(item) {
  return {
    type: ADD_SINGLE_USER_TO_MAP
    , item
  }
}

export const REQUEST_CREATE_USER = "REQUEST_CREATE_USER";
function requestCreateUser(user) {
  return {
    type: REQUEST_CREATE_USER
    , user
  }
}

export const RECEIVE_CREATE_USER = "RECEIVE_CREATE_USER";
function receiveCreateUser(json) {
  return {
    type: RECEIVE_CREATE_USER
    , id: json.user ? json.user._id : null
    , item: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreateUser(data) {
  return dispatch => {
    dispatch(requestCreateUser(data))
    return callAPI('/api/users', 'POST', data)
      .then(json => dispatch(receiveCreateUser(json)))
  }
}

export const REQUEST_UPDATE_USER = "REQUEST_UPDATE_USER";
function requestUpdateUser(user) {
  console.log(user); 
  return {
    type: REQUEST_UPDATE_USER
    , user
  }
}

export const RECEIVE_UPDATE_USER = "RECEIVE_UPDATE_USER";
function receiveUpdateUser(json) {
  return {
    type: RECEIVE_UPDATE_USER
    , item: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdateUser(data) {
  return dispatch => {
    dispatch(requestUpdateUser(data))
    return callAPI(`/api/users/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdateUser(json)))
  }
}

export const REQUEST_UPDATE_PROFILE = "REQUEST_UPDATE_PROFILE"
function requestUpdateProfile(userData) {
  return {
    type: REQUEST_UPDATE_PROFILE
    , userData: userData
  }
}

export const RECEIVE_UPDATE_PROFILE = "RECEIVE_UPDATE_PROFILE"
function receiveUpdateProfile(json) {
  return {
    type: RECEIVE_UPDATE_PROFILE
    , user: json.user
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdateProfile(userData) {
  // console.log(userData);
  return dispatch => {
    dispatch(requestUpdateProfile(userData))
    return callAPI('/api/users/updateProfile', 'PUT', userData)
    .then(json => dispatch(receiveUpdateProfile(json)))
  }
}

export const REQUEST_DELETE_USER = "REQUEST_DELETE_USER";
function requestDeleteUser(userId) {
  return {
    type: REQUEST_DELETE_USER
    , userId
  }
}

export const RECEIVE_DELETE_USER = "RECEIVE_DELETE_USER";
function receiveDeleteUser(json) {
  return {
    type: RECEIVE_DELETE_USER
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) { //is this ever called?
  return dispatch => {
    dispatch(requestDeleteUser(id))
    return callAPI(`/api/users/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeleteUser(json)))
  }
}

//USER LIST ACTIONS
const findListFromArgs = (state, listArgs) => {
  //because we are nesting userLists to arbitrary locations depths,
  // finding the list becomes a little bit harder
  // helper method to find list from listArgs
  var list = Object.assign({}, state.user.lists, {});
  for(var i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  //determine whether to fetch the list or not, from arbitrary listArgs
  // leaving console logs in here for later help debugging apps
  // console.log("shouldFetchList", listArgs);
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST", list);
  if(!list || !list.items) {
    console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.items.length < 1) {
    console.log("X shouldFetch - true: length 0");
    return true
  } else if(list.isFetching) {
    console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  // console.log("FETCH IF NEEDED", listArgs);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  if (shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(returnUserListPromise(...listArgs));
  }
}

export const returnUserListPromise = (...listArgs) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object 
  // EVEN IF we don't need to fetch it. this is because if we have any 
  // .then()'s in the components, they will fail when we don't need to fetch.
  console.log("return list without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_USER_LIST_WITHOUT_FETCHING"
      , listArgs: listArgs
      , list: findListFromArgs(getState(), listArgs).items
      , success: true
    })
  });
}

export const REQUEST_USER_LIST = "REQUEST_USER_LIST"
function requestUserList(listArgs) {
  return {
    type: REQUEST_USER_LIST
    , listArgs
  }
}

export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST"
function receiveUserList(json, listArgs) {
  return {
    type: RECEIVE_USER_LIST
    , listArgs
    , list: json.users
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList(...listArgs) {
  return dispatch => {
    if(listArgs.length === 0) {
      listArgs = ["all"];
    }
    //default to "all" list if we don't pass any listArgs
    dispatch(requestUserList(listArgs))
    //determine what api route we want to hit
    //HERE: use listArgs to determine what api call to make.
    // if listArgs[0] == null or "all", return list
    // if listArgs has 1 arg, return "/api/users/by[ARG]"
    // if 2 args, return return "/api/users/by-[ARG1]/[ARG2]". ex: /api/users/by-user/:userId
    // if more than 2, will require custom checks
    let apiTarget = "/api/users";
    // if(test) {} //override defaults here
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return callAPI(apiTarget).then(
      json => dispatch(receiveUserList(json, listArgs))
    )
  }
}

//LIST UTIL METHODS
export const SET_USER_FILTER = "SET_USER_FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_USER_FILTER
    , filter
    , listArgs
  }
}

export const SET_USER_PAGINATION = "SET_USER_PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_USER_PAGINATION
    , pagination
    , listArgs
  }
}

export const INVALIDATE_USER_LIST = "INVALIDATE_USER_LIST"
export function invaldiateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: INVALIDATE_USER_LIST
    , listArgs
  }
}