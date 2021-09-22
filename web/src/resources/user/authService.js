/**
 * This set of hooks is how we'll interact with the authStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// import all of the actions from the store
import {
  selectLoggedInUser
} from './authStore';


// Define the hooks that we'll use to manage data in the components

/**
 * This hook will grab the loggedInUser from the store
 * @returns the loggedInUser object from the auth store
 */
export const useLoggedInUser = () => {
  // get the loggedInUser from the store
  const loggedInUser = useSelector(store => selectLoggedInUser(store));
  return loggedInUser;
}