/**
 * Helper component for rendering textarea inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const TextAreaInput = ({
  change
  , cols
  , disabled
  , helpText
  , label
  , maxlength
  , name
  , placeholder
  , required
  , rows
  , value
  , ...inputProps
}) => {

  return (
    <div className="relative z-0 w-full mb-4 lg:w-auto">
      { label ? (
        <label
          htmlFor={name}
          className="px-2 text-xs absolute duration-300 top-0 -z-1 origin-0 text-gray-500"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </label>
        )
        :
        null
      }
      <textarea
        className={`px-2 text-base ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent`}
        cols={cols}
        disabled={disabled}
        maxLength={maxlength}
        name={name}
        onChange={change}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        {...inputProps}
      />
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
    </div>
  )
}

TextAreaInput.propTypes = {
  change: PropTypes.func.isRequired
  , cols: PropTypes.number
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , maxlength: PropTypes.number
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , rows: PropTypes.number
  , value: PropTypes.string.isRequired
}

TextAreaInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
  , rows: 4
}

export default TextAreaInput;
