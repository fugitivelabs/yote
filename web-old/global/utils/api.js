/**
 * This is a utility to handle default API requests with the Yote server
 */

import _ from 'lodash';
import fetch from 'isomorphic-fetch';

const baseUrl = ""; //later required for server rendering

const apiUtils = {
  callAPI(route, method = 'GET', body, headers = {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }) {
    return fetch(baseUrl + route, {
      headers
      , method
      , credentials: 'same-origin'
      , body: JSON.stringify(body)
    })
    .then(response => response.json())
  }
  , defaultFromSchema(schema) {
    let obj = {};
    for(const key in schema) {
      switch(schema[key].instance) {
        case "Date":
          if(key === 'created' || key === 'updated') {
            // ignore, these are set on server
            break;
          } else {
            obj[key] = new Date()
            console.log(obj)
            break;
          }
        case "String":
          obj[key] = schema[key].defaultValue ? schema[key].defaultValue : '';
          break;
        case "ObjectID":
          if(key === "_id") {
            // ignore, this is set by mongo
            break;
          } else {
            obj[key] = null;
            break;
          }
        case "Number":
          if(key === '__v') {
            // ignore, this is a mongo default;
            break;
          } else {
            obj[key] = schema[key].defaultValue ? schema[key].defaultValue : 0;
            break;
          }
        case "Boolean":
          obj[key] = schema[key].defaultValue ? schema[key].defaultValue : false;
          break;
        default:
          obj[key] = null;
      }
    }
    return obj;
  }
}

export default apiUtils;
