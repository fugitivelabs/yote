/**
 * Helper component for rendering basic text inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  change
  , disabled
  , label
  , name
  , placeholder
  , required
  , value
}) => {

  return (
    <div className="">
      <label htmlFor={name}> {label} {required ? <sup className="">*</sup> : null}</label>
      <input
        disabled={disabled}
        name={name}
        onChange={change}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
      />
    </div>
  )
}

TextInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: ''
  , required: false
}

export default TextInput;
