
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Button = ({
  children
  , className
  , onClick
  , disabled
  , link
  , size = 'md'
  , skin = 'primary'
  , type = 'button'
}) => {

  const baseClasses = "inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"

  const colorClasses = (
    skin === 'primary' ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    :
    skin === 'secondary' ? "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500"
    :
    skin === 'white' ? "text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
    :
    ''
  )

  const sizeClasses = (
    size === 'xs' ? "px-2.5 py-1.5 text-xs rounded"
    :
    size === 'sm' ? "px-3 py-2 text-sm leading-4 rounded-md"
    :
    size === 'md' ? "px-4 py-2 text-sm rounded-md"
    :
    size === 'lg' ? "px-4 py-2 text-base rounded-md"
    :
    size === 'xl' ? "px-6 py-3 text-base rounded-md"
    :
    ''
  )

  const combinedClasses = `${baseClasses} ${colorClasses} ${sizeClasses} ${className} ${disabled && 'pointer-events-none opacity-50'}`

  if(link) return (
    <Link
      to={link}
      className={combinedClasses}
    >
      {children}
    </Link>
  )

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={combinedClasses}
    >
      {children}
    </button>
  
  )
}


Button.propTypes = {
  className: PropTypes.string
  , onClick: PropTypes.func
  , disabled: PropTypes.bool
  , link: PropTypes.string
  , size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
  , skin: PropTypes.oneOf(['primary', 'secondary', 'white'])
  , type: PropTypes.oneOf(['button', 'submit'])
}

export default Button;