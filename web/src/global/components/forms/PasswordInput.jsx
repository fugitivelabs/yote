/**
 * Helper component for rendering password inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
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

  return (
    <div className="relative z-0 w-full mb-4 lg:w-auto">
      { label ? (
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
        onChange={change}
        placeholder={placeholder}
        required={required}
        type="password"
        value={value}
        className={`px-2 text-base ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent disabled:opacity-70`}
        {...inputProps}
      />
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
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