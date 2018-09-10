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
  , pagination: {
    page: 1
    , per: 50
  }
  , filter: ''
  , query: ''
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
    return {
      ...state
      , [nextAction.listArgs[0]]: userList(state[nextAction.listArgs[0]] || {}, nextAction)
    }
  } else {
    /**
     * Stop nesting. Instead listen for the actions and respond accordingly.
     */
    switch(action.type) {
      case Actions.INVALIDATE_USER_LIST: {
        return {
          ...state
          , didInvalidate: true
        }
      }
      case Actions.REQUEST_USER_LIST: {
        return {
          ...state
          , items: [] // array of _id's
          , isFetching: true
          , error: null
          , lastUpdated: null
          , pagination: state.pagination || {}
          , filter: state.filter || {}
        }
      }
      case Actions.RECEIVE_USER_LIST: {
        if(!action.success) {
          return {
            ...state
            , items: [] // array of _id's
            , isFetching: false
            , error: action.error
            , lastUpdated: action.receivedAt
          }
        } else {
          let idArray = [];
          for(const item of action.list) {
            idArray.push(item._id);
          }
          return {
            ...state
            , items: idArray
            , isFetching: false
            , error: action.error || null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
      }
      case Actions.SET_USER_FILTER: {
        return {
          ...state
          , filter: action.filter
        }
      }
      case Actions.SET_USER_QUERY: {
        return {
          ...state
          , query: action.query
        }
      }
      case Actions.SET_USER_PAGINATION: {
        return {
          ...state
          ,pagination: action.pagination
        }
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
   * "lists" corresponds to individual instances of the userList reducer as
   * defined above.
   *
   * NOTE: when requesting a list, if args are undefined, the lists defaults to
   * lists['all']
   */
  , lists: {}

  /**
   * "selected" is a single _selected_ entity within the store
   *
   * For example, when assigning roles a single user in /admin, the single user
   * being edited would be defined by "selected"
   */
  , selected: {
    didInvalidate: false
    , error: null
    , getItem: () => {
      return null
    }
    , id: null
    , isFetching: false
    , lastUpdated: null
  }

  /**
   * utility methods to pull things out of the list dynamically
   *
   * For example, when fetching a nested list of products by type and color you
   * would write something like:
   * let list = productStore.util.getList('type', 'apparel', 'color', 'black')
   */
  , util: {
    getKeyArrayFromList: () => {
      return null
    }
    , getList: () => {
      return null
    }
  }

}, action) {
  /**
   * Listen for the actions and respond accordingly.
   */
  let nextState;
  switch(action.type) {
    /**
     * LOGGED IN USER ACTIONS
     */
    case Actions.REQUEST_LOGIN: {
      nextState = {
        ...state
        , loggedIn: {
          user: {
            username: action.username
          }
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      }
      break;
    }
    case Actions.RECEIVE_LOGIN: {
      if(!action.success) {
        nextState = {
          ...state
          , loggedIn: {
            user: {}
            , isFetching: false
            , error: action.error
            , didInvalidate: true
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , loggedIn: {
            user: action.user
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
      }
      break;
    }
    case Actions.REQUEST_REGISTER: {
      nextState = {
        ...state
        , loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      }
      break;
    }
    case Actions.RECEIVE_REGISTER: {
      if(!action.success) {
        nextState = {
          ...state
          , loggedIn: {
            user: {}
            , isFetching: false
            , error: action.error
            , didInvalidate: true
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , loggedIn: {
            user: action.user
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      }
    }
    case Actions.REQUEST_FORGOT_PASSWORD: {
      nextState = {
        ...state
        , loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
        }
      }
      break;
    }
    case Actions.RECEIVE_FORGOT_PASSWORD: {
      if(!action.success) {
        nextState = {
          ...state
          , loggedIn: {
            user: {}
            , isFetching: false
            , error: action.error
            , didInvalidate: true
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , loggedIn: {
            user: {}
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      }
    }
    case Actions.REQUEST_UPDATE_PROFILE: {
      let newState = { ...state };
      newState.loggedIn.isFetching = true;
      nextState = newState;
      break;
    }
    case Actions.RECEIVE_UPDATE_PROFILE: {
      let newState = { ...state };
      if(!action.success) {
        newState.loggedIn.isFetching = false;
        newState.loggedIn.error = action.error;
      } else {
        newState.loggedIn.isFetching = false;
        newState.loggedIn.user = action.user;
        newState.loggedIn.lastUpdated = action.receivedAt;
      }
      nextState = newState;
      break;
    }
    case Actions.REQUEST_LOGOUT: {
      nextState = {
        ...state
        , loggedIn: {
          ...state.loggedIn
          , isFetching: true
          , error: null
        }
      }
      break;
      // return Object.assign({}, state, {
      //   loggedIn: Object.assign({}, state.loggedIn, {
      //     isFetching: true
      //     , error: null
      //   })
      // })
    }
    case Actions.RECEIVE_LOGOUT: {
      if(!action.success) {
        nextState = {
          ...state
          , loggedIn: {
            ...state.loggedIn
            , isFetching: false
            , error: action.error
          }
        }
        break;
        // return Object.assign({}, state, {
        //   loggedIn: Object.assign({}, state.loggedIn, {
        //     isFetching: false
        //     , error: action.error
        //   })
        // })
      } else {
        window.currentUser = {};
        nextState = {
          ...state
          , loggedIn: {
            user: {}
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: null
            , resetUserId: null
            , resetTokenValid: false
          }
        }
        break;
      }
    }
    case Actions.REQUEST_CHECK_RESET_HEX: {
      nextState = {
        ...state
        , loggedIn: {
          user: {}
          , isFetching: true
          , error: null
          , didInvalidate: false
          , lastUpdated: null
          , resetUserId: null
          , resetTokenValid: false
        }
      }
      break;
    }
    case Actions.RECEIVE_CHECK_RESET_HEX: {
      nextState = {
        ...state
        , loggedIn: {
          user: {}
          , isFetching: false
          , error: null
          , didInvalidate: false
          , lastUpdated: null
          , resetUserId: action.userId || null
          , resetTokenValid: action.success
        }
      }
      break;
    }

    /**
     * SINGLE USER ACTIONS
     */
    case Actions.REQUEST_SINGLE_USER: {
      nextState = {
        ...state
        , selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      }
      break;
    }
    case Actions.RECEIVE_SINGLE_USER: {
      if(action.success) {
        // add object to map
        // console.log("Mapping now");
        let newIdMap = { ...state.byId };
        newIdMap[action.id] = action.item;
        nextState = {
          ...state
          , byId: newIdMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      } else {
        let selected = {
          ...state.selected
          , isFetching: false
          , error: action.error
          , lastUpdated: action.receivedAt
        }
        nextState = { ...state, selected };
        break;
      }
    }
    case Actions.ADD_SINGLE_USER_TO_MAP: {
      let newIdMap = { ...state.byId }; // copy map
      newIdMap[action.item._id] = action.item; // add single to map
      nextState = {
        ...state
        , byId: newIdMap
      }
      break;
    }
    case Actions.REQUEST_CREATE_USER: {
      nextState = {
        ...state
        , selected: {
          id: null
          , isFetching: true
          , error: null
        }
      }
      break;
    }
    case Actions.RECEIVE_CREATE_USER: {
      if(action.success) {
        // add object to map
        let newIdMap = { ...state.byId };
        newIdMap[action.id] = action.item;
        nextState = {
          ...state
          , byId: newIdMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , selected: {
            isFetching: false
            , error: action.error
            , lastUpdated: action.receivedAt
          }
        }
        break;
      }
    }
    case Actions.REQUEST_UPDATE_USER: {
      nextState = {
        ...state
        , selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      }
      break;
    }
    case Actions.RECEIVE_UPDATE_USER: {
      if(action.success) {
        // add object to map
        let newIdMap = { ...state.byId };
        newIdMap[action.id] = action.item;
        nextState = {
          ...state
          , byId: newIdMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , selected: {
            isFetching: false
            , error: action.error
            , lastUpdated: action.receivedAt
          }
        }
        break;
      }
    }
    case Actions.REQUEST_DELETE_USER: {
      nextState = {
        ...state
        , selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      }
      break;
    }
    case Actions.RECEIVE_DELETE_USER: {
      if(action.success) {
        // remove object from map
        let newIdMap = { ...state.byId };
        delete newIdMap[action.id]; // remove key
        nextState = {
          ...state
          , byId: newIdMap
          , selected: {
            id: null
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        }
        break;
      } else {
        nextState = {
          ...state
          , selected: {
            isFetching: false
            , error: action.error
            , lastUpdated: action.receivedAt
          }
        }
        break;
      }
    }
    case Actions.INVALIDATE_SELECTED_USER: {
      nextState = {
        ...state
        , selected: {
          didInvalidate: true
        }
      }
      break;
    }

    /**
     * LIST ACTIONS
     */
    case Actions.INVALIDATE_USER_LIST:
    case Actions.REQUEST_USER_LIST:
    case Actions.SET_USER_FILTER:
    case Actions.SET_USER_QUERY:
    case Actions.SET_USER_PAGINATION: {
      // forward these actions on to individual list reducer
      nextState = {
        ...state
        , lists: {
          ...state.lists
          , [action.listArgs[0]]: userList(state.lists[action.listArgs[0]] || {}, action)
        }
      }
      break;
    }
    case Actions.RECEIVE_USER_LIST: {
      // add all new items to the "byId" map before we forward to individual list reducer
      // add items to "byId" before we forward to individual list reducer
      let newIdMap = { ...state.byId };
      if(action.success) {
        for(const item of action.list) {
          newIdMap[item._id] = item;
        }
      }
      nextState = {
        ...state
        , byId: newIdMap
        , lists: {
          ...state.lists
          , [action.listArgs[0]]: userList(state.lists[action.listArgs[0]], action)
        }
      }
      break;
    }
    default: {
      return nextState = state
      break;
    }
  }

  //set getter method for returning single selected item
  nextState.selected = {
    ...nextState.selected
    , getItem: () => {
      if(!nextState.selected.id || nextState.selected.didInvalidate) {
        return null
      } else {
        return nextState.byId[nextState.selected.id]
      }
    }
  }
  
  nextState.util.getList = (...listArgs) => {
    /**
     * utility method for a) determining if a list exists and b) getting those list objects
     * this can be used in the render function of a component to avoid having to
     * type: lists.player && lists.player.[id] && lists.player.[id].items
     * if list doesnt exist yet, it returns null, else returns array of objects
     * not meant to replace the map and individual list reducers, but to reduce
     * boiler plate and produce cleaner code in the front end components.
     */
    if(listArgs.length === 0) {
      // If no arguments passed, make the list we want "all"
      listArgs = ["all"];
    }
    let nextList = nextState.lists;
    for(var i = 0; i < listArgs.length; i++) {
      if(nextList[listArgs[i]]) {
        nextList = nextList[listArgs[i]];
      } else {
        nextList = null;
        break;
      }
    }
    if(!nextList || !nextList.items || nextList.didInvalidate) {
      return null
    } else {
      return nextList.items.map((item) => nextState.byId[item])
    }
  }
  nextState.util.getKeyArrayFromList = (key, ...listArgs) => {
    /**
     * utility method for returning an ARRAY of all of the "key" values
     * for the objects defined in a certain list. for example, if we have
     * a list defined by listArgs ("status", "published"), we can return an
     * array of all that list's author ids by calling:
     * Reducer.getKeyArrayFromList("_author","status","published")
     */
    if(listArgs.length === 0) {
      // If no arguments passed, make the list we want "all"
      listArgs = ["all"];
    }
    let nextList = nextState.lists;
    for(var i = 0; i < listArgs.length; i++) {
      if(nextList[listArgs[i]]) {
        nextList = nextList[listArgs[i]];
      } else {
        nextList = null;
        break;
      }
    }
    if(!nextList || !nextList.items || nextList.didInvalidate) {
      return null
    } else {
      return nextList.items.map((item) => nextState.byId[item][key])
    }
  }

  return nextState
}

export default user;
