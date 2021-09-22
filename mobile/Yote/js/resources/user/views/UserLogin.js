/**
 * View component for /user/login
 *
 * On successful login this component forwards the user back to referrer
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

import { sendLogin } from '../authStore';

// import user components
import UserLoginForm from '../components/UserLoginForm';

import YTStyles from '../../../global/styles/YTStyles'; 

const UserLogin = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (userInfo) => {
    const { payload: result } = await dispatch(sendLogin(userInfo));
    // adapted from: https://reactrouter.com/web/example/auth-workflow
    const { from } = location.state || { from: { pathname: "/"} }
    if(result.success) {
      // grab token from response header and save to user locally 
      // auth stack will unmount and be replaced by TabsNavigator
    } else {
      Alert.alert(result.message)
    }
  }

  return  (
    <View style={[YTStyles.container]}>
      <UserLoginForm
        user={{username: '', password: ''}}
        handleFormSubmit={handleFormSubmit}
      />
    </View>
  )
}

export default UserLogin
