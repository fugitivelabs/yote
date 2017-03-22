/**
 * Helper component to provide a background clickable area to close modals,
 * dropdowns, etc.
 */

// import primary libraries
import React from 'react';

// import components
import Base from "../BaseComponent.js.jsx";

class CloseWrapper extends Base {
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
  isOpen: React.PropTypes.bool.isRequired
  , closeAction: React.PropTypes.func.isRequired
}

export default CloseWrapper;
