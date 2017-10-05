/**
* Navigator for user components
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
import { StackNavigator } from 'react-navigation';

// import user components
import Login from './components/Login'; 
import Profile from './components/Profile'; 
import UpdateProfile from './components/UpdateProfile'; 

const UserNavigator = StackNavigator(
  {
    Profile: {
      screen: Profile
    }
    , UpdateProfile: {
        screen: UpdateProfile
    }
  }
  , {
      initialRouteName: 'Profile'
      , headerMode: 'none'
      , mode: 'modal' // vertical screen (modal) transitions
    }
);

export default UserNavigator; 