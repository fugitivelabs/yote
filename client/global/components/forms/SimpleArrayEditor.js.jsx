import React, { PropTypes } from 'react'
import Base from "../BaseComponent.js.jsx";

import TextInput from './TextInput.js.jsx';

class SimpleArrayEditor extends Base {


  constructor(props) {
    super(props);
    this.state = {
      newItem: ''
    }
    this._bind(
      '_handleNewItemChange'
      // , '_addPillItem'
      // , '_removePillItem'
    );

  }
  // check the props the component receives
  componentWillReceiveProps(nextProps) {
    // console.log("SimpleArrayEditor props");
    // console.log(nextProps);
    if(this.props.arrayType != nextProps.arrayType) {
      if(nextProps.arrayType == "string") {
        this.setState({newItem: ''});
      } else {
        this.setState({newItem: 0});
      }
    }
  }

  _removePillItem(index) {
    // console.log('_removePillItem', index);
    var items = this.props.items;
    items.splice(index, 1);
    var event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addPillItem(value) {
    // console.log("_addPillItem", value);
    var newState = this.state;
    if(this.props.arrayType == "string") {
      newState.newItem = "";
    } else {
      newState.newItem = 0;
      value = parseFloat(value);
    }
    var items = this.props.items;
    items.push(value);
    var event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
    this.setState(newState);
  }

  _handleNewItemChange(e) {
    this.setState({newItem: e.target.value});
  }

  render() {
    const { items, name, label, arrayType } = this.props;
    var pillItems = items.map((item, index) => {
      return (
        <div className="pill-item" key={index}>
          <p>
            <a onClick={this._removePillItem.bind(this, index)}>
              <i className="fa fa-times"></i>
              {item}
            </a>
          </p>
        </div>
      )
    });
    var theInput = (arrayType === "string" ?
        <input
          type="text"
          name="newItem"
          placeholder={`New ${label}` }
          value={this.state.newItem}
          onChange={this._handleNewItemChange}
        />
      :
      <input
        type="number"
        name="newItem"
        value={this.state.newItem}
        onChange={this._handleNewItemChange}
      />
    )
    return (
      <div className="input-group">
        <label htmlFor="newItem"> { label } </label>
        <div className="pills">
          {pillItems}
        </div>
        <div className="input-add-on">
          {theInput}
          <button className="item" type="button" onTouchTap={this._addPillItem.bind(this, this.state.newItem)}  disabled={this.state.newItem  ? false : true } >Add {label}</button>
        </div>
      </div>
    )
  }
}

SimpleArrayEditor.propTypes = {
  label: PropTypes.string
  , name: PropTypes.string.isRequired
  , items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string)
      , PropTypes.arrayOf(PropTypes.number)
    ])
  , change: PropTypes.func.isRequired
  , arrayType: PropTypes.oneOf(["string", "number"])
}

SimpleArrayEditor.defaultProps = {
  items: []
  , arrayType: "string"
}

export default SimpleArrayEditor;
