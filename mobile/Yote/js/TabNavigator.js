import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './global/landing/Home';
import ProductLayout from './resources/product/components/ProductLayout'; 
import UserNavigator from './resources/user/UserNavigator'; 


const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Products: ProductLayout,
  User: UserNavigator
});

export default createAppContainer(TabNavigator);