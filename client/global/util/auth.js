const Auth = {
  requireLogin(nextState, replace) {
    console.log("requireAuth - LOGIN");
    console.log(window.currentUser);
    if (!window.currentUser._id) {
      console.log("failed check");
      // console.log(nextState);
      replace({
        pathname: '/user/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  , requireAdmin(nextState, replace) {
    console.log("requireAuth - ADMIN");
    console.log(window.currentUser);
    if (window.currentUser._id) {
      if(window.currentUser.roles.indexOf('admin') < 0) {
        console.log("failed check");
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
