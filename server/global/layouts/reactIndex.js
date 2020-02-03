// import primary libraries
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, StaticRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ConnectedRouter, Router } from 'react-router-redux';

// import routes from '../web/config/routes.js.jsx';
// import configureStore from '../web/config/configureStore';

// 

const Layout = () => (
    <div>
        <h2>This is a TEST page 1 - server...</h2>
        <ConnectedRouter></ConnectedRouter>
    </div>
);

// const Layout = () => (
// <Provider store={{}}>
//     <ConnectedRouter>
//       {routes}
//     </ConnectedRouter>
//   </Provider>
// )

// class Test extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             title: "TEST! TESTS! THIS IS LOADED FROM THE STATE",
//         };
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{ this.state.title }</h1>
//             </div>
//         );
//     }
// }

export default Layout; 