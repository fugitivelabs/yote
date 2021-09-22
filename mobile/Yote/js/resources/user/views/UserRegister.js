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

import { sendRegister } from '../authStore';

// import user components
import UserRegisterForm from '../components/UserRegisterForm';

import YTStyles from '../../../global/styles/YTStyles'; 

const UserRegister = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (userInfo) => {
    const { payload: result } = await dispatch(sendRegister(userInfo));
    // adapted from: https://reactrouter.com/web/example/auth-workflow
    const { from } = location.state || { from: { pathname: "/"} }
    if(result.success) {
      // history.replace(from);
    } else {
      Alert.alert(result.message)
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
