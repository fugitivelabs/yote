/**
 * Helper component for allowing users to select multiple items from a list
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// icons
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'

const ListComparator = ({
  change
  , className = ''
  , disabled
  , helpText
  , items = []
  , label
  , name
  , required
  , selectedItems = []
}) => {

  const unselectedItems = items.filter(item => !selectedItems.includes(item));
  return (
    <div className={`relative z-0 w-full mb-4 bg-indigo-50 rounded lg:w-auto ${className}`}>
      {label ? (
        <span
          htmlFor={name}
          className="px-2 text-xs absolute top-0 -z-1 origin-0 text-gray-500 bg-transparent z-10"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </span>
      )
        :
        null
      }
      <div className="flex flex-row">
        <div className={`relative w-1/2 mb-2 px-2 ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'}`}>
          <p className='text-center text-sm font-bold p-2'>Selected</p>
          {selectedItems.map((item, index) => (
            <div key={index} className="group flex items-center justify-between p-2 mb-2 bg-white rounded border-solid border-indigo-400">
              <span>{item}</span>
              <button
                type="button"
                className='yt-btn btn-xs btn-muted text-danger opacity-0 group-hover:opacity-100'
                onClick={() => change({ target: { name, value: selectedItems.filter(selectedItem => selectedItem !== item) } })}
                disabled={disabled}
              >
                <ArrowRightIcon className="w-4 h-4 align-middle" />
              </button>
            </div>
          ))}
        </div>
        <div className={`relative w-1/2 mb-2 px-2 ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'}`}>
          <p className='text-center text-sm font-bold p-2'>Available</p>
          {unselectedItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 mb-2 bg-white rounded">
              <button
                type="button"
                className='yt-btn btn-xs btn-muted text-success'
                onClick={() => change({ target: { name, value: [...selectedItems, item] } })}
                disabled={disabled}
              >
                <ArrowLeftIcon className="w-4 h-4 align-middle" />
              </button>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {helpText && <small className="text-xs text-gray-500"><em>{helpText}</em></small>}
    </div>
  )
}

ListComparator.propTypes = {
  change: PropTypes.func.isRequired
  , className: PropTypes.string
  , disabled: PropTypes.bool
  , helpText: PropTypes.any
  , items: PropTypes.array.isRequired
  , label: PropTypes.string
  , name: PropTypes.string.isRequired
  , required: PropTypes.bool
  , selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired
}

ListComparator.defaultProps = {
  disabled: false
  , helpText: null
  , label: ''
  , required: false
}

export default ListComparator;
