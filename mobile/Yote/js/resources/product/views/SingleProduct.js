/**
 * Displays a single product by the productId sent from props and the productMap from store
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  ScrollView
  , Text
  , View
} from 'react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import services
import { useGetProductById } from '../productService';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

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
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title='Single Product'
        leftItem={leftItem}
      />
      <WaitOn query={productQuery} fallback={<Skeleton />}>
        <ScrollView style={{opacity: productQuery.isFetching ? 0.5 : null}}>
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>{product?.title}</Text>
          </View>
          <View style={tw`px-4`}>
            <Text style={tw`text-lg`}>{product?.description}</Text>
          </View>
          <View style={tw`p-4`}>
            <YTButton
              caption={"Edit"}
              onPress={() => navigation.navigate('UpdateProduct', {productId: product._id})}
            />
          </View>
        </ScrollView>
      </WaitOn>
    </View>
  )
}

const Skeleton = () => {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}

SingleProduct.propTypes = {
  productId: PropTypes.string
}

export default SingleProduct;
