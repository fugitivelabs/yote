const Auth = {

  requireLogin(nextState, replace) {
    console.log("requireAuth");
    console.log(window.currentUser);
    if (!window.currentUser._id) {
      // console.log(nextState);
      replace({
        pathname: '/user/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  , requireAdmin(nextState, replace) {
    console.log("requireAuth");
    console.log(window.currentUser);
    if (window.currentUser._id) {
      if(window.currentUser.roles.indexOf('admin') < 0) {
        replace({
          pathname: '/user/login',
          state: { nextPathname: nextState.location.pathname }
        })
      }
    } else {
      // console.log(nextState);
      replace({
        pathname: '/user/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
}

export default Auth;
