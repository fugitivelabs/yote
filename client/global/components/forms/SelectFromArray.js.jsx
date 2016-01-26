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

  constructor(props, context) {
    super(props);
    this.state = {
      selected: this.props.selected || null
    }
    this._bind('_handleSelectChange');
  }

  // // check the props the component receives
  // componentWillReceiveProps(nextProps) {
  //   console.log("SelectFromObject props");
  //   console.log(nextProps);
  // }

  _handleSelectChange(e) {
    console.log("handle select change in select");
    this.setState({
      selected: e.target.value
    });
    this.props.change(e.target.value);
  }

  render() {
    var items = this.props.items.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item}
              </option>
            )
          });
    if(this.props.placeholder) {
      // console.log("has placeholder value");
      var placeholder = <option key="-1" value={-1}>{this.props.placeholder}</option>;
      items.unshift(placeholder);
    }
    return(
      <div className="form-group-select">
        <select onChange={this._handleSelectChange} value={this.state.selected}>
          {items}
        </select>
      </div>
    )
  }
}

SelectFromArray.propTypes = {
  items: React.PropTypes.array.isRequired
  , change: React.PropTypes.func.isRequired // should this be required?
  , selected: React.PropTypes.number // selected index 
  , placeholder: React.PropTypes.string
}

export default SelectFromArray;