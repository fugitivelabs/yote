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
    const { label, name, placeholder, required, value } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={this._handleInputChange}
          required={required}
        />
      </div>
    )
  }
}

TextInput.propTypes = {
  change: PropTypes.func.isRequired
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  label: ''
  , placeholder: ''
  , required: false
}

export default TextInput;
