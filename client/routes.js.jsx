
const routes =
      <Route path="/" component={Layout} >
        <IndexRoute component={Landing} />
        <Route path="/posts" component={PostLayout} >
          <IndexRoute component={PostList} />
          <Route path="/posts/new" component={PostCreate} />
          <Route path="/posts/:postId" component={PostShow} />
          <Route path="/posts/:postId/update" component={PostUpdate} />
        </Route>
      </Route>
;


export default routes;
