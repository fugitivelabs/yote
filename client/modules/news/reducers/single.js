/*****

SINGLE ITEM REDUCERS GO HERE

*****/


import * as singleActions from '../actions/single';
import * as createActions from '../actions/create';
import * as updateActions from '../actions/update';


function single(state = {
  isFetching: false
  , item: {}
  , status: ""
}, action) {
  switch (action.type) {
    case singleActions.REQUEST_SINGLE_NEWS_ITEM:
      console.log("REQUEST_SINGLE_NEWS_ITEM")
      console.log(action);
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case singleActions.RECEIVE_SINGLE_NEWS_ITEM:
      console.log("RECEIVE_SINGLE_NEWS_ITEM");
      // console.log(action);
      return Object.assign({}, state, {
        isFetching: false
        , item: action.item
      })
      break;
    case singleActions.REQUEST_SETUP_NEW_POST:
      console.log("REQUEST_SETUP_NEW_POST");
      return Object.assign({}, state, {
        isFetching: true
      })
    case createActions.SETUP_NEW_POST:
      console.log("SETUP_NEW_POST");
      return Object.assign({}, state, {
        isFetching: false
        , item: {
          title: ""
          , content: ""
          , author: ""
        }
      });
      break;
    case createActions.REQUEST_CREATE_ITEM:
      console.log("REQUEST_CREATE_ITEM");
      return Object.assign({}, state, {
        status: 'creating'
        , item: action.item
      });
      break;
    case createActions.RECEIVE_CREATE_ITEM:
      console.log("RECEIVE_CREATE_ITEM");
      if(action.success) {
        console.log("SUCCESS!!");
        return Object.assign({}, state, {
          status: ''
          , item: action.item
        });
      } else {
        console.log("SOMETHING WRONG");
        return Object.assign({}, state, {
          status: 'error'
          , item: action.item
          , error: action.error
        });
      }
      break;
    case createActions.CREATE_NEWS_ITEM_ERROR:
      console.log("ERROR");
      return Object.assign({}, state, {
        status: 'error'
        , error: action.error
      });
      break;
      case updateActions.REQUEST_UPDATE_ITEM:
        console.log("REQUEST_UPDATE_ITEM");
        return Object.assign({}, state, {
          status: 'updating'
          , item: action.item
        });
        break;
      case updateActions.RECEIVE_UPDATE_ITEM:
        console.log("RECEIVE_UPDATE_ITEM");
        if(action.success) {
          console.log("SUCCESS!!");
          return Object.assign({}, state, {
            status: ''
            , item: action.item
          });
        } else {
          console.log("SOMETHING WRONG");
          return Object.assign({}, state, {
            status: 'error'
            , item: action.item
            , error: action.error
          });
        }
        break;
      case updateActions.UPDATE_NEWS_ITEM_ERROR:
        console.log("ERROR");
        return Object.assign({}, state, {
          status: 'error'
          , error: action.error
        });
        break;

    default:
      return state
  }
}

export default single;
