import * as Actions from '../actions/userSingleActions';

function single(state = {
  isFetching: false
  , error: null
  , status: null
  , user: {}
  }, action) {
    switch(action.type) {
      case Actions.REQUEST_LOGIN:
        return Object.assign({}, state, {
          isFetching: true
          , user: {
            username: action.username
          }
          , error: null
          , status: null
        })
      case Actions.RECEIVE_LOGIN:
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
      default:
        return state
    }
  }

export default single;
