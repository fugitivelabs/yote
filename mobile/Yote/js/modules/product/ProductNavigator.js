/**
* Navigator for product components
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
import { StackNavigator } from 'react-navigation';

// import product components
import CreateProduct from './components/CreateProduct'; 
import ProductLayout from './components/ProductLayout'; 
import SingleProduct from './components/SingleProduct'; 
import UpdateProduct from './components/UpdateProduct'; 

// horizontal screen transitions
const CardNavigator = StackNavigator(
  {
    ProductLayout: {
      screen: ProductLayout
    }
    , SingleProduct: {
      screen: SingleProduct
    }
  }
  , {
      headerMode: 'none'
      , initialRouteName: 'ProductLayout'
    }
);

const ProductNavigator = StackNavigator(
  {
    CardNavigator: {
      screen: CardNavigator
    }
    , NewProduct: {
      screen: CreateProduct
    }
    , UpdateProduct: {
      screen: UpdateProduct
    }
  }
  , {
      headerMode: 'none'
      , mode: 'modal' // vertical screen transitions
    }
); 

export default ProductNavigator; 