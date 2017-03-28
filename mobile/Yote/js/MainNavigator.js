/**
 * Primary navigation stack for the app.  Utilizes RN Navigator
 *
 * See https://facebook.github.io/react-native/releases/next/docs/navigator.html
 * for docs
 *
 * TODO: Investigate replacing this with react-router v4
 */

// import primary libraries
import React from 'react';
import { connect } from 'react-redux';

// import RN components
import AppState from 'AppState';
import BackAndroid from 'BackAndroid';
import Navigator from 'Navigator'
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';

// import YT components
import Base from './global/components/BaseComponent';
import TabsView from './global/components/tabs/TabsView';

// import actions
import * as productActions from './modules/product/productActions';

// import module components
import UpdateProfile from './modules/user/components/UpdateProfile';
import FAQ from './modules/user/components/FAQ';
import NewProduct from './modules/product/components/NewProduct';
import Privacy from './modules/user/components/Privacy';
import Profile from './modules/user/components/Profile';
import Settings from './modules/user/components/Settings';


// define styles
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

class MainNavigator extends Base {
  constructor(props) {
    super(props);
    this._handlers = []; // android handlers
    this._bind(
      '_renderScene'
      , '_handleBackButton'
      , '_addBackButtonListener'
      , '_removeBackButtonListener'
    )
  }

  componentDidMount() {
    // setup android back button listener
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);

    const { dispatch } = this.props;

    // if logged in, call initial actions to load the app
    if(this.props.isLoggedIn) {
      // call initial actions here
      dispatch(productActions.fetchList());
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
  }


  _addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  _removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  _handleBackButton() {
    console.log("BACK BACK BACK");
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  }


  _renderScene(route, navigator) {
    if(route.userMembership) {
      return (
        <TabsView
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.settings) {
      return (
        <Settings
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.editProfile) {
      return (
        <UpdateProfile
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.profile) {
      return (
        <Profile
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.privacy) {
      return (
        <Privacy
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.faq) {
      return (
        <FAQ
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.feed) {
      return (
        <Feed
          {...route}
          navigator={navigator}
        />
      )
    }

    if(route.newProduct) {
      return (
        <NewProduct
          {...route}
          navigator={navigator}
        />
      )
    }

    return <TabsView navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        ref="navigator"

        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          if (route.newProduct || route.editProfile || route.settings || route.privacy || route.profile || route.team ) {
            return Navigator.SceneConfigs.FloatFromBottom;
          } else if(route.faq ) {
            return Navigator.SceneConfigs.FloatFromLeft;
          } else {
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }}
        initialRoute={{}}
        renderScene={this._renderScene}
      />
    )
  }

}


const mapStoreToProps = (store) => {
  return {
    isLoggedIn: store.user.loggedIn
    , user: store.user.loggedIn.user
  }
}

export default connect(
  mapStoreToProps
)(MainNavigator);
