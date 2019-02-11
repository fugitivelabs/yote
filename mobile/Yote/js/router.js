/**
 * Builds root navigator for app
 * If app requires user login before entry, LoggedOutNavigator will be initial route.
 */

import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";

import AppNavigator from './global/navigation/AppNavigator'; 
import LoggedOutNavigator from './global/navigation/LoggedOutNavigator'; 

export const createRootNavigator = (requireLogin, signedIn = false) => {
  return SwitchNavigator(
    {
      AppNavigator: {
        screen: AppNavigator
      },
      LoggedOutNavigator: {
        screen: LoggedOutNavigator
      }
    },
    {
      initialRouteName: !requireLogin || signedIn ? "AppNavigator" : "LoggedOutNavigator"
    }
  );
};