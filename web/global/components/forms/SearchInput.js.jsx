/**
 * Helper function for rendering stylized search inputs
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({
  change
  , name
  , placeholder
  , value
}) => {
  
  return (
    <div className="search-input">
      <div className="input-add-on">
        <i className="item ion ion-search"/>
        <input
          type="search"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={change}
        />
      </div>
    </div>
  )
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
