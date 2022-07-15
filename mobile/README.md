
# Yote Mobile
Yote Mobile will quickly get you a Yote-flavored ReactNative app up and running with basic user login/registration, post and product CRUD examples, and fully functioning navigation. This is intended to act as a good baseline for more complicated apps.

* [Dependencies](#dependencies)
* [Getting Started](#getting-started)
  - [Initializing Yote Mobile](#initializing-yote-mobile)
  - [Running the server](#running-the-server)
* [Run Yote Mobile](#run-yote-mobile)
  - [Running the Server](#running-the-server)
  - [Running React Native](#running-react-native)

## Dependencies
- [ReactJS](https://reactjs.com/)  -- (default web client)
- [React Native](https://reactnative.com)
- [Redux](https://redux.js.org/)  -- (client store)
- [Yote Server](/server/README.md)
- Java
- XCode
- Android Studio
- Cocoapods 


## Getting Started
Welcome to Yote Mobile. Let's get it started.


## Running Yote Mobile
### iOS:
* Install Cocoapods global
  ```
  $ sudo gem install cocoapods
  ```
    > _or using Homebrew_
  ```
  $ brew install cocoapods
  ```
* Install pods into project ios folder 
  ```
  $ cd ios
  $ pod install
  ```
    > _if having M1 issues try:_
  ```
  $ arch -x86_64 pod install
  ```
* cd ../ back to the /Yote folder
* Run the debugger 
  ```
  $ react-native start
  ```
* Open a new terminal window/tab and run the project
  ```
  $ react-native run-ios
  ```

### Android:
* Android Studio emulators for M1 chips are apparently still in progress, so I downloaded an emulator separately [here](https://github.com/google/android-emulator-m1-preview/releases/tag/0.2)
* You'll also need to make sure you have ADB (Android Debug Bridge) command line tool installed. I'm not sure if it automatically installs with Studio or react-native. To check, run this in your terminal:
  ```
  $adb devices
  ```
  > _If you have an emulator running or an android device plugged in, it will return a list of active devices._
* Once you see your emulator device listed, you can run the debugger and app:
  ```
  $ react-native start
  ```
* In a new termincal tab:
  ```
  $ react-native run-android
  ```
### Running on Device 
See [React Native docs](http://facebook.github.io/react-native/releases/0.41/docs/running-on-device.html#running-on-device) for running on device

### Running Mongo
In a new terminal window run ``` $ mongod ```

### Running the server
Make sure you have the Yote server initialized in the top level directory (see [Yote the server README](/server/README.md#getting-started) for reference). Then in another new terminal window run ```$ nodemon``` or ```$ yote start```
