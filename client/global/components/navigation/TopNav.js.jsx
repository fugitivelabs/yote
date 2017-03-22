/**
 * Global TopNav component.
 */

// import primary libararies
import React from 'react';
import { Link } from 'react-router';

// import third-party libraries
import classNames from 'classnames';

// import components
import Base from '../BaseComponent.js.jsx';
import CloseWrapper from '../helpers/CloseWrapper.js.jsx';
import DropdownNav from './DropdownNav.js.jsx';

export default class TopNav extends Base {
  constructor(props, context) {
    super(props);
    this.state = {
      isOpen: false
      , scrollingDown: false
      , isTop: true
    }
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
      , '_handleScroll'
    );
  }

  componentWillMount() {
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll(e) {
    /**
     * When the page scrolls, check the Y position to determine whether to
     * hide, show or fade in TopNav.
     *
     * @param e = broswer scroll event
     */

    let scrollTop;
    if(e.target.scrollingElement) {
      scrollTop = e.target.scrollingElement.scrollTop;
    } else {
      scrollTop = document.documentElement.scrollTop;
    }

    // handle initial position
    let isTop = scrollTop < 20 ? true : false;
    if(isTop !== this.state.isTop) {
      this.setState({isTop: isTop});
    }

    // if the page is scrolled down, change the navbar style
    var scrollingDown;
    if ( typeof this._handleScroll.y == undefined ) {
      this._handleScroll.y=window.pageYOffset;
      scrollingDown = false;
    }

    // check last position vs current position
    var diffY=this._handleScroll.y-window.pageYOffset;

    // check the direction of the scroll
    if( diffY<0 ) {
      // Page is scrolling down
      scrollingDown = true;
    } else if( diffY>0 ) {
      // Page is scrolling up
      scrollingDown = false;
    }

    // tell the State about the scroll direction
    if(scrollingDown !== undefined && scrollingDown != this.state.scrollingDown) {
      this.setState({scrollingDown: scrollingDown});
    }

    // set the function's XY position to the current position
    this._handleScroll.x=window.pageXOffset;
    this._handleScroll.y=window.pageYOffset;
  }

  _openDropdown(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  _closeDropdown() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    let { isTop, scrollingDown, isFixed } = this.state;
    let headerClass = classNames(
      'header'
      , 'fixed'
      , {
        'isHidden': scrollingDown && !isTop
      }
    )

    return(
      <header className={headerClass}>
        <div className="topbar yt-container">
          <CloseWrapper
            isOpen={this.state.isOpen}
            closeAction={this._closeDropdown}
          />
          <div className="titles">
            <Link to="/">
              <div className="nav-logo"> Yote
                <span className="subtitle"> Standard Dev Kit </span>
              </div>
            </Link>
          </div>
          <div className="actions">
            <div className="yt-row center-vert right">
              <ul className="navigation">
                <li>
                  <Link to="/products" activeClassName="active">Products</Link>
                </li>
                <li className="dropdown">
                  <a onClick={this._openDropdown}> <i className="fa fa-caret-down"></i></a>
                </li>
                <DropdownNav
                  currentUser={null}
                  isOpen={this.state.isOpen}
                />
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }

}
