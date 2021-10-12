import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './global/landing/Home';
import ProductList from './resources/product/components/ProductList'; 
import SingleProduct from './resources/product/views/SingleProduct'; 
import CreateProduct from './resources/product/views/CreateProduct'; 
import UpdateProduct from './resources/product/views/UpdateProduct';

import Profile from './resources/user/views/Profile'; 

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

function UpdateProductScreen() {
  return (
    <UpdateProduct/>
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
      <ProductStack.Screen name="UpdateProduct" component={UpdateProductScreen}/>
    </ProductStack.Navigator>
  )
}

function UserProfileScreen() {
  return (
    <Profile/>
  )
}

const UserStack = createNativeStackNavigator(); 

function UserStackScreen() {
  return (
    <UserStack.Navigator screenOptions ={{
      headerShown: false
    }}>
      <UserStack.Screen name="UserProfile" component={UserProfileScreen}/>
    </UserStack.Navigator>
  )
}

const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    <Tab.Navigator screenOptions={{
      // headerMode: 'screen',
      // headerTintColor: 'white',
      // headerStyle: { backgroundColor: 'tomato' },
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductStackScreen} />
      <Tab.Screen name="User" component={UserStackScreen} />
    </Tab.Navigator>
  );
}