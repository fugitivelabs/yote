/*****

LIST ACTIONS GO HERE

*****/

import fetch from 'isomorphic-fetch'

export const REQUEST_PRODUCT_LIST = "REQUEST_PRODUCT_LIST"
function requestProductList() {
  console.log('requesting products list')
  return {
    type: REQUEST_PRODUCT_LIST
  }
}

export const RECEIVE_PRODUCT_LIST = "RECEIVE_PRODUCT_LIST"
function receiveProductList(json) {
  return {
    type: RECEIVE_PRODUCT_LIST
    , list: json.products
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  return dispatch => {
    dispatch(requestProductList())
    return fetch('/api/products')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveProductList(json))
      )
  }
}
