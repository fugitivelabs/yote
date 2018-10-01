/**
 * Helper form component for rendering email inputs
 *
 * TODO: add arbitrary validators
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class NumberInput extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      theVal: this.props.value || 0
    };
    this._bind('_handleInputChange');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.state.theVal) {
      var val = nextProps.value;
      this.setState({theVal: val});
    }
  }

  _handleInputChange(e) {
    var newEvent = {
      target: {
        value: parseFloat(e.target.value)
        , name: e.target.name
      }
    }
    this.props.change(newEvent);
  }

  render() {
    const {
      currency
      , disabled
      , label
      , helpText
      , max
      , min
      , name
      , percent
      , required
      , step
    } = this.props;

    let currencyAddon = currency ? <span className="item">$</span> : null;
    let percentAddon = percent ? <span className="item">%</span> : null;

    return (
      <div className="input-group">
        <label htmlFor={name}> {label} {required ? <sup className="-required">*</sup> : null}</label>
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
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

NumberInput.propTypes = {
  change: PropTypes.func.isRequired
  , currency: PropTypes.bool
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , label: PropTypes.string
  , max: PropTypes.string
  , min: PropTypes.string
  , name: PropTypes.string.isRequired
  , percent: PropTypes.bool
  , required: PropTypes.bool
  , step: PropTypes.string
  , value: PropTypes.number.isRequired
}

NumberInput.defaultProps = {
  currency: false
  , disabled: false
  , helpText: null
  , label: ''
  , max: ''
  , min: ''
  , percent: false
  , required: false
  , step: 'any'
}

export default NumberInput;
