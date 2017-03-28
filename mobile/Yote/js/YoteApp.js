/**
 * Main application wrapper.  Should check if user is logged in or not.
 * - If NOT logged in, load LoggedOutNavigator which has the login, register,
 *   etc. and prevents the user from accessing other parts of the app.
 * - If user IS logged in, load MainNavigator which gives them access to the
 *   rest of the application. 
 */

// import primary libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import RN omponents
import AppRegistry from 'AppRegistry';
import AppState from 'AppState';
import StatusBar from 'StatusBar';
import StyleSheet from 'StyleSheet';
import View from 'View';

// import YT components
import Base from './global/components/BaseComponent';
import LoggedOutNavigator from './LoggedOutNavigator';
import Login from './modules/user/components/Login';
import MainNavigator from './MainNavigator';

// define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class YoteApp extends Base {
  constructor(props) {
    super(props);
    this._bind(
      '_handleAppStateChange'
    );
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange(appState) {
    if (appState === 'background') {
     }
   }

  render() {
    if (!this.props.loggedIn.apiToken) {
      // user is logged out.  Load logged out state
      return (
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor="rgba(0, 0, 0, 0.2)"
          />
          <LoggedOutNavigator />
        </View>
      );
    }

    // user is logged in.  Load main app state.
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="default"
        />
        <MainNavigator />
      </View>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    loggedIn: store.user.loggedIn
  }
}

export default connect(
  mapStoreToProps
)(YoteApp);
