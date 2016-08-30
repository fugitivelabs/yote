import React, { PropTypes } from 'react'
import Base from "../BaseComponent.js.jsx";

import TextInput from './TextInput.js.jsx';

class ListComparator extends Base {

  constructor(props) {
    super(props);
  }

  _removeItem(index) {
    //remove from "items" list
    // console.log("REMOVE " + index);
    var items = this.props.items;
    items.splice(index, 1);
    var event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addItem(index) {
    //add to "items" list
    // console.log("ADD " + index);
    var items = this.props.items;
    var unselectedItems = [];
    for(var i = 0; i < this.props.allItems.length; i++) {
      var selected = false;
      for(var j = 0; j < items.length; j++) {
        if(this.props.allItems[i] == items[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(this.props.allItems[i]);
      }
    }
    items.push(unselectedItems[index]);
    var event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  render() {
    const { items, allItems, name, label } = this.props;

    var unselectedItems = [];
    for(var i = 0; i < allItems.length; i++) {
      var selected = false;
      for(var j = 0; j < items.length; j++) {
        if(allItems[i] == items[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(allItems[i]);
      }
    }
    // console.log("UNSELECTED ITEMS");
    // console.log(unselectedItems);

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
  label: PropTypes.string
  , name: PropTypes.string.isRequired
  , items: PropTypes.arrayOf(PropTypes.string)
  , allItems: PropTypes.arrayOf(PropTypes.string)
  , change: PropTypes.func.isRequired
}

ListComparator.defaultProps = {
  items: []
  , allItems: []
}

export default ListComparator;