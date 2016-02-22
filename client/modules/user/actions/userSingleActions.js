import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'

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
      , body: JSON.stringify({
        username: username
        , password: password
      })
      .then(res => res.json())
      .then(json => dispatch(receiveLogin(json)))
      .then((json) => {
        //if they hit this route, where should they redirect to?
        if(json.success) {
          dispatch(routeActions.push('/'))
        }
      }
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
    return fetch('/api/users', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(userData)
      .then(res => res.json())
      .then(json => dispatch(receiveRegister(json)))
      .then((json) => {
        if(json.success) {
          dispatch(routeActions.push('/'))
        }
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
function requestLogout(json) {
  return {
    type: RECEIVE_LOGOUT
    , status: json.status
    , error: json.message
  }
}

export function sendLogout() {
  return dispatch => {
    dispatch(requestLogout())
    return fetch('/api/users/login', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: null
      .then(res => res.json())
      .then(json => dispatch(receiveLogout(json)))
      .then((json) => {
        //if they hit this route, where should they redirect to?
        if(json.success) {
          dispatch(routeActions.push('/'))
        }
      }
    })
  }
}
