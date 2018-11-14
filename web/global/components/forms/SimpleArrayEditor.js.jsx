/**
 * Helper component that lets you build a simple array of strings
 *
 * NOTE: For an example, see the roles builder in
 * ./modules/user/AdminUserForm.js.jsx
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import componets
import Binder from '../Binder.js.jsx';
import TextInput from './TextInput.js.jsx';

class SimpleArrayEditor extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      newItem: ''
    }
    this._bind(
      '_handleNewItemChange'
      , '_addPillItem'
      , '_removePillItem'
    );

  }

  // check against any new props the component receives
  componentWillReceiveProps(nextProps) {
    if(this.props.arrayType != nextProps.arrayType) {
      if(nextProps.arrayType == "string") {
        this.setState({newItem: ''});
      } else {
        this.setState({newItem: 0});
      }
    }
  }

  _removePillItem(index) {
    let items = this.props.items;
    items.splice(index, 1);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
  }

  _addPillItem(value) {
    let newState = this.state;
    if(this.props.arrayType == "string") {
      newState.newItem = "";
    } else {
      newState.newItem = 0;
      value = parseFloat(value);
    }
    let items = this.props.items;
    items.push(value);
    let event = {target: {name: this.props.name, value: this.props.items} };
    this.props.change(event);
    this.setState(newState);
  }

  _handleNewItemChange(e) {
    this.setState({newItem: e.target.value});
  }

  render() {
    const {
      arrayType
      , disabled
      , helpText
      , items
      , label
      , name
    } = this.props;

    // build the pill items from the newly edited array
    let pillItems = items.map((item, index) => {
      return (
        <div className="pill-item" key={index}>
          <p>
            <a onClick={() => this._removePillItem(index)}>
              <i className="fa fa-times"></i>
              {item}
            </a>
          </p>
        </div>
      )
    });

    let theInput;
    if(arrayType === "string") {
      theInput = (
        <input
          type="text"
          name="newItem"
          placeholder={`New ${label}` }
          value={this.state.newItem}
          onChange={this._handleNewItemChange}
        />
      );
    } else {
      theInput = (
        <input
          type="number"
          name="newItem"
          value={this.state.newItem}
          onChange={this._handleNewItemChange}
        />
      )
    }



    return (
      <div className="input-group">
        <label htmlFor="newItem"> { label } </label>
        <div className="pills">
          {pillItems}
        </div>
        <div className="input-add-on">
          {theInput}
          <button
            className="item"
            type="button"
            onTouchTap={() => this._addPillItem(this.state.newItem)}
            disabled={!this.state.newItem || disabled }
          > Add {label}</button>
        </div>
        <small className="help-text"><em>{helpText}</em></small>
      </div>
    )
  }
}

SimpleArrayEditor.propTypes = {
  arrayType: PropTypes.oneOf(["string", "number"])
  , change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string)
      , PropTypes.arrayOf(PropTypes.number)
    ])
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
}

SimpleArrayEditor.defaultProps = {
  arrayType: "string"
  , disabled: false
  , helpText: null
  , items: []
  , label: ''
}

export default SimpleArrayEditor;
