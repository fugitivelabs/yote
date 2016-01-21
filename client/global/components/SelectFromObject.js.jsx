import React from 'react';

import Base from "./BaseComponent.js.jsx";

class SelectFromObject extends Base{

  //require fields: 
  //  objects (array of objects to use)
  //  display (string field in the objects to display)
  //  value (string field in objects to use as value)
  //optional: 
  //  change callback (returns selected value)
  //  selected object (string that matches to an object)
  //  placeholder     (string that shows a default placeholder)

  //ex for Post objects:
  // <SelectFromObject 
  //   objects={this.state.posts} 
  //   display={"title"} 
  //   value={"_id"} 
  //   change={this._onSelectChange} 
  //   selected={"5696ed72d4fe105051db1fb1"} //- optional
  //   placeholder="-- Select an Object -- " //- optional 
  // />

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
    var options = this.props.objects.map((object, index) => {
            return (
              <option key={index} value={object[this.props.value]}>
                {object[this.props.display]}
              </option>
            )
          });
    if(this.props.placeholder) {
      // console.log("has placeholder value");
      var placeholder = <option key="-1" value={null}>{this.props.placeholder}</option>;
      options.unshift(placeholder);
    }
    return(
      <div className="select-from-object">
        <select onChange={this._handleSelectChange} value={this.state.selected}>
          {options}
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