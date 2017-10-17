/**
 * EXAMPLE:
 * This is intended to serve as an example of a static reducer that would need
 * to have some global state/store functionality, but isn't necessarily tied to
 * a server-side resource of any kind.
 *
 * The contactReducer should setup and handle actions for an applications
 * "contact-us" form page.
 */

import { contactActions } from '../actions';

function contactReducer(state = {
  isSending: false
  , lead: {}
}, action) {
  switch (action.type) {
    case contactActions.SETUP_NEW_LEAD: {
      return Object.assign({}, state, {
        isSending: false
        , lead: {
          firstName: ""
          , lastName: ""
          , email: ""
          , message: ""
        }
      });
    }
    case contactActions.REQUEST_NEW_LEAD: {
      return Object.assign({}, state, {
        isSending: true
      })
    }
    case contactActions.RECEIVE_NEW_LEAD: {
      if(action.success) {
        return Object.assign({}, state, {
          isSending: false
          , lead: action.lead
          , error: null
          , lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isSending: false
          , lead: {}
          , error: action.error
          , lastUpdated: action.receivedAt
        })
      }
    }
    default: {
      return state
    }
  }
}

export default contactReducer;
