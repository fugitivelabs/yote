/**
 * Helper form component for rendering number inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({
  change
  , currency // TODO: add currency and percentage options
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
    <div className="relative z-0 w-full mb-4 lg:w-auto">
      { label ? (
        <label
          htmlFor={name}
          className="px-2 text-xs absolute top-0 -z-1 origin-0 text-gray-500"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </label>
        )
        :
        null
      }
      {/* {currency && <span className="">$</span>} */}
      <input
        className={`px-2 text-base ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent`}
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
      {/* {percent && <span className="">%</span>} */}
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
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
  , value: PropTypes.oneOfType([
    PropTypes.string
    , PropTypes.number
  ])
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
