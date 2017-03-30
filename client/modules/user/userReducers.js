/**
 * Build the User store
 *
 * Follows best practices from Redux documentation:
 *   - Single source of truth
 *   - State/Store is read-only
 *   - Changes are made with pure functions
 *
 * See http://redux.js.org/docs/recipes/StructuringReducers.html for specific
 * docs on structuring reducers
 */

// import user actions
import * as Actions from './userActions';

/**
 * userList reducer -
 *
 * Accepts arbitrary list arguments and recursively builds nested list as needed
 *
 * NOTE: this is never called directly. Only by parent 'user' reducer (defined
 * below) when dealing with a LIST action
 */
function userList(state = {
  /**
   * The "items" object defines the default state for a list
   *
   * NOTE: This is for reference only. The list is not actually initialized here.
   * The actual init happens the first time REQUEST_LIST is called.
   */
  items: [] // array of _id's
  , isFetching: false
  , error: null
  , didInvalidate: false
  , lastUpdated: null
  , pagination: {}
  , filter: {}
}, action) {
  // console.log("DEBUG", state, action.listArgs);
  let nextAction = JSON.parse(JSON.stringify(action)); // Only change copy. NOT the original object.
  nextAction.listArgs.shift();

  /**
   * Check for nested list --
   * If the action is asking for a nested state, like lists[workout][123ABC],
   * then recursively return an _additional_ userList reducer.
   *
   * Otherwise, return the actual user lists' store
   */
  if(nextAction.listArgs.length > 0) {
    /**
     * The action is asking for a nested state, like lists[workout][123ABC].
     * Let's nest it by returning an additional userList reducer and trying again.
     */
    return Object.assign({}, state, {
      [nextAction.listArgs[0]]: userList(state[nextAction.listArgs[0]] || {}, nextAction)
    })
  } else {
    /**
     * Stop nesting. Instead listen for the actions and respond accordingly.
     */
    switch(action.type) {
      case Actions.INVALIDATE_USER_LIST: {
        return Object.assign({}, state, {
          didInvalidate: true
        })
      }
      case Actions.REQUEST_USER_LIST: {
        return Object.assign({}, state, {
          items: [] // array of _id's
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
            items: [] // array of _id's
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
      default: {
        return state;
      }
    }
  }
}

/**
 * Primary user reducer -
 *
 * This is the single source of truth for all things 'user' related within the
 * application. The primary components of the reducer are defined in detail below.
 *
 * The basic idea is that the reducer listens for actions indicating a desired
 * state change and the reducer returns a new _copy_ of the state accordingly.
 */
function user(state = {

  /**
   * "defaultItem" defines fields for a _new_ user
   * any component that creates a new user object should store a copy of this
   * in its state
   */
  defaultItem: {
    username: ""
    , password: ""
    , password2: ""
    , firstName: ""
    , lastName: ""
    , roles: []
  }

  /**
   * "byId" is an object map of all user items in the store. The map's keys are
   * the Mongo ids of the objects by default
   */
  , byId: {}

  /**
   * "loggedIn" is literally the logged in user for the current session
   *
   * NOTE: this is different from "selected", is static, and does _not_ intereact
   * with the "byId" map.
   */
  , loggedIn: {
    user: window.currentUser || {}
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
    , resetUserId: null
    , resetTokenValid: false
  }

  /**
   * "selected" is a single _selected_ entity within the store
   *
   * For example, when assigning roles a single user in /admin, the single user
   * being edited would be defined by "selected"
   */
  , selected: {
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }

  /**
   * "lists" corresponds to individual instances of the userList reducer as
   * defined above.
   *
   * NOTE: when requesting a list, if args are undefined, the lists defaults to
   * lists['all']
   */
  , lists: {}

}, action) {
  /**
   * Listen for the actions and respond accordingly.
   */
  switch(action.type) {
    /**
     * LOGGED IN USER ACTIONS
     */
    case Actions.REQUEST_LOGIN: {
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
    }
    case Actions.RECEIVE_LOGIN: {
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
          }
        })
      }
    }
    case Actions.REQUEST_REGISTER: {
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      })
    }
    case Actions.RECEIVE_REGISTER: {
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
          }
        })
      }
    }
    case Actions.REQUEST_FORGOT_PASSWORD: {
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      })
    }
    case Actions.RECEIVE_FORGOT_PASSWORD: {
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
            user: {}
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      }
    }
    case Actions.REQUEST_UPDATE_PROFILE: {
      let newState = Object.assign({}, state, {});
      newState.loggedIn.isFetching = true;
      return newState;
    }
    case Actions.RECEIVE_UPDATE_PROFILE: {
      let newState = Object.assign({}, state, {});
      if(!action.success) {
        newState.loggedIn.isFetching = false;
        newState.loggedIn.error = action.error;
      } else {
        newState.loggedIn.isFetching = false;
        newState.loggedIn.user = action.user;
        newState.loggedIn.lastUpdated = action.receivedAt;
      }
      return newState;
    }
    case Actions.REQUEST_LOGOUT: {
      return Object.assign({}, state, {
        loggedIn: Object.assign({}, state.loggedIn, {
          isFetching: true
          , error: null
        })
      })
    }
    case Actions.RECEIVE_LOGOUT: {
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
    }
    case Actions.REQUEST_CHECK_RESET_HEX: {
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
    }
    case Actions.RECEIVE_CHECK_RESET_HEX: {
      return Object.assign({}, state, {
        loggedIn: {
          user: {}
          , isFetching: false
          , error: null
          , didInvalidate: false
          , lastUpdated: null
          , resetUserId: action.userId || null
          , resetTokenValid: action.success
        }
      })
    }

    /**
     * SINGLE USER ACTIONS
     */
    case Actions.REQUEST_SINGLE_USER: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_SINGLE_USER: {
      if(action.success) {
        // add object to map
        // console.log("Mapping now");
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
    }
    case Actions.ADD_SINGLE_USER_TO_MAP: {
      let newIdMap = Object.assign({}, state.byId, {}); // copy map
      newIdMap[action.item._id] = action.item; // add single to map
      return Object.assign({}, state, {
        byId: newIdMap
      })
    }
    case Actions.REQUEST_CREATE_USER: {
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_CREATE_USER: {
      if(action.success) {
        // add object to map
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
    }
    case Actions.REQUEST_UPDATE_USER: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_UPDATE_USER: {
      if(action.success) {
        // add object to map
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
    }
    case Actions.REQUEST_DELETE_USER: {
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    }
    case Actions.RECEIVE_DELETE_USER: {
      if(action.success) {
        // remove object from map
        let newIdMap = Object.assign({}, state.byId, {});
        delete newIdMap[action.id]; // remove key
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
    }
    case Actions.INVALIDATE_SELECTED_USER: {
      return Object.assign({}, state, {
        selected: {
          didInvalidate: true
        }
      })
    }

    /**
     * LIST ACTIONS
     */
    case Actions.INVALIDATE_USER_LIST:
    case Actions.REQUEST_USER_LIST:
    case Actions.SET_USER_FILTER:
    case Actions.SET_USER_PAGINATION: {
      // forward these actions on to individual list reducer
      let nextLists = Object.assign({}, state.lists, {});
      return Object.assign({}, state, {
        lists: Object.assign({}, state.lists, {
          [action.listArgs[0]]: userList(state.lists[action.listArgs[0]] || {}, action)
        })
      })
    }
    case Actions.RECEIVE_USER_LIST: {
      // add all new items to the "byId" map before we forward to individual list reducer
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
    }
    default: {
      return state
    }
  }
}

export default user;
