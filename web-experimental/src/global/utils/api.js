/**
 * This is a utility to handle default API requests with the Yote server
 */

const apiUtils = {
  // ported from yote actions. Used in productApi to build endpoints for different types of list fetches.
  getEndpointFromListArgs(baseUrl, listArgs = ['all']) {
    let endpoint = baseUrl;
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      endpoint += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2 && Array.isArray(listArgs[1])) {
      // length == 2 has it's own check, specifically if the second param is an array
      // if so, then we need to call the "listByValues" api method instead of the regular "listByRef" call
      // this can be used for querying for a list of products given an array of product id's, among other things
      endpoint += `/by-${listArgs[0]}-list?`;
      // build query string
      for(let i = 0; i < listArgs[1].length; i++) {
        endpoint += `${listArgs[0]}=${listArgs[1][i]}&`
      }
    } else if(listArgs.length == 2) {
      // ex: ("author","12345")
      endpoint += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      endpoint += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        endpoint += `/${listArgs[i]}`;
      }
    }
    console.log('endpoint', endpoint);
    return endpoint
  }
}

export default apiUtils;
