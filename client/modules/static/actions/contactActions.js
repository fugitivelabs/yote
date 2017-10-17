/**
 * Contact page actions
 */

export const SETUP_NEW_LEAD = "SETUP_NEW_LEAD";
export function setupNewLead() {
  return {
    type: SETUP_NEW_LEAD
  }
}

export const REQUEST_NEW_LEAD = "REQUEST_NEW_LEAD";
function requestNewLead(lead) {
  return {
    type: REQUEST_NEW_LEAD
    , lead
  }
}


export const RECEIVE_NEW_LEAD = "RECEIVE_NEW_LEAD";
function receiveNewLead(json) {
  return {
    type: RECEIVE_NEW_LEAD
    , lead: json.lead
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendNewLead(data) {
  return dispatch => {
    dispatch(requestNewLead(data))
    return fetch('/api/leads', {
      method: 'POST'
      , headers: {
        'Accept': 'application/json'
        , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveNewLead(json)))
  }
}
