import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { initStore } from './config/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

// we should know better, but just in case we navigate to the unused react dev server, show an alert.
if(window.location.origin === 'http://localhost:3000') alert("Wrong port. Go to http://localhost:3030 to load the app from the server")

// Grab the loggedInUser from the window as injected on the server-generated HTML
let loggedInUser;
try {
  loggedInUser = JSON.parse(window.currentUser);
} catch(error) {
  // console.log('error', error);
  // window.currentUser was is a valid stringified JSON object (it was probably 'undefined')
  loggedInUser = null
}

// remove it from the global window object
delete window.currentUser

// Create Redux store with initial state
const store = initStore(loggedInUser)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
