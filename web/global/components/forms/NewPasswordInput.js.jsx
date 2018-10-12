/**
 * Helper form component for rendering new passwords.
 *
 * This loads two password inputs and validates them within the component prior
 * to passing the valid password back up through props.
 *
 * NOTE: Sample REGEX validators:
 * Test for 1 uppercase, 1 lowercase, 1 number, 1 special character, and at least
 * 8 characters long
 * /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
 *
 * Test for string at lease 7 characters long
 * /^.{7,}$/
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import third-party libraries
import _ from 'lodash';
import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';

class NewPasswordInput extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      password1: {
        errorMessage: ""
        , isValid: true
        , text: ""
      }
      , password2: {
        errorMessage: ""
        , isValid: true
        , text: ""
      }
    }
    this._bind(
      '_handleInputChange'
    );
  }

  _handleInputChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });

    // check for at least 7 characters
    const re = /^.{7,}$/;
    newState.password1.isValid = re.test(newState.password1.text);

    // check that passwords match
    newState.password2.isValid = ( newState.password1.text === newState.password2.text );

    if(!newState.password1.isValid) {
      newState.password1.errorMessage = "Password must contain at least 7 characters."
    } else {
      newState.password1.errorMessage = "";
    }

    if(!newState.password2.isValid) {
      newState.password2.errorMessage = "Passwords don't match."
    } else {
      newState.password2.errorMessage = "";
    }
    var event = {
      target: {
        name: this.props.name
        , value: "" // return empty password by default
      }
    };
    if(newState.password1.isValid && newState.password2.isValid) {
      event.target.value = newState.password1.text; // return valid password
    }
    this.props.change(event);
    this.setState(newState);
  }

  render() {
    const { helpText, name, value } = this.props;
    const { password1, password2 } = this.state;
    let input1Class = classNames({ "-error": !password1.isValid });
    let input2Class = classNames({ "-error": !password2.isValid });

    return (
      <div>
        <div className="input-group">
          <label htmlFor="password1"> New Password <sup className="-required">*</sup></label>
          <input
            className={input1Class}
            name="password1.text"
            onChange={this._handleInputChange}
            required={true}
            type="password"
            value={password1.text}
          />
          { !password1.isValid ?
            <div className="-error-message">{password1.errorMessage}</div>
            :
            null
          }
          <small className="help-text"><em>{helpText}</em></small>
        </div>
        <div className="input-group">
          <label htmlFor="password2">Confirm Password <sup className="-required">*</sup></label>
          <input
            className={input2Class}
            name="password2.text"
            onChange={this._handleInputChange}
            required={true}
            type="password"
            value={password2.text}
          />
          { !password2.isValid ?
            <div className="-error-message">{password2.errorMessage}</div>
            :
            null
          }
        </div>
      </div>

    )
  }
}

NewPasswordInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , name: PropTypes.string.isRequired
  , value: PropTypes.string.isRequired

}

NewPasswordInput.defaultProps = {
  helpText: null
}

export default NewPasswordInput;
