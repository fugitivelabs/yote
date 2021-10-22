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

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc'; 

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 


const UserProfile = () => {
  const dispatch = useDispatch();

  // use the hook to get the loggedInUser from the authStore
  const { loggedInUser, ...authQuery } = useLoggedInUser();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    // logging out automatically unmounts TabNavigator and replaces it with AuthStack
  }
  return (
    <View style={tw`bg-white flex-1`}>
      <YTHeader
        title="Profile"
      />
      <View style={tw`p-2`}>
        <Text style={tw`p-2 text-lg`}>Username: {loggedInUser?.username}</Text>
        <View style={tw`p-2`}>
          <YTButton
            caption="Logout"
            captionStyle={{color: YTStyles.colors.danger}}
            onPress={handleLogout}
            type="bordered"
          />
        </View>
      </View>
    </View>
  )
}

export default UserProfile