/**
 * Custom hooks are stateful, reusable chunks of logic that we can use in functional components
 * Handy to cut down on repetitive boilerplate
 */
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

/**
 * This hook handles pagination state, for when we don't want to use url search params (e.g. for infinite scroll?)
 * @param {object} initialPagination - a pagination object, default is { page: 1, per: 10 }
 * @returns the pagination object and `setPage` and `setPer` functions
 */
export const usePagination = (initialPagination = {}) => {

  // use the built-in `useState` hook to handle state
  const [pagination, setPagination] = useState(initialPagination);

  // create specific actions to update pagination
  const setPage = newPage => {
    setPagination(state => ({ ...state, page: newPage || 1 }));
  }

  const setPer = newPer => {
    // reset the page to 1 when we change the per because the number of pages will change (and could be smaller than the current page)    
    setPagination(state => ({ page: 1, per: newPer || 10 }));
  }

  return { ...pagination, setPage, setPer };
}

/**
 * 
 * @returns {boolean} true if the window is focused, false otherwise
 */
export const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(document.visibilityState === 'visible');
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return isFocused;
}

/**
 * 
 * @param {object} defaultValues - an object of default values to assign to the url search params (if they aren't already there)
 * @returns {[queryObject: queryObject, handleChange: Function]} an array with an object containing the search params as key/value pairs and a function to update the search params object
 */
export const useURLSearchParams = (defaultValues = {}) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    // on mount, set default values
    Object.keys(defaultValues).forEach(key => {
      if (!searchParams.has(key)) {
        searchParams.set(key, defaultValues[key].toString());
      }
    });
    history.replace({ search: searchParams.toString() });
  }, [searchParams]);

  // return an object of key value pairs matching the search params to be used in list query
  const queryObject = useMemo(() => {
    const obj = {};
    searchParams?.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const handleChange = useCallback((name, value) => {
    // set the search param if needed
    if (searchParams?.get(name) !== value) {
      searchParams?.set(name, value);
      // reset page to 1 when changing any other query param
      if (searchParams?.has('page') && name !== 'page') {
        searchParams?.set('page', '1');
      }
      history.push({ search: searchParams?.toString() });
    }
  }, [searchParams, history])

  return [queryObject, handleChange];
}