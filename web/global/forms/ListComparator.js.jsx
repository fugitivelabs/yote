import React from 'react';
import PropTypes from 'prop-types';
import Binder from '../Binder.js.jsx';

// import third-party libraries
import _ from 'lodash';

// import form components
import TextInput from './TextInput.js.jsx';

class ListComparator extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    }
    this._bind(
      '_addItem'
      , '_moveDown'
      , '_moveUp'
      , '_removeItem'
      , '_handleFormChange'
    )
  }

  _removeItem(index) {
    // remove from "items" list
    // console.log("REMOVE " + index);
    let items = this.props.items;
    items.splice(index, 1);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addItem(index) {
    const { queryText } = this.state;
    const { allItems, filterable, items } = this.props;
    // filter items first
    let filteredItems = [];
    if(filterable) {
      filteredItems = _.filter(allItems, function(item) {
        let itemsString = "";
        itemsString += item;
        itemsString = itemsString.replace(/[^a-zA-Z0-9]/g, '');
        return itemsString.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
      });
    } else {
      filteredItems = allItems;
    }
    // add to "items" list
    let itm = items;
    let unselectedItems = [];
    for(let i = 0; i < filteredItems.length; i++) {
      let selected = false;
      for(let j = 0; j < itm.length; j++) {
        if(filteredItems[i] == itm[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(filteredItems[i]);
      }
    }
    itm.push(unselectedItems[index]);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _moveUp(index) {
    if(index < 1) { return; }
    let newItems = this.props.items;
    let moveTarget = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = moveTarget;
    let changeEvent = {
      target: {
        name: this.props.name
        , value: newItems
      }
    }
    this.props.change(changeEvent);
  }

  _moveDown(index) {
    if(index > this.props.items.length - 1) { return; }
    let newItems = this.props.items;
    let moveTarget = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = moveTarget;
    let changeEvent = {
      target: {
        name: this.props.name
        , value: newItems
      }
    }
    this.props.change(changeEvent);
  }

  _handleFormChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  render() {
    const {
      allItems
      , filterable
      , items
      , label
      , name
      , reorderable
    } = this.props;
    const { queryText } = this.state;

    let filteredItems = [];
    if(filterable) {
      filteredItems = _.filter(allItems, function(item) {
        let itemsString = "";
        itemsString += item;
        itemsString = itemsString.replace(/[^a-zA-Z0-9]/g, '');
        return itemsString.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
      });
    } else {
      filteredItems = allItems;
    }

    let unselectedItems = [];
    for(let i = 0; i < filteredItems.length; i++) {
      let selected = false;
      for(let j = 0; j < items.length; j++) {
        if(filteredItems[i] == items[j]) {
          selected = true;
        }
      }
      if(!selected) {
        unselectedItems.push(filteredItems[i]);
      }
    }

    return (
      <div className="input-group">
        <label htmlFor="newItem"> { label } </label>
        <div className="list-comparator-input">
          <div className="yt-row with-gutters">
            <div className="yt-col _100">
              <TextInput
                name="queryText"
                label="Filter"
                value={queryText}
                change={this._handleFormChange}
                placeholder="Filter"
                required={false}
              />
            </div>
          </div>
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
  , filterable: PropTypes.bool
  , items: PropTypes.arrayOf(PropTypes.string)
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , reorderable: PropTypes.bool
}

ListComparator.defaultProps = {
  allItems: []
  , filterable: false
  , items: []
  , label: ""
  , reorderable: false
}

export default ListComparator;