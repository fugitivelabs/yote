/**
* Root level navigator for main app/after user login
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
import { createBottomTabNavigator } from 'react-navigation';

// import global components
import Home from '../global/landing/Home';
// import TabBarComponent from './TabBarComponent';

// import module navigator components
import ProductNavigator from '../resources/product/ProductNavigator';
import UserNavigator from '../resources/user/UserNavigator'; 

// import styles
import YTStyles from '../global/styles/YTStyles'; 

/** Navigator Notes **
  *
  * Recommended to read documentation for react-navigation, there is a learning curve. 
  *
  * To add routes to the TABS view, add them under AppStack below.
  *
  * We also recommend each tab you define have it's own navigator as shown below with ProductNavigator and UserNavigator. This keeps things a little more organized.
  * It's still possible but rarely did we need to access same route from within two different tabs
  *
  */

// define tabs
const AppStack = createBottomTabNavigator(
  {
    Home: { // route key and tab display name
      screen: Home // route component
      , navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../global/img/home.png')}
            style={{height: 30, width: 30, tintColor: tintColor}}
          />
        )
      }
    }
    , Products: {
      screen: ProductNavigator
      , navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../global/img/shoppingBag.png')}
            style={{height: 30, width: 30, tintColor: tintColor}}
          />
        )
      }
    }
    , Profile: {
      screen: UserNavigator
      , navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../global/img/user.png')}
            style={{height: 30, width: 30, tintColor: tintColor}}
          />
        )
      }
    }
  }
  , {
    tabBarOptions: {
      activeTintColor: YTStyles.colors.secondary
      , inactiveTintColor: 'black'
      , style: {
        backgroundColor: '#fff'
      }
    }
    , tabBarPosition: 'bottom'
    // , tabBarComponent: TabBarComponent // necessary to hide tab bar when using android keyboard
  }
);

export default AppStack;
