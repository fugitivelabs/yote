/**
* Root level navigator after user login
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
import { StackNavigator, TabNavigator } from 'react-navigation';

// import global components
import Home from './global/components/Home'; 
import TabBarComponent from './global/components/TabBarComponent'; 

// import module navigator components
import UserNavigator from './modules/user/UserNavigator'; 
import ProductNavigator from './modules/product/ProductNavigator'; 

// import styles
import YTColors from './global/styles/YTColors'; 

// define tabs 
const TabsNavigator = TabNavigator(
  {
    Home: { 
      screen: Home
      , navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image 
            source={require('./global/img/house.png')} 
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
            source={require('./global/img/shoppingBag.png')} 
            style={{height: 30, width: 30, tintColor: tintColor}}
          />
        )
      }
    }
  }
  , { 
    tabBarOptions: {
      activeTintColor: YTColors.button
      , inactiveTintColor: 'black'
      , style: {
        backgroundColor: '#fff'
      }
    }
    , tabBarPosition: 'bottom'
    , tabBarComponent: TabBarComponent
  }
);


let appNavigatorConfig = {
  TabsNavigator: {
    screen: TabsNavigator
  }
  , UserNavigator: {
    screen: UserNavigator
  }
}

//add individual module routes (other than product and user) here
Object.keys(moduleNavigators).map((moduleName, i) => {
  appNavigatorConfig[moduleName] = {
    screen: moduleNavigators[moduleName]
  }
})

const AppNavigator = StackNavigator(
  appNavigatorConfig
  , {
    mode: 'modal' // vertical screen (modal) transitions
    , headerMode: 'none'
  }
);

// horizontal screen transitions (replace TabsNavigator with MainCardNavigator in AppNavigator)
// const MainCardNavigator = StackNavigator({
//   Root: { 
//     screen: TabsNavigator 
//   },
// }, { 
//   headerMode: 'none'
// });

// const mapStoreToProps = (store) => {

//   return {
//     user: store.user
//   }
// }

// export default connect(mapStoreToProps)(AppNavigator);

export default AppNavigator;

import * as moduleNavigators from './modules/moduleNavigators.js';
