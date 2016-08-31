import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class CheckboxInput extends Base {


  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.checked ? this.props.checked : false
    };
    this._bind('_handleInputChange');

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.isChecked) {
      this.setState({isChecked: !this.state.isChecked})
    }
  }


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


          checked={this.state.isChecked}
          
          onChange={this._handleInputChange}
        />
        <label htmlFor={name}> {label} </label>
      </div>
    )
  }
}

CheckboxInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.bool.isRequired
  , name: PropTypes.string.isRequired
  , checked: PropTypes.bool
  , change: PropTypes.func
}

export default CheckboxInput;
