import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './global/landing/Home';
import ProductList from './resources/product/components/ProductList'; 

function HomeScreen() {
  return (
    <Home/>
  );
}

function ProductsScreen() {
  return (
    <ProductList/>
  );
}

const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        // headerMode: 'screen',
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: 'tomato' },
        headerShown: false
      }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const TabNavigator = createBottomTabNavigator({
//   Home: Home,
//   Products: ProductLayout,
//   // User: UserNavigator
// });

// export default createAppContainer(TabNavigator);