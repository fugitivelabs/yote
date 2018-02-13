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
import ProductNavigator from './modules/product/ProductNavigator';

// import specific module screens
import Profile from './modules/user/views/Profile'; 
import UpdateProfile from './modules/user/views/UpdateProfile'; 

// import styles
import YTColors from './global/styles/YTColors';

/** Navigator Notes **
  *
  * To add routes to the TABS view, add them to TabNavigator below
  *
  * For horizontal screen transitions add screens to MainCardNavigator, for modal vertical animations add
  * screens to AppNavigator. 
  * 
  * Modal screens cannot directly transition horizontally (for now) to a new screen
  * ways around that are just accepting it, or nest more Navigator components (see ProductNavigator).
  *
  * However, nesting navigators can become a pain when navigations become more complex
  * Such as, resetting stack and going to root navigator or specific screen in the stack.
  *
  * Because of that, it is easier to add specific routes as you need them that way you can specify
  * exactly where they go and how they go there.
  *
  */

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

const MainCardNavigator = StackNavigator({
  Root: {
    screen: TabsNavigator
  }
  // add individual module routes here (horizontal transitions)
}, {
  headerMode: 'none'
});


let AppNavigator = StackNavigator({
  TabsNavigator: {
    screen: MainCardNavigator
  }
  , Profile: {
    screen: Profile
  }
  , UpdateProfile: {
    screen: UpdateProfile
  }
  // add individual module routes here (vertical transitions)
}, {
  mode: 'modal'
  , headerMode: 'none'
});

export default AppNavigator;
