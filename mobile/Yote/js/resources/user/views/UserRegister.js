/**
 * View component for /user/register
 *
 * On successful registration this component forwards the user back to referrer
 * or to the root if there is no referrer.
 *
 * NOTE: upon reaching this page, user can toggle between /user/login and
 * /user/register without changing the original referring source route.
 */
// import primary libraries
import React from 'react';
// import PropTypes from 'prop-types';

import {
  Alert
  , Dimensions
  , Image
  , Modal
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';
import { useDispatch } from 'react-redux';

import { sendRegister, sendLogin } from '../authStore';

// import user components
import UserRegisterForm from '../components/UserRegisterForm';

import YTStyles from '../../../global/styles/YTStyles'; 

const UserRegister = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (userInfo) => {
    const { payload: loggedInUser, error } = await dispatch(sendRegister(userInfo));
    if(loggedInUser) {
      // auth stack will unmount and be replaced by TabsNavigator
    } else {
      Alert.alert(error.message || "There was a problem registering. Please try again.")
    }
  }

  return (
    <View style={[YTStyles.container]}>
      <UserRegisterForm
        user={{username: '', password: ''}}
        handleFormSubmit={handleFormSubmit}
      />
    </View>
  )
}

export default UserRegister
