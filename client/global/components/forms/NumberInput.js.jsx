import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";


class NumberInput extends Base {


  constructor(props) {
    super(props);
    this.state = { theVal: this.props.value ? this.props.value : 0 };
    this._bind('_handleInputChange');

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.theVal) {
      var val = nextProps.value;
      this.setState({theVal: val});
    }
  }
  _handleInputChange(e) {
    // e.preventDefault();
    // console.log("handleinputchange");
    var newEvent = { 
      target: {
        value: parseFloat(e.target.value)
        , name: e.target.name
      }
    }
    this.props.change(newEvent);
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
            value={this.state.theVal}
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
  , value: PropTypes.number.isRequired
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
