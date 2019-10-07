/**
 * Helper component that lests users select items from a complex array of objects OR a simple array of strings.
 * 
 * More info on the Select component at: https://react-select.com/props#select-props
 *
 * NOTE: To use -
 * // this example shows how to assign an author to a post
 * render() {
 *   const authors = [
 *     { name: 'Bill', _id: '55XYZ' }
 *     , { name: 'Jenny', _id: '56ABC' }
 *     , { name: 'Steve', _id: '57DEF' }
 *   ];
 *   return (
 *     <div>
 *       <SelectFromObject
 *         name="author"
 *         label="Author"
 *         items={authors}
 *         display={'name'} // Required when items is an array of objects or map of objects.
 *         value={'_id'} // Required when items is an array of objects or map of objects.
 *         change={handleFormChange}
 *         placeholder="-- Select an author --"
 *       />
 *     </div>
 *   )
 * }
 * 
 * // this example shows how to assign a status to a post
 * render() {
 *   const statuses = [
 *     'active'
 *     , 'archived'
 *     , 'draft'
 *   ];
 *   return (
 *     <div>
 *       <SelectFromObject
 *         name="post.status"
 *         label="Status"
 *         items={statuses}
 *         change={handleFormChange}
 *         placeholder="-- Select a status --"
 *       />
 *     </div>
 *   )
 * }
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import third party libraries
import Select from 'react-select';

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

  // check against any new props the component receives
  UNSAFE_componentWillReceiveProps(nextProps) {
    nextProps.selected ? this.setState({selected: nextProps.selected}) : '';
  }

  _handleSelectChange(e) {
    const { change, name } = this.props;
    let event = {target: {}};
    event.target.name = name;

    event.target.value = e ? e.value : null;
    this.setState({
      selected: e ? e.value : null
    });
    change(event);
  }

  render() {
    const {
      disabled
      , display
      , filterable
      , items
      , label
      , name
      , placeholder
      , required
      , value
    } = this.props;

    // build the options to select from.
    let options = []
    if(Array.isArray(items)) {
      // items is an array
      options = items.map(item => {
        let option = {}
        // Build each option based on the type of item we have.
        // This allows us to pass an array of objects or an array of strings.
        if(typeof(item) === 'object') {
          if(!display || !value) {
            console.error("ERROR in Select Input! Must supply 'value' and 'display' props when 'items' is an array of objects.")
          } else {
            option.value = item[value];
            option.label = _.startCase(item[display]);
            option.name = name;
            return option;
          }
        } else if(typeof(item) === 'string') {
          option.value = item;
          option.label = _.startCase(item);
          option.name = name;
          return option;
        }
      });
    } else {
      /**
       * NOTE: Techincally the loop below can handle objects OR arrays. It is considered bad practice to use a for...in loop on an array
       * due to the possibility of some third party library adding to or modifying array.prototype. This issue is mitigated by using
       * hasOwnProperty, since then it ignores the rest of the prototype chain properties. All of that to say that the below loop
       * could, theoretically, stand on it's own and we wouldn't have to care if we provided an array or a map to this component.
       * For now though we are being cautious and dealing with arrays above and objects below.
       */

      // items is a map {}
      for(let i in items) {
        if(items.hasOwnProperty(i)) {
          let option = {};
          // Build each option based on the type of item we have.
          if(typeof(items[i]) === 'object') {
            if(!display || !value) {
              console.error("ERROR in Select Input! Must supply 'value' and 'display' props when 'items' is a map of objects.")
            } else {
              option.value = items[i][value];
              option.label = _.startCase(items[i][display]);
              option.name = name;
              options.push(option);
            }
          } else if(typeof(items[i]) === 'string') {
            // Since 'items' is a map we shouldn't be dealing with strings, so this is probably overkill.
            option.value = items[i];
            option.label = _.startCase(items[i]);
            option.name = name;
            options.push(option);
          }
        }
      }
    }

    const requiredText = required ? "(required)" : "";

    return (
      <div className="select-from-object input-group">
        <label htmlFor={name}>{label} <span className="subhead">{requiredText}</span></label>
        <Select
          isDisabled={disabled}
          isSearchable={filterable}
          name={name}
          onChange={this._handleSelectChange}
          options={options}
          placeholder={placeholder}
          value={options.filter(({value}) => value === this.state.selected)}
        />
      </div>
    )
  }
}

SelectFromObject.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , display: PropTypes.string.isRequired
  , filterable: PropTypes.bool
  , items: PropTypes.oneOfType([
    PropTypes.array
    , PropTypes.object
  ]).isRequired
  , label: PropTypes.string
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , selected: PropTypes.string
  , value: PropTypes.string
}

SelectFromObject.defaultProps = {
  disabled: false
  , label: ''
  , placeholder: '-- Select from the following --'
  , required: false
  , selected: ''
}

export default SelectFromObject;
