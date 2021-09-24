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
  , label
  , name
  , options
  , value
}) => {

  return(
    <div className="">
      <label htmlFor={name}>{label}</label>
      {options.map((option, i) => (
        <div key={i} className="">
          <input
            type="radio"
            name={name}
            value={option.val}
            onChange={change}
            checked={option.val === value}
          />
          <span htmlFor={name} className="">{option.display}</span>
        </div>
      ))}
      {helpText && <small className=""><em>{helpText}</em></small>}
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
