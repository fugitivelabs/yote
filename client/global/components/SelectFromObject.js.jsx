import React from 'react';

import Base from "./BaseComponent.js.jsx";

class SelectFromObject extends Base {

  //require fields: 
  //  objects (array of objects to use)
  //  display (string field in the objects to display)
  //  value (string field in objects to use as value)
  //optional: 
  //  change callback (returns selected value)
  //  selected object (string that matches to an object)

  //ex for Post objects:
  // <SelectFromObject 
  //   objects={this.state.posts} 
  //   display={"title"} 
  //   value={"_id"} 
  //   change={this._onSelectChange} 
  //   selected={"5696ed72d4fe105051db1fb1"} 
  // />

  constructor(props, context) {
    super(props);
    this.state = {
      selected: this.props.selected || null
    }
    this._bind('_handleSelectChange');
  }

  _handleSelectChange(e) {
    console.log("handle select change in select");
    this.setState({
      selected: e.target.value
    });
    this.props.change(e.target.value);
  }

  render() {
    return(
      <div className="select-from-object">
        <select onChange={this._handleSelectChange} value={this.state.selected}>
          {this.props.objects.map(object =>
            <option value={object[this.props.value]}>
              {object[this.props.display]}
            </option>
          )}
        </select>
      </div>
    )
  }
}

SelectFromObject.propTypes = {
  objects: React.PropTypes.array.isRequired
  , display: React.PropTypes.string.isRequired
  , value: React.PropTypes.string.isRequired
  , change: React.PropTypes.func
  , selected: React.PropTypes.string
}

export default SelectFromObject;