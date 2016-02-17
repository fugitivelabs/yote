import React from 'react'
import { render } from 'react-dom'

//redux and state stuff
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './rootReducer'
import { fetchAllPosts } from './modules/post2/PostActions'
//todo: combine reducers into one big rootReducer

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer
  , applyMiddleware(
    thunkMiddleware //lets 'dispatch' functions
    , loggerMiddleware //logs actions
  )
)
//
store.dispatch(fetchAllPosts()).then(() => {
  console.log("State after fetch:")

  console.log(store.getState())
})

//import basic views
import ListPostsContainer from './modules/post2/components/ListPostsContainer.js.jsx'

render(
  (
    <Provider store={store}>
      <div>
        <h1> test </h1>
        <ListPostsContainer>

        </ListPostsContainer>
      </div>
    </Provider>
  )
  , document.getElementById('react')
)

//
// import { createHistory, useBasename } from 'history'
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
//
// //import custom components
// import Layout from './global/components/Layout.js.jsx';
// import Landing from './global/components/Landing.js.jsx';
//
// //import Post
//
// import PostLayout from './modules/post/components/Layout.js.jsx';
// import PostList from './modules/post/components/List.js.jsx';
// import PostShow from './modules/post/components/Show.js.jsx';
// import PostCreate from './modules/post/components/Create.js.jsx';
// import PostUpdate from './modules/post/components/Update.js.jsx';
//
// //uncomment to remove console logs from the front end
// // console = {log: function() {}};
//
// // const history = createHistory();
//
// render(
//   (
//     <Router history={browserHistory} >
//       <Route path="/" component={Layout} >
//         <IndexRoute component={Landing} />
//         <Route path="/posts" component={PostLayout} >
//           <IndexRoute component={PostList} />
//           <Route path="/posts/new" component={PostCreate} />
//           <Route path="/posts/:postId" component={PostShow} />
//           <Route path="/posts/:postId/update" component={PostUpdate} />
//         </Route>
//       </Route>
//     </Router>
//   )
//   , document.getElementById('react')
// )
