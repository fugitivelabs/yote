import React from 'react';
import { render } from 'react-dom';
import { createHistory, useBasename } from 'history';
import { Router, Route, IndexRoute } from 'react-router';

//import custom components
import Layout from './global/components/Layout.js.jsx';
import Landing from './global/components/Landing.js.jsx';

//import Post
import Post from './modules/post/Post.js.jsx';
import PostList from './modules/post/components/List.js.jsx';
import PostShow from './modules/post/components/Show.js.jsx';
import PostCreate from './modules/post/components/Create.js.jsx';
import PostUpdate from './modules/post/components/Update.js.jsx';

const history = createHistory();

render(
  (
    <Router history={history} >
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} />
        <Route path="/posts" component={Post} >
          <IndexRoute component={PostList} />
          <Route path="/posts/new" component={PostCreate} />
          <Route path="/posts/:postId" component={PostShow} />
          <Route path="/posts/:postId/update" component={PostUpdate} />
        </Route>
      </Route>
    </Router>
  )
  , document.getElementById('react')
)