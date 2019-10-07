import React, { useState } from 'react'

const useForm = (callback) => {
  const [resource, setResource] = useState({}); // initialize the resource state with an empty object. It will be replaced by the default object the first time handleChange is called

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    } 
    callback()
  }
  const handleChange = (e) => {
    setResource(resource => ({...resource, [e.target.name]: e.target.value}));
  }

  return {
    handleSubmit,
    handleChange,
    resource
  };
}

export default useForm;