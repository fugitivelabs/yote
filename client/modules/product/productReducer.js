
import * as Actions from './productActions';
// import * as singleActions from './productSingleActions';

function productList(state = {
  //default state for a list
  items: [] //array of _id's
  , isFetching: false
  , error: null
  , didInvalidate: false
  , lastUpdated: null
  //pagination?
}, action) {
  switch(action.type) {
    case Actions.INVALIDATE_PRODUCT_LIST: {
      return Object.assign({}, state, {
        didInvalidate: true
      })
    }
    case Actions.REQUEST_PRODUCT_LIST: {
      console.log("DEBUG 1");
      return Object.assign({}, state, {
        items: [] //array of _id's
        , isFetching: true
        , error: null
        , lastUpdated: null
      })
    }
    case Actions.RECEIVE_PRODUCT_LIST: {
      console.log("DEBUG 2");
      let newMap = {};
      if(!action.success) {
        return Object.assign({}, state, {
          items: [] //array of _id's
          , isFetching: false
          , error: action.error
          , didInvalidate: true
          , lastUpdated: action.receivedAt
        })
      } else {
        let idArray = [];
        for(const item of action.list) {
          idArray.push(item._id);
        }
        return Object.assign({}, state, {
          items: idArray
          , isFetching: false
          , error: action.error || null
          , didInvalidate: false
          , lastUpdated: action.receivedAt
        })
      }
    }
    default:
      return Object.assign({}, state, {})
    //filter/query
  }
}

function product(state = {
  //define fields for a "new" product
  // a component that creates a new object should store a copy of this in it's state
  defaultItem: {
    title: ""
    , description: ""
  }
  , byId: {} //map of all items
  , selected: { //single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }
  , lists: {
    // all: {
    //   isFetching: false
    //   , error: null
    //   , didInvalidate: false
    //   , lastUpdated: null
    //   , items: []
    //   , pagination: {}
    //   , filter: {
    //     type: ''
    //     , sortBy: ''
    //     , query: ''
    //   }
    // }
    // add other lists here, like "published" or "featured"
    // accessed like "product.lists.all" or "product.lists.published"

  }
}, action) {
  // let nextState = Object.assign({}, state, {});
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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
    
    case Actions.ADD_SINGLE_PRODUCT_TO_MAP:
      console.log("ADD_SINGLE_PRODUCT_TO_MAP");
      var newIdMap = Object.assign({}, state.byId, {}); //copy map
      newIdMap[action.item._id] = action.item; //add single
      return Object.assign({}, state, {
        byId: newIdMap
      })

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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
        let newIdMap = Object.assign({}, state.byId, {});
        newIdMap[action.id] = action.item;
        return Object.assign({}, state, {
          byId: newIdMap
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
        let newIdMap = Object.assign({}, state.byId, {});
        delete newIdMap[action.id]; //remove key
        return Object.assign({}, state, {
          byId: newIdMap
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
    case Actions.INVALIDATE_PRODUCT_LIST:
    case Actions.REQUEST_PRODUCT_LIST:
      //"forward" on to individual list reducer
      return Object.assign({}, state, {
        lists: Object.assign({}, state.lists, {
          [action.listType]: productList(state.lists[action.listType], action)
        })
      })
    case Actions.RECEIVE_PRODUCT_LIST:
      //add items to "byId" before we forward to individual list reducer
      let newIdMap = Object.assign({}, state.byId, {});
      if(action.success) {
        for(const item of action.list) {
          newIdMap[item._id] = item;
        }
      }
      return Object.assign({}, state, {
        byId: newIdMap
        , lists: Object.assign({}, state.lists, {
          [action.listType]: productList(state.lists[action.listType], action)
        })
      })

    // case Actions.REQUEST_PRODUCT_LIST:
    //   nextState = Object.assign({}, state, {});
    //   nextState.lists.all.isFetching = true;
    //   nextState.lists.all.error = null;
    //   nextState.lists.all.items = [];
    //   return nextState;
    // case Actions.RECEIVE_PRODUCT_LIST:
    //   nextState = Object.assign({}, state, {});
    //   if(action.success) {
    //     //add api array objects to map
    //     //NOTE: should the "all" list overwrite the map? others only add to the map.
    //     let newIdMap = Object.assign({}, state.byId, {});
    //     let idArray = [];
    //     for(var i = 0; i < action.list.length; i++) {
    //       idArray.push(action.list[i]._id);
    //       newIdMap[action.list[i]._id] = action.list[i];
    //     }
    //     //if "all" is a just a string type, we could generalize this reducer to any "typed" list
    //     nextState.lists.all.isFetching = false;
    //     nextState.lists.all.error = null;
    //     nextState.lists.all.items = idArray;
    //     nextState.lists.all.didInvalidate = false;
    //     nextState.lists.all.lastUpdated = action.receivedAt
    //     nextState.byId = newIdMap;
    //     return nextState;
    //   } else {
    //     nextState.lists.all.isFetching = false;
    //     nextState.lists.all.error = action.error;
    //     nextState.lists.all.items = [];
    //     nextState.lists.all.didInvalidate = true;
    //     nextState.lists.all.lastUpdated = action.receivedAt
    //     return nextState;
    //   }
    // case Actions.SET_PRODUCT_FILTER:
    //   let newList = Object.assign({}, state.lists[action.listType], {});
    //   // newList.
    //   return Object.assign({}, state, {
    //     //TODO
    //   })

    // case Actions.SET_PRODUCT_SORT:
    //   return Object.assign({}, state, {
    //     sortBy: action.sortBy
    //     , type: action.listType
    //   })
    // case Actions.SET_PRODUCT_QUERY:
    //   return Object.assign({}, state, {
    //     query: action.query
    //     , listType: action.listType
    //   })
    // case Actions.SET_PRODUCT_PAGINATION:
    //   return Object.assign({}, state, {
    //     pagination: action.pagination
    //   })
    // case Actions.INVALIDATE_PRODUCT_LIST:
    //   let nextState = Object.assign({}, state, {});
    //   nextState.lists[action.listType].didInvalidate = true;
    //   return nextState;

    default:
      return state
  }
}

export default product;
