// List Component for Product

// import react things
import React from 'react';

// import react-native components
import {
  ActivityIndicator
  , Image
  , FlatList
  , Platform
  , RefreshControl
  , ScrollView
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import components
import ProductListItem from './ProductListItem';
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

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
          {products?.map(product => <ProductListItem key={product._id} id={product._id} navigation={navigation}/>)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('list-item-skeleton');
  return items.map((name, index) => <ProductListItem.Skeleton key={`${name} ${index}`} />)
}

export default ProductList;
