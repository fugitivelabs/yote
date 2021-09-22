/**
 * Will update the name and description of an already existing product
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import {
  Image
  , KeyboardAvoidingView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

import ProductForm from '../components/ProductForm'; 

// import libraries
import _ from 'lodash';

// import services
import { useGetUpdatableProduct } from '../productService';

// import styles
import YTStyles from '../../../global/styles/YTStyles';

const UpdateProduct = () => {
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation(); 

  // get the product id from the route. Below is equivalent to const { productId } = this.props.navigation.state.params;
  // this component knows about productId from declaring it in navigation stack in TabNavigator.js 
  const { productId } = route.params; 

  // fetches and returns the product and the update action wrapped in dispatch.
  // another benefit of using this version is that productQuery.isFetching will be true while the update is being processed by the server.
  const { sendUpdateProduct, data: product, ...productQuery } = useGetUpdatableProduct(productId);

  const handleFormSubmit = updatedProduct => {
    // send the updatedProduct to the server
    sendUpdateProduct(updatedProduct);
    // back to single product view. We don't have to wait for the update to finish. It's okay if the product is still updating when the user gets to the single product view.
    navigation.goBack(); 
  }

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  return (
    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <View style={YTStyles.container}>
      <YTHeader
        title='Update Product'
        leftItem={leftItem}
      />
      <WaitOn query={productQuery}>
        { product &&
          // we have the product, render the form
          <ProductForm
            product={product}
            cancelLink={`/products/${productId}`}
            disabled={productQuery.isFetching}
            formType="update"
            handleFormSubmit={handleFormSubmit}
          />
        }
      </WaitOn>
    </View>
  )
}

export default UpdateProduct;
