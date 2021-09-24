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
}) => {

  return (
    <div className="">
      <label htmlFor={name}> {label} {required && <sup className="">*</sup>}</label>
      <textarea
        cols={cols}
        disabled={disabled}
        maxLength={maxlength}
        name={name}
        onChange={change}
        placeholder={placeholder}
        required={required}
        rows={rows}
        type="text"
        value={value}
      />
      <small className=""><em>{helpText}</em></small>
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
