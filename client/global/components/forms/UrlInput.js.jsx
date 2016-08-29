import React, { PropTypes } from 'react'

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
    // use URL regex validator here
  }

  render() {
    const { label, value, placeholder, name, required } = this.props;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
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
  label: PropTypes.string
  , value: PropTypes.string
  , placeholder: PropTypes.string
  , name: PropTypes.string
  , required: PropTypes.bool
  , change: PropTypes.func
}

export default UrlInput;
