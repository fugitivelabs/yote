/**
 * Helper function for rendering stylized search inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class SearchInput extends Binder {
  constructor(props) {
    super(props);
    this._bind('_handleInputChange');
  }

  _handleInputChange(e) {
    this.props.change(e);
  }

  render() {
    const { name, placeholder, value } = this.props;
    return (
      <div className="search-input">
        <div className="input-add-on">
          <i className="item ion ion-search"/>
          <input
            type="search"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={this._handleInputChange}
          />
        </div>
      </div>
    )
  }
}

SearchInput.propTypes = {
  change: PropTypes.func.isRequired
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , value: PropTypes.string.isRequired
}

SearchInput.defaultProps = {
  placeholder: 'Search...'
}

export default SearchInput;
