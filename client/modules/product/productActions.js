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

export const ADD_SINGLE_PRODUCT_TO_MAP = "ADD_SINGLE_PRODUCT_TO_MAP";
export function addSingleProductToMap(item) {
  return {
    type: ADD_SINGLE_PRODUCT_TO_MAP
    , item
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
function requestProductList(listArgs) {
  return {
    type: REQUEST_PRODUCT_LIST
    , listArgs
  }
}

export const RECEIVE_PRODUCT_LIST = "RECEIVE_PRODUCT_LIST"
function receiveProductList(json, listArgs) {
  return {
    type: RECEIVE_PRODUCT_LIST
    , listArgs
    , list: json.products
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList(...listArgs) {
  console.log("FETCH PRODUCT LIST", listArgs);
  return dispatch => {
    if(listArgs.length === 0) {
      listArgs = ["all"];
    }
    //default to "all" list if we don't pass any listArgs
    dispatch(requestProductList(listArgs))
    //determine what api route we want to hit
    //HERE: use listArgs to determine what api call to make.
    // if listArgs[0] == null or "all", return list
    // if listArgs has 1 arg, return "/api/products/by[ARG]"
    // if 2 args, return return "/api/products/by-[ARG1]/[ARG2]". ex: /api/products/by-user/:userId
    // if more than 2, will require custom checks
    let apiTarget = "/api/products";
    // if(test) {} //override defaults here
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return callAPI(apiTarget)
      .then(json => dispatch(receiveProductList(json, listArgs)))
  }
}

//LIST UTIL METHODS
export const SET_PRODUCT_FILTER = "SET_PRODUCT_FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_PRODUCT_FILTER
    , filter
    , listArgs
  }
}

export const SET_PRODUCT_PAGINATION = "SET_PRODUCT_PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: SET_PRODUCT_PAGINATION
    , pagination
    , listArgs
  }
}

export const INVALIDATE_PRODUCT_LIST = "INVALIDATE_PRODUCT_LIST"
export function invaldiateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: INVALIDATE_PRODUCT_LIST
    , listArgs
  }
}