/**
 * Helper component for rendering password inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
  change
  , disabled
  , label
  , name
  , placeholder
  , required
  , value
}) => {

  return (
    <div className="input-group">
      <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
      <input
        disabled={disabled}
        name={name}
        onChange={change}
        placeholder={placeholder}
        required={required}
        type="password"
        value={value}
      />
    </div>
  )
}

PasswordInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

PasswordInput.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: ''
  , required: false
}

export default PasswordInput;
