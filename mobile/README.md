## To start a new project
- Initialize new React Native project at most recent "stable" version
  __**NOTE:** The CLI will effectively do this for you__
  > "stable" in this context is the latest version of ReactNative that is confirmed to work with current version of Yote

```
react-native init --version="0.41.0" MyNewApp
```

- copy/paste `Yote/package.json` contents into `MyNewApp/package.json`
- cd into `MyNewApp` and run `$ npm install`
- run `$ rnpm link`
- copy/paste contents of `Yote/index.ios.js` & `Yote/index.android.js` into `MyNewApp/index.ios.js` & `MyNewApp/index.android.js`
- change this line in each `AppRegistry.registerComponent('Yote', setup);` to `AppRegistry.registerComponent('MyNewApp', setup);`
- copy/paste entire `Yote/js/` directory into `MyNewApp/`
- remove entire `Yote/` directory
```
 $ rm -rf Yote
```



Welcome to Yote Mobile!

downloads:
node
mongo (brew)
sudo npm install -g react-native-cli
java

xcode
android studio (follow instructions on React-Native docs to install the right items)

### Getting started with React Native
url: https://facebook.github.io/react-native/docs/getting-started.html#content

react-native init NewProjectName
___this is the name that will appear in the app store and on devices for your app, it's a pain to change in xcode so make sure it's right.
--- this creates your new react native mobile project  

to run:
--- npm run watch and nodemon because this app will look to server on localhost:3030 to login, etc
--- npm start for the debugger
cd into NewProjectName
react-native run-ios
react-native run-android

### Copy over latest package.json dependencies
--- React Native only includes react and react-native on initial startup so you'll have to add a few more
--- npm install

### Replace index files (index.ios.js and index.android.js)
replace content in these files with:

import React, { Component } from 'react';
import setup from './js/setup';
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent('mobile', setup);

--- change 'mobile' to the name of the new project

### JS Folder
--- copy over latest JS folder into project's root directory
--- rename MobileApp.js file to NewProjectNameApp.js
--- in NewProjectNameApp.js change the class name and export name (last line) from MobileApp to NewProjectNameApp
--- in setup.js change import MobileApp from './mobileApp' to import NewProjectNameApp from './NewProjectNameApp'
--- in setup.js change <MobileApp/> under Provider component to <NewProjectNameApp/>

### Run again
--- react-native run-ios
--- if no errors should load a login screen on simulator

### Default Login Info
username: admin@admin.com
password: admin
