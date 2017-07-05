import React, { PropTypes } from 'react'
import Base from "../BaseComponent.js.jsx";

class ListComparator extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_addItem'
      , '_moveDown'
      , '_moveUp'
      , '_removeItem'
    )
  }

  _removeItem(index) {
    // remove from "items" list
    // console.log("REMOVE " + index);
    var items = this.props.items;
    items.splice(index, 1);
    var event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addItem(index) {
    // add to "items" list
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

  _moveUp(index) {
    if(index < 1) { return; }
    var newItems = this.props.items;
    var moveTarget = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = moveTarget;
    var changeEvent = {
      target: {
        name: this.props.name
        , value: newItems
      }
    }
    this.props.change(changeEvent);
  }

  _moveDown(index) {
    if(index > this.props.items.length - 1) { return; }
    var newItems = this.props.items;
    var moveTarget = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = moveTarget;
    var changeEvent = {
      target: {
        name: this.props.name
        , value: newItems
      }
    }
    this.props.change(changeEvent);
  }

  render() {
    const { allItems, items, label, name, reorderable } = this.props;

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

    return (
      <div className="input-group">
        <label htmlFor="newItem"> { label } </label>
        <div className="list-comparator-input">
          <div className="yt-row with-gutters">
            <div className="yt-col _50">
              <div className="-label">Selected:</div>
              <div className="-list-items">
                { items.map((item, i) =>
                  <div key={i}  className="-item  -left">
                    <div className="text">
                      {item + "    "}
                    </div>
                    { i > 0 && reorderable ?
                      <button
                        type="button"
                        className="yt-btn link primary x-small"
                        onClick={()=> this._moveUp(i)}
                      >
                        <i className="ion ion-chevron-up"/>
                      </button>
                      : null
                    }
                    { i < (items.length -1) && reorderable ?
                      <button
                        type="button"
                        className="yt-btn link primary x-small"
                        onClick={()=> this._moveDown(i)}
                      >
                        <i className="ion ion-chevron-down"/>
                      </button>
                      : null
                    }
                    <button
                      type="button"
                      className="yt-btn link danger x-small"
                      onClick={()=> this._removeItem(i)}
                    >
                      <i className="ion ion-close-round" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="yt-col _50">
              <div className="-label">Available:</div>
              <div className="-list-items ">
                { unselectedItems.map((item, i) =>
                  <div key={i}  className="-item -right" onClick={() => this._addItem(i)}>
                    <i className="fa fa-arrow-circle-left"></i>
                    <div className="-text">
                      {"    " + item}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
  , reorderable: PropTypes.bool
}

ListComparator.defaultProps = {
  allItems: []
  , items: []
  , label: ""
  , reorderable: false
}

export default ListComparator;
