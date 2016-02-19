/*****

POPULATED PRODUCT ACTIONS GO HERE
getByIdAndPopulate

*****/


import fetch from 'isomorphic-fetch'
import { routeActions } from 'react-router-redux'


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
    return fetch(`/api/products/${productId}/populate`)
      .then(response => response.json())
      .then(json => dispatch(receivePopulatedSingleProduct(json)))
  }
}
