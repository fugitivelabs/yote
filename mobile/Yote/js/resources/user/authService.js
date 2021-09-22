/**
 * This set of hooks is how we'll interact with the authStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// import all of the actions from the store
import {
  sendGetLoggedIn
  , selectLoggedInUser
  , selectAuthStatus
} from './authStore';


// Define the hooks that we'll use to manage data in the components

/**
 * This hook will check for loggedInUser in the store and fetch it if necessary
 * using the browser cookie
 * @returns an object containing fetch info and eventually the loggedInUser
 */
export const useLoggedInUser = () => {
  const dispatch = useDispatch();
  // get the loggedInUser from the store
  const loggedInUser = useSelector(store => selectLoggedInUser(store));
  // get the query status from the store
  const status = useSelector(store => selectAuthStatus(store));
  
  useEffect(() => {
    // only fetch if we need to
    if(!loggedInUser && status === 'idle') {
      dispatch(sendGetLoggedIn());
    }
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [loggedInUser, status, dispatch]);

  const isFetching = (!loggedInUser && status === 'idle') || status === 'pending' || status === undefined;
  const isLoading = isFetching && !loggedInUser;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !loggedInUser;

  // return the info for the caller of the hook to use
  return {
    loggedInUser
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
  }
}
