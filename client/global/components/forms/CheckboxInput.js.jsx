import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class CheckboxInput extends Base {


  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this._bind('_handleInputChange');

  }
  componentDidMount() {
    if(this.props.value === true ) {

      this.setState({isChecked: true});
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
    this.props.change(event, name, value);
    this.setState({isChecked: !this.state.isChecked});

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
  , value: PropTypes.bool
  , name: PropTypes.string
  , checked: PropTypes.bool
  , change: PropTypes.func
}

export default CheckboxInput;
