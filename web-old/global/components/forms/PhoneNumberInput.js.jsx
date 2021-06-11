/**
 * Helper component for rendering phone number inputs. Uses react-phone-number-input package.
 * More info: https://github.com/catamphetamine/react-phone-number-input
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import third party libraries.
import PhoneInput from 'react-phone-number-input/basic-input'

const PhoneNumberInput = ({
  autoFocus
  , change
  , disabled
  , label
  , name
  , placeholder
  , required
  , value
}) => {
  
  return (
    <div className="yt-col input-group">
      <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
      <PhoneInput
        autoFocus={autoFocus}
        disabled={disabled}
        country="US"
        onChange={value => change({ target: { name: name, value: value } })}
        placeholder={placeholder || ''}
        value={value || ''}
      />
    </div>
  )
}

PhoneNumberInput.propTypes = {
  autoFocus: PropTypes.bool
  , change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

PhoneNumberInput.defaultProps = {
  autoFocus: false
  , disabled: false
  , label: ''
  , placeholder: ''
  , required: false
}

export default PhoneNumberInput;
