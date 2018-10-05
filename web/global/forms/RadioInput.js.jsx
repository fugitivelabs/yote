/**
 * Helper component for rendering radio inputs
 *
 * NOTE: To use -
 * <RadioInput
 *   label="Leaderboard Sort Order"
 *   options={[
 *     {val: 'descending', display: 'Sort Descending'},
 *     {val: 'ascending', display: 'Sort Ascending'},
 *   ]}
 *   name="sortOrder"
 *   value={item.sortOrder}
 *   change={handleFormChange}
 *   inLine={true}
 * />
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import third-party libraries
import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';


class RadioInput extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || null
    }
    this._bind(
      '_handleSelectChange'
    )
  }

  componentDidMount() {
    this.setState({selected: this.props.value});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.value !== nextProps.value) {
      this.setState({selected: nextProps.value});
    }
  }

  _handleSelectChange(e) {
    this.props.change(e);
  }

  render() {
    const {  helpText, inLine, label, name, options, selected,  } = this.props;

    const inputClass = classNames(
      'radio-input'
      , { 'inline': inLine }
    )

    var theOptions = options.map((option, i) => {
      var isChecked = option.val === this.state.selected ? true : false;
      return(
        <div key={i} className={inputClass}>
          <input
            type="radio"
            name={name}
            value={option.val}
            onChange={this._handleSelectChange}
            checked={isChecked}
          />
          <span htmlFor={name} className="display">{option.display}</span>
        </div>
      )
    })
    return(
      <div className="input-group">
        <label htmlFor={name}>{label}</label>
        {theOptions}
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }

}

RadioInput.propTypes = {
  change: PropTypes.func.isRequired
  , helpText: PropTypes.any
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , options: PropTypes.arrayOf(
    PropTypes.shape({
      val: PropTypes.oneOfType([
          PropTypes.string
          , PropTypes.number
        ]).isRequired
      , display: PropTypes.string.isRequired
    })).isRequired
  , value: PropTypes.any.isRequired
}

RadioInput.defaultProps = {
  helpText: null
  , label: ''
}

export default RadioInput;
