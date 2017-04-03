// import react things
import React from 'react';
import { connect } from 'react-redux';

// import react components
import AppState from 'AppState';
import BackAndroid from 'BackAndroid';
import Navigator from 'Navigator'
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';

// import custom components
import Base from './global/components/BaseComponent';
import Login from './modules/user/components/Login';
import Register from './modules/user/components/Register';
import Privacy from './modules/user/components/Privacy';

// styles

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

class LoggedOutNavigator extends Base {
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

  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);

  }

  _addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  _removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  _handleBackButton() {
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

    if(route.register) {
      return (
        <Register
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

    return <Login navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          if ( route.privacy ) {
            return Navigator.SceneConfigs.FloatFromBottom;
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
)(LoggedOutNavigator);
