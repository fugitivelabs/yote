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
    , itemMap: json.itemMap
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH PRODUCT LIST");
  return dispatch => {
    dispatch(requestProductList())
    return fetch('/api/products')
      .then(response => response.json())
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.products.length; i++) {
            itemMap[json.products[i]._id] = json.products[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receiveProductList(json)))
  }
}
