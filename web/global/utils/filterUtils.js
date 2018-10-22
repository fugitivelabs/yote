const filterUtils = {

  filterUser(testString, user) {
    // or userTemplates
    var userString = "";
    userString += user.username;
    userString += user.firstName;
    userString += user.lastName;
    userString += user.handle;
    userString += user.firstName;
    userString += user.handle;
    userString += user.username;
    userString += user.handle;
    userString += user.firstName;
    userString += user.username;
    userString += user.lastName;

    userString = userString.replace(/[^a-zA-Z0-9]/g,'');
    return userString.toLowerCase().indexOf(testString) > -1;
  }

}

export default filterUtils;
