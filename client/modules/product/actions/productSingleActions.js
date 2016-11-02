/*****

SINGLE PRODUCT CRUD ACTIONS GO HERE
getById, getByIdAndPopulate, getBySlug example (for products), create, update

*****/


import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';


export const REQUEST_SINGLE_PRODUCT = "REQUEST_SINGLE_PRODUCT";
function requestSingleProduct(id) {
  return {
    type: REQUEST_SINGLE_PRODUCT
    , id

  }
}

export const RECEIVE_SINGLE_PRODUCT = "RECEIVE_SINGLE_PRODUCT";
function receiveSingleProduct(json) {
  console.log("received", json.product._id);
  return {
    type: RECEIVE_SINGLE_PRODUCT
    , id: json.product._id
    , product: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleProductById(productId) {
  return dispatch => {
    dispatch(requestSingleProduct(productId))
    return fetch(`/api/products/${productId}`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveSingleProduct(json)))
  }
}


/***************

POPULATE POINTERS FROM SERVER

***************/

export const REQUEST_AND_POPULATE_SINGLE_PRODUCT = "REQUEST_AND_POPULATE_SINGLE_PRODUCT";
function requestAndPopulateSingleProduct(id) {
  return {
    type: REQUEST_AND_POPULATE_SINGLE_PRODUCT
    , id
  }
}

export const RECEIVE_POPULATED_SINGLE_PRODUCT = "RECEIVE_POPULATED_SINGLE_PRODUCT";
function receivePopulatedSingleProduct(json) {
  console.log("received", json.product._id);
  return {
    type: RECEIVE_POPULATED_SINGLE_PRODUCT
    , id: json.product._id
    , product: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function fetchAndPopulateSingleProductById(productId) {
  return dispatch => {
    dispatch(requestAndPopulateSingleProduct(productId))
    return fetch(`/api/products/${productId}/populate`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receivePopulatedSingleProduct(json)))
  }
}




/***************

CREATE ACTIONS

***************/

export const SETUP_NEW_PRODUCT = "SETUP_NEW_PRODUCT";
export function setupNewProduct() {
  return {
    type: SETUP_NEW_PRODUCT
  }
}

export const REQUEST_CREATE_PRODUCT = "REQUEST_CREATE_PRODUCT";
function requestCreateProduct(product) {
  return {
    type: REQUEST_CREATE_PRODUCT
    , product
  }
}


export const RECEIVE_CREATE_PRODUCT = "RECEIVE_CREATE_PRODUCT";
function receiveCreateProduct(json) {
  return {
    type: RECEIVE_CREATE_PRODUCT
    , product: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}


export function sendCreateProduct(data) {
  console.log("sendCreateProduct")
  console.log(data);
  return dispatch => {
    dispatch(requestCreateProduct(data))
    return fetch('/api/products', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreateProduct(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   console.log("chck rediredt");
    //   console.log(json);
    //   if(json.success) {
    //     browserHistory.push(`/products/${json.product._id}`)
    //   } else {
    //     //TODO: do something useful with the error
    //     alert("ERROR");
    //   }
    // })
  }
}


/***************

UPDATE ACTIONS

***************/


export const REQUEST_UPDATE_PRODUCT = "REQUEST_UPDATE_PRODUCT";
function requestUpdateProduct(product) {
  return {
    type: REQUEST_UPDATE_PRODUCT
    , product
  }
}

export const RECEIVE_UPDATE_PRODUCT = "RECEIVE_UPDATE_PRODUCT";
function receiveUpdateProduct(json) {
  return {
    type: RECEIVE_UPDATE_PRODUCT
    , product: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}



export function sendUpdateProduct(data) {
  return dispatch => {
    dispatch(requestUpdateProduct(data))
    return fetch(`/api/products/${data._id}`, {
      method: 'PUT'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdateProduct(json)))
    /*** ACTION-BASED REDIRECT ***/
    // // by default use component-based redirect so other actions can be performed
    // .then((json) => {
    //   if(json.success) {
    //     browserHistory.push(`/products/${json.product._id}`)
    //   } else {
    //     alert("ERROR");
    //   }
    // })
  }
}


/***************

DELETE ACTIONS

***************/

export const REQUEST_DELETE_PRODUCT = "REQUEST_DELETE_PRODUCT";
function requestDeleteProduct(productId) {
  return {
    type: REQUEST_DELETE_PRODUCT
    , productId
  }
}

export const RECEIVE_DELETE_PRODUCT = "RECEIVE_DELETE_PRODUCT";
function receiveDeleteProduct(json) {
  return {
    type: RECEIVE_DELETE_PRODUCT
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteProduct(id))
    return fetch(`/api/products/${id}`, {
      method: 'DELETE'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(json => dispatch(receiveDeleteProduct(json)))
    /*** ACTION-BASED REDIRECT ***/
    // - use this for Delete by default
    .then((json) => {
      if(json.success) {
        browserHistory.push(`/products`)
      } else {
        alert("ERROR");
      }
    })
  }
}
