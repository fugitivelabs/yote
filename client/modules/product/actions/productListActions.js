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


const shouldFetchList = (state) => {
  console.log("------- CHECK SHOULD FETCH LIST -----------");
  // console.log(state);
  const list = state.product.list;
  console.log(list);
  if(!list.items || list.items.length < 1) {
    console.log("YES FETCH LIST");
    return true
  }
  if(list.isFetching) {
    console.log("FETCHING ALREADY DON'T FETCH LIST");
    return false
  }
  return list.didInvalidate
}


export const fetchListIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchList(getState())) {
    return dispatch(fetchList())
  }
}


export const SET_PRODUCT_FILTER = "SET_PRODUCT_FILTER"
export function setFilter(filter) {
  return {
    type: SET_PRODUCT_FILTER
    , filter
  }
}

export const SET_PRODUCT_SORT = "SET_PRODUCT_SORT"
export function setSortBy(sortBy) {
  return {
    type: SET_PRODUCT_SORT
    , sortBy
  }
}

export const SET_PRODUCT_QUERY = "SET_PRODUCT_QUERY"
export function setQuery(query) {
  return {
    type: SET_PRODUCT_QUERY
    , query
  }
}

export const SET_PRODUCT_PAGINATION = "SET_PRODUCT_PAGINATION"
export function setPagination(pagination) {
  return {
    type: SET_PRODUCT_PAGINATION
    , pagination
  }
}

export const INVALIDATE_PRODUCT_LIST = "INVALIDATE_PRODUCT_LIST"
export function invaldiateList() {
  return {
    type: INVALIDATE_PRODUCT_LIST
  }
}
