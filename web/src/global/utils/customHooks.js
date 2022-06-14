/**
 * Custom hooks are stateful, reusable chunks of logic that we can use in functional components
 * Handy to cut down on repetitive boilerplate
 */
import { useState, useEffect } from 'react'

/**
 * This hook handles pagination state
 * @param {object} initialPagination - a pagination object, default is { page: 1, per: 10 }
 * @returns the pagination object and `setPage` and `setPer` functions
 */
export const usePagination = (initialPagination = { page: 1, per: 10 }) => {
  
  // use the built-in `useState` hook to handle state
  const [pagination, setPagination] = useState(initialPagination);

  // create specific actions to update pagination
  const setPage = newPage => {
    setPagination(state => ({ ...state, page: newPage || 1 }));
  }

  const setPer = newPer => {
    setPagination(state => ({ ...state, per: newPer || 10 }));
  }

  return { ...pagination, setPage, setPer };
}

/**
 * 
 * @returns {boolean} - true if the window is focused, false otherwise
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
