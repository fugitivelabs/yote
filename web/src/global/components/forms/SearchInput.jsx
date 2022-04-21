/**
 * Helper component for rendering a debounced search input
 * Waits `debounceTime` ms before firing change event
 */

// import primary libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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

  useEffect(() => {
    // Fire change event after delay
    const handler = setTimeout(() => {
      change({ target: { name, value: debouncedValue } });
    }, debounceTime);
    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, debounceTime]); // Only re-call effect if value or delay changes

  // send the event immediately when the user presses the enter key
  const handleEnter = () => {
    change({ target: { name, value: debouncedValue } });
  }

  return (
    <div className="p-2">
      <label htmlFor={name} className="text-sm"> {label} {required && <sup className="text-red-500">*</sup>}</label>
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        onKeyPress={(e) => e.key === 'Enter' && handleEnter()}
        onChange={(e) => setDebouncedValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        type="text"
        value={debouncedValue}
        className="text-base border border-solid w-full p-2 block rounded-sm"
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
