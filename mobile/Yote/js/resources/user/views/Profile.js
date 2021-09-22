/**
* User profile page displays current loggedIn user information
*/

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , Linking
  , ListView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

import { NavigationActions } from 'react-navigation'

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

import { useDispatch } from 'react-redux';

import { useLoggedInUser } from '../authService';
import { sendLogout } from '../authStore';

// import libraries

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
    <View style={[YTStyles.container]}>
      <YTHeader
        title="Profile"
      />
      <Text>My profile</Text>
      <Text>{loggedInUser.username}</Text>
      <YTButton
        caption="Logout"
        captionStyle={{color: YTStyles.colors.danger}}
        onPress={handleLogout}
        type="secondary"
      />
    </View>
  )
}

export default UserProfile