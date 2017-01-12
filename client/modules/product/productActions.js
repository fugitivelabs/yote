/*****
SINGLE PRODUCT CRUD ACTIONS GO HERE
getById, getBySlug example (for products), create, update
*****/

import { browserHistory } from 'react-router';

import callAPI from '../../global/util/api'
//SINGLE PRODUCT ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch");
  const { map, selected } = state.product;
  if(selected.id !== id) {
    //TODO: we need more granularity here. we also don't want to fetch if the object is already in the map
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
    return callAPI(`/api/products/${productId}`)
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
    return callAPI('/api/products', 'POST', data)
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
    return callAPI(`/api/products/${data._id}`, 'PUT', data)
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
    return callAPI(`/api/products/${id}`, 'DELETE')
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

const shouldFetchList = (state, type) => {
  console.log("shouldFetchList");
  //types: "all", "published", etc
  const list = state.product.lists[type];
  if(!list || !list.items) {
    console.log("ERROR: CANNOT FIND LIST TYPE: " + type);
  } else if(list.items.length < 1) {
    console.log("shouldFetch debug 0");
    return true
  } else if(list.isFetching) {
    console.log("shouldFetch debug 1");
    return false
  } else {
    console.log("shouldFetch debug 2");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (type, id) => (dispatch, getState) => {
  if (shouldFetchList(getState(), type)) {
    if(type === "all") {
      return dispatch(fetchList());
    // } else if(type === "test") {
    //   //example with an additional byId argument
    //   return dispatch(fetchListByTest(id));
    } else {
      console.log("NO MATCHING LIST TYPE SPECIFIED");
      return false; //what to return here?
    }
  }
}

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
  // console.log("FETCH PRODUCT LIST");
  return dispatch => {
    dispatch(requestProductList())
    return callAPI('/api/products')
      .then(json => dispatch(receiveProductList(json)))
  }
}

//MORE LIST TYPES HERE


//LIST UTIL METHODS
export const SET_PRODUCT_FILTER = "SET_PRODUCT_FILTER"
export function setFilter(listType, filter) {
  return {
    type: SET_PRODUCT_FILTER
    , filter
    , listType
  }
}

export const SET_PRODUCT_SORT = "SET_PRODUCT_SORT"
export function setSortBy(listType, sortBy) {
  return {
    type: SET_PRODUCT_SORT
    , sortBy
    , listType
  }
}

export const SET_PRODUCT_QUERY = "SET_PRODUCT_QUERY"
export function setQuery(listType, query) {
  return {
    type: SET_PRODUCT_QUERY
    , query
    , listType
  }
}

export const SET_PRODUCT_PAGINATION = "SET_PRODUCT_PAGINATION"
export function setPagination(listType, pagination) {
  return {
    type: SET_PRODUCT_PAGINATION
    , pagination
    , listType
  }
}

export const INVALIDATE_PRODUCT_LIST = "INVALIDATE_PRODUCT_LIST"
export function invaldiateList(listType) {
  return {
    type: INVALIDATE_PRODUCT_LIST
    , listType
  }
}