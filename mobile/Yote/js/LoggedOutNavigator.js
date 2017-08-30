/**
* Navigator for users to login and register
*/

// import primary libraries
import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

// import global components
import Home from './global/components/Home'; 
import YTHeader from './global/components/YTHeader'; 

// import custom components
// user
import Login from './modules/user/components/Login'; 
import Register from './modules/user/components/Register'; 

const LoggedOutNavigator = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  }, {
    mode: 'modal',
    headerMode: 'none',
});

const mapStoreToProps = (store) => {

  return {
    user: store.user
  }
}

export default connect(mapStoreToProps)(LoggedOutNavigator);