/**
 * Helper form component for rendering checkboxes
 */

// import primary libraries
import React, { PropTypes } from 'react'

// import components
import Base from "../BaseComponent.js.jsx";

class CheckboxInput extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.checked
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
      , name: name
      , value: checked
    });
    this.props.change(event);
  }

  render() {
    const { label, value, name, checked, helpText } = this.props;
    return (
      <div className="input-group">
        <input
          checked={value}
          name={name}
          onChange={this._handleInputChange}
          type="checkbox"
          value={value}
        />
        <label htmlFor={name}> {label} </label>
        <br/>
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

CheckboxInput.propTypes = {
  change: PropTypes.func.isRequired
  , checked: PropTypes.bool
  , helpText: PropTypes.string
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , value: PropTypes.bool.isRequired
}

CheckboxInput.defaultProps = {
  checked: false
  , helpText: ''
  , label: ''
}

export default CheckboxInput;
