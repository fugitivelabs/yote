import env from '../env';

let rootUrl = env.url;

const baseUrl = ""; //later required for server rendering

export default function callAPI(route, method = 'GET', body) {
  console.log("CALLING API FUNCTION");
  return fetch(`${rootUrl}` + route, {
    headers: {
      'Accept': 'application/json'
      , 'Content-Type': 'application/json'
      , 'token': store.getState().user.current.apiToken
    }
    , method
    , credentials: 'same-origin'
    , body: JSON.stringify(body)
  })
  .then(response => response.json())
}
