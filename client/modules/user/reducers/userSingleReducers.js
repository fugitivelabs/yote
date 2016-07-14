import * as singleActions from '../actions/userSingleActions';

function single(state = {
  isFetching: false
  , error: null
  , status: null
  , user: {}
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
//REGISTER
      case singleActions.SETUP_NEW_USER:
        return Object.assign({}, state, {
          user: {
            username: ""
            , password: ""
            , firstName: ""
            , lastName: ""
            , roles: []
          }
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
//LOGOUT
      case singleActions.REQUEST_LOGOUT:
        return Object.assign({}, state, {
          isFetching: true
          , error: null
          , status: null
        })
      case singleActions.RECEIVE_LOGOUT:
        if(action.success) {
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
