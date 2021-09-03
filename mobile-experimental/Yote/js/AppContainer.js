import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux';

import Home from './global/landing/Home'; 
import Login from './resources/user/views/Login'; 
import ProductLayout from './resources/product/components/ProductLayout'; 
import AuthLoadingScreen from './AuthLoadingScreen'; 

// types of navigators  
import TabNavigator from './TabNavigator'; 

const AppStack = createNativeStackNavigator({ Home: Home, Product: ProductLayout });
const AuthStack = createNativeStackNavigator({ SignIn: Login });




const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      App: TabNavigator, // could also use TabNav or DrawerNavigator
      // Auth: AuthStack,
    },
    {
      initialRouteName: 'TabNavigator',
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