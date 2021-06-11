/**
 * Helper form component for rendering password inputs
 *
 * TODO: add REGEX validators
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';

class PasswordInput extends Binder {
  constructor(props) {
    super(props);
    this._bind(
      '_handleInputChange'
      , '_handleBlur'
    );
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  _handleBlur(e) {
    // TODO: check password valid here
    if(this.props.handleBlur) {
      this.props.handleBlur(e);
    }
  }

  render() {
    const {  errorMessage, helpText, isValid, label, name, required, value } = this.props;
    let inputClass = classNames({ "-error": !isValid });

    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          className={inputClass}
          name={name}
          onBlur={this._handleBlur}
          onChange={this._handleInputChange}
          required={required}
          type="password"
          value={value}
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

PasswordInput.propTypes = {
  change: PropTypes.func.isRequired
  , errorMessage: PropTypes.any
  , handleBlur: PropTypes.func
  , helpText: PropTypes.any
  , isValid: PropTypes.bool
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired

}

PasswordInput.defaultProps = {
  errorMessage: null
  , handleBlur: null
  , helpText: null
  , isValid: true
  , label: ''
  , required: false
}

export default PasswordInput;
