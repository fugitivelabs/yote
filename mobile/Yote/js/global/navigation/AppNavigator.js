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
import { StackNavigator, TabNavigator } from 'react-navigation';

// import global components
import Home from '../landing/Home';
import TabBarComponent from './TabBarComponent';

// import module navigator components
import ProductNavigator from '../../resources/product/ProductNavigator';
import UserNavigator from '../../resources/user/UserNavigator'; 

// import styles
import YTStyles from '../styles/YTStyles'; 

/** Navigator Notes **
  *
  * Recommended to read documentation for react-navigation because there is a learning curve. 
  *
  * To add routes to the TABS view, add them under TabNavigator below
  *
  * For horizontal screen transitions add routes/screens under MainCardNavigator.
  *
  * For vertical screen transitions add routes/screens under AppNavigator, but note they can't navigate horizontally to anything in MainCardNavigator.
  *
  * We also recommend each tab you define have it's own navigator as shown below with ProductNavigator and UserNavigator. This keeps things a little more organized.
  * It's still possible but rarely did we need to access same route from within two different tabs
  *
  */

// define tabs
const TabsNavigator = TabNavigator(
  {
    Home: { // route key and tab display name
      screen: Home // route component
      , navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../img/house.png')}
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
            source={require('../img/shoppingBag.png')}
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
            source={require('../img/user.png')}
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
    // , tabBarComponent: TabBarComponent // this might have been for android keyboard issues
  }
);

const MainCardNavigator = StackNavigator({
  Root: {
    screen: TabsNavigator
  }
  // , Example: {
  //   screen: Example
  // }

  // add individual module routes here (horizontal transitions)
}, {
  headerMode: 'none'
});


let AppNavigator = StackNavigator({
  TabsNavigator: {
    screen: MainCardNavigator
  }
  // , Example: {
  //   screen: Example
  // }

  // add individual module routes here (vertical transitions)
}, {
  mode: 'modal'
  , headerMode: 'none'
});

export default AppNavigator;
