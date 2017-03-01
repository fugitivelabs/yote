import env from '../../../env';

let rootUrl = env.url;

export const REQUEST_LOGIN = "REQUEST_LOGIN"
function requestLogin(username) {
  return {
    type: REQUEST_LOGIN
    , username: username
  }
}

export const RECEIVE_LOGIN = "RECEIVE_LOGIN"
function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN
    , user: json.user
    , token: json.token
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendLogin(username, password) {
  console.log("sendLogin fired...");
  return dispatch => {
    dispatch(requestLogin(username))
    return fetch(`${rootUrl}/api/users/token`, {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify({
        username: username
        , password: password
      })
    })
    .then(res => res.json())
    .then(json => dispatch(receiveLogin(json)))
    .then((json) => {
      //if they hit this route, where should they redirect to?
      // console.log(json);
      return json;
    })
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
  }
}

export function sendRegister(userData) {
  return dispatch => {
    dispatch(requestRegister(userData))
    return fetch(`${rootUrl}/api/users/register?withToken=true`, {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.apiToken
      }
      , body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(json => dispatch(receiveRegister(json)))
    .then((json) => {
      return json;
    })
  }
}

export const REQUEST_LOGOUT = "REQUEST_LOGOUT"
function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT"
function receiveLogout() {
  // console.log(json);
  return {
    type: RECEIVE_LOGOUT
  }
}

export function sendLogout() {
  return dispatch => {
    dispatch(requestLogout())
    return fetch(`${rootUrl}/api/users/logout`, {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.apiToken
      }
      , body: null
    })
    .then(res => {
      // console.log(res);
      // console.log(res.json());
      return res.status;
    })
    .then(dispatch(receiveLogout()))
  }
}


export const REQUEST_PASSWORD_RESET = "REQUEST_PASSWORD_RESET"
function requestPasswordReset(userData) {
  return {
    type: REQUEST_PASSWORD_RESET
    , userData: userData
  }
}

export const RECEIVE_PASSWORD_RESET_REQUEST = "RECEIVE_PASSWORD_RESET_REQUEST"
function receivePasswordResetRequest(json) {
  return {
    type: RECEIVE_PASSWORD_RESET_REQUEST
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendPasswordResetRequest(userData) {
  // console.log(userData);
  return dispatch => {
    dispatch(requestPasswordReset(userData))
    return fetch(`${rootUrl}/api/users/requestpasswordreset`, {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(json => dispatch(receivePasswordResetRequest(json)))
    .then((json) => {
      return json;
    })
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
    return fetch(`${rootUrl}/api/users/updateProfile`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
        , 'token': store.getState().user.apiToken
      }
      , body: JSON.stringify(userData)
    }) 
    .then(res => res.json())
    .then(json => dispatch(receiveUpdateProfile(json)))
    .then((json) => {
      return json;
    })
  }
}
