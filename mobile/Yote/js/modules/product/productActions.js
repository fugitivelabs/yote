/*****
SINGLE PRODUCT CRUD ACTIONS GO HERE
getById, getBySlug example (for products), create, update
*****/

// import { browserHistory } from 'react-router';

import callAPI from '../../global/utils/api';
//SINGLE PRODUCT ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("shouldFetch single");
  const { byId, selected } = state.product;
  if(selected.id !== id) {
    console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(!byId[id]) {
    console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(selected.isFetching) {
    console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    console.log("Y shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
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
    return dispatch(returnSingleProductPromise(id)); //return promise that contains product
  }
}

export const returnSingleProductPromise = (id) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object
  // EVEN IF we don't need to fetch it. this is because if we have any
  // .then()'s in the components, they will fail when we don't need to fetch.
  // This returns the object from the map so that we can do things with it in the component.
  console.log("return single without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_SINGLE_PRODUCT_WITHOUT_FETCHING"
      , id: id
      , item: getState().product.byId[id]
      , success: true
    })
  });
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
  // console.log("RECEIVE_CREATE_PRODUCT");
  // console.log(json);
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
  // console.log("Delete ", id); 
  return dispatch => {
    dispatch(requestDeleteProduct(id))
    return callAPI(`/api/products/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeleteProduct(json)))
    /*** ACTION-BASED REDIRECT ***/
    // - use this for Delete by default
    .then((json) => {
      if(json.success) {
        console.log("success");
      } else {
        alert("ERROR");
      }
    })
  }
}

//PRODUCT LIST ACTIONS
const findListFromArgs = (state, listArgs) => {
  //because we are nesting productLists to arbitrary locations depths,
  // finding the list becomes a little bit harder
  // helper method to find list from listArgs
  var list = Object.assign({}, state.product.lists, {});
  for(var i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  //determine whether to fetch the list or not, from arbitrary listArgs
  // leaving console logs in here for later help debugging apps
  // console.log("shouldFetchList", listArgs);
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST", list);
  if(!list || !list.items) {
    console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.items.length < 1) {
    console.log("X shouldFetch - true: length 0");
    return true
  } else if(list.isFetching) {
    console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  // console.log("FETCH IF NEEDED", listArgs);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  if (shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(returnProductListPromise(...listArgs));
  }
}

export const returnProductListPromise = (...listArgs) => (dispatch, getState) => {
  //for the "fetchIfNeeded" functionality, we need to return a promise object
  // EVEN IF we don't need to fetch it. this is because if we have any
  // .then()'s in the components, they will fail when we don't need to fetch.
  console.log("return list without fetching");
  return new Promise((resolve, reject) => {
    resolve({
      type: "RETURN_PRODUCT_LIST_WITHOUT_FETCHING"
      , listArgs: listArgs
      , list: findListFromArgs(getState(), listArgs).items
      , success: true
    })
  });
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
    return callAPI(apiTarget).then(
      json => dispatch(receiveProductList(json, listArgs))
    )
  }
}

export const ADD_PRODUCT_TO_LIST = "ADD_PRODUCT_TO_LIST";
export function addProductToList(id, ...listArgs) {
  // console.log("Add product to list", id);
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    type: ADD_PRODUCT_TO_LIST
    , id
    , listArgs
  }
}

export const REMOVE_PRODUCT_FROM_LIST = "REMOVE_PRODUCT_FROM_LIST"
export function removeProductFromList(id, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ['all'];
  }
  return {
    type: REMOVE_PRODUCT_FROM_LIST
    , id
    , listArgs
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
