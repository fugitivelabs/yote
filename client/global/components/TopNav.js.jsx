import React from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Link } from 'react-router';
import classNames from 'classnames';

import DropdownMenu from './DropdownMenu.js.jsx';

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
    // alert(e);
    // console.log(e);
    let scrollTop;
    if(e.target.scrollingElement) {
      scrollTop = e.target.scrollingElement.scrollTop;
    } else {
      scrollTop = document.documentElement.scrollTop;
    }

    // handle initial na
    let isTop = scrollTop < 20 ? true : false;
    if(isTop !== this.state.isTop) {
      this.setState({isTop: isTop});
    }


    // if the page is scrolled down, change the navbar style
    var scrollingDown;
    if ( typeof this._handleScroll.y == undefined ) {
      // this._handleScroll.x=window.pageXOffset;
      this._handleScroll.y=window.pageYOffset;
      // console.log(this._handleScroll.y);
      scrollingDown = false;
    }
    // var diffX=this._handleScroll.x-window.pageXOffset;
    var diffY=this._handleScroll.y-window.pageYOffset;

    if( diffY<0 ) {
      // Scroll down
      // console.log("down");
      scrollingDown = true;
    } else if( diffY>0 ) {
      // Scroll up
      // console.log("up");
      scrollingDown = false;
    }

    if(scrollingDown !== undefined && scrollingDown != this.state.scrollingDown) {
      this.setState({scrollingDown: scrollingDown});
      // this.scrollingDown = scrollingDown;
    }

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
                  <Link to="/products" activeClassName="active">Products <sup>simple</sup></Link>
                </li>
                <li>
                  <Link to="/posts" activeClassName="active">Posts <sup> complex</sup></Link>
                </li>

                <li className="dropdown">
                  <a onClick={this._openDropdown}> <i className="fa fa-caret-down"></i></a>
                </li>
                <DropdownMenu
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
