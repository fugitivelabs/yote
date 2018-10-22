/**
 * All product CRUD actions
 *
 * Actions are payloads of information that send data from the application
 * (i.e. Yote server) to the store. They are the _only_ source of information
 * for the store.
 *
 * NOTE: In Yote, we try to keep actions and reducers dealing with CRUD payloads
 * in terms of 'item' or 'items'. This keeps the action payloads consistent and
 * aides various scoping issues with list management in the reducers.
 */

// import api utility
import apiUtils from '../../global/utils/api'

// - re
const shouldFetchSingle = (state, id) => {
  /**
   * This is helper method to determine whether we should fetch a new single
   * user object from the server, or if a valid one already exists in the store
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetch single");
  const { byId, selected } = state.product;
  if(selected.id !== id) {
    // the "selected" id changed, so we _should_ fetch
    // console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(selected.isFetching) {
    // "selected" is already fetching, don't do anything
    // console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(!byId[id] && !selected.error) {
    // the id is not in the map, fetch from server
    // however, if the api returned an error, then it SHOULDN'T be in the map
    // so re-fetching it will result in an infinite loop
    // console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    // it's been longer than 5 minutes since the last fetch, get a new one
    // console.log("Y shouldFetch - true: older than 5 minutes");
    // also, don't automatically invalidate on server error. if server throws an error,
    // that won't change on subsequent requests and we will have an infinite loop
    return true;
  } else {
    // if "selected" is invalidated, fetch a new one, otherwise don't
    // console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_PRODUCT = "INVALIDATE_SELECTED_PRODUCT"
export function invalidateSelected() {
  return {
    type: INVALIDATE_SELECTED_PRODUCT
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    return dispatch(fetchSingleProductById(id))
  } else {
    return dispatch(returnSingleProductPromise(id)); // return promise that contains product
  }
}


export const returnSingleProductPromise = (id) => (dispatch, getState) => {
  /**
   * This returns the object from the map so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. this is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */
  return new Promise((resolve) => {
    resolve({
      id: id
      , item: getState().product.byId[id]
      , success: true
      , type: "RETURN_SINGLE_PRODUCT_WITHOUT_FETCHING"
    })
  });
}

export const REQUEST_SINGLE_PRODUCT = "REQUEST_SINGLE_PRODUCT";
function requestSingleProduct(id) {
  return {
    id
    , type: REQUEST_SINGLE_PRODUCT
  }
}

export const RECEIVE_SINGLE_PRODUCT = "RECEIVE_SINGLE_PRODUCT";
function receiveSingleProduct(json) {
  return {
    error: json.message
    , id: json.product ? json.product._id : null
    , item: json.product
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_SINGLE_PRODUCT
  }
}

export function fetchSingleProductById(id) {
  return dispatch => {
    dispatch(requestSingleProduct(id))
    return apiUtils.callAPI(`/api/products/${id}`)
      .then(json => dispatch(receiveSingleProduct(json)))
  }
}

export const ADD_SINGLE_PRODUCT_TO_MAP = "ADD_SINGLE_PRODUCT_TO_MAP";
export function addSingleProductToMap(item) {
  return {
    item
    , type: ADD_SINGLE_PRODUCT_TO_MAP
  }
}

export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export function setSelectedProduct(item) {
  return {
    type: SET_SELECTED_PRODUCT
    , item
  }
}


export const REQUEST_DEFAULT_PRODUCT = "REQUEST_DEFAULT_PRODUCT";
function requestDefaultProduct(id) {
  return {
    type: REQUEST_DEFAULT_PRODUCT
  }
}

export const RECEIVE_DEFAULT_PRODUCT = "RECEIVE_DEFAULT_PRODUCT";
function receiveDefaultProduct(json) {
  return {
    error: json.message
    , defaultObj: json.defaultObj
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_DEFAULT_PRODUCT
  }
}

export function fetchDefaultProduct() {
  return dispatch => {
    dispatch(requestDefaultProduct())
    return apiUtils.callAPI(`/api/products/default`)
      .then(json => dispatch(receiveDefaultProduct(json)))
  }
}

export const REQUEST_PRODUCT_SCHEMA = "REQUEST_PRODUCT_SCHEMA";
function requestProductSchema(id) {
  return {
    type: REQUEST_PRODUCT_SCHEMA
  }
}
 export const RECEIVE_PRODUCT_SCHEMA = "RECEIVE_PRODUCT_SCHEMA";
function receiveProductSchema(json) {
  return {
    error: json.message
    , schema: json.schema
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_PRODUCT_SCHEMA
  }
}
 export function fetchProductSchema() {
  return dispatch => {
    dispatch(requestProductSchema())
    return apiUtils.callAPI(`/api/products/schema`)
      .then(json => dispatch(receiveProductSchema(json)))
  }
}

export const REQUEST_CREATE_PRODUCT = "REQUEST_CREATE_PRODUCT";
function requestCreateProduct(product) {
  return {
    product
    , type: REQUEST_CREATE_PRODUCT
  }
}

export const RECEIVE_CREATE_PRODUCT = "RECEIVE_CREATE_PRODUCT";
function receiveCreateProduct(json) {
  return {
    error: json.message
    , id: json.product ? json.product._id : null
    , item: json.product
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_CREATE_PRODUCT
  }
}

export function sendCreateProduct(data) {
  return dispatch => {
    dispatch(requestCreateProduct(data))
    return apiUtils.callAPI('/api/products', 'POST', data)
      .then(json => dispatch(receiveCreateProduct(json)))
  }
}

export const REQUEST_UPDATE_PRODUCT = "REQUEST_UPDATE_PRODUCT";
function requestUpdateProduct(product) {
  return {
    id: product ? product._id: null
    , product
    , type: REQUEST_UPDATE_PRODUCT
  }
}

export const RECEIVE_UPDATE_PRODUCT = "RECEIVE_UPDATE_PRODUCT";
function receiveUpdateProduct(json) {
  return {
    error: json.message
    , id: json.product ? json.product._id : null
    , item: json.product
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_UPDATE_PRODUCT
  }
}

export function sendUpdateProduct(data) {
  return dispatch => {
    dispatch(requestUpdateProduct(data))
    return apiUtils.callAPI(`/api/products/${data._id}`, 'PUT', data)
      .then(json => dispatch(receiveUpdateProduct(json)))
  }
}

export const REQUEST_DELETE_PRODUCT = "REQUEST_DELETE_PRODUCT";
function requestDeleteProduct(id) {
  return {
    id
    , type: REQUEST_DELETE_PRODUCT
  }
}

export const RECEIVE_DELETE_PRODUCT = "RECEIVE_DELETE_PRODUCT";
function receiveDeleteProduct(id, json) {
  return {
    error: json.message
    , id
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_DELETE_PRODUCT
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteProduct(id))
    return apiUtils.callAPI(`/api/products/${id}`, 'DELETE')
      .then(json => dispatch(receiveDeleteProduct(id, json)))
  }
}


/**
 * PRODUCT LIST ACTIONS
 */

const findListFromArgs = (state, listArgs) => {
  /**
   * Helper method to find appropriate list from listArgs.
   *
   * Because we nest productLists to arbitrary locations/depths,
   * finding the correct list becomes a little bit harder
   */
  // let list = Object.assign({}, state.product.lists, {});
  let list = { ...state.product.lists }
  for(let i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  /**
   * Helper method to determine whether to fetch the list or not from arbitrary
   * listArgs
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetchList with these args ", listArgs, "?");
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST in question: ", list);
  if(!list || !list.items) {
    // yes, the list we're looking for wasn't found
    // console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.isFetching) {
    // no, this list is already fetching
    // console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    // yes, it's been longer than 5 minutes since the last fetch
    // console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    // maybe, depends on if the list was invalidated
    // console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}

export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  if(listArgs.length === 0) {
    // If no arguments passed, make the list we want "all"
    listArgs = ["all"];
  }
  if(shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(returnProductListPromise(...listArgs));
  }
}

export const returnProductListPromise = (...listArgs) => (dispatch, getState) => {
  /**
   * This returns the list object from the reducer so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. This is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */

  // return the array of objects just like the regular fetch
  const state = getState();
  const listItemIds = findListFromArgs(state, listArgs).items
  const listItems = listItemIds.map(id => state.product.byId[id]);

  return new Promise((resolve) => {
    resolve({
      list: listItems
      , listArgs: listArgs
      , success: true
      , type: "RETURN_PRODUCT_LIST_WITHOUT_FETCHING"
    })
  });
}

export const REQUEST_PRODUCT_LIST = "REQUEST_PRODUCT_LIST"
function requestProductList(listArgs) {
  return {
    listArgs
    , type: REQUEST_PRODUCT_LIST
  }
}

export const RECEIVE_PRODUCT_LIST = "RECEIVE_PRODUCT_LIST"
function receiveProductList(json, listArgs) {
  return {
    error: json.message
    , list: json.products
    , listArgs
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_PRODUCT_LIST
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

export function fetchList(...listArgs) {
  return dispatch => {
    if(listArgs.length === 0) {
      // default to "all" list if we don't pass any listArgs
      listArgs = ["all"];
    }
    dispatch(requestProductList(listArgs))
    /**
     * determine what api route we want to hit
     *
     * NOTE: use listArgs to determine what api call to make.
     * if listArgs[0] == null or "all", return list
     *
     * if listArgs has 1 arg, return "/api/products/by-[ARG]"
     *
     * if 2 args, additional checks required.
     *  if 2nd arg is a string, return "/api/products/by-[ARG1]/[ARG2]".
     *    ex: /api/products/by-category/:category
     *  if 2nd arg is an array, though, return "/api/products/by-[ARG1]-list" with additional query string
     *
     * TODO:  make this accept arbitrary number of args. Right now if more
     * than 2, it requires custom checks on server
     */
    let apiTarget = "/api/products";
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2 && Array.isArray(listArgs[1])) {
      // length == 2 has it's own check, specifically if the second param is an array
      // if so, then we need to call the "listByValues" api method instead of the regular "listByRef" call
      // this can be used for querying for a list of products given an array of product id's, among other things
      apiTarget += `/by-${listArgs[0]}-list?`;
      // build query string
      for(let i = 0; i < listArgs[1].length; i++) {
        apiTarget += `${listArgs[0]}=${listArgs[1][i]}&`
      }
    } else if(listArgs.length == 2) {
      // ex: ("author","12345")
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return apiUtils.callAPI(apiTarget).then(
      json => dispatch(receiveProductList(json, listArgs))
    )
  }
}

/**
 * LIST UTIL METHODS
 */
export const SET_PRODUCT_FILTER = "SET_PRODUCT_FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    filter
    , listArgs
    , type: SET_PRODUCT_FILTER
  }
}

export const SET_PRODUCT_PAGINATION = "SET_PRODUCT_PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    listArgs
    , pagination
    , type: SET_PRODUCT_PAGINATION
  }
}

export const INVALIDATE_PRODUCT_LIST = "INVALIDATE_PRODUCT_LIST"
export function invalidateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    listArgs
    , type: INVALIDATE_PRODUCT_LIST
  }
}