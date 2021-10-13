/**
* User profile page displays current loggedIn user information
*/

// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  Dimensions
  , Image
  , Platform
  , ScrollView
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

import { NavigationActions } from 'react-navigation'

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

import { useDispatch } from 'react-redux';

import { useLoggedInUser } from '../authService';
import { sendLogout } from '../authStore';

// import libraries

// import styles
import { tailwind } from '../../../global/styles/tailwind/tailwind'; 


const UserProfile = () => {
  const dispatch = useDispatch();

  // use the hook to get the loggedInUser from the authStore
  const { loggedInUser, ...authQuery } = useLoggedInUser();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    // logging out automatically unmounts TabNavigator and replaces it with AuthStack
  }
  return (
    <View style={tailwind('bg-white flex-1')}>
      <YTHeader
        title="My Profile"
      />
      <View style={tailwind('p-2')}>
        <Text style={tailwind('p-2')}>Username: {loggedInUser?.username}</Text>
        <View style={tailwind('p-2')}>
          <YTButton
            caption="Logout"
            onPress={handleLogout}
            type="secondary"
          />
        </View>
      </View>
    </View>
  )
}

export default UserProfile