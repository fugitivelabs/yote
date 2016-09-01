import React, { PropTypes } from 'react'

import Base from "../BaseComponent.js.jsx";

class SearchInput extends Base {

  constructor(props) {
    super(props);
    this.state = { theVal: this.props.value ? this.props.value : '' };
    this._bind('_handleInputChange');
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.value !== this.state.theVal) {
      var val = nextProps.value;
      this.setState({theVal: val});
    }
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  render() {
    const { label, value, placeholder, name, required } = this.props;
    return (
      <div className="search-input">
        <div className="input-add-on">
          <i className="item ion ion-search"/>
          <input
            type="search"
            name={name}
            placeholder={placeholder}
            value={this.state.theVal}
            onChange={this._handleInputChange}
            required={required}
          />
        </div>
      </div>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , name: PropTypes.string.isRequired
  , required: PropTypes.bool
  , change: PropTypes.func
  , password: PropTypes.bool
}

export default SearchInput;
