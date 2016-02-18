/*****

SINGLE ITEM ACTIONS GO HERE


*****/


import fetch from 'isomorphic-fetch';

export const REQUEST_SINGLE_NEWS_ITEM = "REQUEST_SINGLE_NEWS_ITEM";
export const RECEIVE_SINGLE_NEWS_ITEM = "RECEIVE_SINGLE_NEWS_ITEM";


// export const REQUEST_SETUP_NEW_POST = "REQUEST_SETUP_NEW_POST";
// function requestSetupPost() {
//   return {
//     type: REQUEST_SETUP_NEW_POST
//   }
// }
//
// export const SETUP_NEW_POST = "SETUP_NEW_POST";
// export function setupNewPost() {
//   return dispatch => {
//     dispatch(requestSetupPost())
//     return {
//       type: SETUP_NEW_POST
//     }
//   }
// }


function requestSingleItem() {
  return {
    type: REQUEST_SINGLE_NEWS_ITEM
  }
}

function receiveSingleItem( json) {
  console.log("received", json.post._id);
  return {
    type: RECEIVE_SINGLE_NEWS_ITEM
    , item: json.post
    , receivedAt: Date.now()
  }
}

function fetchAndPopulateSingleItemById(itemId) {
  return dispatch => {
    dispatch(requestSingleItem(itemId))
    return fetch(`/api/posts/${itemId}/populate`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleItem( json)))
  }
}

function fetchSingleItemById(itemId) {
  return dispatch => {
    dispatch(requestSingleItem(itemId))
    return fetch(`/api/posts/${itemId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleItem( json)))
  }
}


export function fetchSingleNewsItemById(itemId, populate) {
  console.log("debug1");
  console.log(itemId);
  console.log(populate);
  if(populate) {
    console.log('populating')
    return dispatch => {
      dispatch(fetchAndPopulateSingleItemById(itemId))
    }
  } else {
    console.log('not populating')
    return dispatch => {
      dispatch(fetchSingleItemById(itemId))
    }
  }
}


// function fetchAndPopulateSingleItemBySlug(slug) {
//   return dispatch => {
//     dispatch(requestSingleItem())
//     return fetch(`/api/posts/bySlug/${slug}/populate`)
//       .then(response => response.json())
//       .then(json => dispatch(receiveSingleItem( json)))
//   }
// }

function fetchSingleItemBySlug(slug) {
  return dispatch => {
    dispatch(requestSingleItem(slug))
    return fetch(`/api/posts/bySlug/${slug}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleItem( json)))
  }
}


export function fetchSingleNewsItemBySlug(slug, populate) {
  console.log("debug1");
  console.log(slug);
  console.log(populate);
  return dispatch => {
    dispatch(fetchSingleItemBySlug(slug))
  }

}
