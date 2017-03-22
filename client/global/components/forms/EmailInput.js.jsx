/**
 * Helper form component for rendering email inputs
 *
 * TODO: add REGEX validators
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import components
import Base from "../BaseComponent.js.jsx";

class EmailInput extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_handleInputChange'
      , '_validateEmail'
    );
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  _validateEmail(email) {
    // TODO: use email regex validator here
  }

  render() {
    const { label, value, placeholder, name, required, helpText } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={this._handleInputChange}
          required={required}
        />
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
