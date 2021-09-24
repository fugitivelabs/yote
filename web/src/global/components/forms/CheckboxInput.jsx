/**
 * Helper component for rendering basic checkbox inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({
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
    <div className="">
      <label htmlFor={name}> {label} {required && <sup className="">*</sup>}</label>
      <input
        disabled={disabled}
        checked={!!value}
        name={name}
        onChange={e => {
          change({
            target: {
              name: name
              , value: e.target.checked
            }
          })
        }}
        placeholder={placeholder}
        required={required}
        type="checkbox"
        value={value}
      />
      {helpText && <small className=""><em>{helpText}</em></small>}
    </div>
  )
}

CheckboxInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.bool.isRequired
}

CheckboxInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default CheckboxInput;
