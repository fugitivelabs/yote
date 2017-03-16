import React, { PropTypes } from 'react';
import Base from '../../../../global/components/BaseComponent.js.jsx';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

// import components
import Hero from './Hero.js.jsx';
import Navbar from './Navbar.js.jsx';

class Landing extends Base {
  constructor(props, context) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleScroll'
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll.bind(this));
  }

  _handleScroll(e) {
    // if the page is scrolled down, change the navbar style
    let scrollTop = e.target.scrollingElement.scrollTop;
    if(scrollTop > 50 && !this.state.isScrolled ) {
      this.setState({isScrolled: true});
    } else if(scrollTop < 50 && this.state.isScrolled) {
      this.setState({isScrolled: false});
    }
  }

  render() {
    return(
      <div className="master-layout">
        <Navbar
          isScrolled={this.state.isScrolled}
          openDialog={this._openDialog}
        />
        <Hero />
        <div className="hero sub u-centerText">
          <p> Check out the docs on <a href="https://fugitivelabs.gitub.io/yote/"> GitHub </a></p>
        </div>
      </div>
    )
  }

}

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
  }
}

export default connect(
  mapStoreToProps
)(Landing);
