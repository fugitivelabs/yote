/*
* Wraps DrawerLayoutAndroid from RN 
*/

// import react libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react components
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';

// import global components
import Base from '../../../global/components/BaseComponent';

class YTDrawerLayout extends Base {
  _drawer: ?DrawerLayoutAndroid;
  constructor(props, context) {
    super(props, context);
    this._bind(
      'openDrawer'
      , 'closeDrawer'
      , 'onDrawerOpen'
      , 'onDrawerClose'
      , 'handleBackButton'
    )
  }

  componentWillUnmount() {
    // this.context.removeBackButtonListener(this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton() {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    // this.context.addBackButtonListener(this.handleBackButton); 
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    // this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this._drawer && this._drawer.closeDrawer();
  }

  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }

  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayoutAndroid.positions;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => this._drawer = drawer}
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }
}

YTDrawerLayout.contextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};


YTDrawerLayout.propTypes = {
  dispatch: PropTypes.func
}


export default YTDrawerLayout;