import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './global/landing/Home';
import ProductRoot from './resources/product/views/ProductRoot'; 


const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Products: ProductRoot,
});

export default createAppContainer(TabNavigator);