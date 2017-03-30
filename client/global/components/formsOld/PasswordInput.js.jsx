/**
 * Helper form component for rendering password inputs
 *
 * TODO: add REGEX validators
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import components
import Base from "../BaseComponent.js.jsx";

class PasswordInput extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_handleInputChange'
      , '_validatePassword'
    );
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  _validatePassword(password) {
    // TODO: check password valid here
  }

  render() {
    const {  helpText, label, name, required, value } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <input
          type="password"
          name={name}
          value={value}
          onChange={this._handleInputChange}
          required={required}
        />
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

PasswordInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

PasswordInput.defaultProps = {
  helpText: null
  , label: ''
  , required: false
}

export default PasswordInput;
