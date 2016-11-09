/*****
SINGLE PRODUCT CRUD ACTIONS GO HERE
getById, getBySlug example (for products), create, update
*****/

import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

//SINGLE PRODUCT ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch");
  const { map, selected } = state.product;
  if(selected.id !== id) {
    console.log("shouldFetch debug 0");
    return true;
  } else if(!map[id]) {
    console.log("shouldFetch debug 1");
    return true;
  } else if(selected.isFetching) {
    console.log("shouldFetch debug 2");
    return false;
  } else {
    console.log("shouldFetch debug 3");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_PRODUCT = "INVALIDATE_SELECTED_PRODUCT"
export function invaldiateSelected() {
  return {
    type: INVALIDATE_SELECTED_PRODUCT
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    console.log("SHOULD FETCH!");
    return dispatch(fetchSingleProductById(id))
  } else {
    console.log("DON'T NEED TO FETCH");
  }
}

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
    , item: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleProductById(productId) {
  console.log("fetching");
  return dispatch => {
    dispatch(requestSingleProduct(productId))
    return fetch(`/api/products/${productId}`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveSingleProduct(json)))
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
  console.log("RECEIVE_CREATE_PRODUCT");
  console.log(json);
  return {
    type: RECEIVE_CREATE_PRODUCT
    , id: json.product ? json.product._id : null
    , item: json.product
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreateProduct(data) {
  console.log("sendCreateProduct")
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
  }
}

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
    , item: json.product
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

//PRODUCT LIST ACTIONS
