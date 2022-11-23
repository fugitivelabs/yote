/**
 * Helper component for rendering radio inputs
 *
 * NOTE: To use -
 * <RadioInput
 *   label="Leaderboard Sort Order"
 *   options={[
 *     {val: 'descending', display: 'Sort Descending'},
 *     {val: 'ascending', display: 'Sort Ascending'},
 *   ]}
 *   name="sortOrder"
 *   value={item.sortOrder}
 *   change={handleFormChange}
 * />
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({
  change
  , helpText
  , inline
  , label
  , name
  , options
  , value
}) => {

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className={`flex ${inline ? 'flex-row' : 'flex-col'}`}>
      {options.map((option, i) => (
        <div key={`${name}_radio_${i}`}className={`p-2 flex items-center w-min hover:${option.disabled ? '' : 'bg-gray-50'} ${option.disabled ? 'opacity-50' : ''}`}>
          <input
            className="h-5 w-5 rounded accent-indigo-600"
            type="radio"
            name={name}
            value={option.val}
            onChange={change}
            checked={option.val === value}
          />
          <label
            htmlFor={name}
            className={`ml-1 text-xs inline-block whitespace-nowrap`}
          >
            {option.display}
          </label>
        </div>
      ))}
      </div>
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
    </div>
  )
}

RadioInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , options: PropTypes.arrayOf(
    PropTypes.shape({
      val: PropTypes.oneOfType([
        PropTypes.string
        , PropTypes.number
        , PropTypes.bool
      ]).isRequired
      , display: PropTypes.string.isRequired
    })).isRequired
  , value: PropTypes.any.isRequired
}

RadioInput.defaultProps = {
  helpText: null
  , label: ''
}

export default RadioInput;
