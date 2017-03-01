
import * as Actions from '../actions/postActions';

// import * as singleActions from './postSingleActions';

function post(state = {

  //define fields for a "new" post
  // a component that creates a new object should store this in it's state
  defaultItem: {
    title: ""
    , description: ""
  }

  , map: {} //map of all items

  , single: { //single single entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }

  , list: {

    all: {
      isFetching: false
      , error: null
      , didInvalidate: false
      , lastUpdated: null
      , items: []

      , pagination: {}
      , filter: {
        type: ''
        , sortBy: ''
        , query: ''
      }
    }
    // add other list here, like "published" or "featured"
    // accessed like "post.list.all" or "post.list.published"

  }
}, action) {
  switch(action.type) {
//SINGLE ITEM ACTIONS
    case Actions.REQUEST_SINGLE_POST:
      return Object.assign({}, state, {
        single: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_SINGLE_POST:
      if(action.success) {
        console.log("Mapping now");
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , single: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          single: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_CREATE_POST:
      // console.log("REQUEST_CREATE_POST");
      var newState = Object.assign({}, state, {});
      newState.list.squad.isFetching = true;
      return newState;
    case Actions.RECEIVE_CREATE_POST:
      // console.log("RECEIVE_CREATE_POST");
      if(action.success) {


        var newState = Object.assign({}, state, {});
        newState.list.squad.isFetching = false;
        newState.list.squad.items.push(action.id);
        newState.map[action.id] = action.item;
        return newState;
        
      } else {
        return Object.assign({}, state, {
          single: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_UPDATE_POST:
      return Object.assign({}, state, {
        single: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case Actions.RECEIVE_UPDATE_POST:
      if(action.success) {
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , single: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          single: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_DELETE_POST:
      return Object.assign({}, state, {
        single: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_DELETE_POST:
      if(action.success) {
        //remove object from map
        let newMap = Object.assign({}, state.map, {});
        delete newMap[action.id]; //remove key
        return Object.assign({}, state, {
          map: newMap
          , single: {
            id: null
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          single: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

//LIST ACTIONS
    case Actions.REQUEST_POST_LIST:
      return Object.assign({}, state, {
        //need better way to do this. unless you merge with state at each level, it just replaces the whole "list" object
        // maybe https://github.com/reactjs/redux/issues/994 ??
        list: Object.assign({}, state.list, {
          all: Object.assign({}, state.list.all, {
            isFetching: true
            , error: null
            , items: []
          })
        })
      })
    case Actions.RECEIVE_POST_LIST:
      if(action.success) {
        //add api array objects to map
        //NOTE: should the "all" list overwrite the map? others only add to the map.
        let newMap = Object.assign({}, state.map, {});
        let idArray = [];
        for(var i = 0; i < action.list.length; i++) {
          idArray.push(action.list[i]._id);
          newMap[action.list[i]._id] = action.list[i];
        }
        return Object.assign({}, state, {
          map: newMap
          , list: Object.assign({}, state.list, {
            all: Object.assign({}, state.list.all, {
              isFetching: false
              , didInvalidate: false
              , items: idArray
              //reset filters and pagination?
              , lastUpdated: action.receivedAt
            })
          })
        })
      } else {
        return Object.assign({}, state, {
          list: Object.assign({}, state.list, {
            all: Object.assign({}, state.list.all, {
              isFetching: false
              , error: action.error
              , idInvalidate: true
              , items: []
              //reset filters and pagination?
              , lastUpdated: action.receivedAt
            })
          })
        })
      }  
  
    case Actions.SET_POST_FILTER:
      let newList = Object.assign({}, state.list[action.listType], {});
      // newList.
      return Object.assign({}, state, {
        //TODO
      })

    case Actions.SET_POST_SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
        , type: action.listType
      })
    case Actions.SET_POST_QUERY:
      return Object.assign({}, state, {
        query: action.query
        , listType: action.listType
      })
    case Actions.SET_POST_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
    case Actions.INVALIDATE_POST_LIST:
      var newState = Object.assign({}, state, {});
      newState.list[action.listType].didInvalidate = true;
      return newState;


    default:
      return state
  }
}

export default post;
