import React from 'react';
import { render } from 'react-dom';
import { createHistory, useBasename } from 'history';
import { Router, Route, IndexRoute } from 'react-router';

//import custom components
import Layout from './global/components/Layout.js.jsx'
import PostList from './modules/post/components/List.js.jsx';
import PostView from './modules/post/components/View.js.jsx';

const history = createHistory();

render(
  (
    <Router history={history} >
      <Route path="/" component={Layout}>
        <Router path="/posts" component={PostList} />
        <Router path="/posts/:postId" component={PostView} />
      </Route>
    </Router>
  )
  , document.getElementById('react')
)