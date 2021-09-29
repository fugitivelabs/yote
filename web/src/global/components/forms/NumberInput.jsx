/**
 * Helper form component for rendering number inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({
  change
  , currency
  , disabled
  , label
  , helpText
  , max
  , min
  , name
  , percent
  , required
  , step
  , value
}) => {

  return (
    <div className="">
      <label htmlFor={name}> {label} {required && <sup className="">*</sup>}</label>
      {currency && <span className="">$</span>}
      <input
        className=""
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={change}
        disabled={disabled}
        required={required}
      />
      {percent && <span className="">%</span>}
      {helpText && <small className=""><em>{helpText}</em></small>}
    </div>
  )
}

NumberInput.propTypes = {
  change: PropTypes.func.isRequired
  , currency: PropTypes.bool
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , max: PropTypes.string
  , min: PropTypes.string
  , name: PropTypes.string.isRequired
  , percent: PropTypes.bool
  , required: PropTypes.bool
  , step: PropTypes.string
  , value: PropTypes.number.isRequired
}

NumberInput.defaultProps = {
  currency: false
  , disabled: false
  , helpText: null
  , label: ''
  , max: ''
  , min: ''
  , percent: false
  , required: false
  , step: 'any'
}

export default NumberInput;
