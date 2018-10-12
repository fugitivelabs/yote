/**
 * Setup application for use with Redux & React-Router
 *
 *
 * NOTE: 'react-router-apply-middleware' is not the same as
 * react-router/applyRouterMiddleware. Using that breaks relative links
 * TODO: in future, check to see if react-router one starts working and remove this dependency
 */

require('es5-shim');
require('es5-shim/es5-sham');

// import primary libraries
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// instantiate tap event plugin
injectTapEventPlugin();


// import scss files.
// NOTE: Webpack does NOT actually import these as js. Instead it will generate the yote.css file.
import './config/yote.scss';

import routes from './config/routes.js.jsx';

import configureStore from './config/configureStore';

/**
 * EXPERIMENTAL CROSS BROWSER STUFF
 *
 * - override console if windows or unsupported
 * - instead of checking let's ONLY show console logs if it's chrome
 */

if((navigator.userAgent.toLowerCase().indexOf('webkit') == -1) || !window.development) {
  window.console = {log: function() {}, error: function(){} };
  /**
   * NOTE: overriding the error function may be dangerous, but IE throws some
   * major errors. in particular, something in the draftjs library checks if
   * console is undefined before calling errora (normally true in IE,
   * but we are overriding it to be an empty fn, which results in weird behavior)
   */
} else {
  // override errors.
  // NOTE: Only do this in chrome, IE haaaaaates that bind call
  var consoleError = console.error.bind(console);
  console.error = function(err){
    if(err !== 'Warning: A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.'){
        consoleError(err);
    }
  }
}

/**
 * END EXPERIMENTAL CROSS BROWSER STUFF
 */


const store = configureStore();
const history = createHistory();

// // listen to location changes and fire off a google analytics event.
// history.listen(function (location) {
//   console.log("GA location firing: " + location.pathname);
//   window.ga('send', 'pageview', location.pathname);
// });

render(
    <Provider store={store}>
      <ConnectedRouter
        history={history}
      >
        {routes}
      </ConnectedRouter>
    </Provider>
  , document.getElementById('application-main-yote')
)
