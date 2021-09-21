import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator'; 
import Login from '../js/resources/user/views/Login';

const AuthStack = createNativeStackNavigator(); 

export default function AuthStack() {
  if (state.isLoading) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <AuthStack.Navigator screenOptions ={{
      headerShown: false
    }}>
      { state.userToken == null ? (
        // No token found, user isn't signed in 
        <AuthStack.Screen
          name="SignIn"
          component={Login}
          options={{
            title: 'Sign in',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
      ) : (
        // User is signed in
        <AuthStack.Screen name="TabNavigator" component={TabNavigator} />
      )}
    </AuthStack.Navigator>
  )
}


