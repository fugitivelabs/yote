/*****

CONTACT REDUCER

*****/


import { contactActions } from '../actions';
// import * as contactActions from '../actions/landingActions';



function contactReducer(state = {
  isSending: false
  , lead: {}
}, action) {
  switch (action.type) {

    case contactActions.SETUP_NEW_LEAD:
      console.log("SETUP_NEW_LEAD");
      return Object.assign({}, state, {
        isSending: false
        , lead: {
          firstName: ""
          , lastName: ""
          , email: ""
          , message: ""
        }
      });
      break;
    case contactActions.REQUEST_NEW_LEAD:
      return Object.assign({}, state, {
        isSending: true
      })
      break;
    case contactActions.RECEIVE_NEW_LEAD:
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
      break;

    default:
      return state
  }
}

export default contactReducer;
