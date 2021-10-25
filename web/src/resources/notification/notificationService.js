/**
 * This set of hooks is how we'll interact with the notificationStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usePagination, useCheckListArgsReady } from '../../global/utils/customHooks';

import apiUtils from '../../global/utils/api';

// import all of the actions from the store
import {
  selectListItems
  , fetchNotificationList
  , fetchListIfNeeded
  , selectSingleById
  , fetchSingleNotification
  , sendUpdateNotification
  , sendDeleteNotification
  , invalidateQuery
  , selectQuery
  , fetchSingleIfNeeded
  , addPushNotificationToStore
} from './notificationStore';
import { useLoggedInUser } from '../user/authService';

// Define the hooks that we'll use to manage data in the components
// READ
/**
* This hook will check for a fresh notification in the store and fetch a new one if necessary
* 
* @param {string} id - the id of the notification to be fetched
* @param {boolean} forceFetch - optional override to force a fetch from the server
* @returns an object containing fetch info and eventually the notification (as `data`)
* @returns an invalidate and refetch function for convenience
*/
export const useGetNotificationById = (id, forceFetch = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(id) {
      // only fetch if we need to
      if(forceFetch) {
        dispatch(fetchSingleNotification(id));
      } else {
        dispatch(fetchSingleIfNeeded(id))
      }
    } else {
      // no id yet, don't attempt fetch
      // console.log("still waiting for _PascalName__ id");
    }
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [id, forceFetch, dispatch]);

  // get the query status from the store
  const { status, error } = useSelector(store => selectQuery(store, id));
  // get current notification data (if it exists)
  const notification = useSelector(store => selectSingleById(store, id));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !notification;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !notification;

  // return the info for the caller of the hook to use
  return {
    data: notification
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(id))
    , refetch: () => dispatch(fetchSingleNotification(id))
  }
}

/**
* This hook will check for a fresh list in the store and fetch a new one if necessary
* 
* @param {object} listArgs - an object used to construct the query
* @param {boolean} forceFetch - optional override to force a fetch from the server
* @returns an object containing fetch info and eventually the notification list (as `data`)
* @returns an invalidate and refetch function for convenience
*/
export const useGetNotificationList = (listArgs = {}, forceFetch = false) => {
  const dispatch = useDispatch();
  /**
   * NOTE: tracking lists using the query string is easy because the `listArgs` passed into
   * dispatch(fetchNotificationList(listArgs)) are accessed in the store by using action.meta.arg.
   * We could try setting the queryKey to something different (or nesting it) but we'd need to figure
   * out how to access that info in the store. Maybe by passing it along as a named object like:
   * 
   * dispatch(fetchNotificationList({queryString: listArgs, queryKey: someParsedVersionOfListArgs}))
   * 
   */

  // first make sure all list args are present. If any are undefined we will wait to fetch.
  const readyToFetch = useCheckListArgsReady(listArgs);

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

  useEffect(() => {
    if(readyToFetch) {
      if(forceFetch) {
        dispatch(fetchNotificationList(queryString));
      } else {
        dispatch(fetchListIfNeeded(queryString));
      }
    } else {
      // listArgs aren't ready yet, don't attempt fetch
      // console.log("still waiting for listArgs");
    }
  }, [readyToFetch, queryString, forceFetch, dispatch]);

  // get the query info from the store
  const { status, error, totalPages, ids } = useSelector(store => selectQuery(store, queryString));

  // get current list items (if they exist)
  const notifications = useSelector((store) => selectListItems(store, queryString));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !notifications;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !notifications.length;

  if(totalPages) {
    // add totalPages from the query to the pagination object
    pagination.totalPages = totalPages;
  }

  // PREFETCH

  // if we are using pagination we can fetch the next page(s) now
  const nextQueryString = readyToFetch && listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;

  useEffect(() => {
    if(nextQueryString) {
      // fetch the next page now
      dispatch(fetchListIfNeeded(nextQueryString))
    }
  }, [nextQueryString, dispatch]);

  // END PREFETCH

  // return the info for the caller of the hook to use
  return {
    ids
    , data: notifications
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(queryString))
    , refetch: () => dispatch(fetchNotificationList(queryString))
    , pagination
  }
}

// UPDATE

/**
* Use this hook to access the `sendUpdateNotification` action
* 
* Useful if you want to update a notification that you already have access to
* 
* NOTE: Check out `useGetUpdatableNotification` if you want to fetch and update a notification
* 
* @returns the sendUpdateNotification action wrapped in dispatch
* @example // to use in a component
* // access the update action
* const { sendUpdateNotification } = useUpdateNotification();
* // dispatch the update action
* sendUpdateNotification(updatedNotification);
*/
export const useUpdateNotification = () => {
  const dispatch = useDispatch();
  return {
    // return the update action
    sendUpdateNotification: (updatedNotification) => dispatch(sendUpdateNotification(updatedNotification))
  }
}

/**
* Use this hook to fetch a notification and access the `sendUpdateNotification` action
* 
* Under the hood it combines `useGetNotificationById` and `useUpdateNotification` in a more convenient package
* 
* @param {string} id - the id of the notification to be fetched and updated.
* @returns an object containing the sendUpdateNotification function and the fetch for the notification id passed in
* @example // to use in a component
* // access the update action and fetch the notification
* const { sendUpdateNotification, data: notification, ...notificationQuery } = useUpdateNotification(notificationId);
* // dispatch the update action
* sendUpdateNotification(updatedNotification);
*/
export const useGetUpdatableNotification = (id) => {
  // use the existing hook to fetch the notification
  const notificationQuery = useGetNotificationById(id);
  // use the existing hook to access the update action
  const { sendUpdateNotification } = useUpdateNotification();
  return {
    // return the update action and the notification fetch
    sendUpdateNotification: sendUpdateNotification
    , ...notificationQuery
  }
}

// DELETE

/**
* Use this hook to access the `sendDeleteNotification` action
*
* @returns the sendDeleteNotification action wrapped in dispatch
*
* @example // to use in a component
* // access the delete action
* const { sendDeleteNotification } = useDeleteNotification();
* // dispatch the delete action
* sendDeleteNotification(notificationId);
*/
export const useDeleteNotification = () => {
  const dispatch = useDispatch();
  return {
    // return the delete action
    sendDeleteNotification: (id) => dispatch(sendDeleteNotification(id))
  }
}

// OTHERS

/**
 * 
 * This hook will return the logged in user's notifications in the standard yote service format.
 * 
 * NOTE: This must be called with {init: true} at the top level (AND ONLY ONCE AT THE TOP LEVEL) to initialize the EventSource to stream events from the server.
 * If you really need to grab this list from somewhere farther down the tree you can call this same hook without { init: true }.
 * @param {boolean} init - when true, this hook will create a new EventSource and connect to the server.
 * @returns an object containing fetch info and eventually the notification list (as `data`), also returns a function to dismiss the notification
 * 
 */
export const useStreamingNotificationList = ({ init } = {}) => {
  const dispatch = useDispatch();
  // we'll need some way to reference the EventSource object. We'll use a ref to do that.
  const stream = useRef(null);

  // We are currently fetching by loggedInUser id. This should be enforced by the server, but we'll need some way to track the list in the store so we'll use this.
  const loggedInUser = useLoggedInUser();
  const listArgs = { _user: loggedInUser._id };

  // first fetch the list using the standard hook
  const { data: notificationList, ...notificationQuery } = useGetNotificationList(listArgs);
  
  useEffect(() => {
    // when init is true (once at the top level component) we will start the stream
    if(init) {
      // console.log('starting new notification stream');
      // start the stream
      stream.current = new EventSource('/api/notifications/subscribe');
      // set up event handlers
      stream.current.onmessage = event => {
        // received a new notification.
        const notification = JSON.parse(event.data);
        if(notification && notification._id) {
          // this will add the notification to the store and update the notificationList being returned below
          dispatch(addPushNotificationToStore({ notification, queryKey: apiUtils.queryStringFromObject(listArgs) }));
        }
      }
      stream.current.onerror = err => {
        // don't need to do anything here. The stream will automatically reconnect.
        // console.log('event source error! ', err);
      }
    }
    // a return statement at the bottom of `useEffect` will run when the component calling this hook unmounts (like a componentWillUnmount)
    return () => {
      // console.log('stopping the stream');
      // stop the stream
      stream.current && stream.current.close();
    }
  }, []);
  
  const { sendUpdateNotification } = useUpdateNotification();
  // return the notificationList query as normal, it will be updated each time a new notification is received
  return {
    data: notificationList
    , ...notificationQuery
    , sendDismissNotification: (id) => sendUpdateNotification({ _id: id, unread: false })
  }
}

/**
 * NOTE: Only use this if you're sure the notification is already in the store. WILL NOT fetch from the server.
 * @param {string} id - the id of the notification that you want to grab from the store
 * @returns the notification from the store's byId map
 */
 export const useNotificationFromMap = (id) => {
  const notification = useSelector(store => selectSingleById(store, id));
  return notification
}

