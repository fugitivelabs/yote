import { useState } from 'react'

/**
 * This little guy handles editing a resource object in component state before sending it to the server
 * @param {object} initialFormState - the object to be updated
 * @returns [ state, handleChange ]
 */
export const useFormState = (initialFormState = {}) => {
  // use build-in `useState` hook to handle state
  const [formState, setFormState] = useState(initialFormState);

  // create a specific action to update nested state while preserving existing state (standard reducer pattern)
  const handleFormChange = e => {
    setFormState(state => ({...state, [e.target.name]: e.target.value}));
  }

  return [ formState, handleFormChange ];
}


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