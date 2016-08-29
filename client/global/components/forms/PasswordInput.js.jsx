import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";

class PasswordInput extends Base {

  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleInputChange'
      , '_validatePassword'
    );

  }

  _handleInputChange(e) {
    this.props.change(e);
    this.setState({value: e.target.value});
  }

  _validatePassword(password) {
    // check password valid here
  }

  render() {
    const { label, value, placeholder, name, required } = this.state;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <input
          type="password"
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

PasswordInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.string
  , placeholder: PropTypes.string
  , name: PropTypes.string
  , required: PropTypes.bool
  , change: PropTypes.func
}

export default PasswordInput;
