
import * as Actions from './productActions';
// import * as singleActions from './productSingleActions';

function product(state = {

  //define fields for a "new" product
  // a component that creates a new object should store this in it's state
  defaultItem: {
    title: ""
    , description: ""
  }

  , map: {} //map of all items

  , selected: { //single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }

  , lists: {

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
    // add other lists here, like "published" or "featured"
    // accessed like "product.lists.all" or "product.lists.published"

  }
}, action) {
  switch(action.type) {
//SINGLE ITEM ACTIONS
    case Actions.REQUEST_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_SINGLE_PRODUCT:
      if(action.success) {
        console.log("Mapping now");
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_CREATE_PRODUCT:
      console.log("REQUEST_CREATE_PRODUCT");
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_CREATE_PRODUCT:
      console.log("RECEIVE_CREATE_PRODUCT");
      if(action.success) {
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_UPDATE_PRODUCT:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case Actions.RECEIVE_UPDATE_PRODUCT:
      if(action.success) {
        //add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case Actions.REQUEST_DELETE_PRODUCT:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_DELETE_PRODUCT:
      if(action.success) {
        //remove object from map
        let newMap = Object.assign({}, state.map, {});
        delete newMap[action.id]; //remove key
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: null
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

//LIST ACTIONS
    case Actions.REQUEST_PRODUCT_LIST:
      return Object.assign({}, state, {
        //need better way to do this. unless you merge with state at each level, it just replaces the whole "lists" object
        // maybe https://github.com/reactjs/redux/issues/994 ??
        lists: Object.assign({}, state.lists, {
          all: Object.assign({}, state.lists.all, {
            isFetching: true
            , error: null
            , items: []
          })
        })
      })
    case Actions.RECEIVE_PRODUCT_LIST:
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
          , lists: Object.assign({}, state.lists, {
            all: Object.assign({}, state.lists.all, {
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
          lists: Object.assign({}, state.lists, {
            all: Object.assign({}, state.lists.all, {
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

    case Actions.SET_PRODUCT_FILTER:
      let newList = Object.assign({}, state.lists[action.listType], {});
      // newList.
      return Object.assign({}, state, {
        //TODO
      })

    case Actions.SET_PRODUCT_SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
        , type: action.listType
      })
    case Actions.SET_PRODUCT_QUERY:
      return Object.assign({}, state, {
        query: action.query
        , listType: action.listType
      })
    case Actions.SET_PRODUCT_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
    case Actions.INVALIDATE_PRODUCT_LIST:
      let newState = Object.assign({}, state, {});
      newState.lists[action.listType].didInvalidate = true;
      return newState;

    default:
      return state
  }
}

export default product;
