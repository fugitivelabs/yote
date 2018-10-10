/**
 * Global AdminTopNav component.
 */

// import primary libararies
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NavLink, withRouter } from 'react-router-dom';

// import third-party libraries
import classNames from 'classnames';

// import components
import CloseWrapper from '../../components/helpers/CloseWrapper.js.jsx';

import { ADMIN_NAV_ITEMS } from '../../../config/adminNavItems.js';

const AdminModulesDropdown = ({close, isOpen}) => {
  return(
    <TransitionGroup >
      { isOpen ?
          <CSSTransition
            classNames="dropdown-anim"
            timeout={250}
          >
            <ul className="dropMenu">
              { ADMIN_NAV_ITEMS.map((item, i) =>
                <li key={i}>
                  <NavLink to={item.path} activeClassName="active" onClick={close}>{item.display}</NavLink>
                </li>
              )}
            </ul>
          </CSSTransition>
        :
          null
      }
    </TransitionGroup>
  )
}

AdminModulesDropdown.propTypes = {
  close: PropTypes.func.isRequired
  , isOpen: PropTypes.bool.isRequired
}

export default withRouter(AdminModulesDropdown);
