/**
 * Helper form component for rendering email inputs.  This handles it's own state
 * and validation. Will only return email to parent component if valid.
 *
 */

// import primary libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EmailInput = ({
  change
  , disabled
  , helpText
  , label
  , name
  , placeholder
  , required
  , value
  , ...inputProps
}) => {

  const [email, setEmail] = useState(value);
  const [error, setError] = useState(null);

  const onChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailIsValid = validateEmail(newEmail);
    if(emailIsValid) {
      // email is valid, clear error and send the valid email as an event
      setError(null);
      change({
        target: {
          name: name
          , value: newEmail
        }
      });
    } else {
      // email is invalid, set error and send an empty string as an event
      setError("Please enter a valid email address");
      change({
        target: {
          name: name
          , value: ""
        }
      });
    }
  }

  return (
    <div className="relative z-0 w-full mb-4 lg:w-auto">
      {label ? (
        <label
          htmlFor={name}
          className="px-2 text-xs absolute top-0 -z-1 origin-0 text-gray-500 bg-transparent z-10"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </label>
        )
        :
        null
      }
      <input
        disabled={disabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type="email"
        value={email}
        className={`px-2 text-base ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent disabled:opacity-70`}
        {...inputProps}
      />
      {error && <div className="text-xs text-red-800">{error}</div>}
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
    </div>
  )
}

EmailInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

EmailInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default EmailInput;

// could move this to a util but it's probably never going to used outside this component
const validateEmail = email => {
  // Checks for ____@____.__
  const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmailRegex.test(email);
}