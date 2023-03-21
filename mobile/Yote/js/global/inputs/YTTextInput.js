/**
 * Reusable TextInput component that translates mobile event api to standard web event api so we can reuse the same handlers.
 * Also avoids warnings related to reusing synthetic events (because we were having to pass the event object via arrow function to the onChange handler, now we don't)
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput
} from 'react-native';

const YTTextInput = ({
  name
  , onChange
  , ...props
}) => {

  const handleChange = text => {
    // emit a web style event to the onChange handler
    onChange({ target: { name, value: text } })
  }
  return (
    <TextInput
      {...props}
      onChangeText={handleChange}
    />
  )
}

TextInput.propTypes = {
  name: PropTypes.string // the name of the field being changed
  , onChange: PropTypes.func // the function to call when the input changes
}

export default YTTextInput;