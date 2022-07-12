import React from 'react';
import {
  Image
  , Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './global/landing/Home';
import SingleProduct from './resources/product/views/SingleProduct'; 
import CreateProduct from './resources/product/views/CreateProduct'; 
import UpdateProduct from './resources/product/views/UpdateProduct';

import Profile from './resources/user/views/Profile'; 
import InfiniteProductList from './resources/product/components/InfiniteProductList';

// Import tailwind with config
import tw from './global/styles/tailwind/twrnc';

function HomeScreen() {
  return (
    <Home/>
  );
}

function ProductsScreen() {
  return (
    // <ProductList />
    <InfiniteProductList/>
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if(route.name === 'Home') {
            return (
              <Image
                source={
                  focused
                    ? require('./global/img/home_filled.png')
                    : require('./global/img/home.png')
                }
                style={focused ? tw`h-5 w-5 tint-red-700` : tw`h-5 w-5`}
              />
            );
          } else if(route.name === 'Products') {
            return (
              <Image
                source={require('./global/img/search.png')}
                style={focused ? tw`h-5 w-5 tint-red-700` : tw`h-5 w-5`}
              />
            );
          } else if(route.name === 'User') {
            return (
              <Image
                source={
                  focused
                    ? require('./global/img/user_filled.png')
                    : require('./global/img/user.png')
                }
                style={focused ? tw`h-5 w-5 tint-red-700` : tw`h-5 w-5`}
              />
            )
          }
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={focused ? tw`text-xs text-red-700` : tw`text-xs`}>{route.name}</Text>
          )
        },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        headerShown: false
      }
      )}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductStackScreen} />
      <Tab.Screen name="User" component={UserStackScreen} />
    </Tab.Navigator>
  );
}