// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const DefaultStatelessComponent = ({

}) => {
  return (
    <div>
      Default Stateless Component
    </div>
  )
}

DefaultStatelessComponent.propTypes = {
}

DefaultStatelessComponent.defaultProps = {
}

export default withRouter(DefaultStatelessComponent);
