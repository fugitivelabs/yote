import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class CheckboxInput extends Base {


  constructor(props) {
    super(props);
    this._bind('_handleInputChange');

  }
  // // check the props the component receives
  // componentWillReceiveProps(nextProps) {
  //   // console.log("CheckboxInput props");
  //   // console.log(nextProps);
  // }
  _handleInputChange(e) {
    const event = e;
    const checked = e.target.checked;
    const value = checked;
    const name = e.target.name;
    event.target = Object.assign({}, e.target, {
      checked: checked
      , value: checked
      , name: name
    });
    this.props.change(event);
  }
  render() {
    const { label, value, name, checked } = this.props;
    return (
      <div className="input-group">
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={this._handleInputChange}
        />
        <label htmlFor={name}> {label} </label>
      </div>
    )
  }
}

CheckboxInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.bool
  , name: PropTypes.string
  , checked: PropTypes.bool
  , change: PropTypes.func
}

export default CheckboxInput;
