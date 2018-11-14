/**
 * Helper component for rendering basic text inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class TextInput extends Binder {
  constructor(props) {
    super(props);
    this._bind('_handleInputChange');
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  render() {
    const {
      disabled
      , label
      , name
      , placeholder
      , required
      , value
    } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          disabled={disabled}
          name={name}
          onChange={this._handleInputChange}
          placeholder={placeholder}
          required={required}
          type="text"
          value={value}
        />
      </div>
    )
  }
}

TextInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: ''
  , required: false
}

export default TextInput;
