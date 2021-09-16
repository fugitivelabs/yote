/**
 * Displays a single product by the productId sent from props and the productMap from store
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Dimensions
  , Image
  , ListView
  , Platform
  , ScrollView
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import ListItem from '../../../global/components/base/ListItem';
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import libraries
import _ from 'lodash';

// import services
import { useGetProductById } from '../productService';

// import styles
import YTStyles from '../../../global/styles/YTStyles';

const SingleProduct = () => {
  // get route state. Below is equivalent to getting navigation obj to access params
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation(); 

  // get the product id from the route. Below is equivalent to const { productId } = this.props.navigation.state.params;
  // this component knows about productId from declaring it in navigation stack in TabNavigator.js 
  const { productId } = route.params; 

  // get the product from the store (or fetch it from the server)
  const { data: product, ...productQuery } = useGetProductById(productId);

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  return (
    <View style={YTStyles.container}>
      <YTHeader
        title='Single Product'
        leftItem={leftItem}
      />
      <WaitOn query={productQuery} fallback={<Skeleton />}>
        <ScrollView style={{opacity: productQuery.isFetching ? "50%" : null}}>
          <View style={{padding: 10}}>
            <Text style={YTStyles.h1}>{product?.title}</Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={YTStyles.text}>{product?.description}</Text>
          </View>
        </ScrollView>
      </WaitOn>
    </View>
  )
}

const Skeleton = () => {
  return (
    <ListItem>
      <Text>Loading</Text>
    </ListItem>
  )
}

SingleProduct.propTypes = {
  productId: PropTypes.string
}

export default SingleProduct;
