import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { usePagination } from '../../global/utils/customHooks';

import apiUtils from '../../global/utils/api';

import {
  selectListItems
  , selectSingleById
  , selectQuery
} from '../../global/utils/storeUtils';

/**
 * This hook will perform the provided fetch action and return the fetch status and resource from the store.
 * 
 * @param {string} id - the id of the resource to be fetched
 * @param {object} fromStore - the resource specific store that we're getting the resource from (e.g. store.products, store.users, etc)
 * @param {function} sendFetchById - the dispatched action to fetch the resource (e.g. (id) => dispatch(fetchProductById(id)))
 * @param {function} sendInvalidateSingle - the dispatched action to invalidate the resource (e.g. (id) => dispatch(invalidateQuery(id)))
 * @returns an object containing fetch info and eventually the resource (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGetResourceById = ({
  id
  , fromStore
  , sendFetchById
  , sendInvalidateSingle
}) => {

  useEffect(() => {
    sendFetchById(id);
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [id, sendFetchById]);

  const invalidate = () => {
    sendInvalidateSingle(id);
  }

  const refetch = () => {
    sendInvalidateSingle(id);
    sendFetchById(id);
  }

  // get the query status from the store
  const { status, error } = selectQuery(fromStore, id);
  // get current resource from the store (if it exists)
  const resource = selectSingleById(fromStore, id);

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !resource;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !resource;

  // return the info for the caller of the hook to use
  return {
    data: resource
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate
    , refetch
  }
}

/**
 * This hook will perform the provided fetch action and return the fetch status and resource list from the store.
 * 
 * @param {object} listArgs - an object containing the query args to be used for the fetch (e.g. { _user: userId, featured: true })
 * @param {object} fromStore - the resource specific store that we're getting the list from (e.g. store.products, store.users, etc)
 * @param {function} sendFetchList - the dispatched action to fetch the list (e.g. (queryString) => dispatch(fetchProductList(queryString)))
 * @param {function} sendInvalidateSingle - the dispatched action to invalidate the list (e.g. (queryString) => dispatch(invalidateQuery(queryString)))
 * @returns an object containing fetch info and eventually the resource list (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGetResourceList = ({
  listArgs
  , fromStore
  , sendFetchList
  , sendInvalidateList
}) => {
  // isFocused is used to make sure we rerender when this screen comes into focus. This way invalidated lists will be refetched
  const isFocused = useIsFocused();
  /**
  * NOTE: tracking lists using the query string is easy because the `listArgs` passed into
  * dispatch(fetchResourceList(listArgs)) are accessed in the store by using action.meta.arg.
  * We could try setting the queryKey to something different (or nesting it) but we'd need to figure
  * out how to access that info in the store. Maybe by passing it along as a named object like:
  * 
  * dispatch(fetchResourceList({queryString: listArgs, queryKey: someParsedVersionOfListArgs}))
  * 
  */

  // first make sure all list args are present. If any are undefined we will wait to fetch.
  const readyToFetch = apiUtils.checkListArgsReady(listArgs);

  // handle pagination right here as part of the fetch so we don't have to call usePagination every time from each component
  // this also allows us to pre-fetch the next page(s)
  let { page, per } = listArgs;
  let pagination = usePagination({ page, per });

  if(page && per) {
    listArgs.page = pagination.page;
    listArgs.per = pagination.per;
  } else {
    pagination = {};
  }

  // convert the query object to a query string for the new server api
  // also makes it easy to track the lists in the reducer by query string
  const queryString = apiUtils.queryStringFromObject(listArgs) || "all";
  // console.log('queryString', queryString);

  useEffect(() => {
    if(readyToFetch && isFocused) {
      sendFetchList(queryString);
    } else {
      // listArgs aren't ready yet, don't attempt fetch
      // console.log("still waiting for listArgs");
    }
  }, [readyToFetch, queryString, isFocused]);

  // get the query info from the store
  const { status, error, totalPages, ids } = selectQuery(fromStore, queryString);

  // get current list items (if they exist)
  const resources = selectListItems(fromStore, queryString);

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !resources;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !resources.length;

  // add totalPages from the query to the pagination object
  pagination.totalPages = totalPages || 0;

  // PREFETCH
  // if we are using pagination we can fetch the next page(s) now
  const nextQueryString = readyToFetch && listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;

  useEffect(() => {
    if(nextQueryString) {
      // fetch the next page now
      sendFetchList(nextQueryString);
    }
  }, [nextQueryString]);

  // END PREFETCH

  const invalidate = () => sendInvalidateList(queryString);

  const refetch = () => {
    sendInvalidateList(queryString);
    sendFetchList(queryString);
  }

  // return the info for the caller of the hook to use
  return {
    ids
    , data: resources
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate
    , pagination
    , refetch
  }
}


/**
 * This hook is designed to be used with the InfiniteList component.
 * When `getNextPage` is called, it will fetch the next page of resources and add their ids to the array.
 * We're using an array of ids as opposed to an array of objects for performance reasons. Also we don't
 * need the entire objects to render the list, it's assumed we only pass the ids to the list items.
 * 
 * @param {object} listArgs - an object containing the query args to be used for the fetch (e.g. { _user: userId, featured: true })
 * @param {object} listKey - the pluralized name of the resource (e.g. 'products', 'users', etc) as it's returned from the server
 * @param {function} sendFetchList - the dispatched action to fetch the list (e.g. (queryString) => dispatch(fetchProductList(queryString)))
 * @param {function} sendInvalidateLists - the dispatched action to invalidate the accumulated lists (e.g. (queryStrings) => dispatch(invalidateQueries(queryStrings)))
 * @returns an object containing fetch info and eventually the productIds list (as `data`)
 * @returns `refresh` and `getNextPage` functions designed to be used by the calling component
 */
export const useInfiniteResourceList = ({
  listArgs
  , listKey
  , sendFetchList
  , sendInvalidateLists
}) => {
  // keep track of the query keys (each page is a separate query) so we can invalidate all pages on refresh
  const [queryKeys, setQueryKeys] = useState([]);

  // use the existing hook to control pagination
  const { page, per, setPage } = usePagination({ page: 1, per: 20 });

  // this will hold the accumulated pages of resource ids. Each time page changes (and a fetch is made) the resource ids will be added to this list. Each time the query changes the list will be reset.
  const [resourceIds, setResources] = useState([]);

  // these will be updated on each fetch and returned to the component
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const isLoading = isFetching && !resourceIds.length;
  const isError = !!error;
  const isEmpty = !isFetching && !resourceIds.length;

  const queryString = apiUtils.queryStringFromObject(listArgs) || "all";
  // every time query or per changes reset the list.
  useEffect(() => {
    resetResourceList();
  }, [queryString, per]);

  const resetResourceList = () => {
    // if we're already fetching, don't do anything
    if(isFetching) return;
    if(queryKeys.length) {
      // clear the list and reset the page
      setResources([]);
      if(page != 1) {
        // when page changes `fetchNextResources` will be called
        setPage(1);
      } else {
        // still on first page, fetch manually
        fetchNextResources();
      }
    }
  }

  // every time page changes fetch more resources and add them to the list
  useEffect(() => {
    fetchNextResources();
  }, [page]);

  const fetchNextResources = () => {
    // if we're already fetching, don't do anything
    if(isFetching) return;
    // time to fetch next, clear any previous error and set fetching to true
    setIsFetching(true);
    setError(null);
    const newQueryString = apiUtils.queryStringFromObject({ ...listArgs, page, per });
    // add the new query string to the array
    setQueryKeys(keys => ([...keys, newQueryString]));
    // fetch the next page
    sendFetchList(newQueryString).then(resourceRes => {
      const { [listKey]: nextResources = [], totalPages: nextTotalPages, totalCount: nextTotalCount, error } = resourceRes.payload;
      // add the new resources to the list
      setResources((currentResourceIds) => [...currentResourceIds, ...nextResources.map(resource => resource._id)]);
      // update everything else
      setError(error?.message || error);
      setTotalPages(nextTotalPages || 1);
      setTotalCount(nextTotalCount);
      setIsFetching(false);
    });
  }

  // to be used in a component
  const getNextPage = () => {
    const previousPageHasLoaded = !isFetching && resourceIds.length > 0;
    const nextPageExists = page < totalPages;
    // setPage will trigger the next fetch
    if(previousPageHasLoaded && nextPageExists) setPage(page + 1);
  }

  // to be used in a component
  const refresh = () => {
    // dispatch(invalidateQueries(queryKeys));
    sendInvalidateLists(queryKeys)
    // clear current set of query keys
    setQueryKeys([]);
    resetResourceList();
  }

  return {
    data: resourceIds
    , error
    , getNextPage
    , isEmpty
    , isError
    , isFetching
    , isLoading
    , refresh
    , totalCount
  }
}

/**
 * Use this hook to handle the creation or update of a resource.
 * 
 * @param {object} props - props required to access and mutate the resource
 * @param {ServiceHookResponse} props.resourceQuery - the object returned from the resource query hook (e.g. resourceQuery = useGetProductById(productId))
 * @param {function} props.sendMutation - the dispatched action to send the mutation to the server (e.g. (updatedProduct) => dispatch(sendUpdateProduct(updatedProduct)))
 * @param {object?} props.initialState - the initial state we want to apply to the resource returned from the resourceQuery
 * @param {function?} props.onResponse - a callback function that accepts the mutated resource or error
 */
export const useMutateResource = ({
  resourceQuery
  , sendMutation
  , initialState = {} // optional initial state that will override the data returned from the resourceQuery
  , onResponse = () => { }
}) => {
  // STATE
  // set up a state variable to hold the resource, start with what was passed in as initialState (or an empty object)
  const [newResource, setFormState] = useState(initialState);
  // set up a state variable to hold the isWaiting flag
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    // once we have the fetched resource, set it to state
    if(resourceQuery.data) {
      setFormState((currentState) => {
        // override the resource object with anything that was passed in as initialState
        return { ...resourceQuery.data, ...currentState }
      });
    }
  }, [resourceQuery.data])

  // FORM HANDLERS
  // setFormState will replace the entire resource object with the new resource object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    setFormState(currentState => {
      return { ...currentState, [e.target.name]: e.target.value }
    });
  }

  const handleFormSubmit = e => {
    // prevent the default form submit event if present
    e?.preventDefault && e.preventDefault();
    // set isWaiting true so the component knows we're waiting on a response
    setIsWaiting(true)
    // dispatch the create action
    sendMutation(newResource).then(response => {
      // set isWaiting false so the component knows we're done waiting on a response
      setIsWaiting(false)
      // send the response to the callback function
      onResponse(response.payload, response.error?.message);
    })
  }

  // return everything the component needs to create/update the resource
  return {
    ...resourceQuery
    , data: newResource
    , handleFormChange
    , handleFormSubmit
    , setFormState // only used if we want to handle this in a component, will usually use handleFormChange
    // override isFetching if we're waiting for the mutated resource to get returned from the server (for ui purposes)
    , isFetching: isWaiting || resourceQuery.isFetching
  }
}


// TYPES - allows jsdoc comments to give us better intellisense
/**
 * the basic object returned from a standard service hook
 * @typedef {Object} ServiceHookResponse
 * @property {Object} data - the data returned from the store
 * @property {string?} error - the error message returned from the store
 * @property {boolean} isFetching - whether the service is fetching
 * @property {boolean} isError - whether the fetch returned an error
 * @property {boolean} isEmpty - whether the fetch returned no data
 * @property {boolean} isLoading - whether the fetch is loading (fetching with no current data)
 * @property {boolean} isSuccess - whether the fetch has returned successfully
 * 
 */