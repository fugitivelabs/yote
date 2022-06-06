/**
 * Will update an existing product using the inputs on the ProductForm
 */

// import react things
import React from 'react';

// import react-native components
import {
  ActivityIndicator
  , View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import ProductForm from '../components/ProductForm';

// import services
import { useGetUpdatableProduct } from '../productService';

// import styles
import tw from '../../../global/styles/tailwind/twrnc';

const UpdateProduct = () => {
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation();
  // get the product id from the route. Below is equivalent to const { productId } = this.props.navigation.state.params;
  // this component knows about productId from declaring it in navigation stack in TabNavigator.js 
  const { productId } = route.params;

  const { data: product, handleFormChange, handleFormSubmit, ...productQuery } = useGetUpdatableProduct(productId, {
    // optional, callback function to run after the request is complete
    onResponse: (updatedProduct, error) => {
      if(error || !updatedProduct) {
        // TODO: handle error
      }
      // back to single product view.
      navigation.goBack();
    }
  });

  const leftItem = {
    icon: require('../../../global/img/back.png')
    , layout: 'icon'
    , onPress: () => navigation.goBack()
  }

  return (
    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <View style={tw`flex-1`}>
      <YTHeader
        title='Update Product'
        leftItem={leftItem}
      />
      <WaitOn query={productQuery} fallback={<ActivityIndicator />}>
        <ProductForm
          product={product}
          disabled={productQuery.isFetching}
          formType='update'
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </View>
  )
}

export default UpdateProduct;
