// List Component for Product

// import react things
import React from 'react';

// import react-native components
import {
  ScrollView
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import global  components
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

// import resource components
import ProductListItem from './ProductListItem';

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc'; 

// import services
import { useGetProductList } from '../productService';

const ProductList = () => {
  const { data: products, ids, ...productQuery } = useGetProductList({});
  const navigation = useNavigation(); 

  return (
    <View style={{flex: 1}}>
      <YTHeader
        title="Products"
        // rightItem={rightItem}
      />
      <ScrollView style={tw`p-2`}>
        <View style={tw`p-2`}>
          <YTButton
            caption={"New Product"}
            onPress={() => navigation.navigate('CreateProduct')}
          />
        </View>
        <WaitOn query={productQuery} fallback={<Skeleton />}>
          {products?.map(product => <ProductListItem key={product._id} id={product._id} onPress={() => navigation.navigate('SingleProduct', { productId: product._id })}/>)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('product-list-item-skeleton');
  return items.map((name, index) => <ProductListItem.Skeleton key={`${name} ${index}`} />)
}

export default ProductList;
