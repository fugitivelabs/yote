import React from "react";
import PropTypes from "prop-types";

const CloseWrapper = ({isOpen, closeAction}) => {
  if(!isOpen) return null;
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-40" onClick={closeAction}/>
  )
}

CloseWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired
  , closeAction: PropTypes.func.isRequired
}

export default CloseWrapper;