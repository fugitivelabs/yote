// import react things
import React from 'react';
import Platform from 'Platform';
import Navigator from 'Navigator'
import BackAndroid from 'BackAndroid';
import StyleSheet from 'StyleSheet';
import { connect } from 'react-redux';
import Base from './global/components/BaseComponent';
import AppState from 'AppState';

// import components
import TabsView from './global/components/tabs/TabsView';

import Settings from './modules/user/components/Settings';
import EditProfile from './modules/user/components/EditProfile';
import Profile from './modules/user/components/Profile';
import Privacy from './modules/user/components/Privacy';
import Team from './modules/user/components/Team';
import FAQ from './modules/user/components/FAQ';

// styles

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

class MainNavigator extends Base {
  constructor(props) {
    super(props);
    this._handlers = [];

    this._bind(
      '_renderScene'
      , '_handleBackButton'
      , '_addBackButtonListener'
      , '_removeBackButtonListener'
    )
  }

  componentDidMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
    if(this.props.isLoggedIn) {
      // this.props.dispatch(postActions.fetchList()); 
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
        <EditProfile
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

    if(route.team) {
      return (
        <Team
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
          if (route.editProfile || route.settings || route.privacy || route.profile || route.team ) {
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
    isLoggedIn: store.user.isLoggedIn
    , user: store.user.current
  }
}

export default connect(
  mapStoreToProps
)(MainNavigator);
