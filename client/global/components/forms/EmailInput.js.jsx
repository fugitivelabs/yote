/**
 * Helper form component for rendering email inputs.  This handles it's own state
 * and validation. Will only return email to parent component if valid.
 *
 * NOTE: sample regex email validator
 *  _validateEmail(email) {
 *    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 *    return re.test(email);
 *  }
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import third-party libraries
import _ from 'lodash';
import classNames from 'classnames';

// import components
import Base from "../BaseComponent.js.jsx";

class EmailInput extends Base {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.value || ""
      , errorMessage: ""
      , isValid: true
    };
    this._bind(
      '_handleInputChange'
    );
  }

  componentWillReceiveNextProps(nextProps) {
    console.log("NEXT PROPS");
    if(nextProps.value !== this.props.value) {
      console.log("VALUE CHANGED");
    }
  }

  _handleInputChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });

    // Checks for ____@____.__
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    newState.isValid = re.test(newState.email);
    newState.errorMessage = !newState.isValid ? "Please enter a valid email" : null;
    var event = {
      target: {
        name: this.props.name
        , value: "" // return empty email by default
      }
    };
    if(newState.isValid) {
      event.target.value = newState.email; // return valid email
      // only tell parent about a change event if the new value is valid
      this.props.change(event);
    }
    this.setState(newState);
  }

  render() {
    const { disabled, label, value, placeholder, name, required, helpText } = this.props;
    const { email, errorMessage, isValid } = this.state;
    let inputClass = classNames({ "-error": !isValid });

    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          className={inputClass}
          disabled={disabled}
          name="email"
          onChange={this._handleInputChange}
          placeholder={placeholder}
          required={required}
          type="email"
          value={email}
        />
        { !isValid ?
          <div className="-error-message">{errorMessage}</div>
          :
          null
        }
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

EmailInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

EmailInput.defaultProps = {
  helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default EmailInput;
