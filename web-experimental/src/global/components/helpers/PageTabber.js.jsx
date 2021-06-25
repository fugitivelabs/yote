
import React from 'react'

import PropTypes from 'prop-types';

// import third-party libraries
// import classNames from 'classnames';

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
    <ul className="pagination">
      <li >
        <a
          className={`prev-page ${ currentPage == 1 && 'pointer-events-none'}`}
          onClick={currentPage > 1 ? () => setPage(currentPage - 1) : null }
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
          <a className="page-num" onClick={()=> setPage(page)}>{page}</a>
        </li>
      )}
      <li >
        <span className="current-page">{currentPage}</span>
      </li>
      { after.map((page, i) =>
        <li key={i} >
          <a className="page-num" onClick={()=> setPage(page)}>{page}</a>
        </li>
      )}
      { currentPage < totalPages - 3 ?
        <li>...</li>
        :
        null
      }
      <li >
        <a
          className={`next-page ${ currentPage == totalPages && 'pointer-events-none'}`}
          onClick={currentPage < totalPages ? () => setPage(currentPage + 1) : null }
        >
          Next <i className="fa fa-angle-double-right" />
        </a>
      </li>
    </ul>
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
