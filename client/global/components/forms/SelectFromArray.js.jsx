import React from 'react';

import Base from "../BaseComponent.js.jsx";

class SelectFromArray extends Base{

  //require fields:
  //  items (array of items to use, i.e. ["Item One", "Item Two", "Item Three"] )
  //optional:
  //  change callback (returns selected value)
  //  selected item (index value of the item in the array)
  //  placeholder     (string that shows a default placeholder)

  // // ex for a generic array of things:
  // render() {
  //   var things = ["Thing One", "Thing Two", "Thing Three"];
  //   return (
  //     <div>
  //       <SelectFromArray
  //         items={things}
  //         change={this._onSelectChange} // required
  //         selected={1} //- optional
  //         placeholder="-- Select a Thing -- " //- optional
  //       />
  //     </div>
  //   )
  // }

  constructor(props) {
    super(props);
    // console.log("construct select from array");
    // console.log(props);
    // console.log(props.value);
    this.state = {
      selected: props.value || ''
    }
    this._bind(
      '_handleSelectChange'
      , '_capitalizeFirstLetter'
    );
  }

  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    // console.log("SelectFromObject props");
    // console.log(nextProps);
    if(this.props.value != nextProps.value){
      this.setState({selected: nextProps.value});
    }
    // nextProps.value ? this.setState({selected: nextProps.value}) : null;
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _handleSelectChange(e) {
    // console.log("handle select change in select");
    this.setState({
      selected: e.target.value
    });
    this.props.change(e, e.target.name, e.target.value);
  }

  render() {
    const { items, placeholder, label, name, required } = this.props;
    var theItems = items.map((item, index) => {
            var display = this._capitalizeFirstLetter(item);
            return (
              <option key={index} value={item}>
                {display}
              </option>
            )
          });
    if(placeholder) {
      // console.log("has placeholder value");
      var placeholderText = <option key="-1" value={-1}>{placeholder}</option>;
      theItems.unshift(placeholderText);
    }

    const requiredText = required ? "(required)" : "";
    return(
      <div className="form-group-select input-group">
        <label htmlFor={name}>{label} <span className="subhead">{requiredText}</span></label>
        <select
          name={name}
          onChange={this._handleSelectChange}
          value={this.state.selected}
          required={required}
          >
          {theItems}
        </select>
      </div>
    )
  }
}

SelectFromArray.propTypes = {
  items: React.PropTypes.array.isRequired
  , change: React.PropTypes.func.isRequired // should this be required?
  , value: React.PropTypes.any 
  , placeholder: React.PropTypes.string
  , label: React.PropTypes.string
  , required: React.PropTypes.bool
}

export default SelectFromArray;
