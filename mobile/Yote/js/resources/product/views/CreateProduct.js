/**
 * Will create a new product from the default product and the inputs on the ProductForm
 */

// import react things
import React from 'react'

// import react-native components
import {
  ActivityIndicator
  , View
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductForm from '../components/ProductForm'; 

// import services
import { useCreateProduct } from '../productService';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const CreateProduct = () => {
  const navigation = useNavigation();

  const { data: product, handleFormChange, handleFormSubmit, ...productQuery } = useCreateProduct({
    // optional, anything we want to add to the default object
    initialState: {
      // someKey: someValue
    }
    // optional, callback function to run after the request is complete
    , onResponse: (newProduct, error) => {
      if(error || !newProduct) {
        // TODO: handle error
      } else {
        // replace create view with single product on stack 
        navigation.replace('SingleProduct', {productId: newProduct._id}); 
      }
    }
  });

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  // render UI based on data and loading state
  return (
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title='Create Product'
        leftItem={leftItem}
      />
      <WaitOn query={productQuery} fallback={<ActivityIndicator/>}>
        <ProductForm
          product={product}
          disabled={productQuery.isFetching}
          formType="create"
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </View>
  )
}

export default CreateProduct;
