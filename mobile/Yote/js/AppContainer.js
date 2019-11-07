import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Home from './global/landing/Home'; 
import Login from './resources/user/views/Login'; 
import ProductRoot from './resources/product/views/ProductRoot'; 
import AuthLoadingScreen from './AuthLoadingScreen'; 
import TabNavigator from './TabNavigator'; 
import DrawerNavigator from './DrawerNavigator'; 

const AppStack = createStackNavigator({ Home: Home, Product: ProductRoot });
const AuthStack = createStackNavigator({ SignIn: Login });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator, // could also use regular stack or DrawerNavigator
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

const mapStoreToProps = (store) => {
  return {
    isLoggedIn: store.user.loggedIn.apiToken
  }
}

export default connect(
  mapStoreToProps
)(AppContainer);