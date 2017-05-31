/**
 * Helper form component for adding/removing things from one list to another
 *
 * TODO: Could use an example of how to use
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Base from "../BaseComponent.js.jsx";
import TextInput from './TextInput.js.jsx';

class ListComparator extends Base {
  constructor(props) {
    super(props);
  }

  _removeItem(index) {
    // remove from "items" list
    let items = this.props.items;
    items.splice(index, 1);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addItem(index) {
    // add to "items" list
    let items = this.props.items;
    let unselectedItems = [];

    // find all of the 'unselected' items in the list
    for(let i = 0; i < this.props.allItems.length; i++) {
      let selected = false;
      for(let j = 0; j < items.length; j++) {
        if(this.props.allItems[i] == items[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(this.props.allItems[i]);
      }
    }
    items.push(unselectedItems[index]);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  render() {
    const { items, allItems, name, label } = this.props;

    // find all of the 'unselected' items in the list
    let unselectedItems = [];
    for(let i = 0; i < allItems.length; i++) {
      let selected = false;
      for(let j = 0; j < items.length; j++) {
        if(allItems[i] == items[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(allItems[i]);
      }
    }

    return (
      <div className="input-group">
        <label htmlFor="newItem"> { label } </label>
        <div className="yt-row">
          <div className="yt-col _50">
            <p>Selected:</p>
            { items.map((item, i) =>
              <div key={i}>
                <button type="button" onClick={this._removeItem.bind(this, i)} className="yt-btn small danger">
                  {item + "    "}
                  <i className="fa fa-times"></i>
                </button>
              </div>
            )}
          </div>
          <div className="yt-col _50">
            <p>Possible:</p>
            { unselectedItems.map((item, i) =>
              <div key={i}>
                <button type="button" onClick={this._addItem.bind(this, i)} className="yt-btn small success">
                  <i className="fa fa-arrow-circle-left"></i>
                  {"    " + item}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ListComparator.propTypes = {
  allItems: PropTypes.arrayOf(PropTypes.string)
  , change: PropTypes.func.isRequired
  , items: PropTypes.arrayOf(PropTypes.string)
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
}

ListComparator.defaultProps = {
  allItems: []
  , items: []
  , label: ''
}

export default ListComparator;
