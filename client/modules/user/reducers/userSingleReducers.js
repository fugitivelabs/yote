import * as singleActions from '../actions/userSingleActions';

let defaultUser = {
  username: ""
  , password: ""
  , firstName: ""
  , lastName: ""
  , roles: []
}

function single(state = {
  isFetching: false
  , error: null
  , status: null
  , user: {}
  , newUser: {}
  , resetTokenValid: false
  , resetUserId: null
  }, action) {
    switch(action.type) {
//LOGIN
      case singleActions.REQUEST_LOGIN:
        return Object.assign({}, state, {
          isFetching: true
          , user: {
            username: action.username
          }
          , error: null
          , status: null
          , validResetToken: false
        })
      case singleActions.RECEIVE_LOGIN:
        if(action.success) {
          //set user global object for login checks
          window.currentUser = action.user;
          return Object.assign({}, state, {
            isFetching: false
            , user: action.user
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , user: {}
            , error: action.error
          })
        }
      case singleActions.REQUEST_SINGLE_USER:
        return Object.assign({}, state, {
          newUser: JSON.parse(JSON.stringify(defaultUser))
          , isFetching: true
        })
      case singleActions.RECEIVE_SINGLE_USER:
        return Object.assign({}, state, {
          newUser: action.user
          , isFetching: false
          , error: action.error
        })
//REGISTER
      case singleActions.SETUP_NEW_USER:
        return Object.assign({}, state, {
          newUser: JSON.parse(JSON.stringify(defaultUser))
        })
      case singleActions.REQUEST_REGISTER:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case singleActions.RECEIVE_REGISTER:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , user: action.user
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , user: {}
            , error: action.error
          })
        }
//CREATE
      case singleActions.REQUEST_CREATE_USER:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case singleActions.RECEIVE_CREATE_USER:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , newUser: action.user
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , newUser: {}
            , error: action.error
          })
        }
//LOGOUT
      case singleActions.REQUEST_LOGOUT:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case singleActions.RECEIVE_LOGOUT:
        if(action.success) {
          //remove user global object for login checks
          window.currentUser = {};
          return Object.assign({}, state, {
            isFetching: false
            , user: {}
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , error: action.error
          })
        }
      case singleActions.REQUEST_UPDATE_USER:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case singleActions.RECEIVE_UPDATE_USER:
        if(action.success) {
          return Object.assign({}, state, {
            isFetching: false
            , newUser: action.user
            , error: null
          })
        } else {
          return Object.assign({}, state, {
            isFetching: false
            , newUser: {}
            , error: action.error
          })
        }
      case singleActions.REQUEST_CHECK_RESET_HEX:
        return Object.assign({}, state, {
          isFetching: true
          , resetTokenValid: false
          , resetUserId: null
        })

      case singleActions.RECEIVE_CHECK_RESET_HEX:
        return Object.assign({}, state, {
          isFetching: false
          , resetTokenValid: action.success
          , resetUserId: action.userId || null
        })

      default:
        return state
    }
  }

export default single;
