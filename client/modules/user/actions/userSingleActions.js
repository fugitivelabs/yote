import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

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
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username))
    return fetch('/api/users/login', {
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
      if(json.success) {
        browserHistory.push('/')
      } else {
        console.log("Invalid login");
        console.log(json.error);
        alert("Invalid login credentials. Please try again.");
      }
    })
  }
}

export const SETUP_NEW_USER = "SETUP_NEW_USER";
export function setupNewUser() {
  console.log("setup new user")
  return {
    type: SETUP_NEW_USER
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
    return fetch('/api/users', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(json => dispatch(receiveRegister(json)))
    .then((json) => {
      if(json.success) {
        browserHistory.push('/')
      } else {
        //catch error
      }
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
function receiveLogout(json) {
  console.log("RECEIVE_LOGOUT");
  console.log(json);
  return {
    type: RECEIVE_LOGOUT
    , success: json.success
    , error: json.message
  }
}

export function sendLogout() {
  console.log("SEND USER LOGOUT");
  return dispatch => {
    dispatch(requestLogout())
    return fetch('/api/users/logout', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: null
    })
    // .then((res) => {
    //   console.log("RECEIVED LOGOUT RESPONSE");
    //   if(res.status == 200) {
    //     console.log("success");
    //     dispatch(receiveLogout({
    //       success: true
    //     }))
    //   } else {
    //     console.log("not success");
    //     dispatch(receiveLogout({
    //       success: false,
    //       message: "Failed to log out."
    //     }))
    //   }
    //   console.log("HERE 1");
    //   console.log(res);
    //   // return res;
    // })
    .then(res => res.json())
    .then(json => {
      console.log("HERE 2");
      console.log(json);
      return json;
    })
    .then(json => dispatch(receiveLogout(json)))
    .then((json) => {
      //if they hit this route, where should they redirect to?
      if(json.success) {
        // alert("success");
        browserHistory.push('/')
      } else {
        alert("An error occured while trying to log out. Please try again.");
      }
    })
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
    return fetch('/api/users/requestpasswordreset', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify({
        email: username
      })
    })
    .then(res => res.json())
    .then(json => dispatch(receiveForgotPassword(json)))
    .then((json) => {
      //pop up an alert and then redirect them
      // console.log("PASSWORD RESET REQUEST");
      // console.log(json);
      if(json.success) {
        alert("You should receive an email shortly with password reset instructions.");
        browserHistory.push('/')
      } else {
        alert("There was a problem reseting your password on the server. Please contact a site admin.");
      }
    })
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
    return fetch('/api/users/checkresetrequest/' + hex, {
      method: 'GET'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => dispatch(receiveCheckResetHex(json)))
  }
}



export const REQUEST_RESET_PASSWORD = "REQUEST_RESET_PASSWORD"
function requestResetPassword(userId) {
  return {
    type: REQUEST_RESET_PASSWORD
    , userId: userId
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

export function sendResetPassword(userId, password) {
  return dispatch => {
    dispatch(requestResetPassword(userId))
    return fetch('/api/users/resetpassword', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify({
        userId: userId
        , newPass: password
      })
    })
    .then(res => res.json())
    .then(json => dispatch(receiveResetPassword(json)))
    .then((json) => {
      //pop up an alert and then redirect them
      // console.log("PASSWORD RESET REQUEST");
      // console.log(json);
      if(json.success) {
        browserHistory.push('/')
      } else {
        alert("There was a problem reseting your password on the server. " + json.error);
      }
    })
  }
}

