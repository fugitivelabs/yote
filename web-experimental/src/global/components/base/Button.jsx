
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ ...props }) => {
  
  const {
    children
    , classNames
    , onClick
    , disabled
    , size = 'md'
    , flavor = 'primary'
    , link
  } = props

  const baseClasses = "inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"

  const colorClasses = (
    flavor === 'primary' ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    :
    flavor === 'secondary' ? "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500"
    :
    flavor === 'white' ? "text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
    :
    ''
  )

  const sizeClasses = (
    size === 'xs' ? "px-2.5 py-1.5 text-xs rounded"
    :
    size === 'xs1' ? "px-2.5 py-1.5 text-xs rounded-md"
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

  const combinedClasses = `${baseClasses} ${colorClasses} ${sizeClasses} ${classNames} ${disabled && 'pointer-events-none opacity-50'}`

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
      type="button"
      className={combinedClasses}
    >
      {children}
    </button>
  
  )
}

export default Button;