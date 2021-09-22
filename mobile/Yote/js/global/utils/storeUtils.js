/**
 *  a set of utils shared by all resource reducers (called slices)
 */



/**
 * Helper method to determine whether to make the fetch from the server or not.
 * @param {object} query - the query object from the reducer query map
 * @returns {boolean} true || false
 */
export const shouldFetch = (query) => {
  /**
   * 
   * NOTE: Uncomment console logs to help debugging
   */

  // console.log("Query in question: ", query);
  if(!query) {
    // yes, the query we're looking for wasn't found
    // console.log("X shouldFetch - true: query not found");
    return true;
  } else if(query.status === 'pending') {
    // no, this query is already in progress
    // console.log("X shouldFetch - false: fetching");
    return false
  } else if(query.status === 'rejected') {
    // yes, this query had an error
    // console.log("X shouldFetch - true: isError");
    return true
  } else if(new Date().getTime() > query.expirationDate) {
    // yes, the query has expired
    // console.log("X shouldFetch - true: query has expired");
    return true;
  } else {
    // maybe, depends on if the query was invalidated
    // console.log("X shouldFetch - " + query.didInvalidate + ": didInvalidate");
    return query.didInvalidate;
  }
}

/**
 * Theoretically we could map the objects by any key, not just the _id.
 * @param {[object]} items - An array of objects
 * @param {string} key - The key used to create the map ("_id" by default)
 * @returns a map of items by key
 * @example
 * items: [{_id: 1, name: "first"}, {_id: 2, name: "second"}, etc...]
 * returns: {1: {_id: 1, name: "first"}, 2: {_id: 2, name: "second"}, etc...}
 */
 export const convertListToMap = (items, key = '_id') => {
  return items.reduce((acc, curr) => {
    acc[curr[key]] = curr
    return acc
  }, {})
}