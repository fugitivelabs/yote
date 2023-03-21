/**
 * Helper component for rendering a debounced search input
 * Waits `debounceTime` ms before firing change event
 */

// import primary libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

// import react-native things
import {
  TextInput
  , View
} from 'react-native';

// import styles
import tw from '../styles/tailwind/twrnc';

const SearchInput = ({
  autoFocus
  , change
  , disabled
  , name
  , placeholder = 'Search'
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
    <View style={tw`p-2 w-full`}>
      <TextInput
        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        onKeyPress={(e) => e.key === 'Enter' && handleEnter()}
        onChange={(e) => setDebouncedValue(e.nativeEvent.text)}
        placeholder={placeholder}
        required={required}
        type="text"
        value={debouncedValue}
        style={tw`p-2 text-lg border-b border-gray-100`}
      />
    </View>
  )
}

SearchInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

SearchInput.defaultProps = {
  disabled: false
  , placeholder: ''
  , required: false
}

export default SearchInput;
