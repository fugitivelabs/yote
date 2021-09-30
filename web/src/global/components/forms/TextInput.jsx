/**
 * Helper component for rendering basic text inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  change
  , disabled
  , helpText
  , label
  , name
  , placeholder
  , required
  , value
}) => {

  return (
    <div className="p-2">
      <label htmlFor={name} className="text-sm"> {label} {required && <sup className="text-red-500">*</sup>}</label>
      <input
        disabled={disabled}
        name={name}
        onChange={change}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
        className="text-base border border-solid w-full p-2 block rounded-sm"
      />
      {helpText && <small className=""><em>{helpText}</em></small>}
    </div>
  )
}

TextInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default TextInput;
