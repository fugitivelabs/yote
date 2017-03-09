
import React, { Component } from 'react';
import Base from './global/components/BaseComponent';
import { connect } from 'react-redux';
import Platform from 'Platform';

import AppRegistry from 'AppRegistry';
import StyleSheet from 'StyleSheet';
import AppState from 'AppState';
import Text from 'Text';
import View from 'View';
import ListView from 'ListView';
import StatusBar from 'StatusBar';

// import actions
// import { listActions as showingListActions } from './modules/showing/actions';

// import components
import MainNavigator from './MainNavigator';
import LoggedOutNavigator from './LoggedOutNavigator';
import Login from './modules/user/components/Login';

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
    if (!this.props.isLoggedIn) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const mapStoreToProps = (store) => {
  return {
    isLoggedIn: store.user.isLoggedIn
    , user: store.user.current
  }
}

export default connect(
  mapStoreToProps
)(YoteApp);
