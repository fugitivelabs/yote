// @ts-check
import React from 'react'

import PropTypes from 'prop-types';

// import icons
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

// condense crazy tailwind styles for pagination component. Adapted from: https://tailwindui.com/components/application-ui/navigation/pagination#component-69eb9381f977800aa890ce8f7d9e2d20
const paginationBtnCommonClasses = "relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 bg-white"

const mobileBtnCommonClasses = `${paginationBtnCommonClasses} text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer`

const setPageBtnCommonClasses = `${paginationBtnCommonClasses} text-gray-500 hover:bg-gray-50 cursor-pointer`

const PageTabber = ({
  pagination
  , setPage
  , totalPages
}) => {

  let before;
  let after;
  const currentPage = Number(pagination.page);

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
      {/* only show two buttons on small screens */}
      <div className="flex-1 flex justify-between md:hidden">
        <a
          onClick={currentPage > 1 ? () => setPage(currentPage - 1) : null }
          className={mobileBtnCommonClasses}
        >
          Previous
        </a>
        <div className="relative inline-flex items-center px-4 py-2 text-sm">
          <p className="text-sm text-gray-700">
            <span className="font-small">{currentPage}</span> of <span className="font-small">{totalPages}</span>
          </p>
        </div>
        <a
          onClick={currentPage < totalPages ? () => setPage(currentPage + 1) : null }
          className={`${mobileBtnCommonClasses} ml-3`}
        >
          Next
        </a>
      </div>
      {/* show the whole thing on medium and larger screens */}
      <div className="hidden md:flex-1 md:flex sm:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{ (pagination.page * pagination.per) - (pagination.per - 1)}</span> to <span className="font-medium">{ pagination.page * pagination.per}</span> of{' '}
            <span className="font-medium">about {pagination.per * totalPages}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={currentPage > 1 ? () => setPage(currentPage - 1) : null}
              className={`${setPageBtnCommonClasses} rounded-l-md` }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {currentPage > 4 ?
              <span className={`${setPageBtnCommonClasses} pointer-events-none`}>
                ...
              </span>
              :
              null
            }
            {before.map((page, i) => (
              <a
                key={`page-before-${i}`}
                onClick={() => setPage(page)}
                className={setPageBtnCommonClasses}
              >
              {page}
              </a>
            ))}
            <a
              aria-current="page"
              className={`${paginationBtnCommonClasses} z-10 bg-indigo-50 border-indigo-500 text-indigo-600 pointer-events-none`}
            >
              {currentPage}
            </a>
            {after.map((page , i)=> (
              <a
                key={`page-after-${i}`}
                onClick={()=> setPage(page)}
                className={setPageBtnCommonClasses}
              >
              {page}
              </a>
            ))}
            { currentPage < totalPages - 3 ?
              <span className={`${setPageBtnCommonClasses} pointer-events-none`}>
              ...
              </span>
              :
              null
            }
            <a
              onClick={currentPage < totalPages ? () => setPage(currentPage + 1) : null }
              className={`${setPageBtnCommonClasses} rounded-r-md` }
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


PageTabber.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired
    , per: PropTypes.number.isRequired
  }).isRequired
  , totalPages: PropTypes.number.isRequired
  , setPage: PropTypes.func.isRequired
}


export default PageTabber;
