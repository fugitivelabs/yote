[Docs](../) / Mobile

Mobile
======

Yote Mobile will quickly get you a Yote-flavored ReactNative app up and running with basic user login/registration, post and product CRUD examples, and fully functioning navigation. This is intended to act as a good baseline for more complicated apps.

## Table of Contents

* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
  - [Initializing Yote Mobile](#initializing-yote-mobile)
  - [Running the server](#running-the-server)
* [Run Yote Mobile](#run-yote-mobile)
  - [Running the Server](#running-the-server)
  - [Running React Native](#running-react-native)

* * *

## Dependencies
- [ReactJS](https://reactjs.com/)
- [React Native](https://reactnative.com)
- [Redux](https://redux.js.org/)
- [Yote Server](./server)
- Java
- XCode
- Android Studio

  > _**NOTE:** reference RN [Running On Device](http://facebook.github.io/react-native/releases/0.41/docs/running-on-device.html#running-on-device) docs to ensure you have the correct Android environment setup_

* * *

## Getting Started
Welcome to Yote Mobile. Let's get it started.


### Initializing Yote Mobile
Yote Mobile can be initialized with the CLI or manually.

#### Init with CLI
> COMING SOON!!

#### Init Manually

1. Initialize new React Native project at most recent "stable" version
    _**NOTE:** The CLI will eventually do all this for you_

    > "stable" in this context is the latest version of React Native that is confirmed to work with current version of Yote

    ```
    # current confirmed stable version is 0.41.0  
    $ react-native init --version="0.41.0" NewProjectName
    ```
1. copy/paste `Yote/package.json` contents into `NewProjectName/package.json`
1. cd into `NewProjectName` and run `$ npm install`
1. run `$ rnpm link`
1. copy/paste contents of `Yote/index.ios.js` & `Yote/index.android.js` with the following
    ```javascript
      /**
       * Point the app to /js
       */

      import React, { Component } from 'react';
      import { AppRegistry } from 'react-native';
      import setup from './js/setup';

      AppRegistry.registerComponent('NewProjectName', setup);

    ```
1. copy/paste entire `Yote/js/` directory into `NewProjectName/`
1. rename `js/YoteApp.js` to `js/NewProjectNameApp.js` and change references inside that file
1. in `setup.js` change `import YoteApp from './YoteApp'` to `import NewProjectNameApp from './NewProjectNameApp'`
1. in `setup.js` change `<YoteApp/>` under Provider component to `<NewProjectNameApp/>`
1. remove entire `Yote/` directory
    ```
     $ rm -rf Yote
    ```

* * *

## Run Yote Mobile
While Yote Mobile can certainly run server-less (or with a service other than Yote), for now it looks for the Yote Server by default.

> We may change this later to be configureable via the CLI

### Running Mongo
In a new terminal window run ``` $ mongod ```

### Running the server
Make sure you have the Yote server initialized in the top level directory (see [Yote the server README](/server/README.md#getting-started) for reference). Then in another new terminal window run ```$ nodemon``` or ```$ yote start```

### Running React Native
See [React Native docs](http://facebook.github.io/react-native/releases/0.41/docs/running-on-device.html#running-on-device) for running on device

To run in iOS simulator
1. cd into `/NewProjectName`
1. run `$ react-native run-ios`

> if no errors should load a login screen on simulator

### Default Login Info
**username:** admin@admin.com
**password:** admin
