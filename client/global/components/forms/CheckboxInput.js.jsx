import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class CheckboxInput extends Base {


  constructor(props) {
    super(props);
    this._bind('_handleInputChange');

  }
  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    // console.log("TextInput props");
    // console.log(nextProps);
  }
  _handleInputChange(e) {
    console.log("handleinputchange");
    console.log(e.target);
    console.log(typeof(e.target));
    const event = e;
    // const checked = e.target.checked;
    // const value = checked;
    // event.target = Object.assign({}, e.target, {
    //   checked: checked
    //   , value: checked
    // });

    const target = Object.assign({}, e.target);
    console.log(target);
    target.value = target.checked;
    event.target = target;
    // e.target.checked = !e.target.checked;
    // e.target.value = e.target.checked;
    console.log("manipulate event");
    console.log(event);
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
          checked={checked}
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
