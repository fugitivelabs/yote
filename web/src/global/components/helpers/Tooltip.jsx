/**
 * A (hopefully) lightweight tooltip component. Wrap the component you want to have a tooltip on with this component and pass in the text you want to display as the tooltip.
 * 
 * <Tooltip text="This is the tooltip text">
 *  <div>Hover over me to see the tooltip</div>
 * </Tooltip>
 */

import React, { useRef } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tooltip = ({ children, text, position = 'top' }) => {
  // use a ref to toggle the tooltip visibility via css, this should only render once
  const tipRef = useRef(null);

  const handleMouseEnter = () => {
    tipRef.current.classList.toggle("hidden");
  }

  const handleMouseLeave = () => {
    tipRef.current.classList.toggle("hidden");
  }

  const positionClass = classNames(
    position === 'top' ? 'bottom-full left-1/2 mb-1'
    : position === 'bottom' ? 'top-full left-1/2 mt-1'
    : position === 'left' ? 'right-full top-0 mr-1'
    : position === 'right' ? 'left-full top-0 ml-1'
    : ''
  )

  return (
    <div
      className={`relative inline-block text-left z-20`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tipRef}
        className={`hidden whitespace-normal absolute ${positionClass} max-w-sm min-w-[10em] bg-gray-700 text-white text-sm rounded-lg px-4 py-2 shadow-lg`}
      >
        {text}
      </div>
      {children}
    </div>
  );
}

export default Tooltip;