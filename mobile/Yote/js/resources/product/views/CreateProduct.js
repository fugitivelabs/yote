/**
 * Will create a new product from information in the TextInputs
 */

// import react things
import React, { useState } from 'react'

// import react-native components
import {
  ActivityIndicator
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

import ProductForm from '../components/ProductForm'; 

// import libraries
import _ from 'lodash';

// import services
import { useCreateProduct } from '../productService';

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 

const CreateProduct = () => {
  const { data: defaultProduct, sendCreateProduct, ...defaultProductQuery } = useCreateProduct();

  const navigation = useNavigation(); 

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false);

  const handleFormSubmit = async (newProduct) => {
    // set isCreating true to disable the form while wait for the new product to get returned
    setIsCreating(true);
    const { payload: product } = await sendCreateProduct(newProduct); // replaces dispatch(productActions.sendCreateProduct(newProduct)).then(productRes => ...)
    setIsCreating(false);
    // history.push(`/products/${product._id}`);
    // replace create view with single product on stack 
    navigation.replace('SingleProduct', {productId: product._id}); 
  }

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  // render UI based on data and loading state
  return (
    <View style={YTStyles.container}>
      <YTHeader
        title='Create Product'
        leftItem={leftItem}
      />
      <WaitOn query={defaultProductQuery}>
      { defaultProduct &&
        // we have the defaultProduct, render the form
        <ProductForm
          product={defaultProduct}
          cancelLink="/products"
          disabled={defaultProductQuery.isFetching || isCreating}
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
      }
      </WaitOn>
    </View>
  )
}

export default CreateProduct;
