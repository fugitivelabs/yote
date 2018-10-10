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
import React from 'react';
import PropTypes from 'prop-types';

// import third-party libraries
import _ from 'lodash';
import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';

class UrlInput extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
      , isFocused: false
      , isValid: false
      , url: this.props.value || "http://"
    };
    this._bind(
      '_handleInputChange'
      , '_handleKeyPress'
      , '_isUrlValid'
      , '_toggleFocus'
    );
  }

  componentDidMount() {
    this.setState({
      isValid: this._isUrlValid(this.props.value)
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.props.value) {
      this.setState({
        isValid: this._isUrlValid(nextProps.value)
        , url: nextProps.value
      })
    }
  }

  _handleInputChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });

    newState.isValid = this._isUrlValid(newState.url);
    newState.errorMessage = !newState.isValid ? "Please enter a valid url" : null;
    var event = {
      target: {
        name: this.props.name
        , value: "http://" // return empty url by default
      }
    };
    if(newState.isValid) {
      event.target.value = newState.url; // return valid url
      // only tell parent about a change event if the new value is valid
      this.props.change(event);
    }
    this.setState(newState);
  }

  _toggleFocus() {
    this.setState({isFocused: !this.state.isFocused});
  }

  _isUrlValid(url) {
    // Checks for what???
    // const re = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/;
    const re = /((ftp:\/\/)|(http:\/\/)|(https:\/\/))([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)?(\/([a-zA-Z0-9]+(\.[a-zA-Z]+)?)?)?(\?([a-zA-Z0-9]*=[a-zA-Z0-9]*&?)*)?/;
    // const re = /((ftp:\/\/)|(http:\/\/)|(https:\/\/))[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)?(\/([a-zA-Z0-9]+(\.[a-zA-Z]+)?)?)?(\?([a-zA-Z0-9]*=[a-zA-Z0-9]*&?)*)?/;
    // const re = /^(((ftp|https?):\/\/)((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;
    return re.test(url);
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.isValid) {
      this.props.buttonAction();
    }
  }

  render() {
    const {
      buttonAction
      , disabled
      , glyphiconType
      , helpText
      , label
      , name
      , placeholder
      , required
      , value
    } = this.props;
    const {
      errorMessage
      , isValid
      , url
    } = this.state;
    let inputClass = classNames(
      'field'
      , { "-error": !isValid }
    );
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
        <div className="input-add-on">
          <input
            className={inputClass}
            disabled={disabled}
            name="url"
            onBlur={this._toggleFocus}
            onChange={this._handleInputChange}
            onFocus={this._toggleFocus}
            onKeyPress={this._handleKeyPress}
            placeholder={placeholder}
            required={required}
            style={{width:"94%"}}
            type="url"
            value={url}
          />
          { glyphiconType ?
              <button type="button" className="item" onClick={()=> buttonAction()} disabled={disabled || !this.state.isValid}>
                <i className={glyphiconType}></i>
              </button>
            :
              null
          }
        </div>
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
  buttonAction: PropTypes.func
  , change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , glyphiconType: PropTypes.string
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.string.isRequired
}

UrlInput.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , placeholder: ''
  , required: false
}

export default UrlInput;
