import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class TextAreaInput extends Base {


  constructor(props) {
    super(props);
    this._bind('_handleInputChange');

  }
  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    // console.log("TextAreaInput props");
    // console.log(nextProps);
  }
  _handleInputChange(e) {
    // console.log("handleinputchange");
    // console.log(e);
    this.props.change(e);
  }
  render() {
    const { label, value, placeholder, name, required } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <textarea
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={this._handleInputChange}
          required={required}
          value={value}
        >
          {value}
        </textarea>
      </div>
    )
  }
}

TextAreaInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.string
  , placeholder: PropTypes.string
  , name: PropTypes.string
  , required: PropTypes.bool
  , change: PropTypes.func
}

export default TextAreaInput;
