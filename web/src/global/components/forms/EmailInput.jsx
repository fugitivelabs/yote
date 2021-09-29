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
    <div className="p-2">
      <label htmlFor={name} className="text-sm"> {label} {required ? <sup className="text-red-500">*</sup> : null}</label>
      <input
        disabled={disabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type="email"
        value={email}
        className="text-base border border-solid w-full p-2 block rounded-sm"
      />
      { error && <div className="">{error}</div> }
      <small className=""><em>{helpText}</em></small>
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
  const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmailRegex.test(email);
}