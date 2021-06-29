/**
 * Helper component to handle pagination UI on any lists
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import third-party libraries
import classNames from 'classnames';

// import components
import Binder from '../Binder.js.jsx';

class PageTabber extends Binder {
  constructor(props) {
    super(props);
    this.state = {}
    this._bind(
      '_handleNext'
      , '_handlePrevious'
      , '_jumpToPage'
    )
  }

  _handlePrevious() {
    var newPagination = this.props.pagination;
    newPagination.page--;
    this.props.setPagination(newPagination);
  }

  _handleNext() {
    var newPagination = this.props.pagination;
    newPagination.page++;
    this.props.setPagination(newPagination);
  }

  _jumpToPage(page) {
    var newPagination = this.props.pagination;
    newPagination.page = parseInt(page);
    this.props.setPagination(newPagination);
  }

  render() {
    const { pagination, totalPages } = this.props;
    let before;
    let after;
    let currentPage = pagination.page;

    /**
     * determine how many pages came before the current page and display (at most)
     * the three most recent
     */
    if(currentPage === 1) {
      before = [];
    } else if(currentPage === 2) {
      before = [ 1 ];
    } else if(currentPage === 3) {
      before = [1,2];
    } else {
      before = [ (currentPage - 3), (currentPage - 2), (currentPage - 1) ];
    }

    /**
     * determine how many pages come after the current page and display (at most)
     * the next three
     */
    if(currentPage === totalPages) {
      after = [];
    } else if(currentPage === totalPages - 1) {
      after = [currentPage + 1 ];
    } else if(currentPage === totalPages - 2) {
      after = [(currentPage + 1), (currentPage + 2) ]
    } else {
      after = [(currentPage + 1), (currentPage + 2), (currentPage + 3) ]
    }

    var prevClass = classNames(
      'prev-page'
      , {'disabled': currentPage === 1 }
    )

    var nextClass = classNames(
      'next-page'
      , {'disabled': currentPage === totalPages }
    )

    return (
      <ul className="pagination">
        <li >
          <a
            className={prevClass}
            onClick={currentPage > 1 ? this._handlePrevious : null }
          >
            <i className="fa fa-angle-double-left" /> Previous
          </a>
        </li>
        { currentPage > 4 ?
          <li>...</li>
          :
          null
        }
        { before.map((page, i) =>
          <li key={i} >
            <a className="page-num" onClick={()=> this._jumpToPage(page)}>{page}</a>
          </li>
        )}
        <li >
          <span className="current-page">{currentPage}</span>
        </li>
        { after.map((page, i) =>
          <li key={i} >
            <a className="page-num" onClick={()=> this._jumpToPage(page)}>{page}</a>
          </li>
        )}
        { currentPage < totalPages - 3 ?
          <li>...</li>
          :
          null
        }
        <li >
          <a
            className={nextClass}
            onClick={currentPage < totalPages ? this._handleNext : null }
          >
           Next <i className="fa fa-angle-double-right" />
          </a>
        </li>
      </ul>
    )
  }
}

PageTabber.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired
    , per: PropTypes.number.isRequired
  }).isRequired
  , totalPages: PropTypes.number.isRequired
  , setPagination: PropTypes.func.isRequired
}

export default PageTabber;


/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Example() {
  let before;
    let after;
    let currentPage = pagination.page;

    /**
     * determine how many pages came before the current page and display (at most)
     * the three most recent
     */
    if(currentPage === 1) {
      before = [];
    } else if(currentPage === 2) {
      before = [ 1 ];
    } else if(currentPage === 3) {
      before = [1,2];
    } else {
      before = [ (currentPage - 3), (currentPage - 2), (currentPage - 1) ];
    }

    /**
     * determine how many pages come after the current page and display (at most)
     * the next three
     */
    if(currentPage === totalPages) {
      after = [];
    } else if(currentPage === totalPages - 1) {
      after = [currentPage + 1 ];
    } else if(currentPage === totalPages - 2) {
      after = [(currentPage + 1), (currentPage + 2) ]
    } else {
      after = [(currentPage + 1), (currentPage + 2), (currentPage + 3) ]
    }
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={currentPage > 1 ? this._handlePrevious : null }
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={currentPage < totalPages ? this._handleNext : null }
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{ (pagination.page * pagination.per) - (pagination.per - 1)}</span> to <span className="font-medium">{ pagination.page * pagination.per}</span> of{' '}
            <span className="font-medium">about {pagination.per * totalPages}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={currentPage > 1 ? this._handlePrevious : null }
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {currentPage > 4 ?
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              :
              null
            }
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            
            {before.map((page , i)=> (
              <a
                key={`page-before-${i}`}
                onClick={() => this._jumpToPage(page)}
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
              {page}
              </a>
            ))}
            <a
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium pointer-events-none"
            >
              {currentPage}
            </a>
            {after.map((page , i)=> (
              <a
                key={`page-after-${i}`}
                onClick={() => this._jumpToPage(page)}
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
              {page}
              </a>
            ))}
            { currentPage < totalPages - 3 ?
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              :
              null
            }
            <a
              onClick={currentPage < totalPages ? this._handleNext : null }
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
