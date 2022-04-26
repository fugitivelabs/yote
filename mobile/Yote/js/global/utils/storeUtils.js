/**
 *  a set of utils shared by all resource reducers (called slices) and services
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
    // no, this query had an error, re-fetching could cause an infinite loop.
    // console.log("X shouldFetch - false: isError");
    return false
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

// the initial state for all resource stores
export const INITIAL_STATE = {
  /**
   * "byId" is an object map of all resource items in the store. The map's keys are
   * the Mongo ids of the objects by default. This is where all resource objects will live.
   */
  byId: {}

  /**
   * "queries" is an object map of all server fetches for resources. The map's keys are listArgs
   * in the case of list fetches and Mongo ids in the case of single fetches.
   * Each individual query looks like this:
   * 
   * @example {
   *  expirationDate: date
   *  receivedAt: date
   *  status: 'pending' || 'fulfilled' || 'rejected'
   *  // for lists
   *  ids: [mongoId, mongoId]
   *  // for singles
   *  id: mongoId
   * }
   */
  , singleQueries: {}
  , listQueries: {}
};

// reducer handlers, reused across all resource reducers. They manipulate the state object defined above.
export const handleInvalidateQuery = (state, action, cb) => {
  const queryKey = action.payload;
  const query = state.listQueries[queryKey] || state.singleQueries[queryKey];
  if(query) query.didInvalidate = true
  cb && cb(state, action)
}

export const handleInvalidateQueries = (state, action, cb) => {
  const queryKeys = action.payload
  const queries = queryKeys.map(key => state.listQueries[key] || state.singleQueries[key])
  queries.forEach(query => query.didInvalidate = true)
  cb && cb(state, action)
}

export const handleAddSingleToList = (state, action, cb) => {
  const { queryKey, id } = action.payload;
  const query = state.listQueries[queryKey];
  if(query) {
    // add to the list of ids and remove duplicates
    query.ids = [...new Set([...query.ids, id])];
  } else {
    console.log('Could not find list');
  }
  cb && cb(state, action)
}

export const handleCreateFulfilled = (state, action, cb) => {
  // console.log('action', action);
  const resource = action.payload;
  // add it to the map
  state.byId[resource._id] = resource;
  // create a query object for it
  state.singleQueries[resource._id] = {
    id: resource._id
    , status: 'fulfilled'
    , receivedAt: Date.now()
    , expirationDate: Date.now() + (1000 * 60 * 5) // 5 minutes from now
  }

  // A new resource was just created. Rather than dealing with adding it to a list or invalidating specific lists from the component we'll just invalidate the listQueries here.
  Object.keys(state.listQueries).forEach(queryKey => {
    state.listQueries[queryKey].didInvalidate = true;
  });
  cb && cb(state, action);
}

export const handleFetchSinglePending = (state, action, cb) => {
  // update or create a query object for it in the queries map
  state.singleQueries[action.meta.arg] = { ...state.singleQueries[action.meta.arg], id: action.meta.arg, status: 'pending', didInvalidate: false, error: null };
  cb && cb(state, action);
}

export const handleFetchSingleFulfilled = (state, action, cb) => {
  const resource = action.payload;
  // add the resource object to the byId map
  state.byId[resource._id || action.meta.arg] = resource;
  // find the query object for this fetch in the singleQueries map and update query info
  const singleQuery = state.singleQueries[action.meta.arg];
  singleQuery.status = 'fulfilled';
  singleQuery.receivedAt = Date.now();
  singleQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now
  cb && cb(state, action);
}

export const handleFetchSingleRejected = (state, action, cb) => {
  // find the query object for this fetch in the singleQueries map and update query info
  const singleQuery = state.singleQueries[action.meta.arg];
  singleQuery.status = 'rejected';
  singleQuery.error = action.error.message;
  singleQuery.receivedAt = Date.now();
  cb && cb(state, action);
}

export const handleFetchListPending = (state, action, cb) => {
  // update or create the query object for it in the listQueries map
  state.listQueries[action.meta.arg] = { ids: [], ...state.listQueries[action.meta.arg], status: 'pending', didInvalidate: false, error: null };
  cb && cb(state, action);
}

export const handleFetchListFulfilled = (state, action, listKey, cb) => {
  const { [listKey]: resourceList, totalPages, totalCount } = action.payload;
  // update list query
  // convert the array of objects to a map
  const resourceMap = convertListToMap(resourceList, '_id');
  // add the resource objects to the byId map
  state.byId = { ...state.byId, ...resourceMap };
  // find the query object for this fetch in the listQueries map and update query info
  const listQuery = state.listQueries[action.meta.arg];
  // save the array of ids for the returned resourceList
  listQuery.ids = resourceList.map(resource => resource._id);
  // set the rest of the query info
  listQuery.totalPages = totalPages;
  listQuery.totalCount = totalCount;
  listQuery.status = 'fulfilled';
  listQuery.receivedAt = Date.now();
  listQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now

  // while we're here we might as well add a single query for each of these since we know they're fresh
  resourceList.forEach(resource => {
    // add a single query for the resource.
    const singleQuery = {
      id: resource._id
      , status: listQuery.status
      , receivedAt: listQuery.receivedAt
      , expirationDate: listQuery.expirationDate
    };
    state.singleQueries[resource._id] = singleQuery;
  });
  cb && cb(state, action);
}

export const handleFetchListRejected = (state, action, cb) => {
  const listQuery = state.listQueries[action.meta.arg];
  listQuery.status = 'rejected';
  listQuery.error = action.error.message;
  listQuery.receivedAt = Date.now();
  cb && cb(state, action);
}

export const handleMutationPending = (state, action, cb) => {
  // action.meta.arg in this case is the updated resource object that was sent in the PUT
  const updatedResource = action.meta.arg
  // get the resource id
  const id = updatedResource._id;
  // access or create the query object in the map
  state.singleQueries[id] = { ...state.singleQueries[id], id: id, status: 'pending', error: null }
  // optimistic update the version that's in the map
  state.byId[id] = { ...state.byId[id], ...updatedResource }
  cb && cb(state, action);
}

export const handleMutationFulfilled = (state, action, cb) => {
  const resource = action.payload;
  // replace the previous version in the map with the new one from the server
  state.byId[resource._id] = resource;
  // update the query object
  const singleQuery = state.singleQueries[resource._id];
  singleQuery.status = 'fulfilled';
  singleQuery.receivedAt = Date.now();
  singleQuery.expirationDate = Date.now() + (1000 * 60 * 5); // 5 minutes from now
  cb && cb(state, action);
}

export const handleMutationRejected = (state, action, cb) => {
  // action.meta.arg in this case is the updated resource object that was sent in the PUT
  const resource = action.meta.arg;
  // update the query object
  const singleQuery = state.singleQueries[resource._id];
  singleQuery.status = 'rejected';
  singleQuery.error = action.error.message;
  singleQuery.receivedAt = Date.now();
  cb && cb(state, action);
}

export const handleDeletePending = (state, action, cb) => {
  // action.meta.arg in this case is the resource id that was sent in the DELETE
  const resourceId = action.meta.arg;
  // access or create the query object in the map
  state.singleQueries[resourceId] = { ...state.singleQueries[resourceId], id: resourceId, status: 'pending', error: null }
  cb && cb(state, action);
}

export const handleDeleteFulfilled = (state, action, cb) => {
  const resourceId = action.meta.arg;
  Object.keys(state.listQueries).forEach(queryKey => {
    // filter the resource from the existing lists before we remove it from the store below (avoid reference errors)
    state.listQueries[queryKey].ids = state.listQueries[queryKey].ids?.filter(id => id !== resourceId);
    // invalidate existing lists
    state.listQueries[queryKey].didInvalidate = true;
  });
  // remove the query object
  delete state.singleQueries[resourceId];
  // remove it from the map
  delete state.byId[resourceId];
  cb && cb(state, action);
}

export const handleDeleteRejected = (state, action, cb) => {
  const resourceId = action.meta.arg;
  // update the query object
  const singleQuery = state.singleQueries[resourceId];
  singleQuery.status = 'rejected';
  singleQuery.error = action.error.message;
  singleQuery.receivedAt = Date.now();
  cb && cb(state, action);
}

/**
 * The functions below are called a selectors and allow us to select a value from
 * the store.
 * 
 * These are the replacement for the old mapStoreToProps functionality.
 * 
 * Selectors can also be defined inline where they're used, for example: `useSelector((store) => store.athleteClaim.value)`
 * 
 * Because selectors take the whole store as their first argument, and our
 * stores are all structured the same way, we define these at the global
 * level and pass in the store we want to access when we use them.
 * 
 * for example in productService:
 * 
 * const singleProduct = useSelector(store => selectSingleById(store.product, productId))
 * 
 */

/**
 * 
 * @param {object} resourceStore - supplied by useSelector hook in the service file
 * @param {string} queryKey - the key used to access the query from the map
 * @returns an array of resource objects matching the query's `ids` array
 */
export const selectListItems = (resourceStore, queryKey) => {
  const listIds = resourceStore.listQueries[queryKey]?.ids;
  if(listIds) {
    return listIds.map(id => resourceStore.byId[id]);
  } else {
    return null;
  }
}

/**
 * 
 * @param {object} resourceStore - supplied by useSelector hook in the service file
 * @param {string} id - the key used to access the query from the map (resource mongo id)
 * @returns the single resource from the store
 */
export const selectSingleById = (resourceStore, id) => {
  return resourceStore.byId[id];
}

/**
 * 
 * @param {object} resourceStore - supplied by useSelector hook in the service file
 * @param {string} queryKey - the key used to access the query from the map
 * @returns the query object from the store
 */
export const selectQuery = (resourceStore, queryKey) => {
  const query = resourceStore.listQueries[queryKey] || resourceStore.singleQueries[queryKey];
  return query || {};
}