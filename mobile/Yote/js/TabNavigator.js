import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './global/landing/Home';
import ProductList from './resources/product/components/ProductList'; 
import SingleProduct from './resources/product/views/SingleProduct'; 
import CreateProduct from './resources/product/views/CreateProduct'; 

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

function SingleProductScreen() {
  return (
    <SingleProduct/>
  )
}

function CreateProductScreen() {
  return (
    <CreateProduct/>
  )
}

const ProductStack = createNativeStackNavigator(); 

function ProductStackScreen() {
  return (
    <ProductStack.Navigator screenOptions ={{
      headerShown: false
    }}>
      <ProductStack.Screen name="ProductList" component={ProductsScreen}/>
      <ProductStack.Screen name="SingleProduct" component={SingleProductScreen} getId={({ params }) => params.productId}/>
      <ProductStack.Screen name="CreateProduct" component={CreateProductScreen}/>
    </ProductStack.Navigator>
  )
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
        <Tab.Screen name="Products" component={ProductStackScreen} />
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