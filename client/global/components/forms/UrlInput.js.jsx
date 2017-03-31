/**
 * Helper form component for rendering url inputs.  This handles it's own state
 * and validation. Will only return url to parent component if valid.
 *
 * NOTE: sample regex url validator
 *  _validateUrl(url) {
 *    const re = /^(((ftp|https?):\/\/)((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;
 *    return re.test(url);
 *  }
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import third-party libraries
import _ from 'lodash';
import classNames from 'classnames';

// import components
import Base from "../BaseComponent.js.jsx";

class UrlInput extends Base {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://"
      , errorMessage: ""
      , isValid: true
    };
    this._bind(
      '_handleInputChange'
    );
  }

  _handleInputChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });

    // Checks for ____@____.__
    const re = /^(((ftp|https?):\/\/)((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;
    newState.isValid = re.test(newState.url);
    newState.errorMessage = !newState.isValid ? "Please enter a valid url" : null;
    var event = {
      target: {
        name: this.props.name
        , value: "" // return empty url by default
      }
    };
    if(newState.isValid) {
      event.target.value = newState.url; // return valid url
    }
    this.props.change(event);
    this.setState(newState);
  }

  render() {
    const { disabled, label, value, placeholder, name, required, helpText } = this.props;
    const { url, errorMessage, isValid } = this.state;
    let inputClass = classNames({ "-error": !isValid });

    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <input
          className={inputClass}
          disabled={disabled}
          name="url"
          onChange={this._handleInputChange}
          placeholder={placeholder}
          required={required}
          type="url"
          value={url}
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

UrlInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

UrlInput.defaultProps = {
  helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default UrlInput;
