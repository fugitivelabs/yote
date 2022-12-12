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
 * @returns {[searchParams: searchParams, handleChange: Function]} an array with an object containing the search params as key/value pairs and a function to update the search params object
 */
export const useURLSearchParams = (defaultValues = {}) => {
  const location = useLocation();
  const history = useHistory();
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    // on mount, set default values
    Object.keys(defaultValues).forEach(key => {
      // if the search param doesn't exist, set it to the default value, otherwise leave the value as is in the url
      if(!urlSearchParams.has(key)) {
        urlSearchParams.set(key, defaultValues[key].toString());
      }
    });
    // update the url with the default search params, use replace so we don't add a new history entry (we only want to update the url on mount and not add a new history entry)
    history.replace({ search: urlSearchParams.toString() });
    // (react complains about missing dependencies, but we only want this to run on mount, so we disable the console warning)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // return an object of key value pairs matching the search params to be used in list query
  const searchParams = useMemo(() => {
    const obj = {};
    urlSearchParams?.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [urlSearchParams]);

  const handleChange = useCallback((name, value) => {
    // set the search param if needed
    if(urlSearchParams?.get(name) !== value) {
      urlSearchParams?.set(name, value);
      // reset page to 1 when changing any other query param
      if(urlSearchParams?.has('page') && name !== 'page') {
        urlSearchParams?.set('page', '1');
      }
      history.push({ search: urlSearchParams?.toString() });
    }
  }, [urlSearchParams, history])

  return [searchParams, handleChange];
}