import * as Actions from '../actions/userSingleActions';
import  { listActions } from '../actions';


function user(state = {
  isFetching: false
  , error: null
  , isLoggedIn: false
  , status: null
  , items: []
  , itemMap: {}
  , current: {}
  , apiToken: null
  }, action) {
    switch(action.type) {
      case Actions.REQUEST_LOGIN:
        return Object.assign({}, state, {
          isFetching: true
          , current: {
            username: action.username
          }
          , error: null
          , status: null
        })
      case Actions.RECEIVE_LOGIN:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , current: action.user
            , apiToken: action.token
            , error: null
            , isLoggedIn: true
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , current: {}
            , error: action.error
            , isLoggedIn: false
          })
        }

      case Actions.REQUEST_LOGOUT:
        // clear local store
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case Actions.RECEIVE_LOGOUT:
        // just clear the store for now
        return Object.assign({}, state, {
          isFetching: false
          , current: {}
          , single: null
          , error: null
          , isLoggedIn: false
        })

        // if(action.success) {
        //   return Object.assign({}, state, {
        //     isFetching: false
        //     , user: {}
        //     , error: null
        //     , isLoggedIn: false
        //   })
        // } else {
        //   return Object.assign({}, state, {
        //     isFetching: false
        //     , error: action.error
        //     , isLoggedIn: true
        //   })
        // }
      case Actions.REQUEST_REGISTER:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case Actions.RECEIVE_REGISTER:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , current: action.user
            , error: null
            , isLoggedIn: true
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , current: {}
            , error: action.error
            , isLoggedIn: false
          })
        }
        case Actions.REQUEST_PASSWORD_RESET:
          return Object.assign({}, state, {
            isFetching: true
            , error: null
            , status: null
          })
        case Actions.RECEIVE_PASSWORD_RESET_REQUEST:
          return Object.assign({}, state, {
            isFetching: false
            , error: action.error
            , status: null
          })
        case Actions.REQUEST_UPDATE_PROFILE: 
          return Object.assign({}, state, {
            isFetching: true
            , error: null
            , status: null
          })
        case Actions.RECEIVE_UPDATE_PROFILE: 
          if(action.success) {
            let newUser = state.current;
            newUser.username = action.user.username;
            newUser.firstName = action.user.firstName;
            newUser.lastName = action.user.lastName; 
            // newUser.info.profilePicUrl = action.user.info.profilePicUrl; 
            return Object.assign({}, state, {
              isFetching: false
              , current: newUser
              , error: action.error
              , status: null
            })
          } else {

            return Object.assign({}, state, {
              isFetching: false
              , error: action.error
              , status: null
            })
          }
          case listActions.REQUEST_USER_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_USER_LIST:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , itemMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , itemMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case listActions.REQUEST_USER_LIST_BY_SQUAD:
      return Object.assign({}, state, {
        isFetching: true
      })
    case listActions.RECEIVE_USER_LIST_BY_SQUAD:
      if(action.success) {
        return Object.assign({}, state, {
          isFetching: false
          , items: action.list
          , itemMap: action.itemMap
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false
          , items: []
          , itemMap: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    case listActions.SET_USER_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      })

    case listActions.SET_USER_SORT:
      return Object.assign({}, state, {
        sortBy: action.sortBy
      })
    case listActions.SET_USER_QUERY:
      return Object.assign({}, state, {
        query: action.query
      })
    case listActions.SET_USER_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      })
      default:
        return state
    }
  }

export default user;
