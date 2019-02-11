/**
 * Helper component that lests users select items from a simple array
 *
 * NOTE: To use -
 *
 * render() {
 *   var things = ["Thing One", "Thing Two", "Thing Three"];
 *   return (
 *     <div>
 *       <SelectFromArray
 *         items={things}
 *         change={this._onSelectChange}
 *         value={"Thing One"} //- optional
 *         placeholder="-- Select a Thing -- "
 *       />
 *     </div>
 *   )
 * }
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class SelectFromArray extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || ''
    }
    this._bind(
      '_handleSelectChange'
      , '_capitalizeFirstLetter'
    );
  }

  // check against any new props the component receives
  componentWillReceiveProps(nextProps) {
    if(this.props.value != nextProps.value){
      this.setState({selected: nextProps.value});
    }
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _handleSelectChange(e) {
    this.setState({
      selected: e.target.value
    });
    this.props.change(e);
  }

  render() {
    const { disabled, items, label, name, placeholder, required } = this.props;

    // build the items to select from
    let theItems = items.map((item, index) => {
      let display = this._capitalizeFirstLetter(item);
      return (
        <option key={index} value={item}>
          {display}
        </option>
      )
    });

    // render placeholder
    if(placeholder) {
      var placeholderText = <option key="-1" value={-1}>{placeholder}</option>;
      theItems.unshift(placeholderText);
    }

    const requiredText = required ? "(required)" : "";

    return (
      <div className="form-group-select input-group">
        <label htmlFor={name}>{label} <span className="subhead">{requiredText}</span></label>
        <select
          disabled={disabled}
          name={name}
          onChange={this._handleSelectChange}
          required={required}
          value={this.state.selected}
        >
          {theItems}
        </select>
      </div>
    )
  }
}

SelectFromArray.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , items: PropTypes.array.isRequired
  , label: PropTypes.string
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , value: PropTypes.any.isRequired
}

SelectFromArray.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: '-- Select from the following --'
  , required: false
}

export default SelectFromArray;
