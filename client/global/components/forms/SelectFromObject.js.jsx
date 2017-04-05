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
import React, { PropTypes } from 'react';

// import components
import Base from "../BaseComponent.js.jsx";

class SelectFromObject extends Base{
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
    const { display, label, name, objects, placeholder, value } = this.props;

    // build the items to select from
    let options = objects.map((object, index) => {
      return (
        <option key={index} value={object[value]}>
          {object[display]}
        </option>
      )
    });

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
  , display: PropTypes.string.isRequired
  , label: PropTypes.string
  , objects: PropTypes.array.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , selected: PropTypes.string
  , value: PropTypes.string.isRequired
}

SelectFromObject.defaultProps = {
  label: ''
  , placeholder: '-- Select from the following --'
  , required: false
  , selected: ''
}

export default SelectFromObject;
