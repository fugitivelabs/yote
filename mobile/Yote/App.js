/**
 * Setup the store with Redux and load the main App file
 */

// import primary libraries
import React from 'react';
import { Provider } from 'react-redux';

// import components
import configureStore from './js/store/configureStore';
import Root from './js/Root'; 

class App extends React.Component {
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
        <Root/>
      </Provider>
    );
  }
}

export default App;
