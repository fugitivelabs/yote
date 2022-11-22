/**
 * Helper component for rendering a debounced search input
 * Waits `debounceTime` ms before firing change event
 */

// import primary libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { SearchIcon } from '@heroicons/react/solid';
import { useCallback } from 'react';

const SearchInput = ({
  autoFocus
  , change
  , disabled
  , helpText
  , label
  , name
  , placeholder
  , required
  , value
  , debounceTime = 0
}) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handleChange = useCallback((newValue) => {
    change({ target: { name, value: newValue } });
  }, [change, name])

  useEffect(() => {
    // Fire change event after delay
    const handler = setTimeout(() => {
      handleChange(debouncedValue);
    }, debounceTime);
    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [handleChange, debouncedValue, debounceTime]);

  useEffect(() => {
    if(value !== debouncedValue) {
      setDebouncedValue(value);
    }
  }, [value]);

  return (
    <div
      className="relative w-full mb-4 lg:w-auto border-transparent z-10"
    >
      {label ? (
        <label
          htmlFor={name}
          className="px-2 pl-10 text-xs absolute top-0 left-0 text-gray-500 bg-transparent"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </label>
      )
        :
        null
      }
      <SearchIcon className="absolute top-0 left-0 w-6 h-6 mt-3 ml-3 text-gray-500" />
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        // send the event immediately when the user presses the enter key
        onKeyPress={(e) => e.key === 'Enter' && handleChange(debouncedValue)}
        onChange={(e) => setDebouncedValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        type="text"
        value={debouncedValue}
        className={`px-2 pl-10 text-base text-left ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent bg-indigo-50 disabled:opacity-50`}
      />
      {helpText && <small className="block"><em>{helpText}</em></small>}
    </div>
  )
}

SearchInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

SearchInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default SearchInput;
