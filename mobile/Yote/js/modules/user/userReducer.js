
import * as Actions from './userActions';

function userList(state = {
  //default state for a list
  // NOTE that this is not actually initialized here. the actual init happens the first time REQUEST_LIST is called.
  // this is for reference only
  items: [] //array of _id's
  , isFetching: false
  , error: null
  , didInvalidate: false
  , lastUpdated: null
  , pagination: {}
  , filter: {}
}, action) {
  // console.log("DEBUG", state, action.listArgs);
  let nextAction = JSON.parse(JSON.stringify(action)); //change copy not original object
  nextAction.listArgs.shift();
  if(nextAction.listArgs.length > 0) {
    //action is asking for a nested state, like lists[workout][123ABC]. return additional userList reducer.
    return Object.assign({}, state, {
      [nextAction.listArgs[0]]: userList(state[nextAction.listArgs[0]] || {}, nextAction)
    })
  } else {
    //don't nest any more, return actual user list store
    switch(action.type) {
      case Actions.INVALIDATE_USER_LIST: {
        return Object.assign({}, state, {
          didInvalidate: true
        })
      }
      case Actions.REQUEST_USER_LIST: {
        return Object.assign({}, state, {
          items: [] //array of _id's
          , isFetching: true
          , error: null
          , lastUpdated: null
          , pagination: state.pagination || {}
          , filter: state.filter || {}
        })
      }
      case Actions.RECEIVE_USER_LIST: {
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
      case Actions.SET_USER_FILTER: {
        return Object.assign({}, state, {
          filter: action.filter
        })
      }
      case Actions.SET_USER_PAGINATION: {
        return Object.assign({}, state, {
          pagination: action.pagination
        })
      }
      default:
        return state;
    }
  }
}

function user(state = {
  //define fields for a "new" user
  // a component that creates a new object should store a copy of this in it's state
  defaultItem: {
    username: ""
    , password: ""
    , firstName: ""
    , lastName: ""
    , roles: []
  }
  , byId: {} //map of all items
  , loggedIn: {
    isLoggedIn: false 
    //different from "selected"
    //this is static and does not interact with the byId map
    , user: window.currentUser || {}
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
    , resetUserId: null
    , resetTokenValid: false
    , apiToken: null
  }
  , selected: { //single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }
  , lists: {} //individual instances of the userList reducer above
}, action) {
  switch(action.type) {
//LOGGED IN USER ACTIONS
    case Actions.REQUEST_LOGIN: 
      return Object.assign({}, state, {
        loggedIn: {
          user: {
            username: action.username
          }
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      })
    case Actions.RECEIVE_LOGIN:
      if(!action.success) {
        return Object.assign({}, state, {
          loggedIn: {
            user: {}
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , apiToken: null
          }
        })
      } else {
        return Object.assign({}, state, {
          loggedIn: {
            user: action.user
            , isLoggedIn: true
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
            , apiToken: action.apiToken
          }
        })
      }
    case Actions.REQUEST_REGISTER:
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      })
    case Actions.RECEIVE_REGISTER:
      if(!action.success) {
        return Object.assign({}, state, {
          loggedIn: {
            user: {}
            , isFetching: false
            , error: action.error
            , didInvalidate: true
          }
        })
      } else {
        return Object.assign({}, state, {
          loggedIn: {
            user: action.user
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
            , apiToken: action.apiToken
          }
        })
      }
    case Actions.REQUEST_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: Object.assign({}, state.loggedIn, {
          isFetching: true
          , error: null
        })
      })
    case Actions.RECEIVE_LOGOUT:
      if(!action.success) {
        return Object.assign({}, state, {
          loggedIn: Object.assign({}, state.loggedIn, {
            isFetching: false
            , error: action.error
          })
        })
      } else {
        window.currentUser = {};
        return Object.assign({}, state, {
          loggedIn: {
            //different from "selected"
            //this is static and does not interact with the byId map
            user: {}
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: null
            , resetUserId: null
            , resetTokenValid: false
          }
        })
      }
    //update profile

    case Actions.REQUEST_CHECK_RESET_HEX:
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
          , resetUserId: null
          , resetTokenValid: false
        }
      })

    case Actions.RECEIVE_CHECK_RESET_HEX:
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
          , resetUserId: action.userId || null
          , resetTokenValid: action.success
        }
      })

//SINGLE ITEM ACTIONS
    case Actions.REQUEST_SINGLE_USER:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_SINGLE_USER:
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
    
    case Actions.ADD_SINGLE_USER_TO_MAP:
      console.log("ADD_SINGLE_USER_TO_MAP");
      var newIdMap = Object.assign({}, state.byId, {}); //copy map
      newIdMap[action.item._id] = action.item; //add single
      return Object.assign({}, state, {
        byId: newIdMap
      })

    case Actions.REQUEST_CREATE_USER:
      console.log("REQUEST_CREATE_USER");
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_CREATE_USER:
      console.log("RECEIVE_CREATE_USER");
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

    case Actions.REQUEST_UPDATE_USER:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case Actions.RECEIVE_UPDATE_USER:
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

    case Actions.REQUEST_UPDATE_PROFILE:
      let loggedIn = Object.assign({}, state.loggedIn, {
        isFetching: true
        , error: null
        , status: null
      })
      return Object.assign({}, state, {
        loggedIn
      })
    case Actions.RECEIVE_UPDATE_PROFILE:
      if(action.success) {
        let loggedIn = Object.assign({}, state.loggedIn, {
          isFetching: false
          , error: null
          , status: null
          , user: action.user
        })
        return Object.assign({}, state, {
          loggedIn
        })
      } else {
        let loggedIn = Object.assign({}, state.loggedIn, {
          isFetching: false
          , error: action.error
          , status: null
        })
        return Object.assign({}, state, {
          loggedIn
        })
      } 

    case Actions.REQUEST_DELETE_USER:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case Actions.RECEIVE_DELETE_USER:
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
    case Actions.INVALIDATE_SELECTED_USER:
      return Object.assign({}, state, {
        selected: {
          didInvalidate: true
        }
      })

//LIST ACTIONS
    case Actions.INVALIDATE_USER_LIST:
    case Actions.REQUEST_USER_LIST:
    case Actions.SET_USER_FILTER:
    case Actions.SET_USER_PAGINATION:
      //"forward" on to individual list reducer
      let nextLists = Object.assign({}, state.lists, {});
      return Object.assign({}, state, {
        lists: Object.assign({}, state.lists, {
          [action.listArgs[0]]: userList(state.lists[action.listArgs[0]] || {}, action)
        })
      })
    case Actions.RECEIVE_USER_LIST:
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
          [action.listArgs[0]]: userList(state.lists[action.listArgs[0]], action)
        })
      })
    default:
      return state
  }
}

export default user;
