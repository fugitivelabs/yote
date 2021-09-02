import { useReducer } from 'react'

/**
 * This little guy handles editing a resource in component state before sending it to the server.
 * @param {object} initialState - the object to be updated
 * @returns [ state, handleChange ]
 */
export const useFormState = (initialState = {}) => {
  // The reducer determines what we do when new values come in
  // In the case of a form we want to update the state object with the new values.
  const reducer = (formState, newState) => ({ ...formState, ...newState })
  
  // useReducer returns a state variable and a function to update it.
  // It is almost the same as useState, but for objects instead of primitives.
  const [formState, setFormState] = useReducer(reducer, initialState);

  const handleChange = e => {
    setFormState({[e.target.name]: e.target.value});
  }

  return [ formState, handleChange ];
}


// This hook handles pagination state.
export const usePagination = (initialState = { page: 1, per: 10 }) => {
  // The reducer determines what we do when new values come in
  // In the case of pagination we want to update the state object with the new values.
  const reducer = (state, newState) => ({ ...state, ...newState })
  
  // useReducer returns a state variable and a function to update it.
  // It is almost the same as useState, but for objects instead of primitives.
  const [pagination, setPagination] = useReducer(reducer, initialState);

  const setPage = newPage => {
    setPagination({page: newPage || 1});
  }

  const setPer = newPer => {
    setPagination({per: newPer || 1})
  }

  return { ...pagination, setPage, setPer};
}