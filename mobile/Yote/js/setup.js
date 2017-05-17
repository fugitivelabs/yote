/**
 * Setup the app with Redux and load the main App file
 */

// import primary libraries
import React from 'react';
import { Provider } from 'react-redux';

// import components
import configureStore from './store/configureStore';
import YoteApp from './YoteApp';

function setup(): React.Component {
  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoading: true
        , store: configureStore(() => this.setState({isLoading: false}))
      };
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <YoteApp />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
