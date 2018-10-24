/**
 * Helper component that lests users select items from a complex array of objects
 *
 * NOTE: To use -
 * // this example shows how to assign an author to a post
 * render() {
 *   var authors = [
 *     { name: 'Bill', _id: '55XYZ' }
 *     , { name: 'Jenny', _id: '56ABC' }
 *     , { name: 'Steve', _id: '57DEF' }
 *   ];
 *   return (
 *     <div>
 *       <SelectFromObject
 *         name="author"
 *         label="Author"
 *         objects={authors}
 *         display={'name'}
 *         value={'_id'}
 *         selected={post.author}
 *         change={handleFormChange}
 *         placeholder="-- Select an author --"
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

class SelectFromObject extends Binder {
  constructor(props, context) {
    super(props);
    this.state = {
      selected: this.props.selected || ''
    }
    this._bind('_handleSelectChange');
  }

  // check agains any new props the component receives
  componentWillReceiveProps(nextProps) {
    nextProps.selected ? this.setState({selected: nextProps.selected}) : '';
  }

  _handleSelectChange(e) {
    this.setState({
      selected: e.target.value
    });
    this.props.change(e);
  }

  render() {
    const { disabled, display, label, name, objects, placeholder, value, required } = this.props;

    // build the items to select from
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
          /**
           * if object has an _id, make that the iterator key, otherwise use object[value]
           * since that is supposed to be unique.
           */
          options.push(
            <option
              key={objects[i]._id ? objects[i]._id : objects[i][value]}
              value={objects[i][value]}
            >
              {objects[i][display]}
            </option>
          )
        }
      }
    }
    // render placeholder
    if(placeholder) {
      var placeholderText = <option key="-1" value={''}>{placeholder}</option>;
      options.unshift(placeholderText);
    }

    const requiredText = required ? "(required)" : "";

    return (
      <div className="select-from-object input-group">
        <label htmlFor={name}>{label} <span className="subhead">{requiredText}</span></label>
        <select
          disabled
          name={name}
          onChange={this._handleSelectChange}
          required={required}
          value={this.state.selected}
        >
          {options}
        </select>
      </div>
    )
  }
}

SelectFromObject.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , display: PropTypes.string.isRequired
  , label: PropTypes.string
  , objects: PropTypes.oneOfType([
    PropTypes.array
    , PropTypes.object
  ]).isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , selected: PropTypes.string
  , value: PropTypes.string.isRequired
}

SelectFromObject.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: '-- Select from the following --'
  , required: false
  , selected: ''
}

export default SelectFromObject;
