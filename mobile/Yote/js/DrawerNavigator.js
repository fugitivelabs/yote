import React from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'; 
import Home from './global/landing/Home'; 
import ProductLayout from './resources/product/components/ProductLayout'; 

class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./global/img/home.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };
  
    render() {
      return (
        <Home/>
      );
    }
  }
  
  class Products extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Products',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./global/img/shoppingBag.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };
  
    render() {
      return (
        <ProductLayout/>
      );
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
  
  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Notifications: {
      screen: Products,
    },
  });
  
  export default createAppContainer(MyDrawerNavigator)