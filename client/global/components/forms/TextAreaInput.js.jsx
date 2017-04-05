/**
 * Helper component for rendering textarea inputs
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import components
import Base from "../BaseComponent.js.jsx";

class TextAreaInput extends Base {
  constructor(props) {
    super(props);
    this._bind('_handleInputChange');
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  render() {
    const {
      helpText
      , label
      , name
      , placeholder
      , required
      , rows
      , value
    } = this.props;

    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <textarea
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={this._handleInputChange}
          required={required}
          value={value}
          rows={rows}
        >
        </textarea>
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

TextAreaInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , rows: PropTypes.string
  , value: PropTypes.string.isRequired
}

TextAreaInput.defaultProps = {
  helpText: null
  , label: ''
  , placeholder: ''
  , required: false
  , rows: '4'
}

export default TextAreaInput;
