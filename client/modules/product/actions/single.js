/*****

SINGLE PRODUCT CRUD ACTIONS GO HERE
getById, getByIdAndPopulate, getBySlug example (for products), create, update

*****/


import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'


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
    return fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleProduct(json)))
  }
}



/***************

CREATE ACTIONS

***************/

export const REQUEST_SETUP_NEW_PRODUCT = "REQUEST_SETUP_NEW_PRODUCT";
function requestSetupNewProduct() {
  return {
    type: REQUEST_SETUP_NEW_PRODUCT
  }
}

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
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreateProduct(json)))
    .then((json) => {
      console.log("chck rediredt");
      console.log(json);
      if(json.success) {
        //redirect to slug route
        dispatch(routeActions.push(`/products/${json.product._id}`))
        // //redirect to byId route
        // dispatch(routeActions.push(`/news/byId/${json.product._id}`))
      }
    })
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
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdateProduct(json)))
    .then((json) => {
      if(json.success) {
        //redirect to slug route
        dispatch(routeActions.push(`/products/${json.product._id}`))
        // //redirect to byId route
        // dispatch(routeActions.push(`/news/byId/${json.product._id}`))
      }
    })
  }
}
