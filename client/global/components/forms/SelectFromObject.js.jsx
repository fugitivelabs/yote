import React from 'react';

import Base from "../BaseComponent.js.jsx";

class SelectFromObject extends Base{

  //required fields:
  //  objects (array of objects to use or map of objects)
  //  display (string field in the objects to display)
  //  value (string field in objects to use as value)
  //optional:
  //  change callback (returns selected value)
  //  selected object (string that matches to an object)
  //  placeholder     (string that shows a default placeholder)

  //example showing how to assiang an author for Post objects:
  // //- get list of available authors who look liks this { username: '', _id: ''}
  // <SelectFromObject
  //   name="author"
  //   label="Author"
  //   objects={authors}
  //   display={'username'}
  //   value={'_id'}
  //   selected={post.author}
  //   change={handleFormChange}
  //   placeholder="-- Select an author --"
  // />

  constructor(props, context) {
    super(props);
    this.state = {
      selected: this.props.selected || ''
    }
    this._bind('_handleSelectChange');
  }

  // check the props the component receives
  componentWillReceiveProps(nextProps, nextState) {
    // console.log("SelectFromObject props");
    // console.log(nextProps);
    if(this.props.selected != nextProps.selected){
      this.setState({selected: nextProps.selected});
    }

  }

  _handleSelectChange(e) {
    this.setState({
      selected: e.target.value
    });
    this.props.change(e);
  }

  render() {
    const { objects, value, display, name, label, placeholder, required } = this.props;
    let options = [];
    // objects is an array
    if(typeof(options) == "array") {
      options = objects.map((object, index) => {
        return (
          <option key={index} value={object[value]}>
            {object[display]}
          </option>
        )
      });
    } else {
      // objects is a map {}
      for(let i in objects) {
        if(objects.hasOwnProperty(i)) {
          options.push(
            <option key={objects[i]._id} value={objects[i][value]}>
              {objects[i][display]}
            </option>
          )
        }
      }
    }
    if(placeholder) {
      // console.log("has placeholder value");
      var placeholderText = <option key="-1" value={''}>{placeholder}</option>;
      options.unshift(placeholderText);
    }
    return(
      <div className="select-from-object input-group">
        <label htmlFor={name}> {label} </label>
        <select
          name={name}
          onChange={this._handleSelectChange}
          value={this.state.selected}
          required={required}
          >
          {options}
        </select>
      </div>
    )
  }
}

SelectFromObject.propTypes = {
  objects: React.PropTypes.oneOfType([
    React.PropTypes.array
    , React.PropTypes.object
  ]).isRequired
  , display: React.PropTypes.string.isRequired
  , value: React.PropTypes.string.isRequired
  , change: React.PropTypes.func.isRequired // should this be required??
  , selected: React.PropTypes.string
  , placeholder: React.PropTypes.string
  , required: React.PropTypes.bool
  , helpText: React.PropTypes.any
}

export default SelectFromObject;
