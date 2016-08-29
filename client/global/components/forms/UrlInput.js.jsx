import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class UrlInput extends Base {


  constructor(props) {
    super(props);
    this._bind('_handleInputChange');

  }
  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    // console.log("UrlInput props");
    // console.log(nextProps);
  }
  _handleInputChange(e) {
    // console.log("handleinputchange");
    // console.log(e);
    this.props.change(e);
  }
  render() {
    // console.log("email inpu loading");
    const { label, value, placeholder, name, required } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <input
          type="url"
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

UrlInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.string
  , placeholder: PropTypes.string
  , name: PropTypes.string
  , required: PropTypes.bool
  , change: PropTypes.func
}

export default UrlInput;
