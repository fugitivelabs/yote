/**
 * Boilerplate code for a new Redux-connected view component.
 * Nice for copy/pasting
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import third-party libraries


// import actions


// import global components
import Binder from '../../../global/components/BaseComponent.js.jsx';


// import module components


class DefaultConnectedView extends Binder {
  constructor(props) {
    super(props);
    this.state = {

    }
    this._bind(

    )
  }

  componetDidMount() {
    const { dispatch, match } = this.props;
    // fire actions
  }

  render() {
    const {
      match
    } = this.props;
    
    return (
      <div>
        Default Connected View
      </div>
    )
  }
}

DefaultConnectedView.propTypes = {
  dispatch: PropTypes.func.isRequired
}

DefaultConnectedView.defaultProps = {

}


const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */
  return {

  }
}

export default withRouter(
    connect(
    mapStoreToProps
  )(DefaultConnectedView)
);
