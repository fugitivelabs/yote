/**
* Navigator for users to login and register
*/

// import primary libraries
import React from 'react';
import { connect } from 'react-redux';
import {
  Button
  , Image
  , Text
  , TouchableOpacity
  , View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

// import global components

// import custom components
import Login from '../resources/user/views/Login'; 
import Register from '../resources/user/views/Register'; 

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    }
    , Register: {
        screen: Register
      }
  }
  , {
      mode: 'modal'
      , headerMode: 'none'
    }
);

export default AuthStack;
