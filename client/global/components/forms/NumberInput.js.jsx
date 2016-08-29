import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class NumberInput extends Base {


  constructor(props) {
    super(props);
    this.state = { val: this.props.value };
    this._bind('_handleInputChange');

  }
  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    if(this.props.value != nextProps.value) {
      // console.log("NumberInput props");
      // console.log(nextProps);
      this.setState({val: nextProps.value});
    }
  }
  _handleInputChange(e) {
    // e.preventDefault();
    // console.log("handleinputchange");
    var val = e.target.value;
    this.setState({val});
    if(!isNaN(parseFloat(val)) && isFinite(val)) {
      this.props.change(e, e.target.name, parseFloat(val));
    }
  }
  render() {
    const { label, placeholder, name, required, min, max, step, disabled , currency, percent } = this.props;
    var currencyAddon = currency ? <span className="item">$</span> : <span/>;
    var percentAddon = percent ? <span className="item">%</span> : <span/>;
    return (
      <div className="input-group">
        <label htmlFor={name}> {label} </label>
        <div className="input-add-on">
          {currencyAddon}
          <input
            className="field u-textRight"
            type="number"
            name={name}
            value={this.state.val}
            min={min}
            max={max}
            step={step}
            onChange={this._handleInputChange}
            disabled={disabled}
            required={required}
          />
          {percentAddon}
        </div>
      </div>
    )
  }
}

NumberInput.propTypes = {
  label: PropTypes.string
  , value: PropTypes.number
  , name: PropTypes.string
  , required: PropTypes.bool
  , change: PropTypes.func
  , min: PropTypes.string
  , max: PropTypes.string
  , step: PropTypes.string
  , disabled: PropTypes.bool
  , percent: PropTypes.bool
  , currency: PropTypes.bool
  , isFloat: PropTypes.bool
}

NumberInput.defaultProps = {
  step: "any"
}

export default NumberInput;
