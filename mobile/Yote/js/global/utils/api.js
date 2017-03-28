import env from '../env';

let rootUrl = env.url;

export default function callAPI(route, method = 'GET', body, headers = { 
    'Accept': 'application/json', 'Content-Type': 'application/json', 'token': store.getState().user.loggedIn.apiToken
  }) {
  console.log("CALLING API FUNCTION");
  // console.log("TOKEN", store.getState().user.loggedIn.apiToken);
  // console.log("URL", route);
  return fetch(`${rootUrl}` + route, {
    headers
    , method
    , credentials: 'same-origin'
    , body: JSON.stringify(body)
  })
  .then(response => response.json())
}
