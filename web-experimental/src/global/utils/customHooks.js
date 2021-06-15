import React, { useReducer } from 'react'

// This little guy handles editing a resource in component state before sending it to the server.
// Includes the standard handleChange method so we don't have to define it everywhere.
export const useForm = (initialState = {}) => {
  // The reducer determines what we do when new values come in.
  const reducer = (state, newState) => ({ ...state, ...newState })
  // useReducer returns a state variable and a function to update it.
  // It is almost the same as useState, but for objects instead of primitives.
  const [state, setState] = useReducer(reducer, initialState);

  const handleChange = e => {
    setState({[e.target.name]: e.target.value});
  }

  return [
    state
    , handleChange
  ];
}