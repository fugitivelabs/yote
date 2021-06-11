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
