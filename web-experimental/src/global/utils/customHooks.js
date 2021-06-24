import { useReducer } from 'react'

/**
 * This little guy handles editing a resource in component state before sending it to the server.
 * @param {object} initialState - the object to be updated
 * @returns [ state, handleChange ]
 */
export const useForm = (initialState = {}) => {
  // The reducer determines what we do when new values come in
  // In the case of a form we want to update the state object with the new values.
  const reducer = (state, newState) => ({ ...state, ...newState })
  
  // useReducer returns a state variable and a function to update it.
  // It is almost the same as useState, but for objects instead of primitives.
  const [state, setState] = useReducer(reducer, initialState);

  const handleChange = e => {
    setState({[e.target.name]: e.target.value});
  }

  return [ state, handleChange ];
}