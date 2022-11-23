/**
 * Helper form component for rendering new password inputs.
 *
 * This loads two password inputs and validates them within the component prior
 * to passing the valid password back up through props.
 */

// import primary libraries
import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// password validation regex
const re = /^.{8,}$/;

const NewPasswordInput = ({
  change
  , disabled
  , helpText
  , name
  , ...inputProps
}) => {

  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const handleChange = (e) => {
    const { name: passwordName, value } = e.target;
    if(passwordName === 'pass1') {
      setPass1(value);
    } else if(passwordName === 'pass2') {
      setPass2(value);
    }
  }

  // when pass1 or pass2 changes, check if they match, if so pass the value up to the parent
  useEffect(() => {
    if(pass1 === pass2 && re.test(pass1)) {
      // send the valid password as an event to the parent component
      change({target: {name, value: pass1}});
    } else {
      // send an empty string as an event to the parent component
      change({target: {name, value: ''}});
    }
  }, [pass1, pass2, name, change])

  return (
    <div>
      <div className="p-2">
        <label htmlFor={'pass1'} className="text-sm"> New Password <sup className="text-red-500">*</sup></label>
        <input
          {...inputProps}
          disabled={disabled}
          name={'pass1'}
          onChange={handleChange}
          required={true}
          type="password"
          value={pass1}
          className="text-base border border-solid w-full p-2 block rounded-sm"
        />
        {helpText ? <small><em>{helpText}</em></small> : null}
      </div>
      <div className="p-2">
        <label htmlFor={'pass2'} className="text-sm"> Confirm Password <sup className="text-red-500">*</sup></label>
        <input
          disabled={disabled}
          name={'pass2'}
          onChange={handleChange}
          required={true}
          type="password"
          value={pass2} 
          className="text-base border border-solid w-full p-2 block rounded-sm"
        />
      </div>
    </div>
  )
}
NewPasswordInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , name: PropTypes.string.isRequired
  , disabled: PropTypes.bool
}

export default NewPasswordInput;