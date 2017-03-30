/**
 * Helper component for rendering url inputs
 *
 * TODO: add REGEX validators for urls
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import components
import Base from "../BaseComponent.js.jsx";

class UrlInput extends Base {
  constructor(props) {
    super(props);
    this.state = { theVal: '' };
    this._bind(
      '_handleInputChange'
      , '_validateUrl'
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.theVal) {
      var val = nextProps.value;
      this.setState({theVal: val});
    }
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  _validateUrl(url) {
    // TODO: use URL regex validator here
  }

  render() {
    const { label, value, placeholder, name, required } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          type="url"
          name={name}
          placeholder={placeholder}
          value={this.state.theVal}
          onChange={this._handleInputChange}
          required={required}
        />
      </div>
    )
  }
}

UrlInput.propTypes = {
  change: PropTypes.func.isRequired
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

UrlInput.propTypes = {
  label: ''
  , placeholder: ''
  , required: false
}

export default UrlInput;
