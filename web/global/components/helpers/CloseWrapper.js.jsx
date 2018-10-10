/**
 * Helper component to provide a background clickable area to close modals,
 * dropdowns, etc.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import components
import Binder from '../Binder.js.jsx';

class CloseWrapper extends Binder {
  constructor(props) {
    super(props);
    this._bind('_handleCloseAction');
  }

  _handleCloseAction(){
    this.props.closeAction();
  }

  render() {
    if(this.props.isOpen) {
      return(
        <div className="close-wrapper" onClick={this._handleCloseAction}></div>
      )
    } else {
      return null;
    }
  }
}

CloseWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired
  , closeAction: PropTypes.func.isRequired
}

export default CloseWrapper;
