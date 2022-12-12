/**
 * Helper component for rendering basic checkbox inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../helpers/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/outline';

const CheckboxInput = ({
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
    <div className="mb-4">
      <div className={`p-2 pb-0 flex items-center w-min hover:${disabled ? '' : 'bg-gray-50'}`}>
        <input
          disabled={disabled}
          className="h-5 w-5 rounded accent-indigo-600"
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
          {...inputProps}
        />
        {label ? (
           <label
           htmlFor={name}
           className={`ml-1 text-xs inline-block whitespace-nowrap`}
          >
            {label} {required && <sup className="">*</sup>}
            {helpText && (
              <Tooltip text={helpText}>
                <InformationCircleIcon className="h-4 w-4 text-gray-500" />
              </Tooltip>
            )}
          </label>
          )
          :
          null
        }
      </div>
      {/* {helpText && <small className="pl-2 text-xs text-gray-500"><em>{helpText}</em></small>} */}
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
